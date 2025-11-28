import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import sys
import time

NUM_TRIALS = 1000000
ROLLS_PER_SESSION = 10
DICE_PER_ROLL = 10

def roll_regular_dice(num_dice):
    rolls = np.random.randint(1, 7, num_dice)
    hits = np.sum(rolls >= 5)
    return hits

def roll_exploding_dice(num_dice, sides=7, explode_on=(6,7)):
    hits = 0
    dice_to_roll = num_dice
    while dice_to_roll > 0:
        rolls = np.random.randint(1, sides+1, dice_to_roll)
        new_hits = np.sum(np.isin(rolls, explode_on))
        hits += new_hits
        dice_to_roll = np.sum(np.isin(rolls, explode_on))
    return hits

def roll_sexy_dice(num_dice):
    # 6-sided, hits on 5 or 6, explode only for this roll
    hits = 0
    dice_to_roll = num_dice
    while dice_to_roll > 0:
        rolls = np.random.randint(1, 7, dice_to_roll)
        new_hits = np.sum(rolls >= 5)
        hits += new_hits
        dice_to_roll = np.sum(rolls >= 5)
    return hits

def simulate_session_dice1():
    # Dice 1: 2 uses of reroll-and-add for important rolls
    thresholds = np.random.randint(1, 7, ROLLS_PER_SESSION)
    important_idxs = np.random.choice(ROLLS_PER_SESSION, np.random.randint(0,6), replace=False)
    rerolls_left = 2
    reroll_used = False
    hits = []
    for i in range(ROLLS_PER_SESSION):
        h = roll_regular_dice(DICE_PER_ROLL)
        if i in important_idxs and h < thresholds[i] and rerolls_left > 0:
            h += roll_regular_dice(DICE_PER_ROLL)
            rerolls_left -= 1
            reroll_used = True
        hits.append(h)
    return hits, thresholds, important_idxs, reroll_used

def simulate_session_dice2():
    # Dice 2: 2 uses of sexy dice for important rolls with threshold 3-6
    thresholds = np.random.randint(1, 7, ROLLS_PER_SESSION)
    important_idxs = np.random.choice(ROLLS_PER_SESSION, np.random.randint(0,6), replace=False)
    sexy_left = 2
    sexy_used = False
    hits = []
    for i in range(ROLLS_PER_SESSION):
        if i in important_idxs and thresholds[i] >= 3 and sexy_left > 0:
            h = roll_sexy_dice(DICE_PER_ROLL * 2)
            sexy_left -= 1
            sexy_used = True
        else:
            h = roll_regular_dice(DICE_PER_ROLL)
        hits.append(h)
    return hits, thresholds, important_idxs, sexy_used

def simulate_session_dice3():
    # Dice 3: always exploding 7-sided dice
    thresholds = np.random.randint(1, 7, ROLLS_PER_SESSION)
    important_idxs = np.random.choice(ROLLS_PER_SESSION, np.random.randint(0,6), replace=False)
    hits = [roll_exploding_dice(DICE_PER_ROLL) for _ in range(ROLLS_PER_SESSION)]
    return hits, thresholds, important_idxs

def session_stats(hits, thresholds, important_idxs):
    successes = np.array(hits) >= thresholds
    num_success = np.sum(successes)
    over_success = np.sum(np.array(hits) > thresholds)
    # Important roll stats
    important_success = np.sum(successes[important_idxs]) if len(important_idxs) > 0 else 0
    important_failure = len(important_idxs) - important_success if len(important_idxs) > 0 else 0
    # Average failure rate
    failed_idxs = np.where(np.array(hits) < thresholds)[0]
    if len(failed_idxs) > 0:
        failure_rates = np.array(thresholds)[failed_idxs] - np.array(hits)[failed_idxs]
        avg_failure_rate = np.mean(failure_rates)
    else:
        avg_failure_rate = 0
    return {
        'no_hits': np.sum(np.array(hits) == 0),
        'all_success': num_success == ROLLS_PER_SESSION,
        'three_quarters_success': num_success >= int(0.75 * ROLLS_PER_SESSION),
        'half_success': num_success >= int(0.5 * ROLLS_PER_SESSION),
        'quarter_success': num_success >= int(0.25 * ROLLS_PER_SESSION),
        'avg_failure_rate': avg_failure_rate,
        'over_success': over_success,
        'important_success': important_success,
        'important_failure': important_failure
    }

def run_trials():
    stats1 = []
    stats2 = []
    stats3 = []
    unused_reroll_count = 0
    unused_sexy_count = 0
    bar_length = 40
    print("Running trials:")
    start_time = time.time()
    for i in range(NUM_TRIALS):
        h1, t1, imp1, reroll_used = simulate_session_dice1()
        h2, t2, imp2, sexy_used = simulate_session_dice2()
        h3, t3, imp3 = simulate_session_dice3()
        stats1.append(session_stats(h1, t1, imp1))
        stats2.append(session_stats(h2, t2, imp2))
        stats3.append(session_stats(h3, t3, imp3))
        if not reroll_used:
            unused_reroll_count += 1
        if not sexy_used:
            unused_sexy_count += 1
        # Progress bar
        if (i+1) % (NUM_TRIALS // 100) == 0 or i == NUM_TRIALS-1:
            percent = (i+1) / NUM_TRIALS
            filled = int(bar_length * percent)
            bar = '=' * filled + '-' * (bar_length - filled)
            elapsed = time.time() - start_time
            est_total = elapsed / percent if percent > 0 else 0
            est_left = est_total - elapsed
            sys.stdout.write(f'\r[{bar}] {percent*100:5.1f}% | Elapsed: {elapsed:5.1f}s | ETA: {est_left:5.1f}s')
            sys.stdout.flush()
    print("\nDone.")
    return stats1, stats2, stats3, unused_reroll_count, unused_sexy_count

def aggregate_stats(stats, unused_special_count):
    df = pd.DataFrame(stats)
    # Calculate average number of important rolls per session
    avg_important_rolls = (df['important_success'] + df['important_failure']).mean()
    # Avoid division by zero
    imp_success_rate = df['important_success'].mean() / avg_important_rolls if avg_important_rolls > 0 else 0
    imp_failure_rate = df['important_failure'].mean() / avg_important_rolls if avg_important_rolls > 0 else 0
    # Normalize avg failure rate (max possible rate is 6)
    avg_failure_rate_norm = df['avg_failure_rate'].mean() / 6.0
    return {
        'No hits': df['no_hits'].mean() / ROLLS_PER_SESSION,
        'All rolls succeed': df['all_success'].mean(),
        '3/4 succeed': df['three_quarters_success'].mean(),
        '1/2 succeed': df['half_success'].mean(),
        '1/4 succeed': df['quarter_success'].mean(),
        'Avg failure rate': avg_failure_rate_norm,
        'Over-success rate': df['over_success'].mean() / ROLLS_PER_SESSION,
        'No special used': unused_special_count / NUM_TRIALS,
        'Important roll success': imp_success_rate,
        'Important roll failure': imp_failure_rate
    }

def main():
    stats1, stats2, stats3, unused_reroll_count, unused_sexy_count = run_trials()
    agg1 = aggregate_stats(stats1, unused_reroll_count)
    agg2 = aggregate_stats(stats2, unused_sexy_count)
    agg3 = aggregate_stats(stats3, 0)

    df = pd.DataFrame({
        'Dice 1': agg1,
        'Dice 2': agg2,
        'Dice 3': agg3
    })

    # All metrics are now normalized to [0, 1]
    all_metrics = [
        'No hits',
        'All rolls succeed',
        '3/4 succeed',
        '1/2 succeed',
        '1/4 succeed',
        'Avg failure rate',
        'Over-success rate',
        'No special used',
        'Important roll success',
        'Important roll failure'
    ]
    stat_colors_all = [
        'black',   # No hits
        'green',   # All rolls succeed
        'blue',    # 3/4 succeed
        'purple',  # 1/2 succeed
        'orange',  # 1/4 succeed
        'red',     # Avg failure rate
        'pink',    # Over-success rate
        'gray',    # No special used
        'lime',    # Important roll success
        'brown'    # Important roll failure
    ]
    df_all = df.loc[all_metrics]
    ax = df_all.plot(kind='bar', figsize=(15,8), color=stat_colors_all)
    plt.ylabel('Probability / Rate (0.0 to 1.0)')
    plt.title('Session Success Comparison: Dice 1 vs Dice 2 vs Dice 3 (All Criteria)')
    plt.xticks(rotation=0)
    plt.legend(title="Dice Variant")
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    main()
