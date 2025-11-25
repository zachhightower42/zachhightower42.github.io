# CSCI423/501 Writing Assignment 2

## Problem 1
Using the following program, identify the values of `pid` at lines A, B, C, and D.  
(Assume that the actual pids of the parent and child are 2600 and 2603, respectively. `getpid()` function returns the pid of the current process.)

```c
#include <sys/types.h>
#include <stdio.h>
#include <unistd.h>

int main()
{
    pid_t pid, pid1;

    /* fork a child process */
    pid = fork();

    if (pid < 0) { /* error occurred */
        fprintf(stderr, "Fork Failed");
        return 1;
    }
    else if (pid == 0) { /* child process */
        pid1 = getpid();
        printf("child: pid = %d", pid); /* A */
        printf("child: pid1 = %d", pid1); /* B */
    }
    else { /* parent process */
        pid1 = getpid();
        printf("parent: pid = %d", pid); /* C */
        printf("parent: pid1 = %d", pid1); /* D */
        wait(NULL);
    }
    return 0;
}
```

**Ans:**
**A.** 0
**B.** 2603
**C.** 2603
**D.** 2600
## Problem 2

Using the program shown below, explain what the output will be at lines X and Y, and whether such outputs are because the parent and child processes share their data or each of them has their own copies of data.
```c

#include <sys/types.h>
#include <stdio.h>
#include <unistd.h>
#define SIZE 5

int nums[SIZE] = {0, 1, 2, 3, 4};

int main()
{
    int i;
    pid_t pid;

    pid = fork();

    if (pid == 0) {
        for (i = 0; i < SIZE; i++) {
            nums[i] *= -i;
            printf("CHILD: %d ", nums[i]); /* LINE X */
        }
    }
    else if (pid > 0) {
        wait(NULL);
        for (i = 0; i < SIZE; i++)
            printf("PARENT: %d ", nums[i]); /* LINE Y */
    }
    return 0;
}

```
**Ans:**
Line X output: Child: 0 -1 -4 -9 -16
Line Y output: Parent: 0 1 2 3 4

The outputs differ because after fork() is called, the child and parent processes have their own separate copies of the data. When the child process modifies its `nums` array by multiplying each element by the negative index `(nums[i] *= -i)`, these changes only affect the child's copy of the data. The parent process does not change its array.

This behavior demonstrates that fork() creates a complete copy of the parent's data for the child process. The wait(NULL) in the parent process ensures that it prints its values only after the child process finishes, but the parent's data remains unchanged regardless of what the child process does to its own copy.


## Problem 3

Multicore systems present certain challenges for multithreaded programming. Briefly describe these challenges.

**Ans:**

**Identifying tasks –** Divide application into separate tasks, which can be independent of each other and run in parallel on individual cores
**Balance –** Tasks identified should be on equal working load
**Data splitting –** Data accessed by different tasks may need to be split for different cores
**Data dependency –** Identify if one task execution depends on another, so that the two tasks can be synchronized to ensure sequential execution
**Testing and debugging –** When a program is running in parallel, it may have a number of different running paths and it is hard to debug on every path

## Problem 4

Using Amdahl’s Law, calculate the speedup gain of an application that has a 40 percent parallel component for two processing cores.

**Ans:**
$$40 \% ~Paralell,1-40=60\%~Serial=S$$
$$CoreNum=N=2$$
$$\frac{1}{S+\frac{1-S}{N}}=\frac{1}{0.6+\frac{1-0.6}{2}}=1.25~Speedup$$
