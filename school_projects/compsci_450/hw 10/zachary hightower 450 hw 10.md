# CSCI 450 Fall 2024
## Homework 10

### Problem 1:
**Fill in the blank, multiple choice, and True/False questions:**

1. The design of the logic languages is based on **symbolic logic**.
2. Logic programming languages can also be called **declarative** languages.
3. A statement in Prolog ends with what symbol? **period**
4. When a goal has more than one subgoal, Prolog uses **depth first** search.
5. With a goal of multiple subgoals, if it fails to show truth of one of the subgoals, Prolog reconsiders previous subgoal(s) to find an alternative solution, this is called **backtracking**.
6. In Prolog, binding of a variable to a value is called **instantiation**.
7. Which of the following statements is true with regard to the clausal form:
   
   B1 ∪ B2 ∪ … ∪ Bn ⊂ A1 ∩ A2 ∩ … ∩ Am
   
   a. The left side of the clausal form is antecedent and the right side is consequent.  
   b. The clausal form means that if all the Bs are true, then at least one A is true.  
   **c. The clausal form means that if all the As are true, then at least one B is true.**  
   d. None of the above.

8. **F:** In logic languages, variables are used just as those in imperative programming languages.
   
9. **T:** The structure used to represent an atomic proposition in Prolog looks like this: `functor (parameter list)`.
10. **F:** `is` operator in Prolog is like assignment operator in imperative programming languages, and the following is a legal statement in Prolog: `Sum is Sum + 1`.
	>*This one is false due to the fact that if `Sum` is not instantiated beforehand, the statement would not evaluate correctly. *

---

### Problem 2: (5 pts) 
Finish the Prolog program, make sure to include the header comments (check Program Template on Bb). If your program does not execute, you will get **NO** credit.

**Filename:** findSuspects_hightower.pl