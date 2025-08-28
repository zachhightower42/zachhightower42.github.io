# rpg-chatlog-ai/src/main.py

import sys
import pandas as pd
from categorizer import ChatCategorizer
from data_processing import ChatLogProcessor

def train_and_test():
    # Paths to your CSV files
    train_path = '/home/zachary/Desktop/zachhightower.com/training_data.csv'
    test_path = '/home/zachary/Desktop/zachhightower.com/test_data.csv'
    chatlog_path = '/home/zachary/Desktop/zachhightower.com/zacharyHightowerCollectedWorks/work/roleplaying_games/wcat_chat_log_1.txt'
    output_path = '/home/zachary/Desktop/zachhightower.com/cleaned_chat_log.txt'

    # Train model
    categorizer = ChatCategorizer()
    categorizer.train_model(train_path)

    # Test model
    test_data = pd.read_csv(test_path)
    correct = 0
    for _, row in test_data.iterrows():
        pred = categorizer.predict_category(row['message'])
        if pred == row['category']:
            correct += 1
    print(f'Test accuracy: {correct/len(test_data):.2%}')

    # Process chat log
    with open(chatlog_path, 'r') as f:
        raw_lines = [line.strip() for line in f if line.strip()]

    # Only process actual chat messages (skip headers, etc.)
    processor = ChatLogProcessor()
    processor.model = categorizer.model  # Use trained model

    processed = processor.process_chat_log(raw_lines)
    with open(output_path, 'w') as out:
        for entry in processed:
            out.write(f"{entry['message']}\n")

def main():
    # Initialize the chat log processor and categorizer
    processor = ChatLogProcessor()
    categorizer = ChatCategorizer()

    # Load data for training
    categorizer.load_data('training_data.csv')

    # Train the model
    categorizer.train_model()

    # Main processing loop
    while True:
        try:
            # Get chat log input from the user
            chat_log = input("Enter chat log (or type 'exit' to quit): ")
            if chat_log.lower() == 'exit':
                print("Exiting the program.")
                sys.exit()

            # Process the chat log
            categorized_log = processor.process_chat_log(chat_log)

            # Edit for coherence
            coherent_log = processor.edit_for_coherence(categorized_log)

            # Display the processed log
            print("Processed Chat Log:")
            print(coherent_log)

        except KeyboardInterrupt:
            print("\nExiting the program.")
            break

if __name__ == "__main__":
    train_and_test()