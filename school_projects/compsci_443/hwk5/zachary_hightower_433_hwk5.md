

# 5.1
## Q2

![[Pasted image 20240401000748.png]]
## ANS-2-A
**ALGORITHM** `findBiggest (array,start, end)`
`if start == end`
	`return start`
`else`
	`mid = (start + end) / 2`
	`left = findBiggest (array, start, mid)`
	`right = findBiggest(array, mid+1, end)`
	`if array[left] >= array[right]` 
		`return left`
	`else`
		`return right`

## ANS-2-B
We want to set up and solve a recurrence relations for our algorithm. To begin with, we know that each time we recur, we're comparing two elements. We divide the array in half at each recurrence. So, we can say that we have $\frac{n}{2}$ comparisons for each recurrence, and each time we recur, we halve the problem again.

We can show this with the following formula
$$T(n)=2\times T(\frac{n}{2})+ \frac{n}{2}$$
Now, to solve. 
We can look at this and determine that it is similar to the Master Theorem, and use the Master Theorem to save ourselves a significant amount of work. 
$$T(n)=a\times T(\frac{n}{b})+f(n)$$
Now we just need to check and see which case we fall into for the Master Theorem. 

Let's test the determinant portion of our formula. 
We know a = 2, and our b = 2, and our d = 1
$$f(n)=\frac{n}{2}=\Theta(n^{1})$$
$$d=1,log_{2}2=1$$
We can see that our d is equal to our $log_{a}b$ , which means that we can state that this is the second case of the Master Theorem. 

$$\Theta(n^{d} \times log~n)=(n~\times log~n)$$
## ANS-2-C
A brute force solution to the problem would be about $O(n)$ in terms of time needed to complete/key comparisons necessary. We know that our algorithm is shorter than that, at $\Theta (n~\times log~n)$ time. However, we've implemented a recursive solution, which means that there's a good deal of overhead needed to actually perform the calculations. If it's a very small array, the brute force solution may outperform our more complex algorithm, but as the arrays get larger, our implementation will outstrip the brute force method in efficiency. 



## Q4
![[Pasted image 20240401000814.png]]
## ANS-4
Yes,  in cases where we're discussing the second of the two cases of the master theorem that involve logarithms, the bases are still going to be irrelevant in the second case, where the logarithm is rendered normally.

We can come to this conclusion by examining why we disregard logarithm bases in every context other than the Master Theorem. It is because they only ever add a constant factor difference to the problem. We know that it is convention to disregard constant factors when examining the time complexity of algorithms. There is no significant reason to exclude the Master Theorem's second case from this. So we can safely say that the logarithm bases in the Master Theorem's second case are equally irrelevant as the logarithm bases outside of the Master Theorem.

However, the logarithm bases in the third case are in the exponent, meaning that the constant factor they add will not actually be applied as something we can conventionally ignore. It will be applied as an exponent, so the orders of growth for different bases will be significantly different, so it must be included, and is therefore not irrelevant. 

## Q5
![[Pasted image 20240401000826.png]]
## ANS-5-A
The easiest way to find the growth of these recurrences is to use the Master Theorem. We know that the theorem is of the form as follows.
$$T(n)=a\times T(\frac{n}{b})+f(n)$$
And we can see that the form of our first recurrence corresponds to the Master Theorem.

$$T(n)=4T(\frac{n}{2})+n, T(1)=1$$
Here we can see that our $a=4$ and that our $b=2$ 
We look all the way to the right and see that the $f(n)=n$ 

So we can say that our $d=1$ 
This means that our formula is $a>b^{d}=4>2^{1}$
So we fall into the third case of the Master Theorem. We can write our solution as the following
$$T(n) \in \Theta(n^{2})$$

## ANS-5-B
This problem is quite similar to our last one, the only thing that's really changed is the $f(n)$ at the end of the problem, as shown below. 

$$T(n)=4T(\frac{n}{2})+n^{2}, T(1)=1$$
So, our factors are as follows
$a=4$
$b=2$
$f(n)=n^{2}~Therefore~d=2$
Which leaves us with the form 
$$4=2^{2},Or,~a=b^{d}$$

So we fall into Case two of the Master Theorem, which leaves us with a final answer of.
$$T(n) \in \Theta(n^{2}~log~n)$$
## ANS-5-C
The final problem again is only changed by the final term $f(n)$ as shown below. 
$$T(n)=4T(\frac{n}{2})+n^{3}, T(1)=1$$
We can list our factors once again
$a=4$
$b=2$
$f(n)=n^{3},~Therefore~d=3$
Which leaves us with the form
$$4<2^{3},~Or,~a<b^{d}$$
Which tells us that this is case one for the Master Theorem, and we can write our answer as follows
$$T(n) \in \Theta (n^{3})$$
# 5.2
## Q8
![[Pasted image 20240401000857.png]]
## ANS-8
Based on the ideas for a partition of three based algorithm as we've gone over in class. Known below or equal to pivot, known above pivot, and unknown. 

**ALGORITHM** `rearrange(array[0...n-1])`
`i<-0;`
`j<-n-1;`
`// <= checks whether it falls into one case or the other by less than or equal to pivot, in this case 0`
`while i <= j do`
	`if array[i] < 0` 
		`i<-i+1`
	`else`
		`swap(array[i],array[j])`
		`j<-j-1`

# 5.3
## Q2
![[Pasted image 20240401000916.png]]
## ANS-2
The algorithm is mostly correct, and it's a simple yet effective recursive algorithm. There is only one issue case, and that is when we have a tree that has only one node. In those cases, it would return 0, not 1, because it would not count the root node properly. In order to correct this, all we have to do is add a single line of code. 

**ALGORITHM** `LeafCounter(T)`
`if T = null return 0` 
`//added line of code right here`
`else if T_left = null AND T_right = null return 1`
`else return LeafCounter(T_left) + LeafCounter(T_right)`
## Q5
![[Pasted image 20240401000941.png]]
## ANS-5-A
![[Pasted image 20240401182950.png]]
Pre order traversal will go from a to b to d, down the leftmost side of the tree, and then it will hit the e on the right fork of b. Then we shoot all the way over to the right fork from a and count c, then we finish at the bottom of the right fork from the root with f.
a - b - d - e - c - f
## ANS-5-B
![[Pasted image 20240401182313.png]]
Inorder traversal will start from the bottom of the left tree, move up, move down to the bottom of the right fork of b, to the root, down to c, down to f. 
d - b - e - a - c - f
## ANS-5-C
![[Pasted image 20240401183206.png]]
For Postorder traversal we would start at the bottom leftmost end of the tree with d, then we go to the right child of parent node b and visit e. We visit parent node b. We go all the way over to the bottom right most end of the tree at f, visit parent node c, and finish at root node a

d - e - b - f - c - a
# 5.4
## Q9
![[Pasted image 20240401001037.png]]
We want to find the recurrence relation to find the efficiency class of Pan78's algorithm. 

We can define the number of multiplications that it will perform using mostly the information we're given in the problem. 

$$M(n)=143640\times M(\frac{n}{70})~for~n>1,~M(1)=1$$
So, we can see that it does have the form of the Master Theorem, shown below. 
$$M(n)=a\times M(\frac{n}{b})+f(n)$$
So our
$a=143640$
$b=70$
$d=0$
This means that our formula is $a>b^{d}=143640>70^{0}$
So this falls into case one of the Master Theorem, meaning that we will write our answer as the following formula
$$\Theta(n^{log_{70}143640})$$
We can solve the exponent to get a better idea of the efficiency 
$$log_{70}143640=\frac{ln ~143640}{ln~70}=2.79512268974833$$

Now, we need to compare this with that of Strassen's algorithm, which we don't have on hand. We need to get it from the book
![[Pasted image 20240401190648.png]]
So, from what we can see here, Pan78's algorithm is just a little bit more efficient than Strassen's algorithm. 