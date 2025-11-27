Homework 6
Exercises 6.1: 2 
Exercises 6.2: 7
Exercises 6.3: 1
Exercises 6.4: 2, 12
Exercises 6.5: 1
Exercises 6.6: 2, 10
Due: Apr. 17th.

# 6.1
## Q1
![[Pasted image 20240415213325.png]]
## ANS 1-A
**ALGORITHM** `smallDiff (array)`
`sort(array)`
`int diff = -1`
`int arrayIndex1
`int arrayIndex2` `
`for i = 0, step 1, array.size - 1`
	`if diff > 0`
		`diff = absolute.(array[i] - array[i+1])`
		`arrayIndex1=i`
		`arrayIndex2=i+1` `
	`else-if diff < absolute.(array[i] - array[i+1])`
		`diff = absolute.(array[i] - array[i+1])`
		`arrayIndex1=i`
		`arrayIndex2=i+1`
	`else`
`return diff` 

## ANS 1-B
We want to compare the efficiency of this algorithm with that of the brute force implementation. We know that the brute force method will be $\Theta(n^{2})$ because it has to consider $\frac{n~ (n-1)}{2}$ comparisons.  We can ignore the constants present here and record it as exponential $n^{2}$ time. 

We can assume that our sorting algorithm will take $n~log~n$ time, as we know of several that take roughly this amount of time that we can choose from, like merge and quick sort. After doing that we just have to iterate over the array one time to be certain that we consider all the relevant pairs. Since we can assume that will take linear $n$ time, we can record the time complexity of our algorithm as follows
$$n~log~n~+n=O(n~log~n)$$
We record this as the worst case, because in many cases we may not need to actually iterate over the entire array, and our sort could run faster than $n~log~n$ times. 
## Q2
![[Pasted image 20240415213341.png]]
## ANS 2-A
**ALGORITHM** `IntersectionC(A, B):`
    `intersection = []`
    `for a in A:`
        `for b in B:`
            `if a == b:`
                `intersection.append(a)`
                `break`
    `return intersection`

This will go through each of the sets and compare all the elements of one set with the other. It will result in a time complexity of $$n\times m$$
As we have nested loops. We can also state it as. 
$$O(n\times m)$$

## ANS 2-B

**ALGORITHM** `IntersectionCsorted(A, B):`
    `mergesort(A) // Or use another n log n algorithm`
    `intersection = []`
    `for each element b in B:`
        `if BinarySearch(A, b) is True:`
            `intersection.append(b)`
    `return intersection`

First, we sort A, which we can assume takes n log n time, since we can choose to use an efficient sort. 

Next, we can use a binary search algorithm to search through our now sorted array A for our target b. Our binary search will take roughly log n time and iterate over the elements of m, meaning we can say that it is m log n time. So we can record it as. 
$$n~log~n+m~log~n = O(m+n)~log~n$$


# 6.2
## Q7
![[Pasted image 20240415213408.png]]
## ANS-7-A
We want a system of two linear equations with two unknowns that has a unique solution. We can pick any system, but we'll go for something relatively simple. 
$$2x+3y=7$$
$$4x-2y=6$$
These two equations will be ours for the first example. The first thing we need to do is find one of the variables. Let's find y first.
$$2x+3y=7~to~ \times 2 ~to~4x+6y=14~to~(subtract~eqtn~2)$$
$$to~8y=8~to\div8~to~y=1$$
Now we know what y is equal to. So we can then sub that into the first equation to solve for our second variable x. 
$$2x+3(1)=7~to~2x=7-3~to~2x=4~to~x=2$$
So the two variables are x = 2 and y = 1. 
## ANS-7-B
We need a new system that cannot actually be solved let's choose something similar to our last one so it illustrates just how variable these systems of equations can be. Meaning just because we can find a solution for something close to this, doesn't mean we will find a solution here. 
$$2x+3y=7$$
$$4x+6y=12$$
Let's start with the first equation and try to get it in terms of the second. 
$$2x+3y=7~to~\times 2~to~4x+6y=14$$
We can see here that though we have the equation in what should be the exact same form as the other, it does not match the result. We can determine from this fact that these equations never intersect, meaning there is no relation between one to the other, and we cannot solve them using Gaussian elimination. 

## ANS-7-C
Now we need a system with the opposite. Infinitely many solutions. 
Our new system
$$2x+3y=6$$
$$4x+6y=12$$
Let's get the first in terms of the second
$$2x+3y=6~to~\times2~to~4x+6y=12$$
So, we can get it into the exact same form. There is not just one intersection here, but we can form infinitely many intersections from this, as the two are essentially the exact same line, our variables are just describing different points on it at the beginning. 

# 6.3 
## Q1
![[Pasted image 20240415213429.png]]
## ANS-1-A
The first one is an AVL tree. We can see that it there is no child node that differs from the parent node by more than one. The self balancing will be maintained. 

## ANS-1-B
The second is not an AVL tree, four and six violate the necessity of child nodes not differing by more than one from their parent nodes. We can see that this tree needs to be restructured to become AVL

## ANS-1-C
The third one is not an AVL tree because it is not a binary search tree. 2 has been placed incorrectly as the right child of 3. 


# 6.4
## Q2
![[Pasted image 20240415213501.png]]

## ANS-2
**ALGORITHM** `heapCheck(heap):`
    `for i=1, step 1,  floor(n/2)`
        `if 2*i + 1 <= n`
            `if heap[i] < max(heap[2*i], heap[2*i + 1])`
                `return false`
        `else`
            `if heap[i] < heap[2*i]`
                `return false`
    `return true`

We go through the heap to the point of reaching the floor of (n/2), because if it is a heap, this will be the extent of non-leaf nodes. We don't need to check past this to make determinations on heap status. 

We then compare parent nodes with child nodes to see if any of them violate the definition of a heap, if they do, we throw false. If we don't find anything of that sort in the for loop, we know it is a heap, and we return true. 

The time complexity of this will be based on how many comparisons are made. We know that we are checking the floor of (n/2) amount of entries twice, because we need to compare each parent node to its child nodes twice. We can see that this will equate to a roughly n, or linear, amount of time, since our constant coefficient will go to 1. 

## Q12
![[Pasted image 20240415213517.png]]
## ANS-12-A
**ALGORITHM** `skettiSort (noodle_array)`
`noodle_array.spread`
`noodle_array_sorted`
`length = noodle_array.length`
`//Now our array of noodles is spread over a surface so we can see them all and we've noted down how many of them we have`
`while noodle_array is not empty`
	`noodle_array_sorted.append(noodle_array.remove_min)`
	`//this is assuming the minimum length noodles will be the return statement of the function remove_min`
`//We could also easily find the max as we're looking at the array of noodles and can easily see which is longest or shortest`
This will let us simulate spreading the noodles out and being able to visually compare which one is smaller or bigger out of all the other noodles. We can then take that noodle out and put it somewhere else. This should leave us with a sorted array of noodles. 

## ANS-12-B

This example is meant to show us that we can find ways to look at problems in order to make them easier to handle for specific tasks. Much like how heaps make finding or deleting the largest item very easy, we can do the same with visually obvious things like the length of spaghetti noodles. 
`
# 6.5
## Q1
![[Pasted image 20240415213542.png]]

## ANS-1
The algorithm has a few distinct parts which we can see contribute to the overall time complexity. We can recognize that there are two distinct parts which have multiplications in them 
`power <- power * x`
and
`p <- P + P[i] * power`

The second line is also the only line that has an addition in it. 
`p <- P + P[i] * power`

**Multiplications**
The first line with a multiplication in it will occur roughly as many times as the outer loop, since the loop conditions are designed to reach finish at about the same time as each other. So we can say that the line  `power <- power * x` will occur $n$ times. 

The second line has only one multiplication in it, and it is part of the outer loop, not the inner loop. It will occur n times, as dictated by the outer loop. 
Disregarding any constants we can record the number of multiplications as
$$n \times n = n^{2}$$
Which is expected for nested loops like this. 

**Additions**
We can see only one line where additions are performed and it is in the outer loop `p <- P + P[i] * power` here. As dictated by the outer loop, it will occur roughly $n$ times. 
So we can record the number of additions as
$$n$$

# 6.6
## Q2
![[Pasted image 20240415213616.png]]
## ANS-2
We want to use a max heap algorithm to make a min heap.
Since we know the construction will be defined by the keys, the easiest thing to do would be to switch the direction of them in some way.
We can do that by making every key its negative 
`Key_1 -> -Key_1`
Then we run the algorithm for max heap, and afterwards we swap the signs back to positive for all the keys. 

This should leave us with a min heap. 
## Q10
![[Pasted image 20240415213631.png]]
## ANS-10
We can split the problem into two parts without much issue and treat it as independent minimization problems. 
$$\frac{1}{n} \sum\limits^{n}_{i=1} |x_{i}-x|$$
$$\frac{1}{n} \sum\limits^{n}_{i=1} |y_{i}-y|$$
We've maintained the original logic of the problem, while ensuring that it is a simpler issue to tackle than calculating the full Manhattan distance equation. 

So we now have two separate problems about finding the median of each set. We can run an algorithm to find the median of each set and add them in order to find the solution to our problem. 