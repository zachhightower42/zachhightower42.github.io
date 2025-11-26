![[2024 Spring Semester Notes/223 notes/Pasted image 20240306214712.png]]



(a) `movl (%eax, %edx, 4), %ebx`

This moves the value at memory address `(%eax + %edx * 4)` into `%ebx ->
`%eax = 0x100, %edx = 0x3`

Calculating the address: `0x100 + (0x3 * 4) = 0x100 + 0xC = 0x10C`
Following the form $base+index\times scale factor$

Value : `0x10C = 0x11`

So: `%ebx = 0x11`

(b)` movl 0x104, %ebx`

This moves the value at memory address `0x104 `into `%ebx`

Value : `0x104 = 0xAB`

So: `%ebx = 0xAB`

(c) `movl (%eax), %ebx`

This moves the value at memory address `(%eax)` into `%ebx`

Value : `0x100 = 0xFF`

So: `%ebx = 0xFF`

(d)` movl 4(%eax), %ebx`

This moves the value at memory address `(%eax + 4)` into `%ebx`

Value :` 0x100 + 4` = `0x104 = 0xAB`

So: `%ebx = 0xAB`

(e) `leal -4(%eax, %ecx, 4), %ebx`

This formula calculates the address `(%eax + %ecx * 4) - 4` and stores it in `%ebx`

`%eax = 0x100, %ecx = 0x1`

Calculating the address: `(0x100 + (0x1 * 4)) - 4 = 0x104 - 4 = 0x100`
Following the form $(base+address*scalefactor)-scalefactor$

So: `%ebx = 0x100`

