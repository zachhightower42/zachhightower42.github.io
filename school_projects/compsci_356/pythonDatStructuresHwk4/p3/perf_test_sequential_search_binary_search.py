# Set up a random experiment to test the difference between a sequential search
# and a binary search on a list of integers.
# Vary the size of the list of integers 𝑛 from 1 to 1000. Repeat the experiment
# 𝑚 times for each 𝑛 and take the average run time per call, where 𝑚 = 100.
# Output the average run times in a plot where the x-axis is 𝑛 and the y-axis is
# the average run time per search.
import time
import random
import matplotlib.pyplot as plt

#binary search
def bin_search(lis, x):
    low = 0
    high = len(lis) - 1

    while low <= high:
        mid = (high + low) // 2
        if lis[mid] < x:
            low = mid + 1
        elif lis[mid] > x:
            high = mid - 1
        else:
            return mid
    return -1

#sequential search
def seq_search(lis, item):
    pos = 0
    found = False
    while pos < len(lis) and not found:
        if lis[pos] == item:
            found = True
        else:
            pos = pos + 1
    return found

#runner for main
def run(n, m):
    final_seq_time = 0
    final_bin_time = 0

    for _ in range(m):
        lis = [random.randint(1, 10000) for _ in range(n)]
        target = random.randint(1, 10000)

        start_seq = time.time()
        seq_search(lis, target)
        seq_time = time.time() - start_seq
        final_seq_time += seq_time

        lis.sort()
        start_bin = time.time()
        bin_search(lis, target)
        bin_time = time.time() - start_bin
        final_bin_time += bin_time

    avg_time_seq = final_seq_time / m
    avg_time_bin = final_bin_time / m

    return avg_time_seq, avg_time_bin

#runs and then slots our times into a graph
def main():
    nvals = list(range(1, 1001))
    avgs_seq = []
    avgs_bin = []

    for n in nvals:
        avg_time_seq, avg_time_bin = run(n, 100)
        avgs_seq.append(avg_time_seq)
        avgs_bin.append(avg_time_bin)

    plt.figure(figsize=(10, 5))
    plt.plot(nvals, avgs_seq, label="Sequential")
    plt.plot(nvals, avgs_bin, label="Binary")
    plt.xlabel('List Size')
    plt.ylabel('Avg Time')
    plt.legend()
    plt.grid()
    plt.show()


if __name__ == '__main__':
    main()
