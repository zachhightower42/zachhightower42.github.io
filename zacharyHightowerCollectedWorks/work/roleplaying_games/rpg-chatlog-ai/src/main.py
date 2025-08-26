# rpg-chatlog-ai/src/main.py

import sys
from data_processing import ChatLogProcessor
from model import ChatCategorizer

def main():
    # Initialize the chat log processor and categorizer
    processor = ChatLogProcessor()
    categorizer = ChatCategorizer()

    # Load data for training
    categorizer.load_data('path/to/training/data')

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
    main()