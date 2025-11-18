# Notes on lab itself
- More students than last time were there, but I don't know if it was actually too hard based on what should have been covered by this point. 

# Comments for students
- The variable holding total isn't set to 0 when inputting a separate order total. Not taking points off for this, but be careful going forward that if a variable needs to be reset to a particular value at the start of a loop, you have that in the code. 
		Example:unique items 2, item name a, item cost 1, item quantity 1, item name b, item cost 1, item quantity 1
		Total = 2.14
		Another order? 
		Yes
		unique items 2, item name a, item cost...
		Total 4.28
- -2 : Goodbye message and final check for user input are commented out and non functional. They should look something like the following:  
answer = input('Would you like to continue? Enter "Yes" or "No": ')  
    while answer != "Yes" and answer != "yes" and answer != "No" and answer != "no":  
        answer = input('Invalid input: Please enter "Yes or "No": ')  
      
  
if answer == 'No' or 'no':  
    print('Goodbye!')  

- -2 : Total is not calculated correctly, it should be  

total += cost  

Instead of  

total += i  

Since i is the value being used to track the amount of unique items in the for-loop.
- - 0 : No points counted off, but there is a small issue with the program. Since the outermost loop is handled with an if statement, one can get out of the program without inputting no.  

Example:

Please enter yes/no  

Enter a  

Invalid input message  

Do you want to start the program yes/no  

Enter a  

Program ends.  

This is just something to keep in mind when thinking about why you would use a while loop versus an if else statement when processing user input. We only want the user to be able to exit the program when they input No.
- -2 : The tax rate is not calculated or applied to the itemTotal.  

It should look something like this:

cost1 =(price * quantity) * 1.07  

Where 1.07 applies the tax rate of 7 percent.   

- -2 : When concatenating a string like this, you do need to cast all your variables as strings.
- -3 : The first while loop that should handle the condition of invalid input is missing. The first while loop present in the program has most of the structure of that, but it should be something more like the following:  

- -5 : The while loop that handles an input of "Yes" does not actually contain the rest of the logic that takes in the user input for the order. In Python, to put code under a while loop, if-else statement, or for loop, the code needs to be indented under it.  

- -3 : There is no code that allows the user to exit the program on input of "No" for their answer. The program stops at line 26. This is because the variable item_price is a float, and the range function of for loops in python only use integer/int variables.  
--- 
If you want a more full explanation of what needs to be done to get this program to work as intended, please visit one of the TAs during their office hours.  

You can also visit me during my tutoring hours on Monday and Friday  
	Mon : 12 to 4 PM  
	Fri : 12 to 1 and 2 to 3 PM

-3 : Good implementation. It does need to ask the user if they want to continue, get their answer, and then loop based on that after the program is finished calculating the order total, and line 27 needs to look something like:
# Comments about graded labs for instructor
- Had one use strip and lower to format input, which was nice
- Ask if it is possible to have students go to office hours to correct programs and how much we may need to deduct from the overall grade if that is allowable. 