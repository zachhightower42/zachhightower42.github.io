import random
import time
from queue import Queue
from multiprocessing import Pool
import matplotlib.pyplot as plt


def perftest(queue, n):
    start_time = time.time()
    for _ in range(n):
        queue.enqueue(random.randint(1, 1000))  # Replace with your desired range
    return time.time() - start_time


def main():
    m = 5  # Number of Queue objects
    n_range = list(range(100, 10001, 10))  # Vary n from 100 to 10,000 by increments of 10
    avg_times = []

    # Create m empty Queue objects and put them in a list named queues
    queues = [Queue() for _ in range(m)]

    for n in n_range:
        avg_time = perftest(queue,n) / m
        avg_times.append(avg_time)

    # Plot the results
    plt.plot(n_range, avg_times)
    plt.title('Average Execution Time for Enqueue()')
    plt.xlabel('n (Number of Random Integers Enqueued)')
    plt.ylabel('Average Time (seconds)')
    plt.grid(True)
    plt.show()


if __name__ == "__main__":
    main()
