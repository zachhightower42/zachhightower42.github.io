Suppose we have a system with the following properties:
• The memory is byte addressable
• Memory accesses are to 1-byte words (not to 4-byte words)
• Addresses are 12 bits wide
• The cache is 2-way set associative with a 4-byte block size and 4 sets


This shows the current contents of the cache, all addresses, tags, and values are given in hexadecimal notation

| Set index | Tag | Valid | Byte 0 | Byte 1 | Byte 2 | Byte 3 |
| --------- | --- | ----- | ------ | ------ | ------ | ------ |
| 0         | 00  | 1     | 40     | 41     | 42     | 43     |
| 0         | 83  | 1     | FE     | 97     | CC     | D0     |
| 1         | 00  | 1     | 44     | 45     | 46     | 47     |
| 1         | 83  | 0     | null   | null   | null   | null   |
| 2         | 00  | 1     | 48     | 49     | 4A     | 4B     |
| 2         | 40  | 0     | null   | null   | null   | null   |
| 3         | FF  | 1     | 9A     | C0     | 03     | FF     |
| 3         | 00  | 0     | null   | null   | null   | null   |

The memory addresses have
CO Cache block offset, the last two bits of an address, 11 and 12
CI Cache set index, bits 9 and 10 of an address
CT Cache tag, the first eight bits of an address



For each of the following memory addresses in the table, indicate if it will be a cache hit or miss when carried out in sequence as listed. Also give the value of a read if it can be read from the cache. 

| Operation | Address | Hit? | Read value(or unknown) |
| --------- | ------- | ---- | ---------------------- |
| Read      | 0x834   |      |                        |
| Write     | 0x836   |      |                        |
| Read      | 0xFFD   |      |                        |
