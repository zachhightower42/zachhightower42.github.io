Simulate a small virtual memory system with TLB and L1 D-cache with following assumptions: 
• The memory is byte addressable 
• Memory accesses are to 1-byte words (not 4-byte words) 
• Virtual addresses are 14 bits wide (n = 14) 
• Physical addresses are 12 bits wide (m = 12) 
• The page size is 64 bytes (P = 64) 
• The TLB is four-way set associative with 16 total entries 
• The L1 D-cache is physically addressed and direct-mapped, with a 4-byte line size and 16 total sets 

Figure below shows the format of the virtual and physical addresses. Since each page is 26 = 64 bytes, the low-order 6 bits of the virtual and physical addresses serve as the VPO and PPO respectively. The high-order 8 bits of the virtual address serve as the VPN. The high-order 6 bits of the physical address serve as the PPN.

**Virtual address**
VPN (represents bit spaces reserved for virtual page number)
VPO (represents bit spaces reserved for virtual page offset)

| 13  | 12  | 11  | 10  | 9   | 8   | 7   | 6   | 5   | 4   | 3   | 2   | 1   | 0   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| VPN | VPN | VPN | VPN | VPN | VPN | VPN | VPN | VPO | VPO | VPO | VPO | VPO | VPO |

**Physical address**
PPN (represents bit spaces reserved for physical page number)
PPO (represents bit spaces reserved for physical page offset)

| 11  | 10  | 9   | 8   | 7   | 6   | 5   | 4   | 3   | 2   | 1   | 0   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PPN | PPN | PPN | PPN | PPN | PPN | PPO | PPO | PPO | PPO | PPO | PPO |

Figure (a) below shows a snapshot of our little memory system including the TLB
(b) shows a portion of the page table
and (c)  shows the L1 cache

 Above the figures of the TLB and cache, we have also shown how the bits of the virtual and physical addresses are partitioned by the hardware as it accesses these devices.

**(a)TLB: Four sets, 16 entries, four-way set associative**
TLBT (represents bit spaces reserved for TLB table's tag)
TLBI (represents bit spaces reserved for TLB table's set index)

| 13   | 12   | 11   | 10   | 9    | 8    | 7    | 6    | 5   | 4   | 3   | 2   | 1   | 0   |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | --- | --- | --- | --- | --- | --- |
| VPN  | VPN  | VPN  | VPN  | VPN  | VPN  | VPN  | VPN  | VPO | VPO | VPO | VPO | VPO | VPO |
| TLBT | TLBT | TLBT | TLBT | TLBT | TLBT | TLBI | TLBI |     |     |     |     |     |     |

|     |     |       |     |     |       |     |     |       |     |     |       |     |
| --- | --- | ----- | --- | --- | ----- | --- | --- | ----- | --- | --- | ----- | --- |
| Tag | PPN | Valid | Tag | PPN | Valid | Tag | PPN | Valid | Tag | PPN | Valid | Set |
| 3   | -   | 0     | 9   | 0D  | 1     | 0   | -   | 0     | 7   | 2   | 1     | 0   |
| 3   | 2D  | 1     | 2   | -   | 0     | 4   | -   | 0     | 0A  | -   | 0     | 1   |
| 2   | -   | 0     | 8   | -   | 0     | 6   | -   | 0     | 3   | -   | 0     | 2   |
| 7   | -   | 0     | 3   | 0D  | 1     | 0A  | 34  | 1     | 2   | -   | 0     | 3   |


**(b)Page table: Only the first 16 PTEs are shown**
CT (represents bit spaces reserved for cache tag)
CI (represents bit spaces reserved for cache index)
CO (represents bit spaces reserved for cache offset)

| 11  | 10  | 9   | 8   | 7   | 6   | 5   | 4   | 3   | 2   | 1   | 0   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PPN | PPN | PPN | PPN | PPN | PPN | PPO | PPO | PPO | PPO | PPO | PPO |
| CT  | CT  | CT  | CT  | CT  | CT  | CI  | CI  | CI  | CI  | CO  | CO  |

|     |     |       |
| --- | --- | ----- |
| VPN | PPN | Valid |
| 00  | 28  | 1     |
| 01  | -   | 0     |
| 02  | 33  | 1     |
| 03  | 2   | 1     |
| 04  | -   | 0     |
| 05  | 16  | 1     |
| 06  | -   | 0     |
| 07  | -   | 0     |

|   |   |   |
|---|---|---|
|VPN|PPN|Valid|
|8|13|1|
|9|17|1|
|0A|9|1|
|0B|-|0|
|OC|-|0|
|0D|2D|1|
|OE|11|1|
|OF|0D|1|

**(c)Cache: Sixteen sets, 4-byte blocks, direct-mapped**

|     |     |       |       |       |       |       |
| --- | --- | ----- | ----- | ----- | ----- | ----- |
| Idx | Tag | Valid | Blk 0 | Blk 1 | Blk 2 | Blk 3 |
| 0   | 19  | 1     | 99    | 11    | 23    | 11    |
| 1   | 15  | 0     | -     | -     | -     | -     |
| 2   | 1B  | 1     | 0     | 2     | 4     | 8     |
| 3   | 36  | 0     | -     | -     | -     | -     |
| 4   | 32  | 1     | 43    | 6D    | 8F    | 9     |
| 5   | 0D  | 1     | 36    | 72    | FO    | 1D    |
| 6   | 31  | 0     | -     | -     | -     | -     |
| 7   | 16  | 1     | 11    | C2    | DF    | 3     |
| 8   | 24  | 1     | 3A    | 0     | 51    | 89    |
| 9   | 2D  | 0     | -     | -     | -     | -     |
| A   | 2D  | 1     | 93    | 15    | DA    | 3B    |
| B   | 0B  | 0     | -     | -     | -     | -     |
| C   | 12  | 0     | -     | -     | -     | -     |
| D   | 16  | 1     | 4     | 96    | 34    | 15    |
| E   | 13  | 1     | 83    | 77    | 1B    | D3    |
| F   | 14  | 0     | -     | -     | -     | -     |
• TLB: The TLB is virtually addressed using the bits of the VPN. Since the TLB has four sets, the 2 low-order bits of the VPN serve as the set index (TLBI). The remaining 6 high-order bits serve as the tag (TLBT) that distinguishes the different VPNs that might map to the same TLB set. 

• Page table: The page table is a single-level design with a total of 28 = 256 page table entries (PTEs). However, we are only interested in the first sixteen of these. For convenience, we have labeled each PTE with the VPN that indexes it: but keep in mind that these VPNs are not part of the page table and not stored in memory. Also notice that the PPN of each invalid PTE is denoted with a dash to reinforce the idea that whatever bit values might happen to be stored there are not meaningful. 

• Cache: The direct-mapped cache is addressed by the fields in the physical address. Since each block is 4 bytes, the low-order 2 bits of the physical address serve as the block offset (CO). Since there are 16 sets, the next 4 bits serve as the set index (CI). The remaining 6 bits serve as the tag (CT). 

Given this initial setup, explain (by simulating manually) what happens in order when the CPU executes a load instruction that reads the byte at address 0x03d4