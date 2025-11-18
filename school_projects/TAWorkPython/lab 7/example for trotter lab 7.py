# Lab7YourInitialsHere.py


from random import randint
from custom_err_msg import disp_err_msg

print("Welcome to the Random Number Guessing Game!")
print("This program will generate a random number between 1 and 100 for you to guess.")

while True:
    user_choice = input("Do you want to play? (Yes/No): ").lower()
    if user_choice in ["yes", "y"]:
        break
    elif user_choice in ["no", "n"]:
        print("Goodbye! Thanks for considering the game.")
        exit()
    else:
        disp_err_msg()

while user_choice == "yes" or user_choice == "y":
    target_number = randint(1, 100)

    while True:
        try:
            guess = int(input("Enter your guess (1-100): "))
            if 1 <= guess <= 100:
                break
            else:
                disp_err_msg()
                print("Please enter a number between 1 and 100.")
        except ValueError:
            disp_err_msg()
            print("Please enter a valid number between 1 and 100.")

    if guess == target_number:
        print("Congratulations! You guessed the correct number!")
    elif guess > target_number:
        print("Your guess is too high.")
    else:
        print("Your guess is too low.")

    print(f"The correct number was: {target_number}")

    while True:
        user_choice = input("Do you want to play again? (Yes/No): ").lower()
        if user_choice in ["yes", "y", "no", "n"]:
            break
        else:
            disp_err_msg()

print("Goodbye!")
