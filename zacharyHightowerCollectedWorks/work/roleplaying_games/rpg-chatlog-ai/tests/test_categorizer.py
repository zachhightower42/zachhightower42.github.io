import unittest
from src.categorizer import ChatCategorizer

class TestChatCategorizer(unittest.TestCase):

    def setUp(self):
        self.categorizer = ChatCategorizer()

    def test_train_model(self):
        # Assuming we have a method to load training data
        training_data = [
            ("Scott P.: IT DONE.", "out_of_character"),
            ("Reginald Percival Grenfell: Would you make me the most happy man?", "in_character"),
            ("Doc (GM): Night for now everyone.", "game_master"),
            ("Whitney G. Elieen PRAYS", "character_dialogue"),
            ("Crystal Saint Claire runs away crying.", "character_action")
        ]
        self.categorizer.train_model(training_data)
        self.assertTrue(self.categorizer.model_is_trained)

    def test_predict_category(self):
        self.categorizer.train_model([
            ("Scott P.: IT DONE.", "out_of_character"),
            ("Reginald Percival Grenfell: Would you make me the most happy man?", "in_character")
        ])
        prediction = self.categorizer.predict_category("Doc (GM): Night for now everyone.")
        self.assertEqual(prediction, "game_master")

    def test_process_chat_log(self):
        chat_log = [
            "Scott P.: IT DONE.",
            "Reginald Percival Grenfell: Would you make me the most happy man?",
            "Doc (GM): Night for now everyone."
        ]
        categorized_log = self.categorizer.process_chat_log(chat_log)
        self.assertEqual(len(categorized_log), 3)

    def test_edit_for_coherence(self):
        incoherent_text = "Doc (GM): Night for now everyone. I am coming to check out the stage"
        coherent_text = self.categorizer.edit_for_coherence(incoherent_text)
        self.assertNotEqual(incoherent_text, coherent_text)

if __name__ == '__main__':
    unittest.main()