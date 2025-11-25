
#include <stdio.h>
#include <stdlib.h>

void bubble_sort(int *arr, int size) {
    for (int i = 0; i < size - 1; i++) {
        for (int j = 0; j < size - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main(int argc, char *argv[]) {
    if (argc != 3) {
        printf("Usage: %s input_file output_file\n", argv[0]);
        return 1;
    }

    FILE *input_file = fopen(argv[1], "r");
    if (input_file == NULL) {
        printf("Error: Cannot open input file.\n");
        return 1;
    }

    int *numbers = NULL;
    int capacity = 0;
    int size = 0;
    int num;

    while (fscanf(input_file, "%d", &num) == 1) {
        if (size >= capacity) {
            capacity = capacity == 0 ? 1 : capacity * 2;
            numbers = realloc(numbers, capacity * sizeof(int));
            if (numbers == NULL) {
                printf("Error: Memory allocation failed.\n");
                fclose(input_file);
                return 1;
            }
        }
        numbers[size++] = num;
    }

    fclose(input_file);

    bubble_sort(numbers, size);

    printf("The integers in file %s after sorting:\n", argv[1]);
    for (int i = 0; i < size; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\n");

    FILE *output_file = fopen(argv[2], "w");
    if (output_file == NULL) {
        printf("Error: Cannot open output file.\n");
        free(numbers);
        return 1;
    }

    for (int i = 0; i < size; i++) {
        fprintf(output_file, "%d ", numbers[i]);
    }

    fclose(output_file);
    free(numbers);

    return 0;
}
