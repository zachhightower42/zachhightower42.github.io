## Problem 1:
Assume the following JavaScript program was interpreted using static-scoping rules. What value of `x` is displayed in function `sub1`? Under dynamic-scoping rules, what value of `x` is displayed in function `sub1`?

```javascript
var x;
function sub1() {
    document.write("x = " + x);
}
function sub2() {
    var x;
    x = 10;
    sub1();
}
x = 5;
sub2();
```
### Ans 1:
**Static scope**
- The value displayed in sub1() is x = 5
- This is because static scoping means the variable reference is determined by where the function is defined in the source code
- sub1() is defined in the global scope where x = 5
- The local x = 10 in sub2() does not affect sub1()'s reference to the global variable x

**Dynamic scope**
- The value displayed in sub1() is x = 10
- This is because dynamic scoping means the variable reference is determined by the calling context
- sub1() is called from within sub2() where x = 10
- The most recent x binding in the call stack would be used


## Problem 2: 

Consider the following JavaScript program:
```javascript

var x, y, z;
function sub1() {
    var a, y, z;
    function sub2() {
        var a, b, z;
        …
    }
    …
}
function sub3() {
    var a, x, w;
    …
}

```

List all the variables, along with the program units where they are declared, that are visible in the bodies of `sub1`, `sub2`, and `sub3`, assuming static scoping is used.

### Ans 2:
For sub1():
- Visible variables:
    - Local: a, y, z (declared in sub1)
    - Global: x
    The other global variables are not visible because they are being shadowed by the local variables y and z

For sub2():

- Visible variables:
    - Local: a, b, z (declared in sub2)
    - From sub1 scope: y (inherited from parent function sub1)
    - Global: x
    In this one we end up shadowing a and z from the sub1 function. 
    

For sub3():

- Visible variables:
    - Local: a, x, w (declared in sub3)
    - Global: y, z (from global scope)
    This one shadows the variable x from global and is not affected by the variables in functions sub1 and sub2 because it is declared separately from them. 


## Problem 3: 

Consider the following C program:
```c
void fun() {
    int a, b, c; /* definition 1 */
    …
    while (…) {
        int b, c, d; /* definition 2 */
        … <------------------------------------------ 1
        while (…) {
            int c, d, e; /* definition 3 */
            … <------------------------------------------ 2
        }
        … <------------------------------------------ 3
    }
    … <------------------------------------------ 4
}

```

For each of the four marked points in this function, list each visible variable, along with the number of the definition statement that defines it.
### Ans 3: 

**At point 1:**

- Variable 'a' from definition 1
- Variable 'b' from definition 2 (shadows definition 1)
- Variable 'c' from definition 2 (shadows definition 1)
- Variable 'd' from definition 2

**At point 2:**

- Variable 'a' from definition 1
- Variable 'b' from definition 2
- Variable 'c' from definition 3 (shadows definition 2)
- Variable 'd' from definition 3 (shadows definition 2)
- Variable 'e' from definition 3

**At point 3:**

- Variable 'a' from definition 1
- Variable 'b' from definition 2 (shadows definition 1)
- Variable 'c' from definition 2 (shadows definition 1)
- Variable 'd' from definition 2

**At point 4:**

- Variable 'a' from definition 1
- Variable 'b' from definition 1
- Variable 'c' from definition 1
## Problem 4:

Finish the Python program, make sure to include the header comments (check Program Template on Bb). If your program does not execute, you will get NO credit.

**Filename:** twinPrimes_hightower.py
