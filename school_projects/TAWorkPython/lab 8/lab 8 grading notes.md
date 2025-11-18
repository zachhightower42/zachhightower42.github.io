# Good Job skeleton
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
     () ()
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



- -2 : Does not include a loop in the Lab8.py file for actually reading the contents of the file. It needs to be something like the following
	*Note: Code is placed within backticks like this `````` 
```
	else:
    for line in my_file:
        print(line)
    my_file.close()
```

- -1 : Does not have code in the try block for actually opening the file that the user specifies. It needs to be something like the following
	*Note: Code is placed within backticks like this `````` 
```
try:
    print("This program is for reading a user-specified file")
    filename = input("Enter a file name: ")
    my_file = open(filename, "r")
```
- 4: orders.txt is not included in the submission. 
- 4: There is nothing to write information to orders.txt. It needs to be something like the following
	*Note: Code is placed within backticks like this `````` 
```
my_file.write(f'\n{order}\n')

my_file.write('\n+ {} x{} ${:.2f}\n'.format(name, qty, total_cost))

my_file.write(f'\nOrder Total: {order_total:.2f}\n')
```
Please note that these are two separate commands that should be placed at different spots in the code

- 2: The file is not closed.  It needs to be something like the following
	*Note: Code is placed within backticks like this `````` 
```
my_file.close()
```


- 2: The file is not opened.  It needs to be something like the following
	*Note: Code is placed within backticks like this `````` 
```
# TODO: open the file for writing

my_file = open("orders.txt", "w")
```
