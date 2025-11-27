#Chapter 5: Write a recursive function to compute the Fibonacci sequence. How
#does the performance of the recursive function compare to that of an iterative
#version?
#The answer MUST have the followig form:
#def fibo(n) -> list:
#"""Returns a list wherein the ith member is the ith number in the
#Fibonnaci sequence"""
import time
import matplotlib.pyplot as plt

#Recursive method
def recur_fibo(n) -> list:
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    else:
        recur_fib_list = recur_fibo(n - 1)
        recur_fib_list.append(recur_fib_list[-1] + recur_fib_list[-2])
        return recur_fib_list

#Iterative Method
def iter_fibo(n) -> list:
    iter_fib_list = [0, 1]
    if n <= 2:
        return iter_fib_list[:n]
    for i in range(2, n):
        iter_fib_list.append(iter_fib_list[-1] + iter_fib_list[-2])
    return iter_fib_list


#graphing for the comparison
if __name__ == '__main__':
    nterms = 100
    recur_execution_times = []
    iter_execution_times = []

    for i in range(1, nterms + 1):
        recur_time = time.time()
        recur_fibo(i)
        recur_time_final = time.time()
        recur_execution_times.append(recur_time_final - recur_time)

        iter_time = time.time()
        iter_fibo(i)
        iter_time_final = time.time()
        iter_execution_times.append(iter_time_final - iter_time)

    x = list(range(1, nterms + 1))

    plt.figure(figsize=(10, 5))
    plt.plot(x, recur_execution_times, label='Recursive')
    plt.plot(x, iter_execution_times, label='Iterative')

    plt.xlabel('Terms')
    plt.ylabel('Time')
    plt.legend()
    plt.title('Iter vs. Recur')

    plt.show()
