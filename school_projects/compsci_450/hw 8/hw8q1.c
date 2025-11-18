```
Consider the following JavaScript program:
```

var x, y, z; function sub1() { var a, y, z; function sub2() { var a, b, z; } } function sub3() { var a, x, w; }
```
List all the variables, along with the program units where they are declared, that are visible in the bodies of sub1, sub2, and sub3, assuming static scoping is used.
```