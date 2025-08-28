import re
import random
import csv

#Character dialogue needs more work
#header system messages good
#System messages good
#character actions need better detection
#ooc needs better detection
# 70 percent detection for first run of AI categorizer

def categorize_message(message):
    # System message: URLs, headers, rolls, or lines with mostly numbers/symbols
    if re.match(r'https?://', message) or re.match(r'^\d+/\d+', message) or "Chat Log for" in message:
        return "system message"
    if re.search(r'rolling \d+d\d+', message, re.IGNORECASE):
        return "system message"
    if re.match(r'^\s*\(\s*\d+\s*\)', message) or re.match(r'^\s*=\s*\d+', message):
        return "system message"
    # Detect lines with only zeros separated by whitespace
    if re.match(r'^(0\s+)+0$', message):
        return "system message"
    # Detect the specific system message string
    if message.strip() == "1-4 legs / 5-9 lower guts / 10 gizzards / 11-14 arms / 15-19 upper guts / 20 NOGGIN":
        return "system message"

    # NOTE: Treat ??, ???, ??:, ???: as valid character names for dialogue and actions
    # Character dialogue: Name : "dialogue" (allow extra spaces, including ?? and ??? as names)
    if re.match(r'^([A-Za-z0-9 "\'-]+|(\?{2,3})): *"(.|\s)*', message):
        return "character dialogue"

    # Out-of-character: parentheses or meta discussion
    if re.match(r'.*:\s*\(.*\)', message) or re.match(r'.*\(.*\)', message):
        return "out-of-character"
    if re.search(r'(reset|import|why can\'t|before a game|good roll|meta)', message, re.IGNORECASE):
        return "out-of-character"

    # Character action: starts with Name and describes action (no quotes), including ?? and ??? as names
    if re.match(r'^([A-Za-z0-9 "\'-]+|(\?{2,3})): [A-Za-z].*[^"]$', message):
        return "character action"
    if re.match(r'^([A-Za-z0-9 "\'-]+|(\?{2,3})) [a-z].*', message) and not '"' in message:
        return "character action"

    # Game master: starts with Wonderful Cowboy Land:
    if message.startswith("Wonderful Cowboy Land:"):
        return "game master"

    return "uncategorized"

def process_chat_log_for_training(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        lines = [line.strip() for line in f if line.strip()]

    messages = []
    buffer = []
    buffer_category = None

    def is_new_message_start(line):
        # Character name followed by colon (dialogue or action), including ?? and ??? as names
        if re.match(r'^([A-Za-z0-9 "\'-]+|(\?{2,3})): *', line):
            return True
        # System header (URL or header)
        if re.match(r'https?://', line) or re.match(r'^\d+/\d+', line) or "Chat Log for" in line:
            return True
        return False

    idx = 0
    while idx < len(lines):
        line = lines[idx]
        category = categorize_message(line)

        # CHARACTER DIALOGUE GROUPING (robust multi-line, extra spaces, ??/??? as names)
        if re.match(r'^([A-Za-z0-9 "\'-]+|(\?{2,3})): *"(.|\s)*', line):
            if buffer:
                messages.append({"message": "\n".join(buffer), "category": buffer_category})
            buffer = [line]
            buffer_category = "character dialogue"
            idx += 1
            while idx < len(lines):
                next_line = lines[idx]
                # If next line starts with a quote, it's a continuation of the previous character's speech
                if next_line.lstrip().startswith('"'):
                    buffer.append(next_line)
                    idx += 1
                # If next line is indented or does not start with a character name and colon, treat as continuation
                elif not re.match(r'^([A-Za-z0-9 "\'-]+|(\?{2,3})): *"(.|\s)*', next_line) and not re.match(r'^([A-Za-z0-9 "\'-]+|(\?{2,3})): *', next_line):
                    buffer.append(next_line)
                    idx += 1
                # If next line starts with a new character name and colon and quote, start a new dialogue block
                elif re.match(r'^([A-Za-z0-9 "\'-]+|(\?{2,3})): *"(.|\s)*', next_line):
                    break
                else:
                    break
            messages.append({"message": "\n".join(buffer), "category": buffer_category})
            buffer = []
            buffer_category = None
            continue

        # CHARACTER ACTION GROUPING (including ??/??? as names)
        if category == "character action":
            if buffer:
                messages.append({"message": "\n".join(buffer), "category": buffer_category})
            buffer = [line]
            buffer_category = "character action"
            idx += 1
            while idx < len(lines):
                next_line = lines[idx]
                next_category = categorize_message(next_line)
                if next_category == "character action":
                    buffer.append(next_line)
                    idx += 1
                else:
                    break
            messages.append({"message": "\n".join(buffer), "category": buffer_category})
            buffer = []
            buffer_category = None
            continue

        # ROLL SYSTEM MESSAGE GROUPING
        if re.search(r'rolling \d+d\d+', line, re.IGNORECASE):
            if buffer:
                messages.append({"message": "\n".join(buffer), "category": buffer_category})
            buffer = [line]
            buffer_category = "system message"
            idx += 1
            while idx < len(lines):
                next_line = lines[idx]
                buffer.append(next_line)
                if '=' in next_line:
                    idx += 1
                    break
                idx += 1
            messages.append({"message": "\n".join(buffer), "category": buffer_category})
            buffer = []
            buffer_category = None
            continue

        # SYSTEM MESSAGE GROUPING (non-roll)
        if category == "system message":
            if buffer_category != "system message":
                if buffer:
                    messages.append({"message": "\n".join(buffer), "category": buffer_category})
                buffer = []
                buffer_category = "system message"
            buffer.append(line)
            idx += 1
            while idx < len(lines):
                next_line = lines[idx]
                next_category = categorize_message(next_line)
                if next_category != "system message" and is_new_message_start(next_line):
                    break
                if next_category != "system message":
                    break
                buffer.append(next_line)
                idx += 1
            messages.append({"message": "\n".join(buffer), "category": buffer_category})
            buffer = []
            buffer_category = None
            continue

        # FLUSH BUFFER IF NEEDED
        if buffer:
            messages.append({"message": "\n".join(buffer), "category": buffer_category})
            buffer = []
            buffer_category = None

        # SINGLE-LINE MESSAGE
        messages.append({"message": line, "category": category})
        idx += 1

    if buffer:
        messages.append({"message": "\n".join(buffer), "category": buffer_category})

    # Shuffle and split into training/test sets (80/20 split)
    random.shuffle(messages)
    split_idx = int(0.8 * len(messages))
    training_data = messages[:split_idx]
    test_data = messages[split_idx:]
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