*>
*>
*>
*>
*>
*>
*>
*>
*>
*>
*>
IDENTIFICATION DIVISION.
PROGRAM-ID. SavingsCalculator.

DATA DIVISION.
WORKING-STORAGE SECTION.
01  Monthly-Savings       PIC 9(5)V99.
01  Annual-Interest-Rate  PIC 9(3)V99999.
01  Months               PIC 9(3).
01  Monthly-Interest-Rate PIC 9(5)V99999.
01  Interest-Factor      PIC 9(1)V99999.
01  Total-Amount         PIC 9(5)V99.
01  Counter              PIC 9(3).

PROCEDURE DIVISION.
MAIN-LOGIC.
    PERFORM GET-USER-INPUT
    PERFORM CALCULATE-INTEREST-RATE
    PERFORM SAVINGS-CALC
    PERFORM DISPLAY-RESULTS
    STOP RUN.

GET-USER-INPUT.
    MOVE 0 TO Total-Amount
    DISPLAY "Enter amount to be saved each month: " WITH NO ADVANCING
    ACCEPT Monthly-Savings.
    
    DISPLAY "Enter annual interest rate (enter 5 for 5%): " WITH NO ADVANCING
    ACCEPT Annual-Interest-Rate.
    
    DISPLAY "Enter number of months: " WITH NO ADVANCING
    ACCEPT Months.

CALCULATE-INTEREST-RATE.
    DIVIDE Annual-Interest-Rate BY 12 GIVING Monthly-Interest-Rate
    DIVIDE Monthly-Interest-Rate BY 100 GIVING Monthly-Interest-Rate
    ADD 1 TO Monthly-Interest-Rate GIVING Interest-Factor.

SAVINGS-CALC.
    PERFORM VARYING Counter FROM 1 BY 1 UNTIL Counter > Months
        ADD Monthly-Savings TO Total-Amount
        MULTIPLY Total-Amount BY Interest-Factor GIVING Total-Amount
    END-PERFORM.

DISPLAY-RESULTS.
    DISPLAY "The amount in the account is:  " Total-Amount.
