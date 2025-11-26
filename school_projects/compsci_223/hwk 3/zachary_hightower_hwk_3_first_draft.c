//Zach Hightower Homework 3 in class 223 - Using option 5 from provided list
//Imports
#include <stdio.h>
#include <time.h>
//Global variable
#define size 512

// Function to measure the performance of version 1
void version1(int src[size][size], int dst[size][size]) {
    int i, j;
    for (i = 0; i < size; i++)
        for (j = 0; j < size; j++)
            dst[j][i] = src[j][i];
}

// Function to measure the performance of version 2
void version2(int src[size][size], int dst[size][size]) {
    int i, j;
    for (j = 0; j < size; j++)
        for (i = 0; i < size; i++)
            dst[j][i] = src[j][i];
}

int main() {
    // Initialize arrays
    int src[size][size];
    int dst[size][size];

   

    // Measure performance version 1
    clock_t start_time = clock();
    for (int iter = 0; iter < 30000; iter++) {
        version1(src, dst);
    }
    //Calculate average 1
    clock_t end_time = clock();
    double version1_avg_time = ((double) (end_time - start_time)) / CLOCKS_PER_SEC / 30000;

    // Measure performance version 2
    start_time = clock();
    for (int iter = 0; iter < 30000; iter++) {
        version2(src, dst);
    }
    //Calculate average2
    end_time = clock();
    double version2_avg_time = ((double) (end_time - start_time)) / CLOCKS_PER_SEC / 30000;

    // Print
    printf("Version 1 Avg Time: %lf milliseconds\n", version1_avg_time);
    printf("Version 2 Avg Time: %lf milliseconds\n", version2_avg_time);
    printf("Using 2-D array size = 512x512 and Iterations = 30000 \n");

    return 0;
}

