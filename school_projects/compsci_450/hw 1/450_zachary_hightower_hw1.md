**Course**: CSCI 450, Section 1
**Student Name**: Zachary Hightower
**Student ID**: 010944120
**Homework 1 Due Date**: 9/6/2024
In keeping with the Honor Code of UM, I have neither given nor received any inappropriate assistance from anyone other than the TA or the instructor.
# P-1
![[Pasted image 20240902195207 1.png]]
## A-1
 We can partition those that have $2 ~mod ~3$ equivalence, meaning that when mod 3 is applied all the following numbers equal 2, into the following set.
   $$\langle 2,5,23 \rangle$$
Now we can look at 4, which when mod 3 is applied gives 1. Then we look through our set for any other numbers that have that behavior. We can partition them into the following set. 
$$\langle 4,25,31,37 \rangle$$
The next number that is not present in any of the previous sets is 6. We know that when mod 3 is applied to six, we get 0. We can do the math for the rest of it, or simply put any numbers not present in the previous two sets into this set, since they have to fit into the following set. 
$$\langle 6,9,24 \rangle$$

We now have all the equivalence sets that are possible for the given equivalence. 

# P-2
![[Pasted image 20240902200446 1.png]]
## A-2
![[Pasted image 20240905175939.png]]
That should be an accurate drawing of the graph with the vertices and edges we want. Now we can look at it and determine all the cycles that start at V1 and end at V1.
$$\langle (V_{1},V_{1}) \rangle$$
$$\langle (V_{1},V_{2}),(V_{2},V_{1}) \rangle$$
$$\langle (V_{1},V_{2}),(V_{2},V_{3}),(V_{3},V_{1}) \rangle$$
I've represented the cycles here as being edge sets. Please let me know if it would be better to show this differently in the future, thanks!

# P-3
![[Pasted image 20240902210338 1.png]]
## A-3
We can see that the scope of our problem is every positive number equal or greater than two. We can then say that our base case is when n = 2

$$\frac{1}{{n^{2}}} \le \frac{1}{{n-1}} - \frac{1}{n} (n \le 2)$$
$$\frac{1}{{2^{2}}} \le \frac{1}{{2-1}} - \frac{1}{2}$$
$$\frac{1}{4} \le \frac{1}{2}$$
So the base case is true.
Now we need to prove that it is true for some number $k$ later on in the series. 
$$\frac{1}{{k^{2}}} \le \frac{1}{{k-1}} - \frac{1}{k} (k \le 2)$$
We can assume that this is true. 
Now, we take the induction step to show that it will continue to be true for any $k+1$ further on in the series. 
$$\frac{1}{{k+1^{2}}} \le \frac{1}{{k}} - \frac{1}{k+1}$$
We can simplify the right hand side
$$\frac{1}{{k}} - \frac{1}{k+1}=\frac{{(k+1)-k}}{{k(k+1)}}=\frac{1}{{k(k+1)}}$$
Now we can write it as follows

$$\frac{1}{{k+1^{2}}} \le \frac{1}{{k(k+1)}}$$
We want to compare each side. We can do this in a clearer manner by cross multiplying both sides to turn it into a single line inequality, instead of one with fractions. 
 $$k(k+1) \le (k+1)^{2}$$
 Now we can expand both sides of the inequality
 $$k^{2}+k \le k^{2}+2k+1$$
 We can subtract the common elements from both sides. 
 $$0 \le k+1$$
 We can see that the right side will always remain larger than the left side.
 So we can say that the original statement is true.

# P-4
![[Pasted image 20240903205502 1.png]]
## A-4
$$L=\langle ww^{R}:w \in \langle a,b \rangle^{+}\rangle$$
The mathematical language above says that the language must consist of a nonempty string w, followed immediately by its reverse, where w has only the elements a and b, without the empty set. 

A grammar is
$$G=(V,T,S,P)$$
Where V is our variables, T are the terminal symbols (or alphabet), S is the start point, and P are the production rules

**Variables** for this problem will be (S,A,B) 
**Terminal symbols** for this problem are (a,b)
**Start** for this problem is S
**Production rules** are as follows
S -> aSa
S -> bSb
S -> a
S -> b

Our production rules for S->aSa and S->bSb mean that our string will always start and end with the shame character. It also recursively increases the middle of the string. 

S -> a and S -> b are our base cases that handle the generation of very simple strings, where our original w is only a single character.
# P-5
![[Pasted image 20240903205554 1.png]]
## A-5
**1st grammar**
1. S -> aSb
2. S -> ab
3. S -> $\lambda$
The first rule generates strings of the from $a^{n}b^{n}$ where n $\ge$ 1
The second rule handles the base case where n = 1, and generates the string ab.
The third rule makes allowance for the empty string, and allows it to be included in the language.

So we can write the language as
$$L_{1}=\langle a^{n}b^{n}:n \ge 0 \rangle$$
**2nd grammar**
1. S -> aAb
2. S -> ab
3. A -> aAb
4. A -> $\lambda$

The first rule S -> aAb generates strings where S then makes use of the third production rule A -> aAb, to generate strings in the form $a^{n}b^{n}$
The second production rule S -> ab is the base case where n = 1, and generates the string ab
The fourth production rule A -> $\lambda$ gives A the option of being the empty set, which would create the string ab

So we can write the second language as
$$L_{2}=\langle a^{n}b^{n}:n \ge 1 \rangle$$
We can see that there is a contrast between the two languages. The first language allows for generation of the empty string that is just $\lambda$ the second language does not. 

So the two grammars are not equivalent


