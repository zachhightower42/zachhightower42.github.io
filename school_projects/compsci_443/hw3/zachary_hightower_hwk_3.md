
### 3.1

![[Pasted image 20240302231214.png]]

**ANS-4-A:**
$$p(x)=a_nx^n+a_{n-1}x^{n-1}+...a_{1}x+a_0$$
`ALGORITHM Find x_0 (coefficients, x){`
`final_value = 0;`
`degree = length of(coefficients)-1;`

`for i, range of degree -> 0, stepping -1{`
	`value = coefficients[i] * (x ^ i);`
	`final_value = final_value + value`
	`}`
`return final_value`
`}`

We can analyze the worst case time complexity by examining how many times we run through the loop. We do this for the length of our degree variable, which we can call $n$ 
There are no other complicating factors to the performance of this algorithm, so we can write our worst case time complexity as. 
$$O(n)$$ Linear time

**ANS-4-B:**
The algorithm designed above should be of a linear time complexity already, so we have accomplished this. 

**ANS-4-C:**
The issue is something that we can't really compute without iterating over an $n$ sized amount of terms within our polynomial. With certain iterations of the problem, we might be able to get to a better time complexity, perhaps even constant, but that requires us to have a specific function that can pinpoint the exact point in our given polynomial that we are interested in, or the ability to effectively skip portions of the summation as we would normally do it for a polynomial. 

![[Pasted image 20240302231340.png]]

**ANS-7-A**

`ALGORITHM fake_finder(n,stacks){`
`for i in range (n){`
	`fake = True`
		`for j in range (n){`
		`if j != i{`
		`difference = |stack[i][0] - stack[j][0]|`
		`}`
`if difference !=0 AND difference !=1{fake = false; break;}`
`}`
`}`
`if fake = true{return i}`
`return none`
`}``
`
So we have two arguments, the number $n$ and our stacks, which is assumed to be something like a 2-D array. We have n coins in each stack and n coins in each stack, leading to a visualization of a 2-D matrix of coin rows and stack columns, or vice versa. 

So we go through the stacks, comparing coins from one stack against the coins in the other stack to see if we can find a difference between the two selected coins, until we can manage to locate a stack which has the fake coins. Once we're finished with weighing everything, it will tell us the number of the stack with the fake coins, or it will tell us that there are no fake coins. 

**ANS-7-B**
We are checking $n$ stacks, and in the $n$ stacks we must perform $n-1$ comparisons, because we select one coin which we compare every other coin to. So we can define it as follows:
$$n\times(n-1)$$
However, we are counting each of the coins twice in the above equation, we aren't actually weighing all of them twice in our scenario, we are weighing them effectively half that amount of times, with the way we've got our comparison structured. Which gives us for the final equation to determine all weight checks. 
$$\frac{n\times(n-1)}{2}$$

![[Pasted image 20240302231435.png]]

**ANS-8**
^ indicates pointer
E X A M P L E
^E X A M P L E `moves forward checking all the way to A, A moves back to pointer source` 
A ^X E M P L E `moves forward to E, E swaps to pointer source`
A E ^X M P L E `moves forward to E at end, E at end swaps to pointer`
A E E ^M P L X `moves to L, swaps to pointer source` 
A E E L ^P M X `moves to M, swaps to pointer source`
A E E L M ^P X `P does not need to be moved, we're fine`
A E E L M P ^X 

FINAL SORTED LIST

A E E L M P X


![[Pasted image 20240302231501.png]]
**Excerpt regarding definition of stable**
![[Pasted image 20240302232149.png]]
![[Pasted image 20240302232218.png]]

**ANS-9**
Selection sort is not stable, it can take $$A_0,A_1,B$$
And sort it into the form. $$A_1,A_0,B$$
So it is unstable. 


![[Pasted image 20240302231520.png]]

**ANS-10**
Yes, comparisons and swaps are just as efficient in linked lists as they are within an array. That allows us to conclude that the implementation with linked lists will be just as efficient as the one with arrays. 

![[Pasted image 20240302231548.png]]


**ANS-13**
Yes, when performing bubble sort, we have no chance of the comparisons that bubble sort runs off of shifting the order of entries with the same values. 
$$A_0~compare~A_1,B$$
$A_1$ is not larger than $A_0$ so, no change. 
So, we know that the basic comparison will not bubble values of the same value, out of order. 
![[Pasted image 20240302231606.png]]

`**ALGORITHM** diskSolve(disks){`
`n = (length_of_disks)/2`
`current_disk = disks [0]`
`0 -> length_of_disks{`
	`if current_disk = light & left_disk = null OR light {advance pointer current_disk right}`
	`if current_disk = dark {advance pointer current_disk right}`
	`if current_disk = light & left_disk = dark{while left_disk != light{leftswap current_disk}}` 
	`}`
`return none`
`}`

The number of moves taken should be given by the formula
$$moves~total=n+(n-1)+(n-2)...+1$$
### 3.2
![[Pasted image 20240302231723.png]]
**ANS-3**
`ALGORITHM crashTest (n)`
`g1_broken = false`
`g2_broken = false`
`i = ceiling_of(square_root_of(n))`
`j = 1`
`while g1_broken = false & i <= n do{`
	`dropFromFloor[i]`
	 `if g1_broken = false{j++`
		 `i = j*i}`
		  `}`
	  `if g1_broken = true{
		  `while g1_broken = false & i <= n do{`
			  `dropFromFloor[i]`
			  `i++}`
		  `}`
	  `if g1_broken = true{`
		  `i = ceiling_of(square_root_of(n))`
		  `i = (j-1)*i`
		  `while g2_broken = false do{`
			  `dropFromFloor[i]`
			  `i++}`
		`  }`
  `return i-1`
`  }`

So we check through two loops of size  $\left\lceil \sqrt n \right\rceil$
Which means that we can represent this as additive. 
$$\left\lceil \sqrt n \right\rceil + \left\lceil \sqrt n \right\rceil$$
Meaning our total time complexity should be. 
$$O(\left\lceil \sqrt n \right\rceil)$$



![[Pasted image 20240302231744.png]]
**ANS-6**
In a brute force method for checking the strings, where we check the pattern m against the string n, we can assume that the worst case scenario is one in which we have to make the most amount of comparisons. We know that the control for how difficult this is will be the length of the pattern. So we can simply make it a long pattern of whatever we like in binary(0s and 1s only) and say that our pattern m is = n-1 characters of this set. 
That means we will be making roughly
$$m(n-m+1)$$
Character comparisons before it returns the pattern we're looking for from the set we've provided. 

An example could be
{1010101010101010...10} 0
Where our pattern m is everything in the brackets. 
### 3.4
![[Pasted image 20240302231819.png]]
**Excerpt regarding traveling salesman exhaustive search**
![[Pasted image 20240302232616.png]]
**ANS-1-A**
The basic operation is multiplication, because the formula to figure out what we're looking for is of the form. 
$$n\times n-1\times n-2 ...\times1$$
We're only considering the -> forward movements of the tour in this case, so we don't need to take into account the reversals that this current formula encompasses. 
$$n!\times \frac{1}{2}$$
However when we report the time complexity we generally drop the 1/2 term and get.
$$n! =  \Theta (n!)$$
We report it as theta, because there is no known way to achieve a better than brute force solution to the Traveling Salesman problem. 

**ANS-B**
**i.** The upper limit for 1 hour given we can do 10 billion operations per second is 3.6×10¹³ so the upper limit for how many cities is anything below this as a factorial. 
We can find that it is 16, because once we go above 16!, we get to a number that is $10^{14}$ , which is one order of magnitude above our 1 hour limit. 
**ii.**  Our upper limit is 8.64×10¹⁴ here. So we can do 17 cities now. Because that time is $$17!=3.55687428096 × 10^{14}$$
**iii.** 3.1536×10¹⁷ is the amount we can do in a year, so we can do
$$19!=1.21645100408832×10^{17}$$
**iv.** 3.1536×10¹⁹ is the amount we can do in a century, so we can do
$$20!=2.43290200817664 × 10^{18}$$
### 3.5

![[Pasted image 20240302231916.png]]
**ANS-3-A**
False, if it's a depth first search, there could be a lot of different variations in length. Some of the trees might be longer than others depending on the level of connection that the chosen vertex has with the rest of the graph *G.* 

**ANS-3-B**
False, in a DFS forest, you can pick different vertices that will have differing amounts of back edges and tree edges, compared to another. It can even depend, in the same tree, whether we start traversing it from right to left or left to right how many back edges there will be and which ones will be tree edges. 

![[Pasted image 20240302231934.png]]
**ANS-7-A**

1. Consider each of our vertices a boolean, true for visited, false for not
2. Consider $n$ our variable for keeping track of how many connected parts we have
3. Start doing a DFS from one of the vertices marked as unvisited
4. If we visit it, we mark it as such
5. Consider all the vertices we visit during a single DFS to be part of the same connected component
6. At the end, $++n$ , our variable for keeping track of the connected parts counter
7. Repeat 3 - 6 until there are no more vertices marked as not visited