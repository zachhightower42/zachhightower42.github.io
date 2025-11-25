# 1 Match Terms with Statements

Match terms in the list with the statements given below. For each statement, write the letter of the best matching term in the blank. A term may be used more than once.

### Terms:
- **A.** regular  
- **B.** context-free  
- **C.** finite  
- **D.** tape alphabet  
- **E.** Chomsky normal form  
- **F.** NFA  
- **G.** DPDA  
- **H.**  Blank
- **I.** accepter  
- **J.** transducer  
- **K.** DFA  
- **L.** left linear  
- **M.** recursive enumerable  
- **N.** read-write head  
- **O.** Type-0 languages  
- **P.** NPDA  
- **Q.** The Halting Problem  
- **R.** equivalent  

---

### Statements:

1. **This symbol is used to separate different strings on a tape.**  
   **Answer:** Blank

2. **The fact that there doesn’t exist an algorithm that will determine the outcome of any given program with any given input is the basis of the**  
   **Answer:** Halting Problem 

3. **General term for an automaton that produces a string for its output**  
   **Answer:** transducer

4. **Is used to read or modify the tape.**  
   **Answer:** read-write head

5. **General term for an automaton that halts in a final state when the string read is in the associated language**  
   **Answer:** accepter

6. **Any symbol that can be read or written while a Turing Machine is processing the input.**  
   **Answer:** tape alphabet




# 2 True or False Statements

Place **T** on the line for each statement that is true and **F** on the line for each statement that is false.

1. **A Turing Machine can be built to accept context-free languages.**  
   **Answer:** T

2. **The tape alphabet and the input alphabet are always the same for a Turing Machine.**  
   **Answer:** F

3. **All Type 2 grammars have a FA to accept strings in the language.**  
   **Answer:** F

4. **All recursively enumerable languages can be represented by a PDA.**  
   **Answer:** F


# 3 Instructions for Drawing a Chomsky Hierarchy Diagram

Follow these steps to create a clear and labeled diagram of the **Chomsky Hierarchy**, illustrating the relationship between language types, grammars, and computational models:

---

## 1. **Start with a Rectangle for the Entire Hierarchy**
   - Draw a large rectangle to represent the broadest language class, **Type-0** languages (recursively enumerable).
   - Label the rectangle: **Type-0 Languages**.

---

## 2. **Draw a Smaller Rectangle Inside for Type-1 Languages**
   - Inside the Type-0 rectangle, draw a slightly smaller rectangle to represent **Type-1** languages (context-sensitive).
   - Label this rectangle: **Type-1 Languages (Context-Sensitive)**.

---

## 3. **Add Another Smaller Rectangle for Type-2 Languages**
   - Inside the Type-1 rectangle, draw another smaller rectangle to represent **Type-2** languages (context-free).
   - Label this rectangle: **Type-2 Languages (Context-Free)**.

---

## 4. **Include the Smallest Rectangle for Type-3 Languages**
   - Inside the Type-2 rectangle, draw the smallest rectangle to represent **Type-3** languages (regular languages).
   - Label this rectangle: **Type-3 Languages (Regular)**.

---

## 5. **Label the Associated Grammars**
   - Inside or near each rectangle, write the corresponding grammar type:
     - **Type-0:** Unrestricted Grammar.
     - **Type-1:** Context-Sensitive Grammar.
     - **Type-2:** Context-Free Grammar.
     - **Type-3:** Regular Grammar.

---

## 6. **Label the Computational Models**
   - Outside or within each rectangle, label the computational model capable of recognizing the corresponding language type:
     - **Type-0:** Turing Machine (TM).
     - **Type-1:** Linear Bounded Automaton (LBA).
     - **Type-2:** Pushdown Automaton (PDA).
     - **Type-3:** Finite Automaton (FA).

---

## 7. **Draw Arrows Indicating Inclusion**
   - Add arrows pointing inward from the outer rectangle to the innermost rectangle to show that:
     - Type-3 ⊆ Type-2 ⊆ Type-1 ⊆ Type-0.

---

## 8. **Include Examples (Optional)**
   - Near each rectangle, provide examples for each language type:
     - **Type-0:** Languages with unrestricted rules.
     - **Type-1:** \( a^n b^n c^n \).
     - **Type-2:** \( a^n b^n \).
     - **Type-3:** \( a^* b^* \).

---

### Notes:
- Ensure clear labeling for readability.
- Use distinct colors or shading for each rectangle to differentiate between the types.
- Add a legend or key if necessary to explain the labels and arrows.

# 4 Accepted and rejected strings by the turing machine

(a) abba 
	Reject
(b) abbba
	Accept
(c) abbbabab
	Reject
(d) bbbb
	Accept
(e) aaaaaa
	Reject


# JFLAP Turing machines and their septuples
$$
\begin{aligned}
(a) \quad &L_1 = \{ w : n_a(w) = n_b(w) = n_c(w) \} \\
(b) \quad &L_2 = \{ a^n b^m c^p : n \geq m > p \} \\
(c) \quad &L_3 = \{ a^n b^m : n, m \geq 0 \} \\
(d) \quad &L_4 = \{ a^n b^m : n \geq m \}
\end{aligned}
$$


## A.

