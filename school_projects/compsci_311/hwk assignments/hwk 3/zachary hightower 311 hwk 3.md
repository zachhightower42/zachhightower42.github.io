# Problem 1
***NOTE:*** These are in a slightly different form than the ones shown in Professor Holston's examples.  The state is placed to the left, the current tape is on the right, and the position of the head is shown by the underscore that looks like the following:  $\underline{ }$  
Underneath an a example $\underline{a}$

I did this because I found examples of Instantaneous descriptions for Turing machines following this format easier to read and follow. If this is going to result in massive amounts of points taken off, please inform me and I will make the necessary format corrections. 
## Ans 1
**(a.)** ($q_{0},\underline{a}bbabb$) $\vdash$ ($q_{1},0\underline{b}babb$) $\vdash$ ($q_{1},0b\underline{b}abb$) $\vdash$ ($q_{1},0bb\underline{a}bb$) $\vdash$  ($q_{1},0bba\underline{b}b$) $\vdash$ ($q_{1},0bbab\underline{b}$) $\vdash$ ($q_{1},0bbabb\underline{\square}$) $\vdash$ ($q_{2},0bbab\underline{b}$) $\vdash$ ($q_{3},0bba\underline{b}1$) $\vdash$ ($q_{3},0bb\underline{a}b1$) $\vdash$ ($q_{3},0b\underline{b}ab1$) $\vdash$ ($q_{3},0\underline{b}bab1$) $\vdash$ ($q_{3},\underline{0}bbab1$) $\vdash$ ($q_{0},0\underline{b}bab1$) $\vdash$ ($q_{1},01\underline{b}ab1$) $\vdash$ ($q_{1},01b\underline{a}b1$) $\vdash$ ($q_{1},01ba\underline{b}1$) $\vdash$ ($q_{1},01bab\underline{1}$) $\vdash$ ($q_{2},01ba\underline{b}1$) $\vdash$ ($q_{3},01b\underline{a}11$) $\vdash$ ($q_{3},01\underline{b}a11$) $\vdash$ ($q_{3},0\underline{1}ba11$) $\vdash$ ($q_{0},01\underline{b}a11$) $\vdash$ ($q_{1},011\underline{a}11$) $\vdash$ ($q_{1},011a\underline{1}1$) $\vdash$ ($q_{2},011\underline{a}11$) $\vdash$ ($q_{3},01\underline{1}011$) $\vdash$ ($q_{0},011\underline{0}11$) $\vdash$ ($q_{4},011a\underline{1}1$) $\vdash$ ($q_{4},011ab\underline{1}$) $\vdash$ ($q_{4},011abb\underline{\square}$) $\vdash$ ($q_{5},011ab\underline{b}$) $\vdash$ ($q_{5},011a\underline{b}b$) $\vdash$ ($q_{5},011\underline{a}bb$) $\vdash$ ($q_{5},01\underline{1}abb$) $\vdash$ ($q_{5},0\underline{1}1abb$) $\vdash$ ($q_{5},\underline{0}11abb$) $\vdash$ ($q_{5},\underline{\square}011abb$) $\vdash$ ($q_{6},\underline{0}11abb$) $\vdash$ ($q_{9},a\underline{1}1abb$) $\vdash$ ($q_{9},a1\underline{1}abb$) $\vdash$ ($q_{9},a11\underline{a}bb$) $\vdash$ ($q_{8},a1\underline{1}xbb$) $\vdash$ ($q_{8},a\underline{1}1xbb$) $\vdash$ ($q_{8},\underline{a}11xbb$) $\vdash$ ($q_{6},a\underline{1}1xbb$) $\vdash$ ($q_{7},ab\underline{1}xbb$) $\vdash$ ($q_{7},ab1\underline{x}bb$) $\vdash$ ($q_{7},ab1x\underline{b}b$) $\vdash$ ($q_{8},ab1\underline{x}xb$) $\vdash$  ($q_{8},ab\underline{1}xxb$) $\vdash$  ($q_{8},a\underline{b}1xxb$) $\vdash$  ($q_{6},ab\underline{1}xxb$) $\vdash$  ($q_{7},abb\underline{x}xb$) $\vdash$  ($q_{7},abbx\underline{x}b$) $\vdash$  ($q_{7},abbxx\underline{b}$) $\vdash$  ($q_{8},abbx\underline{x}x$) $\vdash$  ($q_{8},abb\underline{x}xx$) $\vdash$  ($q_{8},ab\underline{b}xxx$) $\vdash$  ($q_{6},abb\underline{x}xx$) $\vdash$  ($q_{10},abbx\underline{x}x$) $\vdash$  ($q_{10},abbxx\underline{x}$) $\vdash$  ($q_{10},abbxxx\underline{\square}$) $\vdash$  ($q_{11},abbxxx\underline{\square}$)  
**Accepted**

**(b.)** ($q_{0},\underline{b}abab$) $\vdash$ ($q_{1},1\underline{a}bab$) $\vdash$($q_{1},1a\underline{b}ab$) $\vdash$($q_{1},1ab\underline{a}b$) $\vdash$ ($q_{1},1aba\underline{b}$) $\vdash$ ($q_{1},1abab\underline{\square}$) $\vdash$ ($q_{2},1aba\underline{b}$) $\vdash$ ($q_{3},1ab\underline{a}1$) $\vdash$ ($q_{3},1a\underline{b}a1$) $\vdash$ ($q_{3},1\underline{a}ba1$) $\vdash$ ($q_{3},\underline{1}aba1$) $\vdash$ ($q_{0},1\underline{a}ba1$) $\vdash$ ($q_{1},10\underline{b}a1$) $\vdash$ ($q_{1},10b\underline{a}1$) $\vdash$ ($q_{1},10ba\underline{1}$) $\vdash$ ($q_{2},10b\underline{a}1$) $\vdash$ ($q_{3},10\underline{b}01$) $\vdash$ ($q_{3},1\underline{0}b01$) $\vdash$ ($q_{0},10\underline{b}01$) $\vdash$ ($q_{1},101\underline{0}1$) $\vdash$ ($q_{2},10\underline{1}01$) 
**Rejected**

**(c.)**  ($q_{0},\underline{a}baba$) $\vdash$($q_{1},0\underline{b}aba$) $\vdash$($q_{1},0b\underline{a}ba$) $\vdash$ ($q_{1},0ba\underline{b}a$) $\vdash$ ($q_{1},0bab\underline{a}$) $\vdash$ ($q_{1},0baba\underline{\square}$) $\vdash$ ($q_{2},0bab\underline{a}$) $\vdash$($q_{3},0ba\underline{b}0$) $\vdash$ ($q_{3},0b\underline{a}b0$) $\vdash$($q_{3},0\underline{b}ab0$) $\vdash$ ($q_{3},\underline{0}bab0$) $\vdash$ ($q_{0},0\underline{b}ab0$) $\vdash$ ($q_{1},01\underline{a}b0$) $\vdash$ ($q_{1},01a\underline{b}0$) $\vdash$ ($q_{1},01ab\underline{0}$) $\vdash$ ($q_{2},01a\underline{b}0$) $\vdash$ ($q_{3},01\underline{a}10$) $\vdash$ ($q_{3},0\underline{1}a10$) $\vdash$ ($q_{0},01\underline{a}10$) $\vdash$ ($q_{1},010\underline{1}0$) $\vdash$ ($q_{2},01\underline{0}10$) 
**Rejected**

**(d.)** ($q_{0},\underline{a}abb$) $\vdash$($q_{1},0\underline{a}bb$) $\vdash$($q_{1},0a\underline{b}b$) $\vdash$($q_{1},0ab\underline{b}$) $\vdash$ ($q_{1},0abb\underline{\square}$) $\vdash$($q_{2},0ab\underline{b}$) $\vdash$ ($q_{3},0a\underline{b}1$) $\vdash$ ($q_{3},0\underline{a}b1$) $\vdash$ ($q_{3},\underline{0}ab1$) $\vdash$ ($q_{0},0\underline{a}b1$) $\vdash$ ($q_{1},00\underline{b}1$) $\vdash$ ($q_{1},00b\underline{1}$) $\vdash$ ($q_{2},00\underline{b}1$) $\vdash$ ($q_{3},0\underline{0}11$) $\vdash$ ($q_{0},00\underline{1}1$) $\vdash$ ($q_{4},00b\underline{1}$) $\vdash$ ($q_{4},00bb\underline{\square}$) $\vdash$ ($q_{5},00b\underline{b}$) $\vdash$ ($q_{5},00\underline{b}b$) $\vdash$ ($q_{5},0\underline{0}bb$) $\vdash$ ($q_{5},\underline{0}0bb$) $\vdash$ ($q_{5},\underline{\square}00bb$) $\vdash$ ($q_{6},\underline{0}0bb$) $\vdash$ ($q_{9},a\underline{0}bb$) $\vdash$ ($q_{9},a0\underline{b}b$) 
**Rejected**

**(e.)** ($q_{0},\underline{a}a$) $\vdash$  ($q_{1},0\underline{a}$) $\vdash$ ($q_{1},0a\underline{\square}$) $\vdash$ ($q_{2},0\underline{a}$) $\vdash$ ($q_{2},\underline{0}0$) $\vdash$ ($q_{0},0\underline{0}$) $\vdash$ ($q_{4},0a\underline{\square}$) $\vdash$ ($q_{5},0\underline{a}$) $\vdash$ ($q_{5},\underline{0}a$) $\vdash$ ($q_{5},\underline{\square}0a$) $\vdash$ ($q_{6},\underline{0}a$) $\vdash$ ($q_{9},a\underline{a}$) $\vdash$ ($q_{8},\underline{a}x$) $\vdash$ ($q_{6},a\underline{x}$) $\vdash$ ($q_{10},ax\underline{\square}$) $\vdash$ ($q_{11},ax\underline{\square}$) 
**Accepted**

# Problem 2
# Ans 2
### (a.)
![[Pasted image 20241119185326.png]]
## Septuple
$$(\langle q_0​,q_1​,q_2​,q_3​,q_4​,q_5​,q_{7​}\rangle,\langle a,b \rangle,\langle a,b,X,Y,\square \rangle,q_0,\square ,δ​,\langle q_{7}\rangle)$$
### Transitions
$δ(q5​,X)=(q3​,X,R)$
$δ(q2,Y)=(q2,Y,L)$
$δ(q5,Y)=(q5,Y,L)$
$δ(q2,a)=(q2,a,L)$
$δ(q5,a)=(q5,a,L)$
$δ(q2,X)=(q0,X,R)$
$δ(q3,a)=(q4,X,R)$
$δ(q1,a)=(q1,a,R)$
$δ(q1,Y)=(q1,Y,R)$
$δ(q3,X)=(q3,X,R)$
$δ(q3,Y)=(q3,Y,R)$
$δ(q4,Y)=(q4,Y,R)$
$δ(q4,a)=(q4,a,R)$
$δ(q0,a)=(q1,X,R)$
$δ(q3,\square)=(q7,\square,S)$
$δ(q0,Y)=(q3,Y,S)$
$δ(q1,b)=(q2,Y,L)$
$δ(q4,b)=(q5,Y,L)$

### (b.) 

![[Pasted image 20241119185518.png]]
## Septuple
$$(\langle q_0​,q_1​,q_2​,q_3​,q_4​,q_5​,q_{7​}, q_8\rangle,\langle a,b \rangle,\langle a,b,A,B,Z,\square \rangle,q_0,\square ,δ​,\langle q_{8}\rangle)$$
### Transitions

$\delta(q_0, a)= (q_1, A, R)$
$\delta(q_0, b)= (q_5, B, R)$
$\delta(q_1, a)= (q_1, a, R)$
$\delta(q_1, b)= (q_3, b, R)$
$\delta(q_3, b)= (q_3, b, R)$
$\delta(q_3, Z)= (q_3, Z, R)$
$\delta(q_3, a)= (q_4, Z, L)$
$\delta(q_4, b)= (q_2, b, L)$
$\delta(q_4, Z)= (q_2, Z, L)$
$\delta(q_2, A)= (q_0, A, R)$
$\delta(q_2, b)= (q_2, b, L)$
$\delta(q_2, Z)= (q_2, Z, L)$
$\delta(q_2, a)= (q_2, a, L)$
$\delta(q_5, b)= (q_5, b, R)$
$\delta(q_5, Z)= (q_5, Z, R)$
$\delta(q_5, a)= (q_6, Z, L)$
$\delta(q_6, b)= (q_6, b, L)$
$\delta(q_6, Z)= (q_6, Z, L)$
$\delta(q_6, B)= (q_0, B, R)$
$\delta(q_0, A)= (q_7, A, R)$
$\delta(q_0, B)= (q_7, B, R)$
$\delta(q_0, Z)= (q_7, Z, R)$
$\delta(q_7, A)= (q_7, A, R)$
$\delta(q_7, B)= (q_7, B, R)$
$\delta(q_7, Z)= (q_7, Z, R)$
$\delta(q_7,\square)= (q_8,\square, S)$

### (c.) 

![[Pasted image 20241119185551.png]]
## Septuple
$$(\langle q_0​,q_1​,q_2​,q_3​,q_4​,q_5​,q_{7​}, q_{8,}q_{9,}q_{10},q_{11,}q_{12}\rangle,\langle a,b \rangle,\langle a,b,A,B,\square \rangle,q_0,\square ,δ​,\langle q_{12}\rangle)$$
### Transitions
$\delta(q_0, a) = (q_1, a, R)$
$\delta(q_1, b) = (q_2, b, R)$
$\delta(q_2, b) = (q_2, b, R)$
$\delta(q_2, a) = (q_3, a, R)$
$\delta(q_3, a) = (q_3, a, R)$
$\delta(q_3, \square) = (q_4, \square, L)$
$\delta(q_4, B) = (q_7, B, L)$
$\delta(q_4, a) = (q_5, A, L)$
$\delta(q_5, b) = (q_6, B, R)$
$\delta(q_5, a) = (q_5, a, L)$
$\delta(q_5, B) = (q_5, B, L)$
$\delta(q_6, A) = (q_4, A, L)$
$\delta(q_6, a) = (q_6, a, R)$
$\delta(q_6, B) = (q_6, B, R)$
$\delta(q_7, B) = (q_7, B, L)$
$\delta(q_7, a) = (q_7, a, L)$
$\delta(q_7, b) = (q_7, b, L)$
$\delta(q_7, \square) = (q_8, \square, R)$
$\delta(q_8, a) = (q_9, A, R)$
$\delta(q_8, B) = (q_{11}, B, R)$
$\delta(q_9, b) = (q_{10}, B, L)$
$\delta(q_9, a) = (q_9, a, R)$
$\delta(q_9, B) = (q_9, B, R)$
$\delta(q_{10}, A) = (q_8, A, R)$
$\delta(q_{10}, B) = (q_{10}, B, L)$
$\delta(q_{10}, a) = (q_{10}, a, L)$
$\delta(q_{11}, B) = (q_{11}, B, R)$
$\delta(q_{11}, A) = (q_{11}, A, R)$
$\delta(q_{11}, \square) = (q_{12}, \square, S)$

### (d.)
![[Pasted image 20241119185432.png]]


## Septuple
$$(\langle q_0​,q_1​,q_2​,q_3​,q_4​,q_5,​\rangle,\langle a,b \rangle,\langle a,b,\square \rangle,q_0,\square ,δ​,\langle q_{5}\rangle)$$
### Transitions
$\delta(q_0, a) = (q_1, a, R)$
$\delta(q_0, b) = (q_1, b, R)$
$\delta(q_1, a) = (q_2, a, R)$
$\delta(q_1, b) = (q_2, b, R)$
$\delta(q_2, a) = (q_3, a, R)$
$\delta(q_2, b) = (q_3, b, R)$
$\delta(q_3, a) = (q_4, a, R)$
$\delta(q_3, b) = (q_4, b, R)$
$\delta(q_4, a) = (q_1, a, R)$
$\delta(q_4, b) = (q_1, b, R)$
$\delta(q_4, \square) = (q_5, \square, R)$

### (e.) 
![[Pasted image 20241119185148.png]]
## Septuple
$$(\langle q_0​,q_1​,q_2​,q_3​,q_4​,q_5,q_6,q_7​\rangle,\langle a,b,c \rangle,\langle a,b,c,A,B,X,\square \rangle,q_0,\square ,δ​,\langle q_{2}\rangle)$$
### Transitions
$δ(q0, a) = (q3, a, R)$  
$δ(q0, b) = (q3, b, R)$  
$δ(q0, c) = (q1, X, R)$  
$δ(q3, c) = (q4, X, R)$  
$δ(q3, a) = (q3, a, R)$  
$δ(q3, b) = (q3, b, R)$  
$δ(q4, a) = (q5, A, L)$  
$δ(q4, b) = (q5, B, L)$  
$δ(q4, A) = (q4, A, R)$  
$δ(q4, B) = (q4, B, R)$  
$δ(q4, \square) = (q2, \square, S)$  
$δ(q5, A) = (q5, A, L)$  
$δ(q5, B) = (q5, B, L)$  
$δ(q5, X) = (q6, X, L)$  
$δ(q6, A) = (q6, A, L)$  
$δ(q6, B) = (q6, B, L)$  
$δ(q6, a) = (q7, A, R)$  
$δ(q6, b) = (q7, B, R)$  
$δ(q7, A) = (q7, A, R)$  
$δ(q7, B) = (q7, B, R)$  
$δ(q7, X) = (q4, X, R)$  
$δ(q1, \square) = (q2, \square, S)$
