# P1
![[Pasted image 20240911110605.png]]
## A1
**1)**
![[Pasted image 20240911111312.png]]
**2)**
![[Pasted image 20240911111205.png]]
**3)** 
![[Pasted image 20240912211508.png]]
# P2
![[Pasted image 20240911110639.png]]

## A2
![[Pasted image 20240912213530.png]]
# P3
![[Pasted image 20240911110706.png]]

## A3

| State | 0        | 1    | $\lambda$ |
| ----- | -------- | ---- | --------- |
| q0    | null     | q1   | q2        |
| q1    | q0 or q2 | q2   | null      |
| q2    | null     | null | null      |

**Blank 1:** Ends at $q_{0}$ accepted by the final state at $q_{0}$ or if the $\lambda$ transition is triggered, ends at $q_{2}$ and remains in the trap state there. 
So the set of possible end states is
$$\langle q_{0}, q_{2} \rangle$$
**Blank 2:** Ends either at $q_{2}$ or at $q_{0}$ as there are transitions for 0 to nodes $q_{0}$ and node $q_{2}$ from node $q_{1}$
It may also go to $q_{2}$ after it transition to $q_{0}$ by traveling through the $\lambda$ transition to $q_{2}$ 
So the set of possible states is
$$\langle q_{0}, q_{2} \rangle$$
Then we process the second 0, there are no transition states from either of our current possible states for 0, so we record it as null or $\varnothing$   
So the only possible end state is
$$\varnothing$$
# P4
![[Pasted image 20240911110744.png]]
## A4

| state | a     | $\lambda$ |
| ----- | ----- | --------- |
| $q_0$ | $q_1$ | null      |
| $q_1$ | null  | $q_2$     |
| $q_2$ | null  | $q_0$     |


**1)**
$$L=\langle a^{n}:n \ge 1 \rangle$$
This essentially means that it will accept any number of a, except for the empty string.
**2)**
$$\bar{L}=\langle a^{n}:n < 1 \rangle$$
This means that it will accept only the empty string, which is the only thing our other language did not accept from the terminal symbols provided in this NFA. 
# P5
![[Pasted image 20240911110809.png]]
## A5
![[Pasted image 20240913154326.png]]
![[Pasted image 20240913160629.png]]
I don't have much explanation for these as I realized that I'd made a mistake in reading things like (q0,a) = {q0,q1} as saying that when in q0 and given an a, it would go from q0 to q1, when it actually means it can *stay* in q0 *or* go to q1. 

Realized this while talking about it with other classmates in the tutoring room 234, and then I had about two hours after my shift finished as a tutor there to actually wrap my head around how I had messed it up and then fix it. 
