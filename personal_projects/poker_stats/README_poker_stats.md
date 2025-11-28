# Poker Stats — Hand Improvement & Strength Explorer

This document describes the logic and usage of the Streamlit app implemented in [poker_stats/poker_stats_app.py](poker_stats/poker_stats_app.py).

## Overview

The app evaluates Texas Hold'em hand improvement probabilities and compares your hand vs. random opponent hands. It provides:
- Precomputed improvement probabilities per hand category (`IMPROVEMENT_PROBS`).
- Functions to classify a hand type (`get_hand_type`) and convert card codes for the `treys` library (`to_treys`).
- Exact enumeration and Monte Carlo simulation functions for improvement probability (`enumerate_improvement`, `simulate_improvement`).
- A brute-force opponent enumeration to compute how many 2-card opponent hands beat your hand (`count_better_hands`).
- Streamlit UI for manual/dropdown hand entry, board entry, simulation settings, and recommended play hints.

File: [poker_stats/poker_stats_app.py](poker_stats/poker_stats_app.py)

## Requirements

- Python 3.8+
- streamlit
- pandas
- treys

# Install dependencies (example):

pip install streamlit pandas treys

# How to run
From the poker_stats directory:

Key symbols & helpers
poker_stats_app.IMPROVEMENT_PROBS
Precomputed probability tuples for hand categories.

poker_stats_app.get_improvement_df
Returns a pandas DataFrame for a given hand type from IMPROVEMENT_PROBS.

# Card constants:

poker_stats_app.CARD_VALUES
poker_stats_app.SUITS
poker_stats_app.ALL_CARDS
poker_stats_app.ALL_CARD_LABELS
poker_stats_app.CARD_LABEL_TO_CODE

# Hand classification and conversion:

poker_stats_app.get_hand_type — classifies preflop hand into categories used by IMPROVEMENT_PROBS.
poker_stats_app.card_label — pretty label (e.g., A♠).
poker_stats_app.to_treys — converts As/Td style codes to the format expected by treys.
Validation utilities:

poker_stats_app.validate_card_input
poker_stats_app.validate_board_cards
Probability & hand-evaluation routines:

poker_stats_app.count_better_hands — enumerates all 2-card opponent hands using treys.Deck and counts how many beat your hand on the current board.
poker_stats_app.simulate_improvement — Monte Carlo simulation to estimate probability of reaching a target hand class by river.
poker_stats_app.enumerate_improvement — enumerates all possible flops (preflop only) to compute exact flop improvement probability.

# UI highlights
Hand entry modes: Dropdown (select boxes of ALL_CARD_LABELS) or Manual (text input like As Kd).

Board entry: Disabled on preflop. Supports manual text entry or multiselect of labels.
Sidebar: number of opponents to simulate vs.

Buttons:
"Show Probabilities" — shows table from get_improvement_df.
"Simulate Selected Improvements" — runs simulations/enumeration based on selected target hand classes.
"Generate Random Hand/Board" — populates manual fields with random hand and board.
Notes & caveats
The app uses treys Evaluator ranking: lower evaluator class number means stronger hand; simulate_improvement and enumerate_improvement compare via Evaluator.get_rank_class.
count_better_hands relies on converting deck internal integers to string codes compatible with to_treys + Card helpers; ensure treys API compatibility.
Precomputed IMPROVEMENT_PROBS are illustrative; expand or replace with empirically computed values if desired.
Extending
Add more hand categories to IMPROVEMENT_PROBS and update get_hand_type mapping if needed.
Add caching or reduced enumeration strategies for performance when simulating many opponents or heavy Monte Carlo runs.
Add unit tests for get_hand_type, validators, and simulation functions (see tests directory pattern in other projects).