readme.md
File containing the information about each part of the package. 

pa4PartA.c
File containing the source code for programming assignment 4 part A.
Sets up the Monte Carlo method for calculating the value of pi which we further
expand on in part B. 

pa4PartA.out
File containing the compiled code for programming assignment 4 part A.
Sets up the Monte Carlo method for calculating the value of pi which we further
expand on in part B. 

pa4PartB.c
File containing the source code for programming assignment 4 part B.
Expands on the setup in part A so that we can use threads to calculate the value of pi using the 
Monte Carlo method. We protect critical sections of the code using mutex locks. 


pa4PartB.out
File containing the compiled code for programming assignment 4 part B.
Expands on the setup in part A so that we can use threads to calculate the value of pi using the 
Monte Carlo method. We protect critical sections of the code using mutex locks. 

ProgrammingAssignment4.pdf
This is the pdf file for the assignment.

submission instructions.md
These are the instructions for submission.

Compilation instructions
cd into folder containing extracted package
Then run the following commands:
gcc -o pa4PartA.out pa4PartA.c -lpthread -lm
gcc -o pa4PartB.out pa4PartB.c -lpthread -lm

Running instructions
cd into directory containing  pa4PartA.out and pa4PartB.out
Then run the following command:
./pa4PartB.out <number of threads here>