# RPG Chat Log AI

This project is designed to develop and train a simple AI that categorizes and processes roleplaying chat logs. The AI recognizes different types of conversations, including out-of-character and in-character dialogues, game master posts, character dialogues, and character actions. Additionally, it performs text edits for coherence.

## Project Structure

```
rpg-chatlog-ai
├── src
│   ├── main.py               # Entry point of the application
│   ├── data_processing.py     # Handles data processing tasks
│   ├── model.py               # Defines the AI model for categorization
│   ├── categorizer.py         # Contains the categorization logic
│   ├── editor.py              # Responsible for editing chat logs for coherence
│   └── utils
│       └── __init__.py       # Initializes the utils package
├── tests
│   ├── test_data_processing.py # Tests for data processing functions
│   ├── test_model.py          # Tests for the AI model
│   ├── test_categorizer.py    # Tests for the categorizer functionality
│   └── test_editor.py         # Tests for the editor functions
├── requirements.txt           # Lists project dependencies
├── README.md                  # Project documentation
└── .gitignore                 # Specifies files to ignore in version control
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd rpg-chatlog-ai
   ```

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

## Usage

To run the application, execute the following command:
```
python src/main.py
```

## Functionality Overview

- **Categorization**: The AI can categorize messages into different types, helping to distinguish between in-character and out-of-character dialogues.
- **Processing**: The chat logs can be processed to extract relevant information and format it for better readability.
- **Editing**: The AI can edit chat messages for coherence, ensuring that the dialogues flow logically and are easy to understand.

