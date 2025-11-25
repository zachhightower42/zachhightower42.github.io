#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <limits.h>

// Global variables as specified
double average = 0;
int minimum = INT_MAX;
int maximum = INT_MIN;

// Pass data to threads
struct ThreadData {
    int* numbers;
    int count;
};

// Thread functions
void* calculate_average(void* param) {
    struct ThreadData* data = (struct ThreadData*)param;
    int sum = 0;
    
    for (int i = 0; i < data->count; i++) {
        sum += data->numbers[i];
    }
    
    average = (double)sum / data->count;
    pthread_exit(0);
}

void* find_minimum(void* param) {
    struct ThreadData* data = (struct ThreadData*)param;
    
    for (int i = 0; i < data->count; i++) {
        if (data->numbers[i] < minimum) {
            minimum = data->numbers[i];
        }
    }
    
    pthread_exit(0);
}

void* find_maximum(void* param) {
    struct ThreadData* data = (struct ThreadData*)param;
    
    for (int i = 0; i < data->count; i++) {
        if (data->numbers[i] > maximum) {
            maximum = data->numbers[i];
        }
    }
    
    pthread_exit(0);
}

int main(int argc, char* argv[]) {
    if (argc < 2) {
        printf("Usage: %s <at least one integer as input>\n", argv[0]);
        return 1;
    }

    // Convert command line arguments to integers
    int count = argc - 1;
    int* numbers = malloc(count * sizeof(int));
    
    for (int i = 0; i < count; i++) {
        numbers[i] = atoi(argv[i + 1]);
    }

    // Create thread data structure
    struct ThreadData data = {numbers, count};

    // Create threads
    pthread_t avg_thread, min_thread, max_thread;
    
    pthread_create(&avg_thread, NULL, calculate_average, &data);
    pthread_create(&min_thread, NULL, find_minimum, &data);
    pthread_create(&max_thread, NULL, find_maximum, &data);

    // Wait for threads to complete
    pthread_join(avg_thread, NULL);
    pthread_join(min_thread, NULL);
    pthread_join(max_thread, NULL);

    // Print results
    printf("The average value is %d\n", (int)average);
    printf("The minimum value is %d\n", minimum);
    printf("The maximum value is %d\n", maximum);

    // Free memory
    free(numbers);
    return 0;
}
