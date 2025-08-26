import re
import random
import csv
# Fix the training data so that it groups messages that one user sends in a row. Idea for this is to get the first message
# and then wait until I see a sign of a system message, another user message, or a character action, to end the grouping
# Hopefully this will cut way down on the amount of different labels I need to do, cause holy shit this is a lot
OOC_USERS = [
    "Doc (GM)", "Scott P.", "Yuppie b.", "Poage", "Nevermore", "UrbanCritter","Scotty"
    "Varulv", "Moondew", "dimVitrarius"
]
NARRATORS = [
    "Wonderful Cowboy Land"
]

def is_system_line(line):
    return (
        re.match(r'^\(\s*\+\s*\+\s*\+\s*\+\s*\+\s*\+\s*\+\s*\)$', line) or
        re.match(r'^\(\s*\+\s*\+\s*\)$', line) or
        re.match(r'^\(\s*\+\s*\)$', line) or
        re.match(r'^\(\s*\)$', line) or
        re.match(r'^\d+$', line) or
        re.match(r'^rolling \d+d\d+!$', line) or
        re.match(r'^rolling \d+d\d+kh\d+!!-?\d*$', line) or
        re.match(r'^\(To GM\) rolling \d+d\d+kh\d+!!$', line) or
        re.match(r'^\(To GM\) rolling \d+d\d+.*$', line) or
        re.match(r'^= \d+$', line) or
        re.match(r'^\d{1,2}/\d{1,2}/\d{4} Chat Log for', line) or
        re.match(r'^https?://', line) or
        re.match(r'^\d+/\d+$', line) or
        re.match(r'^Doc \(GM\):0+$', line)
    )

def categorize_message(line):
    # System message
    if is_system_line(line):
        return "system message"
    # Out-of-character: OOC user speaking
    for user in OOC_USERS:
        if line.startswith(user + ":"):
            return "out-of-character"
    # Game master: narrator or GM describing events
    for narrator in NARRATORS:
        if line.startswith(narrator + ":") or narrator in line:
            return "game master"
    # Character dialogue: any quoted message not from OOC user or narrator
    if line.startswith('"'):
        return "character dialogue"
    # Character dialogue: quoted speech with character name
    if re.match(r'^".+?"[A-Za-z \'\.\(\)\"-]+:', line):
        return "character dialogue"
    # Character action: character name followed by action
    if re.match(r'^[A-Za-z \'\.\(\)\"-]+\s.+', line):
        return "character action"
    # In-character: fallback
    return "in-character"

def process_chat_log_for_training(input_file, train_ratio=0.8):
    data = []
    with open(input_file, 'r', encoding='utf-8') as infile:
        lines = [line.rstrip() for line in infile if line.strip()]
    
    i = 0
    while i < len(lines):
        line = lines[i]
        # Group consecutive system messages
        if is_system_line(line):
            group = [line]
            i += 1
            while i < len(lines) and is_system_line(lines[i]):
                group.append(lines[i])
                i += 1
            message = '\n'.join(group)
            category = "system message"
            data.append({"message": message, "category": category})
        else:
            category = categorize_message(line)
            data.append({"message": line, "category": category})
            i += 1

    random.shuffle(data)
    split_idx = int(len(data) * train_ratio)
    training_data = data[:split_idx]
    test_data = data[split_idx:]

    return training_data, test_data

def export_to_csv(data, filename):
    with open(filename, 'w', encoding='utf-8', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=['message', 'category'])
        writer.writeheader()
        for item in data:
            writer.writerow(item)

if __name__ == "__main__":
    training_data, test_data = process_chat_log_for_training(
        'zacharyHightowerCollectedWorks/work/roleplaying_games/wcat_chat_log_1.txt'
    )

    export_to_csv(training_data, 'training_data.csv')
    export_to_csv(test_data, 'test_data.csv')