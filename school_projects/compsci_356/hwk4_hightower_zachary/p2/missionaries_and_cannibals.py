#Problem 2
#Section 5.17 Problem 11. Write a program that solves the following problem:
#Three missionaries and three cannibals come to a river and find a boat that
#holds two people. Everyone must get across the river to continue on the journey.
#However, if the cannibals ever outnumber the missionaries on either bank, the
#missionaries will be eaten. Find a series of crossings that will get everyone safely
#to the other side of the river.
#Note: the solution must be recursive. The solution must output using the
#following form:
#Near to far with X cannibals and Y missionaries.
#Far to near with X cannibals and Y missionaries.
#...
#where 𝑋 is the number of cannibals in the boat, and 𝑌 is the number of mis-
#sionaries. There should be no extraneous output
def mis_and_can(mis, can, boat_cap):
    def valid(state):
        m_left, c_left, m_right, c_right = state
        return (m_left == 0 or m_left >= c_left) and (m_right == 0 or m_right >= c_right)

    def sol(state, path):
        if state == (0, 0, mis, can):
            print_sol(path)
            return True

        for m, c in moves:
            m_left, c_left, m_right, c_right = state
            if 0 <= m_left - m <= mis and 0 <= c_left - c <= can and 0 <= m_right + m <= mis and 0 <= c_right + c <= can:
                new_state = (m_left - m, c_left - c, m_right + m, c_right + c)
                if valid(new_state):
                    path.append((m, c))
                    if sol(new_state, path):
                        return True
                    path.pop()

    def print_sol(path):
        for m, c in path:
            if m > 0:
                print(f"Near to far with {c} cannibals and {m} missionaries.")
            else:
                print(f"Far to near with {c} cannibals and {m} missionaries.")

    moves = [(m, c) for m in range(boat_cap + 1) for c in range(boat_cap + 1) if 0 < m + c <= boat_cap]

    start = (mis, can, 0, 0)
    if valid(start):
        sol(start, [])
    else:
        print("No possible solution.")

if __name__ == '__main__':
    mis_and_can(3, 3, 2)
