# CSCI 423 Writing Assignment 3

## Problem 1

Consider the following set of processes, with the length of the CPU burst time given in milliseconds:

| Process | Burst Time | Priority |
|---------|------------|----------|
| P1      | 2          | 2        |
| P2      | 1          | 1        |
| P3      | 8          | 4        |
| P4      | 4          | 2        |
| P5      | 5          | 3        |

The processes are assumed to have arrived in the order **P1, P2, P3, P4, P5**, all at time 0.

### a. Draw four Gantt charts that illustrate the execution of these processes using the following scheduling algorithms:

![[writing assignment 4 drawing.png]]
### b. What is the turnaround time of **each process** for each of the scheduling algorithms in part a?
Turnaround Time is completion time minus arrival time
1. **First-Come, First-Served (FCFS)**
$$(P1=2),(P2=3),(P3=11),(P4=15),(P5=20)$$
2. **Shortest Job First (SJF)**
$$(P1=3),(P2=1),(P3=20),(P4=7),(P5=12)$$
3. **Nonpreemptive Priority**  
   $$(P1=15),(P2=20),(P3=8),(P4=19),(P5=13)$$
4. **Round Robin (RR)**  
   $$(P1=2),(P2=3),(P3=20),(P4=13),(P5=18)$$

### c. What is the waiting time of **each process** for each of these scheduling algorithms?
Waiting time is turnaround time minus burst time
1. **First-Come, First-Served (FCFS)**
$$(P1=0),(P2=2),(P3=3),(P4=11),(P5=15)$$
2. **Shortest Job First (SJF)**
$$(P1=1),(P2=0),(P3=12),(P4=3),(P5=7)$$
3. **Nonpreemptive Priority**  
   $$(P1=13),(P2=19),(P3=0),(P4=15),(P5=8)$$
4. **Round Robin (RR)**  
$$(P1=0),(P2=2),(P3=12),(P4=9),(P5=13)$$
### d. Which of the algorithms results in the **minimum average waiting time** (over all processes)?
1. **First-Come, First-Served (FCFS)**
$$\frac{0+2+3+11+15}{5}=6.2$$
2. **Shortest Job First (SJF)**
$$\frac{1+0+12+3+7}{5}=4.6$$
3. **Nonpreemptive Priority**  
   $$\frac{13+19+0+15+8}{5}=11$$
4. **Round Robin (RR)**  
$$\frac{2+12+9+13}{5}=7.2$$

**Ans:** Shortest job first results in a minimized average waiting time.

---

## Problem 2

### Explain how starvation can occur in priority scheduling and how aging can be used to prevent it.

**Ans:**
Starvation occurs when low-priority processes are perpetually delayed in favor of higher-priority processes. If new high-priority processes continue to arrive, low-priority processes may never get executed.

Aging mechanism can help address starvation. Aging increases the priority of a process as time progresses. So a low priority process can eventually have a high enough priority to be scheduled on the CPU.
