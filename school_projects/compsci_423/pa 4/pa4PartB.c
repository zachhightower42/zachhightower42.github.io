// compilation instruc: gcc -o pa4PartB.out pa4PartB.c -lpthread -lm
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <math.h>

// Global variable to store points inside circle
long long points_in_circle = 0;
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

// Function to generate random double between 0 and 1
double random_double() {
    return random() / ((double)RAND_MAX + 1);
}

// Thread function to generate points
void* generate_points(void* arg) {
    long long points_per_thread = 50000000 / *((int*)arg);
    long long local_points_in_circle = 0;
    double x, y;

    for (long long i = 0; i < points_per_thread; i++) {
        x = random_double();
        y = random_double();
        
        if (sqrt(x*x + y*y) < 1.0) {
            local_points_in_circle++;
        }
    }
    
    pthread_mutex_lock(&mutex);
    points_in_circle += local_points_in_circle;
    pthread_mutex_unlock(&mutex);
    
    pthread_exit(NULL);
}

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Usage: %s <number of threads>\n", argv[0]);
        return 1;
    }

    int num_threads = atoi(argv[1]);
    if (num_threads <= 0) {
        printf("<number of threads> should be a positive integer\n");
        return 1;
    }

    pthread_t *threads = malloc(num_threads * sizeof(pthread_t));
    
    // Create threads to generate points
    for (int i = 0; i < num_threads; i++) {
        if (pthread_create(&threads[i], NULL, generate_points, &num_threads) != 0) {
            fprintf(stderr, "Error creating thread\n");
            free(threads);
            return 1;
        }
    }
    
    // Wait for all threads to complete
    for (int i = 0; i < num_threads; i++) {
        if (pthread_join(threads[i], NULL) != 0) {
            fprintf(stderr, "Error joining thread\n");
            free(threads);
            return 1;
        }
    }
    
    // Calculate pi
    double pi = 4.0 * points_in_circle / 50000000.0;
    printf("Pi = %f\n", pi);
    
    free(threads);
    pthread_mutex_destroy(&mutex);
    return 0;
}
