
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    if (argc != 3) {
        printf("Please provide the input and output text file names as ./%s name1 name2\n", argv[0]);
        return 1;
    }

    FILE *input_file = fopen(argv[1], "r");
    if (input_file == NULL) {
        printf("Input file %s cannot be opened.\n", argv[1]);
        return 1;
    }

    FILE *output_file = fopen(argv[2], "w");
    if (output_file == NULL) {
        printf("Output file %s cannot be opened.\n", argv[2]);
        fclose(input_file);
        return 1;
    }

    printf("The integers in file %s:\n", argv[1]);

    int num;
    int first = 1;
    while (fscanf(input_file, "%d", &num) == 1) {
        if (!first) {
            printf(" ");
            fprintf(output_file, " ");
        }
        printf("%d", num);
        fprintf(output_file, "%d", num);
        first = 0;
    }

    printf("\n");
    fprintf(output_file, "\n");

    fclose(input_file);
    fclose(output_file);

    return 0;
}
