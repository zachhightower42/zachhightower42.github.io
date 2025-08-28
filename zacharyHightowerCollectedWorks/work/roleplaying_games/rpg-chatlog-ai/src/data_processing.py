from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
import pandas as pd
import re

class ChatLogProcessor:
    def __init__(self):
        self.model = make_pipeline(CountVectorizer(), MultinomialNB())
        self.categories = ['out-of-character', 'game master', 'character dialogue', 'character action', 'system message']

    def categorize_message(self, message):
        """Categorizes a single chat message."""
        return self.model.predict([message])[0]

    def process_chat_log(self, chat_log):
        """Processes a chat log and categorizes each message."""
        categorized_log = []
        for message in chat_log:
            category = self.categorize_message(message)
            edited_message = self.edit_for_coherence(message, category)
            if edited_message:  # Only add if not removed
                categorized_log.append({'message': edited_message, 'category': category})
        return categorized_log

    def edit_for_coherence(self, message, category):
        """Edits a message for coherence based on its category."""
        # Remove out-of-character and system messages
        if category in ['out-of-character', 'system message']:
            return None

        # Game master: remove name, fix spelling/punctuation, ensure third person
        if category == 'game master':
            # Remove game master's name (assume format: Name: message)
            msg = re.sub(r'^[A-Za-z0-9 "\'-]+:\s*', '', message)
            # Basic punctuation and spelling correction (placeholder)
            msg = msg.strip().capitalize()
            # Ensure third person (simple heuristic: replace "you" with "they")
            msg = re.sub(r'\byou\b', 'they', msg, flags=re.IGNORECASE)
            return msg

        # Character dialogue: rewrite so quoted dialogue comes first, name after
        if category == 'character dialogue':
            # Match: Name: "dialogue" possibly multiple lines
            match = re.match(r'^([A-Za-z0-9 "\'-]+):\s*(.*)', message)
            if match:
                name = match.group(1)
                dialogue = match.group(2)
                # Find all quoted segments
                quotes = re.findall(r'"([^"]*)"', dialogue)
                if quotes:
                    combined_dialogue = ' '.join([f'"{q.strip()}"' for q in quotes])
                    # Use first word of name as speaker
                    speaker = name.split()[0]
                    return f'{combined_dialogue}\n{speaker} said.'
            return message  # fallback

        # Character action: basic spelling/punctuation, ensure third person
        if category == 'character action':
            msg = message.strip().capitalize()
            # Ensure third person (simple heuristic: replace "I" with "they")
            msg = re.sub(r'\bI\b', 'they', msg)
            return msg

        # Default: return as is
        return message.strip()

    def train_model(self, training_data):
        """Trains the model using the provided training data."""
        df = pd.DataFrame(training_data)
        self.model.fit(df['message'], df['category'])