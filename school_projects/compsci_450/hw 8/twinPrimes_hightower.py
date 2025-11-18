""" 
Course: CSCI 450, Section 1 
   Student Name: Zachary Hightower
   Student ID: 010944120
    Homework #8 
    Due Date: 8-11-2024
 
    In keeping with the Honor Code of UM, I have neither given nor received any 
    inappropriate assistance from anyone other than the TA or the instructor. 
 
    Program Description: program that finds all twin primes less than a given number.  
 """


def isPrime(n):
    # Check if number is less than 2 
    if n < 2:
        return False

    # Check divisibility from 2 to square root of n
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True


def main():
    # Get input from user
    num = int(input("Enter an integer: "))

    print("\nThe twin primes are:")

    # Check each consecutive pair of numbers up to n
    for i in range(2, num - 1):
        # Prints if both are primes and differ by 2
        if isPrime(i) and isPrime(i + 2):
            print(f"({i}, {i+2})")


if __name__ == "__main__":
    main()
