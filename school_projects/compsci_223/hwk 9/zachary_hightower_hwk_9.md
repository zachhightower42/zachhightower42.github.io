![[hw9 pg 1.png]]![[hw9 pg 2.png]]
We want to simulate what happens when we run a load instruction meant to read the byte at address 0x03d4 with our outlined setup above. 
0000 0011 1101 0100 = 0x03d4
**Step 1: Virtual Address**
We need to split apart the given address into its component pieces in binary, so we can use it properly. 
- VPN = 0x0F = 00001111
- VPO = 0x14 = 010100
Now we have the two parts necessary to perform the next step

**Step 2: TLB**
- The VPN tells us the index to look for according to the two low order bits, 11 = 3
- Then we need to know the tag to look for, which is also 03 = 000011
- Then, we search through the set index for the tag, we find it in the second group
- Check the PPN. Our PPN = 0D
- Check that it's valid, we can see that the slot is occupied by a 1, so it is valid

**Step 3: Page Table**
- We got a hit in the TLB, so we can ignore the page table

**Step 4: Physical Address**
- We want to combine the PPN we've found (0x0D), with the VPO (0x14) to make the full physical address
- Find the PPO, Physical Page Offset. It's equal to the VPO = 0x14 = 010100
- So our physical address is 0x0D + 0x14 = 0x0D14 = 0000 0000 1101 0001 0100

**Step 5: Cache**
- We need the tag, index, and offset for the cache
- The cache tag is 00110100 = 0x34
- The cache index is 0101 = 0x5
- The cache offset is = 00 = 0x0
- We go to index 5 in our cache
- We look for our tag (0x34)
- We find the incorrect tag, so we state that this is a miss at the cache level

**Step 6: Byte**
- We do not extract any byte from the operation due to the miss

# OR

**Step 5: Cache**
- We need the tag, index, and offset for the cache
- The cache tag ***is meant to be read as*** 0x0D 0000 1101 = 0x0D
- The cache index is 0101 = 0x5
- The cache offset is = 00 = 0x0
- We go to index 5 in our cache
- We look for our tag (0x0D)
- We find the correct tag, and the valid bit is set, so this is a hit in the cache
- We look through the bytes and find the one at offset 0, which is 36

**Step 6: Byte**
- We extract byte 36 and the operation returns it


