import re


def html_balance(file):
    textcheck = ''''''
    f = open(file)
    line = f.readline()  # include newline
    while line:
        line = line.rstrip()  # strip trailing spaces and newline
        textcheck += line
        line = f.readline()
    f.close()
    L = re.split(r'(<[^>]*>)', textcheck)
    tags = [tag for tag in L if tag.startswith('<')]

    s = []
    for tag in tags:
        if '/' not in tag:
            if tag.startswith('<!'):
                continue
            s.append(tag)
        elif s and s[-1] == f"<{tag[2:]}":
            s.pop()

    return not s
