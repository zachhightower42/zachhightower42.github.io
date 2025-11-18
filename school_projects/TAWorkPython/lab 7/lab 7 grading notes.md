# Boilerplate for when it's below 2/3 correct
---
If you want a more full explanation of what needs to be done to get this program to work as intended, please visit one of the TAs during their office hours.  

You can also visit me during my tutoring hours on Monday and Friday  
	Mon : 12 to 4 PM  
	Fri : 12 to 1 and 2 to 3 PM

---  
I would recommend visiting me during my tutoring hours, one of the other TAs during their office hours, or your instructor during her office hours to get help with understanding this lab.  
  
  
My tutoring hours:

Monday and Friday    
    Mon : 12 to 4 PM    
    Fri : 12 to 1 and 2 to 3 PM
   --- 

# Notes on mistakes

- -0 : No points taken off, but do remember that imports should generally be done once at the top of the file.  
  
- -2: The if statement at line 16 should be a while loop and all the statements that you want to happen as the program is running should be placed underneath it. That way it will keep running until the user exits the program with a 'no'
- -2: Needs to have both import statements the basic form of the import statements should be:
	  from random import randint
	  from custom_err_msg import display_err_msg
	Imports are usually placed at the top of the file. 
	To import the custom_err_msg and its methods, you have to have the EXACT filename and method name. 
- -2 : The custom_err_msg file wasn't submitted with the main lab file.
- -2 : The main logic of the program needs to be in a while loop so that the user can execute it as many times as they input "yes" to a request to continue. This version automatically exits after one iteration. 
- -1 : Needs a goodbye message upon exit. 
- -2 : Error message is written incorrectly in custom_err_msg file. It should look something like this. 
  def disp_err_msg():
    print('Invalid input. ')
- -2 : Needs a check for user input at the beginning of the program that allows them to exit on "no" , continue on "yes" and output an error message on invalid input.


# Note to send out to all students
There were a number of errors with imports in the lab today. After doing some testing, I've found two things that seem to be causing the issue. 
- The VScode not actually looking into the full directory / folder where your lab files are. 
- The VScode needing to restart in order to refresh its listing of files and folders. 

To fix this, you need to do the following.
1. In VScode, go to the toolbar at the top and click on FILE
2. Mouse down to where it says OPEN FOLDER
3. Click OPEN FOLDER, this will open a file browser window where you can pick out which folder you want to have VSCode open
4. Find the folder that has all the files you're using for the lab in it. 
5. Click the folder once.
6. Mouse down to the bottom right of the file browser window and click open. 
7. This should close the file browser. To check that VSCode has actually opened the right directory, mouse over to the far left and click on the two pages symbol (it's the one right above the magnifying glass / search symbol) and click the two pages symbol.
8. You should now see on the left all the files that are in that folder, if you don't, something is wrong

If you are still experiencing the same error after that, restart VSCode. When you start it again, it should still be in the folder you selected. 

- [x] Send the instructions out to all 256 students in section 2 in an email. 📅 2024-10-18 ✅ 2024-10-19