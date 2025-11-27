Exercises 8.1: 1, 6, 

Exercises 8.2: 2

Exercises 8.3: 4, 5, 7

Exercises 8.4: 1, 7, 11

Due May 1st.
# 8.1
## Q1
![[Pasted image 20240425205116.png]]
## ANS-1
Dynamic programming and divide and conquer are both primarily about breaking up a problem into smaller, more manageable pieces. 

The principal difference between them is that divide and conquer does not really store solutions to smaller instances of the overall problem. Dynamic programming's whole basis is built on that. 

## Q6
![[Pasted image 20240425205612.png]]
## ANS-6
We want to solve the problem using dynamic programming, so we need to define the sub problems. We can see that each problem is going to be a form of checking the total sale price that we can get by cutting the rod length i into inter pieces. 

We also want to find the recurrence relation to understand the time and space complexities of the problem. This is going to be related to our solution structure. Where we want to get the rod of length i and then iterate through all the possible cuts that we can make. We can call the array of possible cuts j and define it as $1 \le j \le i$ so that we can calculate the maximum sale price. 

So our algorithm will look something like 

**ALGORITHM** `max_price(n, p)` 
`//where n and p represent the length of the rod and the total array of prices`
`mp = [0] * (n+1)`

`for i in range 1 to n+1, step 1`
	`for j in range 1, i +1, step 1`
		`mp[i] = max(mp[i], p[j] + mp[i-j])`
`return mp[n]`

**Time efficiency**
The time efficiency of the algorithm is going to be $O (n^{2})$ because the algorithm uses two nested loops that both iterate over sets of size n. 

**Space efficiency**
The space efficiency is a little better, it should just be roughly $O(n)$ since we're using an array of size n+1 to store the max sale prices. 
# 8.2
## Q2
![[Pasted image 20240425210009.png]]
## ANS-2-A
**ALGORITHM** `knapsackSolve(weights, values, capacity)`
`for i, 0 to n, do`
	`V[i,0] = 0`
`for j, 1 to W, do`
	`V[0,j] = 0`
`for i, 1 to n, do`
	`if j - w[i] >= 0` 
		`V[i,j] = max (V[i-1,j],v[i] + V[i-1,j-w[i]])`
	`else-if V[i,j] == v[i-1,j]`
`return V[n,W],V`

## ANS-2-B
**ALGORITHM** `knapsackOptimalSub(weights, values, capacity)`
`s = 0` 
`j = W`
`A = new Array`
`for i, n to 1, do`
	`if V[i,j] > V[i-1, j]`
		`k=k+1`
		`L[k] = i`
		`j = j-w[i]`
`return L`
# 8.3
## Q4
![[Pasted image 20240425210213.png]]

## ANS-4 check explanation 
We want to have a way to find the sums of 
$$\sum\limits^{j}_{s=i}p_{s}$$
So that we can use it in the algorithm for constructing an optimal binary search tree. We also want to have it in constant time, per sum. 

We can manage this by computing 
$$S_{k} = \sum\limits^{k}_{s=1}p_{s}$$
for $k~from~1...n$  with $S_{0}=0$ 

This sets us up to find the result we want, by searching for $S_{j}-S_{i-1}$ so long as $1\le i \le j \le n$ 
Which is essentially creating an array of the possible differences and finding what we want within that array. 
## Q5 
![[Pasted image 20240425210231.png]]
## ANS-5
False, it does not always contain the key with the highest search probability. If we have A,B, and C with search probabilities
A = .2
B = .2
C = .3

We can compute the number of comparisons with root C as
$$0.2\times2+0.2\times3+0.3\times1=1.3$$
And then with root B as
$$0.2\times1+0.2\times2+0.3\times2=1.2$$

This shows a clear contradiction of the statement under consideration. The root does not contain the key with the highest search probability. 
## Q7
![[Pasted image 20240425210254.png]]
## ANS-7-A
We know that $b(n)$ is the number of distinct binary search trees. $n$ is the number of nodes, or keys. 

The left subtree of the binary search tree has k nodes, where k is a number that is within these bounds
$$0 \le k \le n -1$$
The right subtree, then, must have 
$$n-1-k$$ nodes, or keys in it. 

Now we can determine the number of different kinds of trees that can exist in this form. 
$$b(k)b(n-1-k)$$
Which means that our original statement is true. 
## ANS-7-B
We can just put the values 1 to 5 into the formula as the n, and into the Catalan number formula to find out whether or not the two are equal. 

We already know the formula we derived. 
The formula for the nth Catalan number is as follows
![[Pasted image 20240427205120.png]]

| n              | 1   | 2   | 3   | 4   | 5   |
| -------------- | --- | --- | --- | --- | --- |
| b(n)           | 1   | 2   | 5   | 14  | 42  |
| c(n) *Catalan* | 1   | 2   | 5   | 14  | 42  |
We can see that they give the same results. 
## ANS-7-C
We know that b(n) is equal to c(n), meaning that we can write the equation for the order of growth as
$$Growth=\frac{(2n)!}{(n!)^{2}}\times \frac{1}{n+1}=\frac{\sqrt{2\pi2n}(\frac{2n}{e})^{2n}}{[2\pi n (\frac{n}{e})^{n}]^{2}}\times \frac{1}{n+1}=\frac{\sqrt{4\pi n}(\frac{2n}{e})^{2n}}{[2\pi n (\frac{n}{e})^{n}]^{2}}\times \frac{1}{n+1}$$
$$\frac{1}{\sqrt{\pi n }} (\frac{\frac{2n}{e}}{\frac{n}{e}})^{2n} \times \frac{1}{n+1}=\frac{1}{\sqrt{\pi n}} 2^{2n} \times \frac{1}{n+1}$$
So we can conclude that a rough estimate of the growth order is
$$\Theta(4^{n}\times n^{-\frac{3}{2}})$$
So we have a high growth order for finding the optimal binary search tree in the brute force, exhaustive lookup way. It's only useful for small values of n where the process will not take an enormous length of time, and the gap between the effectiveness of the dynamic programming approach and the exhaustive search won't show as much. 

# 8.4
## Q1
![[Pasted image 20240425211137.png]]
## ANS-1
We begin with the graph as presented

| 0   | 1   | 0   | 0   |
| --- | --- | --- | --- |
| 0   | 0   | 1   | 0   |
| 0   | 0   | 0   | 1   |
| 0   | 0   | 0   | 0   |

To apply Warshall's algorithm, we need to treat the first column and row as the intermediate and calculate the distance from it to the other nodes contained in the table. 
So we can represent it as a slightly larger graph, where we have a b c d as designations for rows and columns. We will present points in row, then column


|     | a   | b   | c   | d   |
| --- | --- | --- | --- | --- |
| a   | 0   | 1   | 0   | 0   |
| b   | 0   | 0   | 1   | 0   |
| c   | 0   | 0   | 0   | 1   |
| d   | 0   | 0   | 0   | 0   |

 $R^{0}$ No change from original

|     | a   | b   | c   | d   |
| --- | --- | --- | --- | --- |
| a   | 0   | 1   | 0   | 0   |
| b   | 0   | 0   | 1   | 0   |
| c   | 0   | 0   | 0   | 1   |
| d   | 0   | 0   | 0   | 0   |
$R^{1}$ No change from previous

|     | a   | b   | c     | d   |
| --- | --- | --- | ----- | --- |
| a   | 0   | 1   | **1** | 0   |
| b   | 0   | 0   | 1     | 0   |
| c   | 0   | 0   | 0     | 1   |
| d   | 0   | 0   | 0     | 0   |

$R^{2}$ We change position a,c because in the previous graph a,b and b,c were both 1, meaning we must change a,c to a 1
Changes in bold
No other changes need to be made.

|     | a   | b   | c   | d   |
| --- | --- | --- | --- | --- |
| a   | 0   | 1   | 1   | **1**   |
| b   | 0   | 0   | 1   | **1**   |
| c   | 0   | 0   | 0   | 1   |
| d   | 0   | 0   | 0   | 0   |
$R^{3}$ We change position b,d because in the previous graph, c,d is 1 and b,c is 1

We also change position a,d because in the previous graph, c,d is 1 and a,c is 1

After doing this, we've arrived at the transitive closure
Changes in bold
No other changes need to be made
## Q7
![[Pasted image 20240425211221.png]]
## ANS-7
We want to apply Floyd's algorithm to the digraph weight matrix above


|     | a        | b        | c        | d        | e        |
| --- | -------- | -------- | -------- | -------- | -------- |
| a   | 0        | 2        | Infinity | 1        | 8        |
| b   | 6        | 0        | 3        | 2        | infinity |
| c   | infinity | infinity | 0        | 4        | infinity |
| d   | infinity | infinity | 2        | 0        | 3        |
| e   | 3        | infinity | infinity | infinity | 0        |

No change from original

|     | a        | b        | c        | d     | e        |
| --- | -------- | -------- | -------- | ----- | -------- |
| a   | 0        | 2        | Infinity | 1     | 8        |
| b   | 6        | 0        | 3        | 2     | **14**   |
| c   | infinity | infinity | 0        | 4     | infinity |
| d   | infinity | infinity | 2        | 0     | 3        |
| e   | 3        | **5**    | infinity | **4** | 0        |
We have a new shortest path for position b,e = 14, this is given by the path using a,e = 8 and b,a = 6

We have a new shortest path for position e,b = 5, this is given by the path using e,a = 3 and a,b = 2 

We have a new shortest path for position e,d = 4, this is given by the path using a,d = 1 and e,a = 3


|     | a        | b        | c     | d   | e        |
| --- | -------- | -------- | ----- | --- | -------- |
| a   | 0        | 2        | **5** | 1   | 8        |
| b   | 6        | 0        | 3     | 2   | 14       |
| c   | infinity | infinity | 0     | 4   | infinity |
| d   | infinity | infinity | 2     | 0   | 3        |
| e   | 3        | 5        | **8** | 4   | 0        |
We have a new shortest path for a,c = 5, this is given by the path using a,b = 2, and b,c = 3

We have a new shortest path for e,c = 8, this is given by the path using e,b = 5 and b,c = 3


|     | a        | b        | c   | d   | e        |
| --- | -------- | -------- | --- | --- | -------- |
| a   | 0        | 2        | 5   | 1   | 8        |
| b   | 6        | 0        | 3   | 2   | 14       |
| c   | infinity | infinity | 0   | 4   | infinity |
| d   | infinity | infinity | 2   | 0   | 3        |
| e   | 3        | 5        | 8   | 4   | 0        |
No changes


|     | a        | b        | c     | d   | e     |
| --- | -------- | -------- | ----- | --- | ----- |
| a   | 0        | 2        | **3** | 1   | **4** |
| b   | 6        | 0        | 3     | 2   | **5** |
| c   | infinity | infinity | 0     | 4   | **7** |
| d   | infinity | infinity | 2     | 0   | 3     |
| e   | 3        | 5        | **6** | 4   | 0     |
We have a new shortest path for a,c = 3, this is given by the path using a,d = 1 and d,c = 2

We have a new shortest path for a,e = 4, this is given by the path using d,e = 3 and a,d = 1

We have a new shortest path for b,e = 5, this is given by the path using b,d = 2 and d,e = 3

We have a new shortest path for c,e = 7, this is given by the path using c,d = 4 and d,e = 3

We have a new shortest path for e,c = 6, this is given by the path using e,d, = 4 and d,c = 2


|     | a   | b   | c   | d   | e   |
| --- | --- | --- | --- | --- | --- |
| a   | 0   | 2   | 3   | 1   | 4   |
| b   | 6   | 0   | 3   | 2   | 5   |
| c   | **10**  | **12**  | 0   | 4   | 7   |
| d   | **6**   | **8**   | 2   | 0   | 3   |
| e   | 3   | 5   | 6   | 4   | 0   |
We have a new shortest path for c,a = 10, this is given by the path using c,e = 7 and e,a = 3

We have a new shortest path for c,b = 12, this is given by the path using c,e =7 and e,b = 5

We have a new shortest path for d,a = 6, this is given by the path using e,a = 3 and d,e =3

We have a new shortest path for d,b = 8, this is given by the path using e,b = 5 and d,e = 3

After the last iteration, we have the finished all pairs shortest path graph

## Q11
![[Pasted image 20240425211245.png]]
## ANS-11

The first thing we need to do as mentioned by the problem itself is concern ourselves with whether or not the straws are connected. 

We can determine whether they intersect by checking the paths through which the straws intersect using a brute force algorithm with quadratic time complexity. Essentially checking whether the endpoints of straws are the same and how many are the same for however many straws share the endpoints. 

After we determine this, we can record the information about the intersection or non-intersection in a matrix. It should be $n\times n$ and that will allow us to find the transitive closure of the graph using a DFS search, adding $n^2$ time to our solution to the problem. 