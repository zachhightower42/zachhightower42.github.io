
![[Pasted image 20241021213223.png]]
**Ans 1.** 
The language consists of strings where:

- The number of a symbols is n
- The number of b symbols is n+1
- n $\ge$ 2 , which implies the shortest strings have at least two a symbols and three b symbols

Grammar G= $(V,\Sigma,P,S)$

**V** = {S,A,B,C}
**Terminals** = {a,b}
**Production Rules:**
S -> aAB
C -> aCB
C ->b
B-> b
**Start Symbol** = S

**Finished Grammar**
Grammar G= $(\langle S,A,B,C \rangle,\langle a,b \rangle,P,S)$
S -> aAB
C -> aCB
C ->b
B-> b

![[Pasted image 20241022132058.png]]
**Ans 2.** 

We want to take
S -> aSa | bSb | aAb
A -> aAb | ab

And convert it into BNF
First we take all the variables and enclose them in <>
*Putting this into codetalk so it doesn't cause issues in markdown*
`<S> -> a<S>a | b<S>b | a<A>b`
`<A> -> a<A>b | ab`

Now we need to replace the -> symbols with ::=
`<S> ::= a <S> a | b <S> b | a <A> b`
`<A> ::= a <A> b | a b`
Now the CFG is in BNF


![[Pasted image 20241022133001.png]]
**Ans 3.** 

We want to take
S -> aSa | bSb | aAb
A -> aAb | ab

And convert it into CNF
To do this we want to
1. Remove the start symbol from the right hand side: This is already done
2. Remove any variables that only change to other variables E.g A -> A :already done
3. Remove any $\lambda$ productions : this is already done
4. Make every production so that it only has two symbols (variables or terminal) on the right hand side
5. Remove terminals from productions with more than one variable

Starting with step 4
S -> aSa
Changes to
S -> Ca
C -> aS
Then
S->bSb
Changes to
S -> Db
D -> bS
Then
S -> aAb
Changes to
S -> Eb
E ->aA

So our grammar now looks like
S -> Ca | Db | Eb
A -> aAb | ab
C -> aS
D -> bS
E ->aA

We still need to change 
A -> aAb | ab
To fit
A -> Eb | ab

So the final grammar with step 4 finished looks like
S -> Ca | Db | Eb
A -> Eb | ab
C -> aS
D -> bS
E ->aA

Now we can go on to step 5
Here we essentially need to introduce Variables to represent terminals for things that have more than one terminal in them.
Our variables for this will be
F->a
G->b
So we can add these and rewrite the grammar of step 4 into
S -> CF | DG | EG
A -> EG | FG
C -> FS
D -> GS
E ->FA
F->a
G->b
Which leaves our grammar in CNF
![[Pasted image 20241022133420.png]]
**Ans 4.** 

We want an NPDA that accepts the language above. 
**Language description**
This language always starts with ab followed by n amount of additional ab instances, followed by a b instance, followed by n amount of ba instances.
n may be an integer 0 or greater
**Jflap**
![[Pasted image 20241024191452.png]]
**Hand drawn**
![[hw 2 311 hand drawn 4.png]]
**Septuple**
$$(\langle q_{0},q_{1},q_{2},q_{3},q_{4},q_{5},q_{6} \rangle, \langle a,b \rangle, \langle A,Z \rangle,\langle \delta \rangle,q_{0},Z,\langle q_{3} \rangle) $$
$\delta (q_{0},a,Z)=(q_{1},Z)$
$\delta (q_{1},b,Z)=(q_{2},Z)$
$\delta (q_{2},b,Z)=(q_{4},Z)$
$\delta (q_{2},a,Z)=(q_{5},AZ)$
$\delta (q_{4},a,A)=(q_{4},\lambda)$
$\delta (q_{4},b,A)=(q_{4},\lambda)$
$\delta (q_{4},\lambda,Z)=(q_{3},Z)$
$\delta (q_{5},b,A)=(q_{6},AA)$
$\delta (q_{6},a,A)=(q_{5},AA)$
$\delta (q_{6},b,A)=(q_{4},A)$


![[Pasted image 20241022133819.png]]
**Ans 5.** 

We want an NPDA that accepts the language above. 
**Language description**
This language is aa, followed by any amount of b symbols including none, followed by ab, ending with any amount of a symbols including none.
**Jflap**
![[Pasted image 20241024191535.png]]

**Hand drawn**
![[hw 2 311 hand drawn 5.png]]
**Septuple**
$$(\langle q_{0},q_{1},q_{2},q_{3},q_{4},q_{5},q_{6} \rangle, \langle a,b \rangle, \langle Z \rangle,\langle \delta \rangle,q_{0},Z,\langle q_{5} \rangle) $$
$\delta (q_{0},a,Z)=(q_{1},Z)$
$\delta (q_{1},a,Z)=(q_{2},Z)$
$\delta (q_{2},a,Z)=(q_{3},Z)$
$\delta (q_{2},b,Z)=(q_{6},Z)$
$\delta (q_{3},b,Z)=(q_{4},Z)$
$\delta (q_{4},a,Z)=(q_{4},Z)$
$\delta (q_{4},\lambda,Z)=(q_{5},Z)$
$\delta (q_{6},a,Z)=(q_{3},Z)$
$\delta (q_{6},b,Z)=(q_{6},Z)$




![[Pasted image 20241022133944.png]]
**Ans 6.** 

We want an NPDA that accepts the language above. 
**Language description**
This language is n amount of a symbols, followed by m amount of b symbols, followed by n+m amount of c symbols. 
n and m may be integers of 0 or greater.
**Jflap**
![[Pasted image 20241024191705.png]]
**Hand drawn**
![[hw 2 311 hand drawn 6.png]]
**Septuple**
$$(\langle q_{0},q_{1},q_{2},q_{3},q_{4} \rangle, \langle a,b,c \rangle, \langle 1,Z \rangle,\langle \delta \rangle,q_{0},Z,\langle q_{4} \rangle) $$
$\delta (q_{0},a,Z)=(q_{1},1Z)$
$\delta (q_{0},b,Z)=(q_{2},1Z)$
$\delta (q_{0},\lambda ,Z)=(q_{4},Z)$
$\delta (q_{1},a,1)=(q_{1},11)$
$\delta (q_{1},b,1)=(q_{2},11)$
$\delta (q_{1},c,1)=(q_{3},\lambda)$
$\delta (q_{2},b,1)=(q_{2},11)$
$\delta (q_{2},c,1)=(q_{3},\lambda)$
$\delta (q_{3},c,1)=(q_{3},\lambda)$
$\delta (q_{3},\lambda,Z)=(q_{4},Z)$



![[Pasted image 20241022134137.png]]
**Ans 7.**

We want an NPDA that accepts the language above. 
**Language description**
This language is composed of a string w where the number of a symbols in w are equal to twice the number of b symbols in w.
**Jflap**
![[Pasted image 20241024213446.png]]
**Hand drawn**
![[hw 2 311 hand drawn 7.png]]

**Septuple**
$$(\langle q_{0},q_{1},q_{2},q_{3},q_{4},q_{5},q_{6},q_{7},q_{8} \rangle, \langle a,b \rangle, \langle 1,Z \rangle,\langle \delta \rangle,q_{0},Z,\langle q_{0},q_{1} \rangle) $$
$\delta (q_{0},a,Z)=(q_{2},Z)$
$\delta (q_{0},b,Z)=(q_{3},11Z)$
$\delta (q_{0},\lambda,Z)=(q_{1},Z)$
$\delta (q_{2},b,Z)=(q_{7},1Z)$
$\delta (q_{2},a,Z)=(q_{4},1Z)$
$\delta (q_{2},a,Z)=(q_{2},Z)$
$\delta (q_{3},a,Z)=(q_{3},Z)$
$\delta (q_{3},b,1)=(q_{5},111)$
$\delta (q_{3},a,1)=(q_{3},\lambda)$
$\delta (q_{3},b,1)=(q_{3},111)$
$\delta (q_{3},\lambda,Z)=(q_{1},Z)$
$\delta (q_{4},b,1)=(q_{6},\lambda)$
$\delta (q_{5},b,1)=(q_{5},111)$
$\delta (q_{5},\lambda,Z)=(q_{1},Z)$
$\delta (q_{6},a,Z)=(q_{2},Z)$
$\delta (q_{6},b,Z)=(q_{3},11Z)$
$\delta (q_{7},a,1)=(q_{8},\lambda)$
$\delta (q_{8},a,Z)=(q_{2},Z)$
$\delta (q_{8},b,Z)=(q_{3},11Z)$
$\delta (q_{8},\lambda,Z)=(q_{1},Z)$





![[Pasted image 20241022134556.png]]
**Ans 8.**

We want an NPDA that accepts the language above. 
**Language description**
This language is n amount of a symbols followed by m amount of b symbols
n may be integers from 0 or greater
m MAY NOT BE equal to n
**JFLAP**
*Note*
Input testing is wrong when used with ab or any string like it. It consistently chooses illegal options. Rebuilt several times and it continued this behavior. Example below.
![[documentation of JFLAP bug question 8.png]]
![[Pasted image 20241024191856.png]]

**Hand-drawn**
![[hw 2 311 hand drawn 8.png]]

**Septuple**
$$(\langle q_{0},q_{1},q_{2},q_{3},q_{4},q_{5},q_{6} \rangle, \langle a,b \rangle, \langle A,Z \rangle,\langle \delta \rangle,q_{0},Z,\langle q_{3} \rangle) $$
$\delta (q_{1},a,A)=(q_{1},AA)$
$\delta (q_{0},a,Z)=(q_{1},AZ)$
$\delta (q_{6},\lambda,A)=(q_{6},\lambda)$
$\delta (q_{3},b,Z)=(q_{3},Z)$
$\delta (q_{2},b,A)=(q_{2},\lambda)$
$\delta (q_{2},\lambda,Z)=(q_{4},Z)$
$\delta (q_{6},\lambda,Z)=(q_{3},Z)$
$\delta (q_{1},\lambda,A)=(q_{2},A)$
$\delta (q_{0},b,Z)=(q_{2},AZ)$
$\delta (q_{2},\lambda,A)=(q_{2},A)$
$\delta (q_{1},b,A)=(q_{2},\lambda)$
$\delta (q_{2},b,Z)=(q_{3},Z)$



![[Pasted image 20241022134827.png]]
**Ans 9.**

We want to show that the language is deterministic and context-free
**Language description**
This language is n symbols of a followed by 2n symbols of b
n may be integers of 0 or greater

**Jflap**
![[Pasted image 20241024193614.png]]
**Hand drawn**
![[hw 2 311 hand drawn 9.png]]
**Septuple**
$$(\langle q_{0},q_{1},q_{2},q_{3},q_{4} \rangle, \langle a,b \rangle, \langle 1,Z \rangle,\langle \delta \rangle,q_{0},Z,\langle q_{0},q_{2} \rangle) $$
$\delta (q_{1},a,1)=(q_{1},1)$
$\delta (q_{3},a,1)=(q_{3},111)$
$\delta (q_{1},\lambda,Z)=(q_{2},Z)$
$\delta (q_{1},b,1)=(q_{1},\lambda)$
$\delta (q_{3},b,1)=(q_{1},\lambda)$
$\delta (q_{0},b,Z)=(q_{4},Z)$
$\delta (q_{0},a,Z)=(q_{3},11Z)$