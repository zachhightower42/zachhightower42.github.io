import re

OOC_USERS = [
    "Doc (GM)", "Scott P.", "Yuppie b.", "Poage", "Nevermore", "UrbanCritter",
    "Varulv", "Moondew", "dimVitrarius"
]
NARRATORS = [
    "Wonderful Cowboy Land"
]

def process_chat_log(input_file, output_file):
    ic_pattern = re.compile(r'^"(.+?)"\s*([A-Za-z \'\.\(\)\"-]+):$')
    narrator_pattern = re.compile(r'^(.*?)(%s):$' % '|'.join(re.escape(n) for n in NARRATORS))
    speaker_pattern = re.compile(r'^(.*?):$')
    character_action_pattern = re.compile(r'^([A-Za-z \'\.\(\)\"-]+)\s.+')
    # Patterns for filtering
    date_header_pattern = re.compile(r'^\d{1,2}/\d{1,2}/\d{4} Chat Log')
    url_pattern = re.compile(r'^https?://')
    dice_pattern = re.compile(r'^\(.*\)$|^rolling\b|^=\s*\d+$')
    hide_whispers_pattern = re.compile(r'^Hide Whispers$')
    # Pattern: lines ending with OOC user name and colon
    ooc_line_pattern = re.compile(r'^(.*?)(%s):$' % '|'.join(re.escape(n) for n in OOC_USERS))

    with open(input_file, 'r', encoding='utf-8') as infile, \
         open(output_file, 'w', encoding='utf-8') as outfile:

        for line in infile:
            line = line.strip()
            # Remove unwanted lines
            if (date_header_pattern.match(line) or
                url_pattern.match(line) or
                dice_pattern.match(line) or
                hide_whispers_pattern.match(line)):
                continue

            # Remove lines ending with OOC user name and colon
            if ooc_line_pattern.match(line):
                continue

            # In-character quoted line
            ic_match = ic_pattern.match(line)
            if ic_match:
                quote = ic_match.group(1)
                char_name = ic_match.group(2)
                if char_name not in OOC_USERS and char_name not in NARRATORS:
                    first_name = char_name.split()[0].replace('"', '').replace("'", "")
                    outfile.write(f'"{quote}"\nSaid {first_name}\n\n')
                continue

            # Narrator line: remove narrator name, keep message
            narrator_match = narrator_pattern.match(line)
            if narrator_match:
                message = narrator_match.group(1).strip()
                if message:
                    outfile.write(f"{message}\n\n")
                continue

            # OOC/user lines: skip
            speaker_match = speaker_pattern.match(line)
            if speaker_match:
                speaker = speaker_match.group(1)
                if speaker in OOC_USERS:
                    continue  # skip OOC lines

            # Character action line: starts with character name, not OOC/Narrator
            action_match = character_action_pattern.match(line)
            if action_match:
                char_name = action_match.group(1)
                if char_name not in OOC_USERS and char_name not in NARRATORS:
                    outfile.write(f"{line}\n\n")
                continue

            # Otherwise, skip line

# Usage
process_chat_log('zacharyHightowerCollectedWorks/work/roleplaying_games/wcat_chat_log_1.txt', 'zacharyHightowerCollectedWorks/work/roleplaying_games/wcat_chat_log_1_in_character.txt')