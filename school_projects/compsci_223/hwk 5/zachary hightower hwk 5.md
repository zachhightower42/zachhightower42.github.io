CSCI 223 Computer Org. & Assembly Language

Homework #5

Zachary Hightower


1. Convert -8.125 to binary using IEEE 754 single precision standard. Show your work or no points will be given.

Ans-1:

Step 1: Determine the sign bit. 
We can observe that the sign for this number is negative, so our sign bit is 1. 

Step 2: Determine value in binary.
We have to multiply the floating point number's absolute value by the number of places past the decimal to get something usable for conversion. 

8.125 * 2^3 = 65

Once we have that, we can now do our conversion. 

65/2 = 32 R,1
32/2 = 16 R,0
16/2 = 8 R,0
8/2 = 4 R,0
4/2 = 2 R,0
2/2 = 1 R,0
1/2 = 0 R,1

We combine that, from the bottom up to get our converted value, and we place the decimal point in it. 

1000.001

Step 3: Determine adjusted value

We know that the number above is accurate for our calculation, but we do need it in a different form for the formula, so we take the absolute value binary calculation, and we move the decimal point all the way up to right behind the MSB.

1.000001

Step 4: Determine the exponent of our value

Mantissa = (Number of decimal places) + 127 
Mantissa = (3) + 127 = 130

130/2 = 65 R,0
65/2 = 32 R,1	
32/2 = 16 R,0	
16/2 = 8 R,0	
8/2 = 4 R,0	
4/2 = 2 R,0	
2/2 = 1 R,0	
1/2 = 0 R,1

130 = 10000010

Now, we just assemble it front to back. Sign bit, absolute value, exponent value

1100000110000010

This is our number, but we still need to add a whole bunch of 0s to the end as filling until we reach the 32 bit mark.

11000001100000100000000000000000

2. Convert 0x42AA4000 to floating point value using IEEE 754 single precision standard. Show your work or no points will be given.

Ans-1:

Step 1: Determine the sign bit. 
We can observe that the sign for this number is is 0, so our number is positive.

0  

Step 2: Determine value in binary.
We have to find the floating point's absolute value in this, which is the first 8 bits behind the x. This is 42A in hexadecimal notation, so we can take that. 

42A

Step 3: Determine exponent value
The remaining bits we can identify as part of the exponent value. We snip those from the hexadecimal and place them here

A4000 

Step 4: Determine the binary values of individual pieces

42A

We represent it in binary by picking apart the different hexadecimal values into their binary equivalents

4 = 0100 
2 = 0010
A = 1010

Which we then assemble front to back.

010000101010

We do the same thing for our exponent value

A4000 

A = 1010 
4 = 0100 
0 = 0000
0 = 0000
0 = 0000

Which we then assemble front to back.

10100100000000000000

Then the final binary value

01000010101010100100000000000000

Step 5: Construct our decimal value

0 is our sign bit, so we know it's positive


Then we can find our mantissa value

01010100100000000000000

1 + 1/4 + 1/16 + 1/64 + 1/512 = 1.330078125

Then we can find the exponent value

10000101 = 1 * 2^7 + 0 * 2^6 + 0 * 2^5 + 0 * 2^4 + 0 * 2^3 + 1 * 2^2 + 0 * 2^1 + 1 * 2^0 = 133 - 127 = 6

so the final calculation is 

1^0 * 2^6 * 1.330078125 = 85.125






 



