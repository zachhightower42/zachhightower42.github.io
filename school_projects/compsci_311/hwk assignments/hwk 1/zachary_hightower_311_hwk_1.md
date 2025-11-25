![[Pasted image 20240916113600.png]]
# P1-A
![[Pasted image 20240916113050.png]]
## A1-A
**Description**
This language generates strings of a and b where the number of instances of aba are divisible by 2. It accepts the empty string, and aba may not be present in the string at all.
**DFA definition**
$$(\langle q_0,q_1,q_2,q_3,q_4,q_5\rangle,\langle a,b \rangle,\delta,q_{0},\langle q_0,q_1,q_2\rangle)$$
For the state column please assume a q in front of the number.

| State | a   | b   |
| ----- | --- | --- |
| q0    | q1  | q0  |
| q1    | q1  | q2  |
| q2    | q3  | q0  |
| q3    | q4  | q3  |
| q4    | q4  | q5  |
| q5    | q0  | q3  |

**Jflap transition graph, filename is: answer1_a**
![[homework 1 DFA drawings 311_1_a.pdf]]
![[Pasted image 20240918183513.png]]
# P1-B
![[Pasted image 20240916113151.png]]
## A1-B
**Description** 
The language generates strings of a and b where the total number of a instances are divisible by 2 and the total number of b instances are divisible by 3. This includes the empty string. 
**DFA definition**
$$(\langle q_0,q_1,q_2,q_3,q_4,q_5\rangle,\langle a,b \rangle,\delta,q_{0},\langle q_0\rangle)$$


| State | a   | b   |
| ----- | --- | --- |
| q0    | q3  | q1  |
| q1    | q4  | q2  |
| q2    | q5  | q0  |
| q3    | q0  | q4  |
| q4    | q1  | q5  |
| q5    | q2  | q3  |

**Jflap transition graph, filename is: answer1_b**
![[homework 1 DFA drawings 311_1_b 1.pdf]]
![[Pasted image 20240917203646.png]]
# P1-C
![[Pasted image 20240916113225.png]]
## A1-C
**Description** 
This language generates strings of a followed by b, where the number of a instances and b instances added together, must be divisible by 2. This includes the empty string. 
**DFA definition**
$$(\langle q_0,q_1,q_2,q_3,q_4\rangle,\langle a,b \rangle,\delta,q_{0},\langle q_0,q_3\rangle)$$

| State | a   | b   |
| ----- | --- | --- |
| q0    | q1  | q2  |
| q1    | q0  | q3  |
| q2    | q4  | q3  |
| q3    | q4  | q2  |
| q4    | q4  | q4  |


**Jflap transition graph, filename is: answer1_c**
![[homework 1 DFA drawings 311_1_c.pdf]]
![[Pasted image 20240917215451.png]]
# P1-D

![[Pasted image 20240916113307.png]]
## A1-D
**Description** 
Language generates strings that must be bookended by a. Inside the two a instances at beginning and end, there must be a number of ba instances, greater than two. Does not accept an empty string. 
**DFA definition**
$$(\langle q_0,q_1,q_2,q_3,q_4,q_5,q_6,q_7\rangle,\langle a,b \rangle,\delta,q_{0},\langle q_7\rangle)$$

| State | a   | b   |
| ----- | --- | --- |
| q0    | q1  | q5  |
| q1    | q5  | q2  |
| q2    | q3  | q5  |
| q3    | q5  | q4  |
| q4    | q6  | q5  |
| q5    | q5  | q5  |
| q6    | q7  | q4  |
| q7    | q5  | q5  |

**Jflap transition graph, filename is: answer1_d**
![[homework 1 DFA drawings 311_1_d.pdf]]
![[Pasted image 20240917222721.png]]
![[Pasted image 20240916113636.png]]
# P2-A
![[Pasted image 20240916113415.png]]
## A2-A
**FA definition (state transition table & english description)**
The language accepts strings $a^{n}b^{m}$ where n $\ge$ 2 and m $\ge$ 3 **OR** where n $\ge$ 3 and m $\le$ 2

$$(\langle q_0,q_1,q_2,q_3,q_4,q_5,q_6,q_7,q_8,q_9\rangle,\langle a,b \rangle,\delta,q_{0},\langle q_3,q_7,q_8,q_6\rangle)$$

| State | a   | b   |
| ----- | --- | --- |
| q0    | q1  | q9  |
| q1    | q2  | q9  |
| q2    | q3  | q4  |
| q3    | q3  | q7  |
| q4    | q9  | q5  |
| q5    | q9  | q6  |
| q6    | q9  | q6  |
| q7    | q9  | q8  |
| q8    | q9  | q6  |
| q9    | q9  | q9  |




**Jflap transition graph of FA, Filename is: answer2_a **
![[homework 1 DFA drawings 311_2_a.pdf]]
![[Pasted image 20240918165843.png]]
# P2-B

![[Pasted image 20240916113459.png]]
## A2-B
**FA definition (state transition table & english description**
The language accepts strings from the set {$a,ab,abb,b,ba,baa$} Which is the union of $L_{6}~and~L_{7}$ 

$$(\langle q_0,q_1,q_2,q_3,q_4,q_5,q_6,q_7\rangle,\langle a,b \rangle,\delta,q_{0},\langle q_1,q_2,q_3,q_4,q_5,q_6\rangle)$$

| State | a   | b   |
| ----- | --- | --- |
| q0    | q1  | q2  |
| q1    | q7  | q3  |
| q2    | q7  | q5  |
| q3    | q7  | q4  |
| q4    | q7  | q7  |
| q5    | q6  | q7  |
| q6    | q7  | q7  |
| q7    | q7  | q7  |



**Jflap transition graph of FA, Filename is: answer2_b **
![[homework 1 DFA drawings 311_2_b.pdf]]
![[Pasted image 20240918170916.png]]
