![[Pasted image 20240403195040.png]]
![[Pasted image 20240403195127.png]]
# ANS-A
The cache block offset will be the final 2 bits at the right portion of the table. This is because the cache lines are 4 bytes long. So we have to allocate the b in this formula $4=2^{b}$ to represent it.

The set index requires more, and is placed in the middle, between the cache offset and the tag. The cache set index needs two bits as well, since it must have enough to represent $2\times2$ places in the memory, so it must be the amount of s in the following formula $4=2^s$ So we can see that it must be 2 bits as well.

The cache tag takes up the remaining bits. Since we have 12 bits total, and we've used 4, we can see that the tag takes up $12-4=8$ bits. It goes in the front.  


| 11  | 10  | 9   | 8   | 7   | 6   | 5   | 4   | 3   | 2   | 1   | 0   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CT  | CT  | CT  | CT  | CT  | CT  | CT  | CT  | CI  | CI  | CO  | CO  |


# ANS-B
Now we want to send some instructions and check to see if they will function in our cache. 

| Operation | Address | Hit? | Read value(or unknown) |
| --------- | ------- | ---- | ---------------------- |
| Read      | 0x834   |      |                        |
| Write     | 0x836   |      |                        |
| Read      | 0xFFD   |      |                        |
The first address we want to read is at
$0x834$ 

Which in binary is
100000110100

We can put it into our table and

| 11  | 10  | 9   | 8   | 7   | 6   | 5   | 4   | 3   | 2   | 1   | 0   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1   | 0   | 0   | 0   | 0   | 0   | 1   | 1   | 0   | 1   | 0   | 0   |


See where all the bits fall. 
CT= 10000011=83
CI =01=1
CO=00=0

Now we reference our table
Set index 1
Look inside for tag 83
We found it
It's valid
So we can record a **hit** 
Next we want to read the byte at offset 0
It is non-null, we read the value of **FE** 
We read only the value of FE, since out offset is 0, we only read only the first byte

The second address we want to read is at
$0x836$ 

Binary
100000110110

CT= 10000011=83
CI =01=1
CO=10=2

Now we reference our table
Set index 1
Look inside for tag 83
We found it
It is not valid
So we record a **miss**
And we can record unknown for our read value, since we aren't actually reading anything


The third address we want to read is at
$0xFFD$ 

Binary
111111111101

CT= 11111111=FF
CI =11=3
CO=01=1

Now we reference our table
Set index 3
Look inside for tag FF
We found it
It is valid
So we record a **hit**
And we want to read byte 1, because our offset value is 1
So the reader will return **C0** 

| Operation | Address | Hit? | Read value(or unknown) |
| --------- | ------- | ---- | ---------------------- |
| Read      | 0x834   | hit  | FE                     |
| Write     | 0x836   | miss | (unknown)              |
| Read      | 0xFFD   | hit  | C0                     |
