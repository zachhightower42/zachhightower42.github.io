/*
 * File: pa2collatz.c
 *
 * Description:
 * This program implements the Collatz conjecture.
 * It takes a positive integer as a CL argument and generates the Collatz
 * sequence starting from that number in the following form, where the starting n = 3
 * 3, 10, 5, 16, 8, 4, 2, 1
 *
 * Fork() is used to make a child process that handles calculating and printing the
 * Collatz sequence, while the parent process waits for completion.
 *
 * Functions:
 * - collatz_sequence(int n): Calculates and prints the Collatz sequence for a given n.
 * - main(int argc, char *argv[]): Handles CL arguments, creates child process,
 *   and manages program execution.
 *
 * Usage: ./pa2collatz <number>
 *
 * The program checks for valid input and provides error messages
 * as instructed by the examples in the pdf.
 */

// Header for functions
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

// Main function for handling the Collatz sequence calc and print
void collatz_sequence(int n)
{
    printf("%d", n);
    while (n != 1)
    {
        if (n % 2 == 0)
        {
            n = n / 2;
        }
        else
        {
            n = 3 * n + 1;
        }
        printf(", %d", n);
    }
    printf("\n");
}

// Error handling from line 51-63
// First error handler checks for proper user input
int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        printf("Usage: %s <starting value>\n", argv[0]);
        return 1;
    }
    // Second error handler checks for positive integer input
    int n = atoi(argv[1]);
    if (n <= 0)
    {
        printf("<starting value> should be a positive integer\n");
        return 1;
    }
    // fork() is used to create a child process for the Collatz sequence function
    pid_t pid = fork();
    // Logic for handling the child and parent
    if (pid < 0)
    {
        fprintf(stderr, "Fork failed\n");
        return 1;
    }
    else if (pid == 0)
    {
        // Child
        collatz_sequence(n);
        exit(0);
    }
    else
    {
        // Parent
        wait(NULL);
    }

    return 0;
}
