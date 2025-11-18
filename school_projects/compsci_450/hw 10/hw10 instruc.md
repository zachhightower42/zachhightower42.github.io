1
 
Homework #10 – Finding Suspects in Prolog 
CSCI 450  
Preparation 
You will need to finish a program using the programming language Prolog. 
Check Course Information on Bb for the link of the Prolog SWISH. 
 
Problem Statement 
An expensive item has been stolen from a museum. We need to find out who the thief was based on 
all available information. 
 
Write a program with the following facts that describe 4 possible suspects (remember that constants 
start with lowercase letters).  
 
Each fact should have the form: suspect(Name, Profession, Time, Motive)  
suspect\4  (\4 means it takes 4 parameters as specified above) 
• Suspect Mike, gardener, has been observed around midnight. He is known to be broke. 
• Suspect Brad, guard, has been observed around midnight. He is known to hate his Job. 
• Suspect Nina, guard, has been observed around midnight. She is known to steal regularly. 
• Suspect Hope, curator, has been observed around noon. She is known to steal regularly. 
 
And the 2 facts about the crime are as follows:  
 timeOfCrime\1 
  weakMotive\1 
• The crime was committed at midnight. 
• Hating one’s job is considered a weak motive. 
 
Also write 3 rules to find the suspect that had Time and a Motive: “hadTime”, “hasMotive”, and 
“whoCouldHaveDoneIt”. Variables start with uppercase letters. 
• “hadTime”: takes 1 variable to represent Name of the suspect, if that suspect had 
timeOfCrime. For the antecedent expression (righthand side of the rule), you have to 
combine timeOfCrime and suspect together. 
 
• “hasMotive”: takes 1 variable to represent Name of the suspect, if the Motive of that suspect 
is not weak. For the antecedent expression (righthand side of the rule), you have to combine 
not(weakMotive(...)) and suspect together. 
 
• “whoCouldHaveDoneIt”: takes suspect(...) as the parameter to find out who the suspect 
might be, if that suspect hadTime and hasMotive. 
 
 
       Check Sample Output on next page → 
 
 
 
 
 
 
2 
 
Requirements & Considerations 
1. Name your program findSuspects_yourLastName.pl   
 
2. Include header comments (at the beginning of your program, I used Java comments below, 
what is the comment symbol for Prolog?) formatted as shown below, using your name and 
student ID, etc. instead. Be sure to include the Honor Code statement and program 
description. Your electronic submission of the program file will represent your endorsement 
of the Honor Code Statement. 
/* Course: CSCI 450, Section 1 
   Student Name: Jane Doe 
   Student ID: 12345678 
   Homework #10 
   Due Date:     
 
   In keeping with the Honor Code of UM, I have neither given nor received any 
   inappropriate assistance from anyone other than the TA or the instructor.  
 
   Program Description: ......    
*/ 
 
3. Before each significant step, provide a comment explaining the step (do not comment every 
line of code).    
 
4. Submit your finished program (findSuspects_yourLastName.pl) on Blackboard using the 
Homework #10 link under Homework Assignments button.  
 
 
Sample Output 
 
?- whoCouldHaveDoneIt(X). 
 
X = suspect(mike, gardener, midnight, isBroke) 
X = suspect(nina, guard, midnight, stealsRegularly) 
 