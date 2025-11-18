# Course: CSCI 256, Section X 
# Student Name: Jane Doe 
# Student ID: 12345678 
# Lab 8 
# Due Date:   
 
# In keeping with the Honor Code of UM, I have neither given nor received 
# inappropriate assistance from anyone other than the TA. 
       
# Program Description: Factorial calculating program


def factorial(n):
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n - 1)

while True:
    user_input = int(input("Enter an integer (enter -1 to exit): "))
    
    if user_input == -1:
        break
    
    if user_input < 0:
        print("Please enter a non-negative integer.")
        continue
    
    result = factorial(user_input)
    print(f"{user_input}! = {result}")
