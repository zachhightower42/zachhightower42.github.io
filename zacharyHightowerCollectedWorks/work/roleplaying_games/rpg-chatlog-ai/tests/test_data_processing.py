import unittest
from src.data_processing import ChatLogProcessor

class TestChatLogProcessor(unittest.TestCase):

    def setUp(self):
        self.processor = ChatLogProcessor()

    def test_categorize_message(self):
        self.assertEqual(self.processor.categorize_message("Doc (GM): This is a game master post."), "game_master")
        self.assertEqual(self.processor.categorize_message("Whitney G. Elieen: I am a character dialogue."), "character_dialogue")
        self.assertEqual(self.processor.categorize_message("Callie 'Law-Dog' Mathers performs an action."), "character_action")
        self.assertEqual(self.processor.categorize_message("This is an out-of-character comment."), "out_of_character")

    def test_process_chat_log(self):
        chat_log = [
            "Doc (GM): Welcome to the game!",
            "Whitney G. Elieen: I am ready to start.",
            "Callie 'Law-Dog' Mathers performs a quick draw.",
            "This is a random comment."
        ]
        categorized_log = self.processor.process_chat_log(chat_log)
        self.assertEqual(len(categorized_log), 4)

    def test_edit_for_coherence(self):
        incoherent_text = "This is a test. And then, uh, I went to the store."
        coherent_text = self.processor.edit_for_coherence(incoherent_text)
        self.assertNotEqual(incoherent_text, coherent_text)

if __name__ == '__main__':
    unittest.main()