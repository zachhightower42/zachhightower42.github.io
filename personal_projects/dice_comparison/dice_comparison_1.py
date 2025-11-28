import random
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

NUM_TRIALS = 500000
NUM_DICE = 20  # Changed from 10 to 20

def roll_regular_dice(num_dice):
    # 6-sided, hits on 5 or 6
    rolls = np.random.randint(1, 7, num_dice)
    hits = np.sum((rolls >= 5))
    return hits

def roll_exploding_dice(num_dice):
    # 7-sided, hits on 6 or 7, explode on 6 or 7
    hits = 0
    dice_to_roll = num_dice
    while dice_to_roll > 0:
        rolls = np.random.randint(1, 8, dice_to_roll)
        new_hits = np.sum((rolls >= 6))
        hits += new_hits
        dice_to_roll = np.sum((rolls >= 6))  # Explode: roll again for each 6 or 7
    return hits

def run_trials():
    results_regular = []
    results_exploding = []
    for _ in range(NUM_TRIALS):
        results_regular.append(roll_regular_dice(NUM_DICE))
        results_exploding.append(roll_exploding_dice(NUM_DICE))
    return np.array(results_regular), np.array(results_exploding)

def calculate_probabilities(results, thresholds):
    probs = []
    for t in thresholds:
        if t == 0:
            probs.append(np.mean(results == 0))
        else:
            probs.append(np.mean(results >= t))
    return probs

def main():
    thresholds = list(range(0, 21)) + [21]  # 0-20, 21 = more than 20 hits
    results_regular, results_exploding = run_trials()
    # For "more than 20 hits", use (results > 20)
    regular_probs = [np.mean(results_regular == 0)] + [np.mean(results_regular >= t) for t in thresholds[1:-1]] + [np.mean(results_regular > 20)]
    exploding_probs = [np.mean(results_exploding == 0)] + [np.mean(results_exploding >= t) for t in thresholds[1:-1]] + [np.mean(results_exploding > 20)]

    df = pd.DataFrame({
        'Threshold': (
            ['No hits'] +
            [f'At least {i}' for i in range(1, 21)] +
            ['More than 20']
        ),
        'Regular Dice': regular_probs,
        'Exploding Dice': exploding_probs
    })

    ax = df.plot(x='Threshold', y=['Regular Dice', 'Exploding Dice'], kind='bar', figsize=(14,7))
    plt.ylabel('Probability')
    plt.title('Probability of Hits (20 Dice)')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    main()