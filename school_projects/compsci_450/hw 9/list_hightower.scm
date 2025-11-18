#lang racket
 
;Course: CSCI 450, Section 1 
; Student Name: Zachary Hightower
;Student ID: 010944120
;Homework #9 
;Due Date: 15-11-2024
; 
; In keeping with the Honor Code of UM, I have neither given nor received any 
;  inappropriate assistance from anyone other than the TA or the instructor. 
;
;Program Description: Program in racket with three functions for list
;manipulation. Finding all occurrences of an item in a list
;squaring all items in a list, and returning all even numbers in a list
;list is assumed to be a list of integers. 


; Function to count the occurrences of an integer in a list
(define (countAtomInList atom lst)
  (cond
    [(null? lst) 0]
    [(equal? (car lst) atom) (+ 1 (countAtomInList atom (cdr lst)))]
    [else (countAtomInList atom (cdr lst))]))

; Function to square each element in a list
(define (squareTheList lst)
  (map (lambda (x) (* x x)) lst))

; Function to return even numbers from a list
(define (evenInList lst)
  (filter even? lst))