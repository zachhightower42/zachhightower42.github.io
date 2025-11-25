// compilation instruc: gcc -o pa4PartA.out pa4PartA.c -lpthread -lm
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <math.h>

// Global variable to store points inside circle
long long points_in_circle = 0;

// Function to generate random double between 0 and 1
double random_double() {
    return random() / ((double)RAND_MAX + 1);
}

// Thread function to generate points
void* generate_points(void* arg) {
    long long total_points = 50000000;
    long long local_points_in_circle = 0;
    double x, y;

    for (long long i = 0; i < total_points; i++) {
        x = random_double();
        y = random_double();
        
        if (sqrt(x*x + y*y) < 1.0) {
            local_points_in_circle++;
        }
    }
    
    points_in_circle = local_points_in_circle;
    pthread_exit(NULL);
}

int main() {
    pthread_t thread;
    
    // Create thread to generate points
    if (pthread_create(&thread, NULL, generate_points, NULL) != 0) {
        fprintf(stderr, "Error creating thread\n");
        return 1;
    }
    
    // Wait for thread to complete
    if (pthread_join(thread, NULL) != 0) {
        fprintf(stderr, "Error joining thread\n");
        return 1;
    }
    
    // Calculate pi
    double pi = 4.0 * points_in_circle / 50000000.0;
    printf("Pi = %f\n", pi);
    
    return 0;
}
