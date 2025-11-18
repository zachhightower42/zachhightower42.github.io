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
- 4 the sum of the order is not calculated. The code for this does not function as return cannot be called outside of a function in python. Example follows:
	*Note:* code in examples is enclosed within ``` ```
	```
	x = 5
	return x  # Error: return outside function
```


def get_value():
    x = 5
    return x  # Works correctly inside function

result = get_value()
```

- 7 the for loop does not function for actually printing something out of a dictionary. When printing from a dictionary, think about how information is put inside of the dictionary as key -> value pairs. The keys point inside the dictionary at their associated values. Use the following for loop as an example of a good dictionary print.
	*Note:* code in examples is enclosed within ``` ```
```
	for item in dictionary:
        print(f'{item}: {dictionary[item]:.2f}')
```

- 2 The dictionary should be created empty, and should be created outside of the for loop that gets item information, not inside of it. 

- 2 The items are not added to the dictionary correctly, see below for an example of how this would function within this program. This line of code simply needs to be placed inside the for loop after total_cost of the item is calculated.
	  	*Note:* code in examples is enclosed within ``` ```
```
	  	dictionary[name] = total_cost
```

- 4 The order total calculation breaks the program. Instead of the current implementation it should be something like the following:
  
	*Note:* code in examples is enclosed within ``` ```
```
	  	order_total = sum(dictionary.values())
```


-3 The first of the following three lines create a new empty dictionary inside the for loop, under the same name as the original each time. This means that each time you loop, all entries are emptied out of the dictionary. 
The second line will attempt to print the keys in the dictionary, but there are none.
The third line will attempt to print the values from the dictionary, but there are none. 
	  	*Note:* code in examples is enclosed within ``` ```
```
order_info = {}
print(order_info.keys(name))
print(order_info.values(total_cost)) #
```

The correct command to add something to the dictionary using the name as the key and the order_total as the value is the following.
```
	  	dictionary[name] = total_cost
```
