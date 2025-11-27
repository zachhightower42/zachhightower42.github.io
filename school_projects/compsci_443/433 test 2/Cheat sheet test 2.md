MIDTERM 2021
Definitely put Master Theorem on cheat sheet

## 1.1 
$$T(n)=2 T(\frac{n}{2})+1$$
$$T(n)\in \Theta (n)$$
## 1.2
$$T(n)=2 T(\frac{n}{2})+n$$
$$T(n)\in \Theta (n~log~n)$$
## 1.3
$$T(n)=7 T(\frac{n}{2})+n^{2}$$
$$T(n)\in \Theta (n^{log_27})$$
## 2
Decrease and conquer 
![[Pasted image 20240401121235.png]]
For the new element asterisk, we consider it two ways. 
If the new element `*` is not part of the solution, we just consider the solution style we already had concerning the portion outlined as k and that is the optimal solution. 

Second case, it is included as part of the solution, we consider the optimal solution as $V_{0}+A[k+1]$ 

Next step 
$$max[V_{1}, V_{0}+A(k+1)]$$

Our third case is the position where 
$A[k+1]$ is our max. 

V<- max$[V_{1,}V_{0}+A(k+1), A[K+1]]$

`MaxNonAdjacent (A[0...n-1])`
`V_0<- A[0]`
`V_1<- max | v_0,A[1]`
`for i=2 n-1`
	`v<-max(V_0+A[i], A[i]V_1)`
	`V_0 <- V_1`
	`V_1 <- V`
	`end`
`return V`

# MIDTERM 2023
## 1 
$$T(n)=8T(\frac{n}{2})+n^{2}$$
$$T(n)\in (n^{3})$$
## 2
We want to find $$\lfloor \sqrt x \rfloor$$
`Sqrt(n)`
`L<-0`
`R<- n`
`while true do` 
	`x<- floor` $\frac{L+R}{2}$
	`if x $\times$ x $\le$ n`
			`if (x+1)` $\times$ `(x+1)` $\ge$  `n`
				`return x`
			`else`
			`L <- x+1`
		`else`
		`R <- x`


So, this is a binary search


## 3 
This is a kind of sorting called wiggle sort

There are many ways of sorting an array in this way, we're asked to come up with an n log n time. 

Then we're asked to come up with a linear time. 

In order to accomplish this, we can start with a sorted array, and we can swap positions one and two. Swap three and four. Swap five and six. So on and so forth down the length of the array

Now, we consider the linear time solution. 
![[Pasted image 20240401123923.png]]

`WiggleSort(A)`
`up <- true`
`for i <- 0 A len -2`
	`if up`
		`if A[i]> A[i+1]`
			`swap(A[i], A[i+1])`
			`end`
		`up <- false`
	`else`
		`if A[i] < A [i+1]`
		`swap (A[i], A[i+1])`
		`up <- true`

We could also use quick select to find the median, as it is linear time. Then we can use that as the pivot to swap left right, left right for the solution 

# MIDTERM

There will be one problem on Master Theorem, and then some on decrease and conquer. 

**Master Theorem**
![[Pasted image 20240403233016.png]]