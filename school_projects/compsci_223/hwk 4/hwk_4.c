#include <stdio.h>
// Code 1: write a code that prints "x" in binary
void printBinary(int x)
{

    // Size of integer in bits
    int size = sizeof(int) * 8;

    // Loop through each bit from left to right
    for (int i = size - 1; i >= 0; i--)
    {
        // Use bitwise AND to check the value of current bit
        int bit = (x >> i) & 1;

        // Print
        printf("%d", bit);

        // Add spaces
        if (i % 4 == 0)
        {
            printf(" ");
        }
    }

    printf("\n");
}

// Code 2: print the address of variable "x" in hex
void printHexAddress(void *ptr)
{
    printf("Address of the variable: %p\n", ptr);
}

// code 3: write code that finds out whether your machine is little-endian or big-endian
void littleOrBig()
{
    unsigned int i = 1;
    char *c = (char *)&i;
    if (*c)
        printf("Little-endian\n");
    else
        printf("Big-endian\n");
    getchar();
}

// Code 4: Write code that toggles (0-->1, 1-->0) the bit #7 of "x" without disturbing other bits.
// Then print "x" before and after toggling in hex)

void toggleSeventhBit(int *x)
{
    // Print original value
    printf("Value in hex before seventh bit toggle\n");
    printf("Value = %x", *x);
    printf("\n");

    // Use bitwise XOR to toggle the seventh bit
    printf("TOGGLE");
    *x ^= (1 << 6);

    // Print updated value
    printf("Value in hex after seventh bit toggle:\n");
    printf("Value = %x", *x);
    printf("\n");
}

// Code 5: Print the value of "x" before and after "right shift by 3"
void printRightShift(int x)
{
    // Print the original value of x
    printf("Current value of x: %d\n", x);

    // Right shift x by 3
    printf("Right shift by 3\n");
    x = x >> 3;

    // Print the updated value of x
    printf("Value of x after right shift by 3: %d\n", x);
}

int main()
{
    int x;
    scanf("%d", &x);

    // Code 1: write a code that prints "x" in binary
    printf("Step 1:\n");
    printBinary(x);
    // Code 2: print the address of variable "x" in hex
    printf("Step 2:\n");
    printHexAddress(&x);
    // code 3: write code that finds out whether your machine is little-endian or big-endian
    printf("Step 3:\n");
    littleOrBig();
    // Code 4: Write code that toggles (0-->1, 1-->0) the bit #7 of "x" without disturbing other bits.
    // Then print "x" before and after toggling in hex)
    printf("Step 4:\n");
    toggleSeventhBit(&x);
    // Code 5: Print the value of "x" before and after "right shift by 3"
    printf("Step 5:\n");
    printRightShift(x);
    return 0;
}