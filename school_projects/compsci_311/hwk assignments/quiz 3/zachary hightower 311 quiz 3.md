# Chomsky Hierarchy 

The Chomsky Hierarchy is a classification system for formal languages. It categorizes languages based on their generative power. With generative power being used to describe how complex a grammar must be in order to effectively generate that language. The Chomsky hierarchy has four different categories which are as follows: Type Zero languages (recursively enumerable languages), Type One languages (context sensitive languages), Type Two languages (context free languages), and Type Three languages (regular languages)

## Type Zero Languages

Type zero languages are those which can be recognized by a Turing machine. A Turing machine is composed of different states with transitions between them. Differentiating itself from other automata, the Turing machine has a tape that serves as its memory. This tape holds the string that is processed and special characters called blanks. The blanks represent empty space on the tape. For Turing machines describing Type zero languages, the space on this tape is assumed to be infinite. Type zero languages set is also called recursively enumerable. This term means that it has a recursive process that can enumerate, or generate, all the members in the language's set. Another significant feature of this language type is that they are not guaranteed to come to a decision. This means that the Turing machine designed for a given language type may not come to a decision, or halt, under certain conditions. So a Turing machine can recognize both decideable and undecideable languages. Recognizing in this context means identifying whether or not a string belongs to the language. Deciding in this context means coming to a definitive yes or no answer for every possible input.

## Type One Languages

Type one languages are slightly different from type zero languages. Type one languages, or context sensitive languages, are considered a subset of type zero languages. So, all type one languages are also type zero languages. Type one languages are also described by Turing machines. The biggest difference in the two is that type one languages are constrained by tape space. They do not have the infinite tape length of the type zero languages, and thus the Turing machines that are built to describe these languages are called linear bounded automatons. This is a Turing machine where the tape length is limited by the input size. Languages of this type are also called context sensitive. Another requirement of the context sensitive category is that the production rules must not decrease the length of the string.

## Type Two Languages

Type two languages are a significant step away from the other two categories previously discussed. This is because type two languages, or context free, can be described by less powerful pushdown automata. Pushdown automata also use states and transitions. However, their memory is less advanced than the tape of a Turing machine. Pushdown automata use a single  first in last out style stack for their memory. This limits the complexity of the languages which can be described by pushdown automata. Context free languages must also have only a single, non terminal variable on the left hand side of the production rule. 

## Type Three Languages

Type three languages, also called regular languages, are the least powerful in the Chomsky hierarchy. This is because they are described by finite automata. Finite automata have no memory, other than their states and transitions. This severely limits the amount of conditions that can be tracked by them. It does mean that the languages are easily decideable. That does provide certain benefits. Due to the speed at which decisions can be made, languages like this can be used for simple patterns to great effect. 

# The Halting Problem

The halting problem is a fundamental part of computer theory as developed by Alan Turing in 1936. It concerns whether a Turing machine will halt, decide, or run forever, when given a specific input. Alan Turing proved that there is no general algorithm that can solve the halting problem for all possible Turing machines and inputs. The actual thrust of which is that there are some problems which cannot be solved by the application of an algorithm. That is why languages of type zero may run indefinitely on the infinite tape afforded them. All the levels other than type zero in the Chomsky hierarchy are designed such that they will not encounter the halting problem. However, languages of level one, two, and three are not  Turing complete. There are many problems which they will be unable to solve due to this.  

# Bibliography 

1. Hunter, Tim. _The Chomsky Hierarchy_, UCLA, 2020, timhunter.humspace.ucla.edu/.

2. Butt, Sadia Yunas. “Halting Problem.” _Research Gate_, University of Pakistan, 2016, www.researchgate.net/publication/295254085_Halting_problem.

3. GeeksforGeeks, and GeeksforGeeks. “Chomsky Hierarchy in Theory of Computation.” GeeksforGeeks, 18 Oct. 2024, www.geeksforgeeks.org/chomsky-hierarchy-in-theory-of-computation/#. 

