# P-1
![[Pasted image 20241008194036.png]]
## P-1-1
![[Pasted image 20241008194054.png]]

### A-1-1
$\langle a^{n}b^{n}:n\ge1\rangle$ portion of the language describes any string of a symbols followed by b symbols where both are equal, and are more than or equal to one. 

$L_{1}$ is not deterministic. This is because the $\langle a^{n}b^{n}:n\ge1\rangle$ is context free. That means we can't construct a deterministic version of the push down automata for this. We can construct a non-deterministic PDA for it, though. 
![[Pasted image 20241010200145.png]]
This should accept all strings that have an equal length of a symbols and b symbols, and strings that contain only a single a symbol. Z replaces S because in Jflap Z is the default starting variable. 
## P-1-2
![[Pasted image 20241008194105.png]]
### A-1-2
The language here are strings of the form $w$ , followed by c, ending with a string that is the reverse of $w$ 
$w$ strings are made up of any amount of a and b symbols, or nothing. 

To make a full string in this language, we need it to have a memory of the substring $w$ 

A PDA can use a stack to push the symbols that make up substring $w$ Then, once it reads c, symbols can be popped from the stack to check that the incoming symbols do actually make up the reverse of substring $w$ 
![[Pasted image 20241011154829.png]]
Without the c character, we would need to make an NPDA. This is what I originally modeled. However, because of the c character acting as a trigger to start outputting $w^{R}$ we can actually write this as a DPDA. That means that the language *is* deterministic. 

This should accept all strings of the language described above, where the first string w is separated from its reverse by the single input c, and w is only made up of the a and b terminal symbols. Z replaces S because in Jflap Z is the default starting variable. 
# P-2
![[Pasted image 20241008194115.png]]
## A-2
use instantaneous descriptions to trace the string aabb for L1 and abcba for L2
### Instantaneous Description  for Input "aabb" using L1

| **Step** | **State** | **Remaining Input** | **Stack** | **Action**                    |
| -------- | --------- | ------------------- | --------- | ----------------------------- |
| 1        | $q_0​$    | aabb                | Z         | Start state                   |
| 2        | $q_0​$    | abb                 | AZ        | Read a, push A                |
| 3        | $q_0​$    | bb                  | AAZ       | Read a, push A                |
| 4        | $q_1$     | b                   | AZ        | Read b, pop A                 |
| 5        | $q_1$     | $\lambda$           | Z         | Read b, pop A                 |
| 6        | $q_2$     | $\lambda$           | Z         | Empty input, transition to q3 |
| 7        | $q_3$     | $\lambda$           | Z         | Final state, string accepted  |
### Instantaneous Description  for Input "abcba" using L2

| **Step** | **State** | **Remaining Input** | **Stack** | **Action**                                                  |
| -------- | --------- | ------------------- | --------- | ----------------------------------------------------------- |
| 1        | $q_0​$    | abcba               | Z         | Start state                                                 |
| 2        | $q_0​$    | bcba                | aZ        | Read a, push a                                              |
| 3        | $q_0​$    | cba                 | baZ       | Read b, push b                                              |
| 4        | $q_1$     | ba                  | baZ       | Read c, go to $q_1$ , no stack change                       |
| 5        | $q_1$     | a                   | aZ        | Read b, pop b                                               |
| 6        | $q_1$     | $\lambda$           | Z         | Read a, pop a                                               |
| 7        | $q_2$     | $\lambda$           | Z         | Empty input, transition to q2, final state, string accepted |

# P-3
![[Pasted image 20241008194127.png]]
## A-3
First we want to convert this to GNF

We don't have any left recursion, so we can skip that step.

For the first set of production rules
S -> aABB : Already where want it
S -> aAA : Already where we want it
A -> aBB : Already where we want it
A -> a : Already where we want it
B -> bBB : Already where we want it
B -> A : Needs to be changed to fit GNF

B -> A
To fix this we can replace the A variable here with the productions of A
B -> aBB | a

Now we can write the GNF grammar as
S → aABB | aAA
A → aBB | a
B → bBB | aBB | a

![[Pasted image 20241010202150.png]]
This is the constructed NPDA. Z replaces S because in Jflap Z is the default starting variable. 