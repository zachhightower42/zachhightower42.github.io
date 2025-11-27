Homework 4
Exercises 4.1: 2, 5
Exercises 4.2: 1, 6, 
Exercises 4.3: 1, 7, 12
Exercises 4.4: 2, 7, 8
Exercises 4.5: 1, 7, 8, 12, 13

Due Mar. 22.

# 4.1
## Q2
![[Pasted image 20240315174055.png]]
## Ans-2-A
We have glasses from 2n -> 1. The first n glasses are full of soda. The n -> 2n glasses are empty. We want the pattern to be full, empty, full, empty... So the first glass should be full, and the last glass should be empty. We know that's already taken care of. So we can advance one step each from both sides of the glasses. 
We can consider our 'pointers' to move from 1 to 2 and from 2n to 2n-1.
We want glass 2 to be empty and we want glass 2n-1 to be full. So we take the soda from glass 2 and pour it into glass 2n-1.
We go to the next glasses. 2 -> 3 and from 2n-1  -> 2n-2.
3 should be full and 2n-2 should be empty.
We advance again. 3 -> 4 and 2n-2 -> 2n-3.
We pour 4 into 2n-3. 
Then we continue this pattern until we meet in the middle. 
If we go with this pattern, the amount of time to solve the problem will be $$\frac{n}{2}$$ If 2n is an even number. If it is not, then we may assume it takes one less action to reach a solution, meaning that the time complexity / actions to solve will go down to. 
$$\frac{n-1}{2}$$

## Ans-2-B
If the glasses are initially in a random order, a solution to the problem could be checking for all the glasses of a certain kind, say we go with empty because there's less likelihood of spillage happening when we move them, and then arranging those glasses to fit the pattern. This should be relatively simple, since the pattern really only has two parts. Full glass -> empty glass.

Step 1: Count all empty glasses
Step 2: For every full glass we encounter in this count, take an empty glass from our list of empty glasses and put it next to the full glass. 
Step 3: Check pattern

Counting the number of moves this is likely to take, we can use the following formula
$$\frac{n\times(2n-n)}{2} = \frac{n^{2}}{2}$$
Because in the worst case scenario we would have to perform an exponentially larger amount of swaps than we would have to if we had the scenario in **2-A**



## Q5
![[Pasted image 20240315174418.png]]
![[Pasted image 20240319171455.png]]
No, it won't work for every sort of undirected graph with n >0 vertices. 
We can construct a graph that will cause this algorithm to return a false positive. Let's say we have the following adjacency matrix graph. 


| a   | b   | c   |
| --- | --- | --- |
| 0   | 1   | 0   |
| 1   | 0   | 1   |
| 0   | 1   | 0   |
We don't have on vertex, so it passes the first test in the algorithm. 
It then moves onto the second step where it begins to recursively remove the last row and column. So it becomes.

| a   | b   |
| --- | --- |
| 0   | 1   |
| 1   | 0   |
So the algorithm will check this, and conclude that the graph is connected, which is not true. This is due to the fact that by removing one vertex, we've disconnected the graph.

So this serves as an example of at least one sort of graph with n > 0 vertices on which the algorithm won't work.

# 4.2
## Q1
![[Pasted image 20240315174506.png]]
## Ans-1-A
We want to do a DFS traversal on diagraph (a), so we can start with
a->b->e
Where we stop the first time. We've searched as much as we can through the current tree, so we back up and look at at different path. 
g->f
This is as far as we can move down this tree as well. We then look at
c
Which is as far as we can go down any associated tree. We then look at
d
Which is as far as we can go down that particular tree

So, constructing our list from when the vertices are popped off of our LIFO style stack (Last In First Out) we get the following list. 
$e,f,g,b,c,a,d$

However, because we're sorting this list topologically, we need to reverse this order. 
$d,a,c,b,g,f,a$
## Ans-1-B
We can tell that the diagraph of b is not a directed acyclic graph. It hits a back edge whenever we go from g -> e. This gives us the following list when we use it with our stack. 
$e,g,d,c,b,a$
This is the cycle starting at a and moving around the border of the graph, until it reaches the back edge position, where it jumps from g -> e, navigating around f.

## Q6
![[Pasted image 20240315174753.png]]
## Ans-6-A
We can solve this by contradiction, since we've got plenty of practice with that over the course of using the general structure while analyzing recursive algorithms. 

**Proof by Contradiction**
*Assumption:* There exists a DAG with every vertex having an incoming edge.

**Step 1:** We reverse all the edges. 
**Step 2:** Check and confirm that every vertex now has at least one outgoing edge.
**Step 3:** Choose any vertex
**Step 4:** Follow the chain of outgoing edges
**Step 5:** Arrive at a directed cycle after visiting |V|, where |V| is the number of vertexes. 

Since we've found a contradiction in our assumption, we know that the original statement is true. 

## Ans-6-B
A vertex of a DAG is a source if it looks like **a** in the table below. Where when we look at it in the adjacency matrix, all it has associated with it are 0s. 


| a   | b   | c   | d   |
| --- | --- | --- | --- |
| 0   | 1   | 1   | 0   |
| 0   | 0   | 0   | 0   |
| 0   | 1   | 0   | 1   |

The time complexity of it is
$$|V|^2$$
Where |V| is the number of vertexes in the graph. Searching is this time complexity because in the absolute worst case, it would need to search through the entire graph to confirm it had found one of these columns containing only 0s. 
## Ans-6-C
A vertex in a DAG only has outgoing edges, so when we have a DAG represented by adjacency lists, it would not appear in any of them. So, we just need to check through the lists and see if one of the vertexes never appears. 

Doing that will take
$$|V|+|E|$$
Where |V| is the total number of vertexes and |E| is the total number of edges. 
# 4.3
## Q1
![[Pasted image 20240315174844.png]]
## Ans-1
We can represent all the different choices by 25 falling, or 25!
That gives us the following formula
$$25!=25 \times 24\times23...$$
Which is equal to $1.551121004×10²⁵$
So it does not appear to be reasonable to do so, since performing that many operations would likely take a massive length of time.

The other portion of the question asks about whether it would be reasonable to calculate the subsets of such a set. We can find that through another simple formula. 
$$2^{25}=2\times2\times2...$$
Which is equal to $33554432$ which means that it would be significantly easier to perform that amount of calculations with modern computing equipment. We can say that this one is reasonable. 
## Q7
![[Pasted image 20240315174859.png]]
## Ans-7
**ALGORITHM** `generateString (n)`
`if n=0`
	`print (list)`
`else`
	`list.append(0);  generateString(n-1)`
	`list.append(1); generateString(n-1)`

## Q12
![[Pasted image 20240315174912.png]]
## Ans-12
We can consider this as a representation of binary numbers, since each switch has 2 states. Off, 0, and on, 1. 

So we know that the switches can be mapped directly to representations of binary numbers. We can consider the next portion of the question, we do not know the state of the switches at the moment. We can consider this to be the binary key. We cannot know the position of the switches at any point, and there is no way to find out with a specific, linear formula. So, we have to perform a time consuming iteration over the switches. 

We must iterate over the switches in accordance to every binary number that might be contained within, save for one, since we can assume that the switches are not all 1 or on. So we check all binary numbers according to the following range

$$0~to~(2^{n}-1)$$
**ALGORITHM** `turnLightOn(n)`
`switches = array of size n //set to all 0 to test worst case`
`count = 0 //count keeps track of how many toggles we do`
`//where checkSwitches returns False, while there are any switches still 0 in our switches array`
`//switchToggle is a function that for every i from 0 to n-1, checks if the switch is 0, if it is, then it toggles the switch to 1, otherwise, it will toggle it to 0`
`while not checkSwitches(switches) do:` 
	`switchToggle(n, switches)`
	`count= count +1`
`return count`

**FUNCTION** `switchToggle(n, switches)`
`for i from 0 to n-1 do:`
	`if switches[i] == 0 then:`
		`switches[i] = 1`
	`else:`
		`switches[i] = 0`

**FUNCTION** `checkSwitches (switches)`
`for each switch in switches do:`
	`if  switch == 0 then:`
		`return False`
`return True`
# 4.4
## Q2
![[Pasted image 20240315175820.png]]
## Ans-2
**ALGORITHM** `floorLog(n)`
`if n=1` 
	`return 0`
`else`
	`return floorLog(floor_of(n/2))+1`

This accomplishes finding the floor of $log_{2}n$ recursively, so we can examine the recurrence relation for the algorithm to determine the time complexity. 
We know that for 1 
$$a(1)=0$$
And that for all values > 1 
$$A(n)=A(\frac{n}{2})+1=\frac{n}{2}+1=\frac{n}{4}+ \frac{1}{2}+1...$$
$$\frac{n}{4}+ \frac{1}{2}+1=\frac{n}{2^{k}}+ \frac{1}{2^{k-1}}+1...log_2n $$
So, we can see that the recursive algorithm will iterate for a fractional amount of n additions. We can see that this time estimate should be smaller than linear, greater than constant. The time complexity of the operation should therefore be
$$\Theta(log~n)$$


## Q7
![[Pasted image 20240315175833.png]]
## Ans-7
We can treat the conceptual problem solving task as an application of binary search.

We want to divide each time we ask a question by as much as is possible. If the pictures all have certain things in common, we can ask whether 21 of the pictures contain the feature that the target picture has, or use some form of dividing line above which the target picture is, and below which the target picture is not. 

Visualization below:
![[Pasted image 20240322154134.png]]
So we can ask questions that keep dividing, dividing, dividing our search field into smaller and smaller pieces, eliminating as much as we can each time and always disregarding anything we've already eliminated.

Since we've modeled this on the binary search algorithm, we can use that to help us figure out the largest number of questions that might be necessary if we can achieve the results in the above scenario. We have n = 42 in the formula of
$$log_2(42)=5.392317$$
Which we can round up to 6, since we can't ask partial questions. 

## Q8
![[Pasted image 20240315175848.png]]![[Pasted image 20240315175903.png]]
## Ans-8-A
The algorithm is a decrease by a third sort, which is a subset of the decrease by a constant factor style of algorithm. 

## Ans-8-B
We can assume that the worst case for the number of key comparisons is going to be whatever the search for one third of the array is, in addition to two other searches. This is because we are only going to search through one third of the total sorted array once we know where to look, so the relation will look like the following
$$T(n)=2+T(\frac{n}{3})$$
When n = $3^{k}$

## Ans-8-C
$$T(3^{k})=2+T(3^{k-1})+2+T(3^{k-2})...2k+T(3^{k-k})=2~log_{3}n+1$$

## Ans-8-D
We can find the worst cast of binary search to be $log_{2}n+1$ because it splits it into only two, so we won't run into the issue of having to compare multiple different parts in worst case scenarios. 

So, on one hand we have $2log_{3}n+1$ and on the other we have  $log_{2}n+1$ 
$$\lim_{n->\infty}\frac{2log_{3}n+1}{log_{2}n+1}=\infty$$
This is true due to the constants associated with $2log_{3}n+1$ being larger than the constants associated with $log_{2}n+1$ , though it is not massively different, and it will grow to the infinite difference fairly slowly. 


# 4.5
## Q1
![[Pasted image 20240315180101.png]]
## Ans-1-A
Measuring the size of the computation by the second number n, we can look at how the next result would be obtained. 
$$gcd(m,n)=i\times n ~+k $$
Where i represents the amount we need to multiply n by to reach m, without going over, and k represents the necessary number we need to add to reach m, if necessary. 

We know that the amount will, by several iterations of this usually, approach k = 0, though it can happen immediately. It will always decrease by a fairly large amount, but how do we quantify that knowing the information we do?

We can say that the size of the new pair will be $m~mod~n$ because m will be decreased according to the size of n. So the amount of decrease is always a factor of n. 

## Ans-1-B
We want to find whether or not an instance size will decrease by at least a factor of two after two successive iterations of Euclid's algorithm. 

So, $gcd(m,n)$ will decrease by $m~mod~n$, we will then run the equation a second time with our form being $gcd(n,k)$ where k=$m~mod~n$ 

$$gcd(m,n)~->gcd(n,(m~mod~n))=n~mod~(m~mod~n)$$
So we can see that we will have performed the modulo operation twice, the first time decreasing by a factor of n, the second time decreasing by a factor of $(m~mod~n)$ 
So, we can say that we have decreased,  by the end of the second iteration, by at least a factor of two. 

## Q7
![[Pasted image 20240315180118.png]]
## Ans-7-A
We want to continually go to the right subtree and search for a node with the empty right subtree. That means we've found what we want, and we set our return as the key of this node.  

This is a variable-size-decrease algorithm because after each time we step to the right, we're working with a smaller and smaller instance of the problem. 

## Ans-7-B
The worst case efficiency for our time here is linear
$$OT(n)$$
Because in the worst case we could start at the leftmost end of the binary search tree and have to iterate over the tree of length n to find what we're looking for. 

## Q8
![[Pasted image 20240315180132.png]]
## Ans-8-A
We want to delete a key from a binary search tree. There are going to be several different scenarios we need to consider to make sure we have a fully implemented delete that does not ruin the binary search tree's shape

**Scenario 1:** Check to see if the key is part of a leaf. If it is, we need to set the pointer from the parent of the key to null. It may not be possible to do this if the leaf does not have a parent, in this case, it is the root of a single node tree, so we can simply make the entire tree empty. 

**Scenario 2:** Check to see if the key we want to delete is part of a node with one other child, if this is the case, we need to take the pointer from the parent of the key's node and set it to that child node. This may not be possible, again, in the case of very small trees. If the node we want to delete is the root and the child is an offshoot of the root, we can simply set the child as the new root.

**Scenario 3:** Check to see if the key we want to delete is in a node with two child nodes. This is a more complex negotiation than the previous ones. We need to find the smallest key in the right subtree of the node of our key to be deleted. Then, we want to swap this key, with the key in our node to be deleted. Finally, we can delete the key selected for deletion. 

This algorithm isn't a variable-size-decrease algorithm because it doesn't work by reducing the problem. At no point do we need to consider a smaller and smaller case of our original problem, it's just finding the correct key to delete, and preserving the structure of the binary search tree. 

## Ans-8-B
We want to find the worst case for this proposed algorithm. The worst case will be defined by the amount of steps we need to take in finding the key to be deleted, since most of the other steps are not particularly complex. This means that the worst case is deleting the root of a binary tree that is of length n on the right side. We need to go all the way down the subtree on the right in order to find the key to manipulate, so our time efficiency for that will be
$$O~T(n)$$
Linear

## Q12
![[Pasted image 20240315180150.png]]
## Ans-12
We want to have the biggest pancake on the bottom, and the smallest on top. We can consider this a descending sort problem.

Step 1: Find the biggest pancake
Step 2: Slip the flipper under the biggest pancake, and flip it. This brings the biggest pancake to the top of the stack. 
Step 3: Flips the stack with the biggest pancake again, so that the biggest pancake now rests on the bottom
Step 4: Repeat steps 1 to 3, for big-1 size pancake, then big -2 size pancake, etc...  Don't touch any pancakes we've already done steps 1 to 3 to, since it's now in the correct spot

**ALGORITHM** `panSort (stack)`
`n = length(stack)`
`for i in range of(n-1) to (1), step -1`
	`max = find_largest_pancake(stack, i+1)`
	`flip(stack, max)`
	`flip(stack, i)`
`return stack`
## Q13
![[Pasted image 20240315180158.png]]
## Ans-13
We're searching for a number, call it $x$ in the n by n matrix, where every row and column are sorted in increasing order. 

I think we can make an O(n) algorithm using those facts. 

**Step 1:** Starts from the top right corner, compare the target number with the element our pointer is at. 

**Step 2:** If the pointer element and the target number are equal, we found it, return the number

**Step 3:** If the target number is less than the element we're pointing at, move left

**Step 4:** If the target number is greater, move down

We'll keep performing steps 2 to 4 until we find the target element, or we've eliminated all the spaces it could possibly be. 

**ALGORITHM** `targetSearch(matrix, target_num)`
`rows, columns = length(matrix), length(matrix) //initializing`
`row, column = 0, columns -1 //Starting from top right`

`while row < rows and column >= 0`
	`if matrix[row][column] == target_num`
		`return target_num`
	`else-if matrix[row][column] < target_num`
		`row+=1`
	`else-if`
		`column -=1`

`return error: "not in matrix"`


The algorithm should only need to search through half of the matrix, since it is constantly eliminating either a row or a column, so it should only take $O(n)$ time in the worst case. 