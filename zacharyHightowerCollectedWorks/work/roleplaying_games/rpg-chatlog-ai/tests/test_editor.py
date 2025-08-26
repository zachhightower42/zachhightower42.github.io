import unittest
from src.editor import ChatLogEditor

class TestChatLogEditor(unittest.TestCase):

    def setUp(self):
        self.editor = ChatLogEditor()

    def test_edit_for_coherence(self):
        input_text = "This is a test message.  It needs some edits."
        expected_output = "This is a test message. It needs some edits."
        self.assertEqual(self.editor.edit_for_coherence(input_text), expected_output)

    def test_split_dialogue(self):
        input_text = "Character A: Hello! Character B: Hi there!"
        expected_output = ["Character A: Hello!", "Character B: Hi there!"]
        self.assertEqual(self.editor.split_dialogue(input_text), expected_output)

    def test_format_output(self):
        input_data = [
            {"type": "action", "content": "Character A waves."},
            {"type": "dialogue", "content": "Character B: Hello!"}
        ]
        expected_output = "Character A waves.\nCharacter B: Hello!"
        self.assertEqual(self.editor.format_output(input_data), expected_output)

if __name__ == '__main__':
    unittest.main()