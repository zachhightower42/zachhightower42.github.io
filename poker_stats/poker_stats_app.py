import streamlit as st
import pandas as pd
import random
from poker_stats import IMPROVEMENT_PROBS, get_improvement_df
from treys import Card, Evaluator, Deck

CARD_VALUES = [
    "A", "K", "Q", "J", "T", "9", "8",
    "7", "6", "5", "4", "3", "2"
]
SUITS = ["s", "h", "d", "c"]
SUIT_SYMBOLS = {"s": "♠", "h": "♥", "d": "♦", "c": "♣"}

def card_label(card):
    """Return a pretty label for a card like 'As' -> 'A♠'."""
    return f"{card[0]}{SUIT_SYMBOLS[card[1]]}"

ALL_CARDS = [v + s for v in CARD_VALUES for s in SUITS]
ALL_CARD_LABELS = [card_label(c) for c in ALL_CARDS]
CARD_LABEL_TO_CODE = dict(zip(ALL_CARD_LABELS, ALL_CARDS))

def get_hand_type(card1, card2, suited):
    v1, s1 = card1[0], card1[1]
    v2, s2 = card2[0], card2[1]
    if v1 == v2:
        return "pocket_pair_to_set"
    elif s1 == s2:
        idx1 = CARD_VALUES.index(v1)
        idx2 = CARD_VALUES.index(v2)
        if abs(idx1 - idx2) == 1:
            return "connectors_to_oesd"
        else:
            return "suited_to_flush"
    else:
        return "unpaired_to_pair"

def to_treys(card):
    """Convert 'As' to 'As', 'Td' to 'Td', etc. for treys."""
    value_map = {'A': 'A', 'K': 'K', 'Q': 'Q', 'J': 'J', 'T': 'T',
                 '9': '9', '8': '8', '7': '7', '6': '6', '5': '5',
                 '4': '4', '3': '3', '2': '2'}
    suit_map = {'s': 's', 'h': 'h', 'd': 'd', 'c': 'c'}
    return value_map[card[0]] + suit_map[card[1]]

def count_better_hands(hero_hand, board_cards):
    evaluator = Evaluator()
    deck = Deck()
    # Remove hero's cards and board cards from deck
    used = set(hero_hand + board_cards)
    deck.cards = [c for c in deck.cards if Card.int_to_str(c) not in [to_treys(card) for card in used]]
    hero = [Card.new(to_treys(card)) for card in hero_hand]
    board = [Card.new(to_treys(card)) for card in board_cards]
    hero_score = evaluator.evaluate(hero, board)
    better = 0
    total = 0
    # Enumerate all possible 2-card opponent hands
    for i in range(len(deck.cards)):
        for j in range(i+1, len(deck.cards)):
            opp = [deck.cards[i], deck.cards[j]]
            opp_score = evaluator.evaluate(opp, board)
            if opp_score < hero_score:
                better += 1
            total += 1
    return better, total, better / total if total else 0

def simulate_improvement(hero_hand, board_cards, target_rank, n_trials=5000):
    """
    Simulate the probability of improving to at least target_rank by river.
    target_rank: e.g., Evaluator.FLUSH, Evaluator.STRAIGHT, etc.
    """
    evaluator = Evaluator()
    needed = 5 - len(board_cards)
    if needed <= 0:
        # Already at river
        score = evaluator.evaluate([Card.new(to_treys(c)) for c in hero_hand],
                                   [Card.new(to_treys(c)) for c in board_cards])
        hand_class = evaluator.get_rank_class(score)
        return 1.0 if hand_class <= target_rank else 0.0

    deck = [c for c in ALL_CARDS if c not in hero_hand + board_cards]
    hero = [Card.new(to_treys(c)) for c in hero_hand]
    board = [Card.new(to_treys(c)) for c in board_cards]
    improve_count = 0

    for _ in range(n_trials):
        draw = random.sample(deck, needed)
        full_board = board + [Card.new(to_treys(c)) for c in draw]
        score = evaluator.evaluate(hero, full_board)
        hand_class = evaluator.get_rank_class(score)
        if hand_class <= target_rank:
            improve_count += 1

    return improve_count / n_trials

st.title("Poker Hand Improvement Probabilities")

st.write("Select your two cards (no duplicates):")

col1, col2 = st.columns(2)
with col1:
    card1_label = st.selectbox("First card", ALL_CARD_LABELS)
with col2:
    card2_label = st.selectbox(
        "Second card",
        [c for c in ALL_CARD_LABELS if c != card1_label]
    )

card1 = CARD_LABEL_TO_CODE[card1_label]
card2 = CARD_LABEL_TO_CODE[card2_label]
suited = card1[1] == card2[1]

st.header("Board Cards (Community Cards)")
board_stage = st.selectbox("Current street", ["Preflop", "Flop", "Turn", "River"])
street_to_count = {"Preflop": 0, "Flop": 3, "Turn": 4, "River": 5}
board_count = street_to_count[board_stage]

# Exclude already chosen hand cards from board selection
available_board_labels = [c for c in ALL_CARD_LABELS if c not in [card1_label, card2_label]]

board_labels = st.multiselect(
    f"Select board cards ({board_count}):",
    available_board_labels,
    max_selections=board_count
)
board_cards = [CARD_LABEL_TO_CODE[lab] for lab in board_labels]

if st.button("Show Probabilities"):
    hand_type = get_hand_type(card1, card2, suited)
    if hand_type in IMPROVEMENT_PROBS:
        df = get_improvement_df(hand_type)
        # Filter DataFrame based on current street
        if board_stage == "Preflop":
            st.write("Probabilities for all streets:")
            st.dataframe(df)
        elif board_stage == "Flop":
            st.write("Probabilities from Turn and River:")
            st.dataframe(df[df["Street"].isin(["Turn", "River", "Flop to River"])].reset_index(drop=True))
        elif board_stage == "Turn":
            st.write("Probabilities for River only:")
            st.dataframe(df[df["Street"] == "River"].reset_index(drop=True))
        elif board_stage == "River":
            st.info("No further improvement possible on the river.")
    else:
        st.warning("No probabilities available for this hand type yet.")

# After showing probabilities
if board_count == len(board_cards) and board_count >= 3:
    with st.spinner("Evaluating hand strength..."):
        better, total, prob = count_better_hands([card1, card2], board_cards)
        st.subheader("Opponent Hand Comparison")
        st.write(f"Number of possible better hands: **{better}** out of {total}")
        st.write(f"Probability a random hand is better: **{prob:.2%}**")

HAND_CLASS_OPTIONS = {
    "Pair or better": 8,
    "Two Pair or better": 7,
    "Three of a Kind (Set) or better": 6,
    "Straight or better": 5,
    "Flush or better": 4,
    "Full House or better": 3,
    "Four of a Kind or better": 2,
    "Straight Flush": 1,
}

st.header("Simulate Hand Improvements")
selected_improvements = st.multiselect(
    "Select hand improvements to simulate:",
    list(HAND_CLASS_OPTIONS.keys()),
    default=["Flush or better"]
)

if st.button("Simulate Selected Improvements"):
    if not selected_improvements:
        st.warning("Please select at least one hand improvement to simulate.")
    elif board_count != len(board_cards):
        st.warning("Please select the correct number of board cards for the current street.")
    else:
        st.subheader("Simulation Results")
        results = []
        for name in selected_improvements:
            target_rank = HAND_CLASS_OPTIONS[name]
            prob = simulate_improvement([card1, card2], board_cards, target_rank)
            results.append({"Improvement": name, "Probability": f"{prob:.2%}"})
        st.table(results)