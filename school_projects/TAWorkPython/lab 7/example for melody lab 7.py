# Course: CSCI 256, Section X
# Student Name: Jane Doe
# Student ID: 12345678
# Lab 7
# Due Date:
# In keeping with the Honor Code of UM, I have neither given nor received
# inappropriate assistance from anyone other than the TA.
# Program Description: This program calculates the salary earned over a period of time,
# starting with one penny on the first day and doubling each day.

# Prompt for input
days = int(input("Enter number of working days: "))

# Display table header
print("Day Pay")

# Initialize total pay
total_pay = 0

# For loop to display the table and calculate the total pay
for day in range(1, days + 1):
    pay = 0.01 * (2 ** (day - 1))
    total_pay += pay
    print(f"{day} ${pay:.2f}")

# Display the total pay
print(f"The total pay is ${total_pay:.2f}")
