# Course: CSCI 256, Section 1
# Student Name: [Student Name]
# Student ID: [Student ID]
# Lab 12
# Due Date: [Due Date]

# In keeping with the Honor Code of UM, I have neither given nor received 
# inappropriate assistance from anyone other than the TA.

# Program Description: This program tests the Car class by getting user input
# for make and year model and displaying the car information

from lab12carexample import Car

def main():
    # Get input from user
    make = input("Enter the make of your car: ")
    year = input("Enter the year model of your car: ")
    
    # Create car object
    my_car = Car(make, year)
    
    # Display car information
    print(f"Your car is {my_car.getYearModel()} {my_car.getMake()}")

if __name__ == "__main__":
    main()
