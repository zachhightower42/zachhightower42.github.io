import unittest
from src.model import ChatCategorizer

class TestChatCategorizer(unittest.TestCase):

    def setUp(self):
        self.categorizer = ChatCategorizer()

    def test_train_model(self):
        training_data = [
            {"message": "Hello, how are you?", "category": "out-of-character"},
            {"message": "I draw my sword.", "category": "character_action"},
            {"message": "The dragon roars!", "category": "character_dialogue"},
            {"message": "What do you want to do next?", "category": "game_master"},
        ]
        self.categorizer.train_model(training_data)
        self.assertTrue(self.categorizer.model_is_trained)

    def test_predict_category(self):
        self.categorizer.train_model([
            {"message": "I cast a fireball.", "category": "character_dialogue"},
            {"message": "Let's take a break.", "category": "out-of-character"},
        ])
        prediction = self.categorizer.predict_category("I want to attack the goblin.")
        self.assertIn(prediction, ["character_dialogue", "character_action"])

    def test_load_data(self):
        data = self.categorizer.load_data("path/to/data.json")
        self.assertIsInstance(data, list)
        self.assertGreater(len(data), 0)

if __name__ == '__main__':
    unittest.main()