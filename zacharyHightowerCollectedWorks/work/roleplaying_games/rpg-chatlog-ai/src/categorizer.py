from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
import pandas as pd

class ChatCategorizer:
    def __init__(self):
        self.model = make_pipeline(CountVectorizer(), MultinomialNB())
        self.categories = [
            'out-of-character',
            'in-character',
            'game master',
            'character dialogue',
            'character actions',
            'system message'  
        ]

    def train_model(self, data_file):
        data = pd.read_csv(data_file)
        X = data['message']
        y = data['category']
        self.model.fit(X, y)

    def predict_category(self, message):
        return self.model.predict([message])[0]

    def load_data(self, data_file):
        return pd.read_csv(data_file)