import pandas as pd

# Probabilities from the HTML document (example values, you can expand this dict)
IMPROVEMENT_PROBS = {
    # Format: (flop, turn, river, flop_to_river)
    "pocket_pair_to_set": (11.8, 4.3, 4.3, 8.4),  # %: flop, turn, river, flop_to_river
    "pocket_pair_to_full_house": (0.73, 8.5, 8.7, 17),
    "pocket_pair_to_quads": (0.24, 2.1, 2.2, 4.3),
    "suited_to_flush": (0.842, 19.1, 19.6, 35),
    "suited_to_flush_draw": (10.9, None, None, None),
    "unpaired_to_pair": (32.4, 12.8, 13, None),
    "connectors_to_oesd": (9.6, 17, 17.4, 32),
    "connectors_to_straight": (1.31, 17, 17.4, 32),
}

def get_improvement_df(hand_type: str):
    """Return a DataFrame with improvement probabilities for a given hand type."""
    if hand_type not in IMPROVEMENT_PROBS:
        raise ValueError(f"Unknown hand type: {hand_type}")
    flop, turn, river, flop_to_river = IMPROVEMENT_PROBS[hand_type]
    data = {
        "Street": ["Flop", "Turn", "River", "Flop to River"],
        "Probability (%)": [flop, turn, river, flop_to_river]
    }
    df = pd.DataFrame(data)
    return df

if __name__ == "__main__":
    print("Available hand types:")
    for key in IMPROVEMENT_PROBS:
        print(f" - {key}")
    hand_type = input("Enter hand type: ").strip()
    try:
        df = get_improvement_df(hand_type)
        print("\nProbabilities of improvement:")
        print(df)
    except ValueError as e:
        print(e)