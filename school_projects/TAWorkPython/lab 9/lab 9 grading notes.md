# Good Job skeleton for fully correct
```  
The skeleton says: Good Job!  
     (o.o)  
      |=|  
     __|__  
    //.=|=.=.=.=.=.👍  
  // .=|=.  
  \\ .=|=.  
   \\(_=_)  
    (:| |:)  
     || ||  
      ( ) ( )  
     || ||  
     || ||  
    ==' '==  
```

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
- 3 Must make sure the final test score is valid, meaning between 0 and 100, before appending it to the list. Check the following example:
	Note,  code examples are enclosed in ``` ```
```
	  if took_final == True:
            final_Score = int(input("Enter score on final test: ")) 
            
            while final_Score < MIN_TEST_GRADE or test_score > MAX_TEST_GRADE:

                final_Score = int(input(f'\nInvalid input - Test score must be between 0 and 100.\nEnter score on final: '))  

            scores_list.append(final_Score)
```

- 2 The get average function needs to handle when the student has taken the optional final, it should drop their minimum test score. Example below. 
  Note,  code examples are enclosed in ``` ```
```
	def get_average(scores, final = False):
	    if final:
	        min_grade = min(scores)
	        scores.remove(min_grade)
	    return sum(scores)/ len(scores)
```

- 3 The get average function is not called after getting the final test score. Example below. It is passed scores_list and took_final so that it can drop the minimum test score if the student took the optional final exam. 
  Note,  code examples are enclosed in ``` ```
```
	average = get_average(scores_list, took_final)
```

  

- 1 No goodbye message to make sure user knows the program has successfully finished.

- 2  minimum test score is removed twice in current implementation. It should only be removed once in the method for get_average at the top of the file.
  
- 2 The get average function is not called correctly after getting the final test score. Example below. It is passed scores_list and took_final so that it can drop the minimum test score if the student took the optional final exam. If passed true it will only ever consider the student as having taken the final despite a contrary answer from the user.  
  Note,  code examples are enclosed in ``` ```  
```  
    average = get_average(scores_list, took_final)  
```

- 3 You should not create an new list to append the one test score to the list of test scores. Instead of the four lines you have, it should be the following:  
  
  Note,  code examples are enclosed in ``` ```  
```  
test_scores.append(test_score)  
```

- 15 While you do use some of the components correctly, the result is hard coded. That means that for anything other than what has been hard coded in, the program will not give the correct result. That's not acceptable.

  
- 2 When creating the list for test_scores, it needs to use [ ] brackets, not ( )