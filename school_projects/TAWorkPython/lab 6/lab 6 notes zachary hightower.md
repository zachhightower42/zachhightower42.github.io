# Rubric
![[CSCI 256-2 Lab 6 Rubric.pdf]]
# Grade comments

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
- -1 : the variable storing the average, or total, for test scores should be set to 0 
  Example `average = 0
  This prevents issues with the variable having information from a previous loop	
  
-    -2 : When handling more than one student, the incorrect average is output. This is because total is not set to 0 between students. Resulting in an error like this. 
	Enter the student's name: a
	Enter score on test 1: 75
	Enter score on test 2: 100
	Student average is 87.50
	Letter grade is B
	Enter the student's name: b
	Enter score on test 1: 50
	Enter score on test 2: 50
	Student average is 137.50
	Letter grade is A
To Solve this, total should be set to 0 right before entering the number of tests loop.
  
   
# Personal Thoughts
- Lab seems to have been easier for most students to understand. More were out by time up compared to last time.
- Cayden Cunningham needs to be checked over again, did not input grade, figure out what the exit = at line 56 is doing
- Some of the students have somewhat different loops compared to others. E.g. One may ask for how many scores a student has once in the loop for that particular student, instead of asking how many scores every student has. 
  There are also some that have different checks at different times for continuing or stopping. Nothing that actually affects function of the program.
  - 