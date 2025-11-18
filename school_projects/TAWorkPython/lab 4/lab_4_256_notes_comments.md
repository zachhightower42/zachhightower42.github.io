- Had to have several students email me due to submission errors, mostly due to them submitting it too early/needing to edit certain parts
	- One or two submission errors were due to equipment
- More difficulty in getting to all raised hands once we reached the end of lab time. Assuming that this is largely due to missing one TA

# Grading comments
-4 : The print strings at the end of the program should use the converted temperature variable, in yours this would be result, for the boolean operation. This is because if the compared temperatures are not in the same units, the comparison will not be accurate.  

E.g 32 Fahrenheit 0 Degrees Celsius are the same temperature, but the program tells me that 32 degrees Fahrenheit is warmer. This is because all it sees in the comparison is as follows  

32 > 0


-2: The formula for converting Fahrenheit to Celsius is incorrect.    
  
A correct version is as follows:    
  
fahrenheit_celsius_conversion = 5/9*(float(user_fahrenheit)-32)

-1: Overwriting the Fahrenheit variable with the converted temperature means that you can't use it in the final print where it needs to be used.  

-3: Due to the above error none of these prints have the original farenheit temperature.  

This results in strings like:  
0.0 degrees Fahrenheit is warmer or equal to 0 degrees Celsius: True  

Instead of the correct:  

32 degrees Fahrenheit is warmer or equal to 0 degrees Celsius: True

No points taken off, but please be aware that using temp1,2,3 is not good practice. temp is usually used by programmers for temporary variables. Ones that are used in only part of a program, but are not saved for use anywhere else.

