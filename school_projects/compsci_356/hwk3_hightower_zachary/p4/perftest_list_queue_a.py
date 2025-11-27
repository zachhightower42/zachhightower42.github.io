import time
from queue import Queue
import matplotlib.pyplot as plt

def main():
    m = 10  # Number of Queue objects
    nvals = list(range(1000, 10001, 10))  # Vary n from 1000 to 10,000

    times = []

    for n in nvals:
        queues = [Queue() for _ in range(m)]
        for _ in range(n):
            for x in queues:
                x.enqueue(1)

        start = time.time()
        for x in queues:
            x.dequeue()
        timer = time.time() - start
        avgtime = timer / m
        times.append(avgtime)

    plt.scatter(nvals, times)
    plt.xlabel('Number of Dequeues')
    plt.ylabel('Exec Time (secs)')
    plt.title('Avg Exec Time for Dequeue')
    plt.show()

if __name__ == "__main__":
    main()