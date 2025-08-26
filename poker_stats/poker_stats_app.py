import streamlit as st
import pandas as pd
import random
import itertools
from treys import Card, Evaluator, Deck

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
    "suited_connector": (9.6, 17, 17.4, 32),
    "suited_one_gap": (8.0, 15, 15.5, 29),
    "suited_broadway": (7.5, 14, 14.5, 28),
    "offsuit_connector": (6.5, 13, 13.5, 26),
    "offsuit_one_gap": (5.0, 11, 11.5, 23),
    "offsuit_broadway": (4.5, 9, 9.5, 19),
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
    idx1 = CARD_VALUES.index(v1)
    idx2 = CARD_VALUES.index(v2)
    broadway = set(["A", "K", "Q", "J", "T"])
    if v1 == v2:
        return "pocket_pair_to_set"
    elif suited:
        if abs(idx1 - idx2) == 1:
            return "suited_connector"
        elif abs(idx1 - idx2) == 2:
            return "suited_one_gap"
        elif v1 in broadway and v2 in broadway:
            return "suited_broadway"
        else:
            return "suited_to_flush"
    else:
        if abs(idx1 - idx2) == 1:
            return "offsuit_connector"
        elif abs(idx1 - idx2) == 2:
            return "offsuit_one_gap"
        elif v1 in broadway and v2 in broadway:
            return "offsuit_broadway"
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

def enumerate_improvement(hero_hand, board_cards, target_rank):
    """
    Enumerate all possible flops and calculate the exact probability of improving
    to at least target_rank by the flop.
    Only works if board_cards is empty (preflop).
    """
    evaluator = Evaluator()
    deck = [c for c in ALL_CARDS if c not in hero_hand + board_cards]
    hero = [Card.new(to_treys(c)) for c in hero_hand]
    improve_count = 0
    total = 0

    # Enumerate all possible 3-card flops
    for flop in itertools.combinations(deck, 3):
        full_board = [Card.new(to_treys(c)) for c in flop]
        score = evaluator.evaluate(hero, full_board)
        hand_class = evaluator.get_rank_class(score)
        if hand_class <= target_rank:
            improve_count += 1
        total += 1

    return improve_count / total if total else 0

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

available_board_labels = [c for c in ALL_CARD_LABELS if c not in [card1_label, card2_label]]

if board_stage == "Preflop":
    # Greyed out area with info
    st.markdown(
        """
        <div style="background-color:#f0f0f0; padding:10px; border-radius:5px; color:#888;">
        <b>Board cards selection is disabled on Preflop.</b>
        </div>
        """,
        unsafe_allow_html=True
    )
    board_labels = []
else:
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
        no_improvement = []
        for name in selected_improvements:
            target_rank = HAND_CLASS_OPTIONS[name]
            if board_stage == "Preflop":
                prob = enumerate_improvement([card1, card2], board_cards, target_rank)
            else:
                prob = simulate_improvement([card1, card2], board_cards, target_rank)
            results.append({"Improvement": name, "Probability": f"{prob:.2%}"})
            if prob == 0.0:
                no_improvement.append(name)
        st.table(results)
        if no_improvement:
            st.warning(
                f"No possible improvement for: {', '.join(no_improvement)} with the selected cards and board."
            )

st.header("Custom Target Hand Simulation")
custom_target = st.selectbox(
    "Select a target hand to simulate improvement to:",
    list(HAND_CLASS_OPTIONS.keys())
)
if st.button("Simulate Custom Target Improvement"):
    target_rank = HAND_CLASS_OPTIONS[custom_target]
    if board_stage == "Preflop":
        prob = enumerate_improvement([card1, card2], board_cards, target_rank)
    else:
        prob = simulate_improvement([card1, card2], board_cards, target_rank)
    st.write(f"Probability of improving to {custom_target}: **{prob:.2%}**")
    if prob == 0.0:
        st.warning(f"No possible improvement to {custom_target} with the selected cards and board.")