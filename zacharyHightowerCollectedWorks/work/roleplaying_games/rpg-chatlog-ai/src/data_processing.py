from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
import pandas as pd

class ChatLogProcessor:
    def __init__(self):
        self.model = make_pipeline(CountVectorizer(), MultinomialNB())
        self.categories = ['out-of-character', 'in-character', 'game master', 'character dialogue', 'character action']

    def categorize_message(self, message):
        """Categorizes a single chat message."""
        return self.model.predict([message])[0]

    def process_chat_log(self, chat_log):
        """Processes a chat log and categorizes each message."""
        categorized_log = []
        for message in chat_log:
            category = self.categorize_message(message)
            categorized_log.append({'message': message, 'category': category})
        return categorized_log

    def edit_for_coherence(self, message):
        """Edits a message for coherence (placeholder for actual editing logic)."""
        # Implement coherence editing logic here
        return message.strip()  # Example: just stripping whitespace for now

    def train_model(self, training_data):
        """Trains the model using the provided training data."""
        df = pd.DataFrame(training_data)
        self.model.fit(df['message'], df['category'])