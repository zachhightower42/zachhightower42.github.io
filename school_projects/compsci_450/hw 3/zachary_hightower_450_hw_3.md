# P1
![[Pasted image 20240919184456.png]]
## A1-A
In the first regular expression we're looking at the only essential part is $ab$  
The prefix and suffix of this regular expression tell us that we can have any combination of a and b symbols, or no a and b symbols at all. So in the set of strings we're looking at, we want to select only the ones that have $ab$
This means that from the set of strings, the ones that belong to this regular expression are:
$$\langle abba,bababb\rangle$$
## A1-B
The second regular expression we consider is one that starts with any number of b symbols, or none, then it must have an a. It continues with any number of b symbols or none, must have an a, then ends with any number of b symbols or none. 
The empty string is disqualified
The second string is possible
The third is not possible, we can only produce two a symbols
The fourth is possible
So the set of strings that we can consider as part of the regular expression is:
$$\langle abba,bababb\rangle$$

## A1-C
The third regular expression we're looking at must start with an a. It is then followed by a statement in parenthesis that can repeat any number of times, or none. The statement in the parenthesis has two symbols, an a that can repeat any number of times, or none, and a b. 
So it could be a single a, or b, or aab, aaaaabbbbbbb, or aabbaabb
We can have an empty string, since we go to the second expression and choose none
We cannot end with an a
We can create this by choosing only b, recurse choose a and b, recurse choose a and b, recurse, choose b
We can't end with an a
So the strings that are in this regular expression are:
$$\langle \lambda, bababb \rangle$$
# P2
![[Pasted image 20240919184513.png]]
## A2-A
This regular expression means that we can use any language that starts with a, is followed by any number of a and b symbols including none, and ends with a b. 
**In**
$$\langle ab,aabb\rangle$$
**Out**
$$\langle ba,b\rangle$$

## A2-B
This regular expression lets us begin with either one a, or any number of a symbols, we must have at least one.  **OR** We may then have the empty string.  **OR** We can have any number of b symbols, or none. 
**In**
$$\langle a,\lambda\rangle$$
**Out**
$$\langle ba,baaa\rangle$$

## A2-C
This regular expression means that we can have any number of repetitions of ab or ba, in any order, or we can have the empty string. 
**In**
$$\langle \lambda,abba\rangle$$
**Out**
$$\langle aa,bb\rangle$$

# P3
![[Pasted image 20240919184524.png]]
## A3-A
We can write this regular expression by considering a few of the cases.
Something like 11, 1010 0110
This tells us that we need to consider no zeros, and zeroes in between the ones. 
So we can write the following regular expression
$$0^{*}10^{*}10^{*}$$
## A3-B
We want at least three a symbols, followed by an even number of b symbols. 
We can find the general structure by looking at something that we could call the base case, the very least we could do to satisfy the requirements, like $aaa$ 
Because 0 is considered an even number of b symbols, since 0 mod 2 = 0
So we write the following regular expression:
$$aaa~a^*(bb)^*$$
The space between the three beginning a symbols and the next $a^{*}$ is included for clarity of reading
## A3-C
We want to express all binary strings with a double symbol occurring anywhere in it, 00 or 11. 
So a few of the strings we would want to accept are
11
1100
0110
101101
We can see the general style of the strings from this. 
So we can write a regular expression as follows
$$(0+1)^{*}(00+11)(0+1)^*$$
This should encompass all the different ways we can write a string that has at least one double in it. 
# P4
![[Pasted image 20240919204033.png]]
## A4 
![[Pasted image 20240919203955.png]]
![[Pasted image 20240919204011.png]]
# P5
![[Pasted image 20240919184550.png]]
## A5
To find the regular expression, we can attack the problem in pieces. 
First, we have S -> abA
This can be written as 
$$S=abA$$
We then have A, which can be written as
$$A=baB$$
We then have B, which can be written as
$$B=aA + bb$$
Then we can sub
$$A=ba(aA + bb)$$
Simplify
$$A=baaA+babb$$
Now we can sub our new A= into S
$$S=ab(baaA+babb)$$
$$S=abbaaA+abbabb$$
This still has an element of recursion in it, which we need to eliminate, we can manage this by rewriting A as follows
$$A=(baa)^{*}babb$$
Now we place that into S
$$S=ab((baa)^{*}babb)$$
$$ab(baa)^{*}babb$$
That leaves us with the regular expression that corresponds to the given grammar