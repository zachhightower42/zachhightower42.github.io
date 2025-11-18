# P1
![[Pasted image 20241002202407.png]]
## A1 
$L=\langle w:n_{a}(w)=n_{b}(w) \rangle$  is assumed to be regular
The pumping length is $p$ 
So a string in the language is $a^{p}b^{p}$ meaning that there are $p$ symbols of a and p symbols of b
We want a string that decomposes into three parts $x,y,z$
Where $|xy|\le p$ and $|y|>0$ and that for every $i \ge 0$ the string $xy^{i}z \in L$
So we decompose $a^{p}b^{p}$ into the three parts necessary for pumping lemma. We know that $|xy| \le p$ so we can assume that the substring contains all a symbols. From this we can say that $y$ contains at least one a symbol, because it must be greater than 0. This also means that $z$ contains the equal amount of b symbols. 
Now we can pump y, like this $xy^{2}z$ So we now repeat y twice within the string made up of $x,y,z$ 
In doing so, we know that it will contains more symbols of a, but it will still contain the same number of b symbols
This violates the rules of the language, meaning the string is not within the language
So, we can say that the language is not regular.


# P2
![[Pasted image 20241002202416.png]]
## A2
$L=\langle w \in \langle a,b,c \rangle^{*}:|w| = 3n_{a}(w)\rangle$ 
This means that we're looking for strings where the total number of characters is equal to $3\times a$  Meaning 3 times the number of a symbols in the string. 
We can call this $3k$ to make it easier to refer to in the rest of the problem. 
We can use the pumping lemma again for this.
Let's say our example string is $a^{p}b^{p}c^{p}$ 
We know that this is in the language because the total length of the string is 3p, and our a symbols are only 1p. 
We can decompose the string into pumping lemma as follows:
$$a^{p}=xy,b^{p}c^{p}=z$$
Now we can pump xy, knowing that it contains only the a symbols in our substring. 
$$xy^{2}z=a^{p+|y|}b^{p}c^{p}$$
So we have increased our number of a symbols, while the b and c symbol count remains the same.
This means that the string length is increased.Since the extra length $|y|$ is composed only of a symbols, we no longer satisfy the language's condition of $|w| = 3n_{a}(w)\rangle$ 
We can conclude that the language is not regular


# P3 
![[Pasted image 20241002202425.png]]
## A3 
$L=\langle a^{n}ww^{R}b^{n}:w \in \langle a,b \rangle^{*},n\ge 1\rangle$  
So we can break this language down into three parts
1. We have n amount of leading a symbols
2. We have a string w followed by the reverse of the string w
3. We have an ending n amount of b symbols
Our context free grammar is of the form $$G=(V,\Sigma,P,S )$$
Where
$$G=(\langle S,A,B \rangle,\langle a,b \rangle,P,S )$$
**Productions**
S -> aAb 
A -> aBa|bBb|aAb | $\lambda$
B ->  aBa|bBb| $\lambda$ 

This should generate the strings of the language that we are looking for.
The S variable generates the needed ab pair so that we fulfill n $\ge$ 1
The A variable allows us to stop, generate more ab pairs, or generate a pair of a symbols or b symbols and move to the next variable
The B variable allows us to generate longer and longer palindrome expressions to fulfill the $w$ and $w^{R}$ part of our language, or we may stop. 
# P4
![[Pasted image 20241002202439.png]]
## A4 
Properly nested parenthesis in this context seems to be a set of either half circle of half rectangle parenthesis matched with its mate. The rejected strings are ones that mix these. Like a left side rectangular and a right side half circle.
Our context free grammar is of the form $$G=(V,\Sigma,P,S )$$
Where
$$G=(\langle S \rangle,\langle (,),[,] \rangle,P,S )$$
**Productions**
$$S -> SS | (S) | [S] | \lambda $$
This should generate strings of properly nested parentheses. Though it does not handle the space placed in between the second accepted string example, I'm not sure that's actually supposed to be there. 

# P5
![[Pasted image 20241002202451.png]]
## A5 
$L=\langle a^{n}b^{n+1}:n\le0 \rangle$ 
Our context free grammar is of the form $$G=(V,\Sigma,P,S )$$
Where
$$G=(\langle S \rangle,\langle a,b \rangle,P,S )$$
**Productions**
S -> aSb | b

The S variable allows us to generate a series of a symbols followed by b symbols continually, or end with a b. We can end immediately with a b, because n+1 will always be at least 1, since n must be at least 0. 

Now we want to convert the CFG into GNF. 

We can start by getting rid of any left recursion
S -> aSb 
Will instead become
S -> aA
A -> Sb
S -> b

With that done, we need to make sure that the first symbol on the right hand side is always a terminal symbol. 
S -> aA  `This is good since we start with a terminal`
A -> Sb `This will need to change since we start with a Variable`
S -> b`This is good, since we start with a terminal 
We replace A using the production rules so that we get
A -> aAb | bb

Our final GNF grammar is
S -> aA | b
A -> aAb | bb
# P6 
![[Pasted image 20241002202459.png]]
## A6
S ->aSbS | bSaS | $\lambda$ 

To prove that the grammar is ambiguous we need to prove that we can generate some string in the grammar using at least two different derivations. 

Let's use the string abbaab

| Rule           | Result     |
| -------------- | ---------- |
| ->S            | S          |
| S ->aSbS       | aSbS       |
| S -> bSaS      | abSaSbS    |
| S->bSaS        | abbSaSaSbS |
| S -> $\lambda$ | abbaSaSbS  |
| S -> $\lambda$ | abbaaSbS   |
| S -> $\lambda$ | abbaabS    |
| S -> $\lambda$ | abbaab     |
Now let's see if we can find the same string through a different set of rules

| Rule           | Result   |
| -------------- | -------- |
| ->S            | S        |
| S ->aSbS       | aSbS     |
| S -> $\lambda$ | abS      |
| S->bSaS        | abbSaS   |
| S -> $\lambda$ | abbaS    |
| S -> aSbS      | abbaaSbS |
| S -> $\lambda$ | abbaabS  |
| S -> $\lambda$ | abbaab   |
So, we can make different choices with the production rules and find the same result, this means that the grammar is ambiguous. 
