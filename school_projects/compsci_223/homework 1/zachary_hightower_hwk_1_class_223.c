#include <stdio.h>

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Usage: %s <number>\n", argv[0]);
        return 1;
    }

    int n;
    if (sscanf(argv[1], "%d", &n) != 1 || n <= 0) {
        printf("Enter a positive integer input!\n");
        return 1;
    }

    int a = 0, b = 1, c;

    printf("Fibonacci Series first %d iterations:\n", n);

    for (int i = 0; i < n; ++i) {
        printf("%d ", a);
        c = a + b;
        a = b;
        b = c;
    }

    printf("\n");

    return 0;
}
