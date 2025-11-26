CSCI 223 Computer Org. & Assembly Language

Homework #11

4/16/2024

Due: 11:59pm on Wednesday 4/17/2024

Submission: Upload a file (.txt or .pdf) that has your answer computer-typed. No late submission will be accepted.

1. Explain two different types of multiple issue processors discussed in class?
- **Super scalar processors**
	- Super scalar processors are advanced CPU designs that execute multiple instructions simultaneously, 
	- Uses instruction-level parallelism to enhance performance
	- Has multiple execution units for specific tasks that operate independently of each other
		- arithmetic
		- floating point
		- etc...
	- Analyzes and identifies instructions that can be executed concurrently. Uses techniques like:
		- instruction reordering 
		- out of order execution
		- speculative execution 
- **VLIW (Very Long Instruction Word) processors**
	- VLIW processors are designed to execute multiple operations in parallel by grouping into long instruction words.
	- A single instruction word contains multiple operations executed simultaneously by separate units in the processor
	- Unlike super scalar, VLIW relies on the compiler to schedule instructions to maximize parallelism 
	- VLIW typically have simpler hardware to super scalar
	- Instruction scheduling is handled at compile time rather than runtime. 
	- VLIW offers high performance for applications with predictable instruction level parallelism
	- Require sophisticated compilers and may not be good at handling dynamic code


2. What are two hardware techniques (that we discussed in class) that aim at improving ILP?
- **Instruction pipelining**
	- Dividing the execution of an instruction into a series of sequential steps, or stages, performed by different hardware units
- **Multiple issue processors**
	- Processors designed to complete multiple instructions per clock
3. What is a hardware technique (that we discussed in class) that aims at improving TLP?
- **Symmetric Multiprocessors**
	- Computer systems with multiple identical processors that share memory have uniform latency
	- Each processor has equal access to the system's resources and can execute tasks independently. 
	- SMP is simple and scalable
	- Typically have a small number of cores
	- Use UMA (uniform memory access architecture)
4. What are three hardware techniques (that we discussed in class) that aim at improving DLP?
-  **Vector architectures**
	- Read sets of data elements scattered in memory into “large sequential vector registers” , which they operate on and then disperse the results back into memory
	- Performs dozens of register to register operations on independent data elements
	- Registers are controlled by compiler
	- Hides memory latency
	- Leverages memory bandwidth
	- Good for tasks that have a lot of repetitive instructions
	- Trouble with irregular/branching code

- **SIMD (Single Instruction, Multiple Data) extensions**
	- Lets a single instruction be performed on a large number of data elements
	- SIMD architectures can exploit significant data-level parallelism for data oriented computing like multimedia
	- More energy efficient than MIMD
	- Only needs to fetch one instruction per multiple data operation
	- Makes SIMD good choice for mobile devices
	- Number of data operands encoded into op code
	- No sophisticated addressing modes (strided, scatter-gather)
	- No mask registers
	

- **Graphics Processor Units (GPUs)**
	- Graphics rendering
	- GPGPU: General-Purpose computing on GPUs
	- GPGPU uses data parallel massive multithreading that vastly increases the number of possible threads 
	- GPGPU is used in heterogenous computing using multiple different types of processing units in a single computer system to better handle tasks
	- GPGPU type hardware is designed to be easily scalable
