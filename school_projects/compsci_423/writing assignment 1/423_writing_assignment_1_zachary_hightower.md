![[Pasted image 20240921224726.png]]
# Answer-1
Computer systems can be divided into the following four components
- Hardware
	- Things like the CPU, keyboard, mouse, memory
	- Provide the basic resources that the rest of the system is built on
- Operating system
	- Coordinates hardware and allows it to be used to control the applications
	- Provides the environment for the applications and other programs
- Applications
	- Things like word processors, games, web browsers
- Users
	- The person who actually benefits from the program, and creates the interrupts that cause the computer to run applications or store data
# Answer-2
**Asymmetric multiprocessing**
Organized from the top down. There is one boss processor controlling a number of worker processors. The boss is the only one capable of assigning tasks, which it does according to the specializations of the worker processors. Only the boss processor communicates with the I/O devices. Does not share as many resources. 

**Symmetric multiprocessing**
All processors are on the same level in this structure. Each one is fully capable of actively taking tasks and working on them, without the need to have them assigned to it. The tasks are distributed evenly across the processors and each of them can communicate with the I/O devices. Resources are fully shared across all processors.

**Advantages of multiprocessor systems**
- It becomes much easier to do parallel processing, which helps to increase throughput
- Simply more powerful than a single processor system, which also increases throughput
- Easier to implement shared memory in multiprocessor systems, compared to trying to implement the same in separated systems with single processors
- Easy to scale into larger and larger systems, just add more processors
- More reliable, since if one processor stops functioning, the system will probably continue to function. (An exception to this would be the boss processor in an asymmetric multiprocessor system)
# Answer-3
**Message passing**

| Advantages                                                                                                           | Disadvantages                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Simpler to implement than shared memory                                                                              | Larger overhead due to more content being within a message. Needs sender and receiver info, in addition to actual data |
| Reduces risk of concurrency/coherency issues because the memory for processes is not shared                          | Slower than shared memory on local systems, since data has to be passed, rather than simply being ready to access      |
| More secure than shared memory, since the system does not need to share memory to perform this type of communication | Harder to share large amounts of data than in a shared memory system                                                   |

**Shared Memory**

| Advantages                                                                                        | Disadvantages                                                                                                                   |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Fast performance on local systems                                                                 | Increased risk of causing issues with processes trying to operate concurrently on the same data and cause issues with coherency |
| Efficiently shares data on local systems, since it doesn't need to be passed, it's just available | Less secure than message passing, as everything is readily available                                                            |


# Answer-4
**Main advantage**
The largest advantage of the microkernel implementation is that it does not, in most cases, require the operating system to be extended by changing the kernel. All new functions or patches are applied in user space, which is much easier to access.

Another big advantage is that with only essential functions still in the kernel, most crashes will occur in user areas. Those crashes won't affect the kernel, so the system can more easily recover from those. 

**Communication in microkernel architecture**
Communication in the microkernel architecture is handled via message passing.

**Disadvantages of microkernel architecture**
- Increased system function overhead
	- This is due to the fact that with functions moved from the kernel into user space, it may be more difficult for them to communicate with the kernel when they need to. Since message passing causes more overhead, since it sends more information than other similar methods, like shared memory. 
- Higher system latency
	- Due to tasks being distributed across many user level areas and *also* potentially needing calls to the mircokernel, many processes could take a longer time to resolve than they would otherwise. 