# P1 
![[Pasted image 20241014214717.png]]
## A1
**Leftmost Derivation**
We want to do a leftmost derivation on the grammar with the statement $a=a*(b+(c*a))$ 
Leftmost derivation means we're always expanding the leftmost symbol that is not a terminal. 
We begin with 
`<assign>` 
We only have one production rule, so it's easy to see that it's the leftmost one and apply it. 
`<assign>` -> `<id> = <expr>`
Now, we have
`<id> = <expr>`
We expand `<id>` using `<id>` -> `a`
That gives us
`a = <expr>`
Now we apply the production rule for `<expr>` which is `<expr>` -> `<id> * <expr>` 
That gives us
`a = <id> * <expr>`
We expand `<id>` using `<id>` -> `a`
That gives us
`a = a * <expr>`
Now we expand `<expr>` -> `(<expr>)`
`a = a * (<expr>)`
Then we expand the `<expr>` using the leftmost production again
That gives us
`a = a * (<id> * <expr>)`
We then expand the leftmost `<id>` with the next production rule `<id>` -> `b`
This gives us
`a = a * (b + <expr>)`
We expand `<expr>` into `(<expr>)` again
That gives us
`a = a * (b + (<expr>))`
Then we expand the `<expr>` using the leftmost production again
That gives us
`a = a * (b + (<id> * <expr>))`
We expand the leftmost `<id>` with the next production rule `<id>` -> `c`
`a = a * (b + (c * <expr>))`
We expand the last `<expr>` into `<expr>` -> `<id>` 
Then we expand that `<id>` into `<id>` -> `a`
`a = a * (b + (c * a))`
That is the end of the leftmost derivation. 
**Parse Tree**
![[parse tree q1.png]]
Add splitting of expr into the 4th and 6th levels of parse tree
# P2 
![[Pasted image 20241014214734.png]]
## A2
**a.** abcd
1.  `<S>` -> `a <S> c <B>`
2. `a <S> c <B>` -> `a b c <B>` **using** `<S>` -> `b`
3. `a b c <B>` -> `a b c d` **using** `<B>` -> `d`
So the sentence is in the language.

**b.** acccbd
1.  `<S>` -> `a <S> c <B>`
 We now need to generate a `b` in front of the `c` in            `a <S> c <B>` 
 However we cannot do this through any combination of the production rules, so that sentence is not in the language. 

**c.** acccbcc
1.  `<S>` -> `a <S> c <B>`
 We now need to generate a `b` in front of the `c` in            `a <S> c <B>` 
 Again.
 However we cannot do this through any combination of the production rules, so this sentence is not in the language either. 

**d.** acd
1.  `<S>` -> `a <S> c <B>`
This is the only option for generating an `a` 
However, we now need to resolve the `<S>` variable
There is no option for resolving the `<S>` variable into $\lambda$ 
So the sentence is not in the language. 

**e.** accc
1.  `<S>` -> `a <S> c <B>`
2. `a <S> c <B>` -> `a c c <B>` **Using** `<S>` -> `<A>` then `<A>` -> `c <A>` then `<A>` -> `c`
3. `a c c <B>` -> `a c c c` **Using** `<B>` -> `<A>` then     `<A>` -> `c`

So the sentence is in the language. 


# P3
![[Pasted image 20241014214751.png]]
## A3
*Introduced spacing between some of the variable and terminal symbols to show clearly where they end and begin*

We want to convert from EBNF to BNF. To do that we need to get rid of the "[ ]" and "{ }" parts of the language. 
Let's start with the first rule
S -> A {b A}
{bA} means occurrences of bA $\ge$ 0
We can change this to BNF form by introducing a recursive production that handles making any number of bA instances or none.
So the production rule becomes
S -> A B
B -> b A B | $\lambda$

Now we can move on the second rule
(putting this in code format to prevent it from breaking the markdown styling)
A -> `a[b]A`
We need to replace the `[b]` part of this rule.
This part of the rule means we can either have an instance of b here, or none. 
We can handle this by changing the rule to
A -> a b A | a A
This is effectively the same as the original rule, allowing us to have an instance of b, or not have an instance of b. 

So, fully converted to BNF, the grammar looks like
S -> A B
B -> b A B | $\lambda$
A -> a b A | a A
# P4
![[Pasted image 20241014214802.png]]
# A4
**Program name**
statistics_hightower.f95