IDENTIFICATION DIVISION.
PROGRAM-ID. SavingsCalculator.

DATA DIVISION.
WORKING-STORAGE SECTION.
01  Monthly-Savings       PIC 9(5)V99.
01  Annual-Interest-Rate  PIC 9(3)V99.
01  Months               PIC 9(3).
01  Monthly-Interest-Rate PIC 9(5)V99999.
01  Interest-Factor      PIC 9(1)V99999. *> Changed to handle decimal better
01  Total-Amount         PIC 9(3)V99.
01  Temp-Amount          PIC 9(7)V99.    *> Added for intermediate calculation
01  Counter              PIC 9(3).

PROCEDURE DIVISION.
MAIN-LOGIC.
    PERFORM GET-USER-INPUT
    PERFORM CALCULATE-INTEREST-RATE
    PERFORM CALCULATE-SAVINGS
    PERFORM DISPLAY-RESULTS
    STOP RUN.

GET-USER-INPUT.
    DISPLAY "Enter amount to be saved each month: $" WITH NO ADVANCING
    ACCEPT Monthly-Savings
    
    DISPLAY "Enter annual interest rate (enter 5 for 5%): " WITH NO ADVANCING
    ACCEPT Annual-Interest-Rate
    
    DISPLAY "Enter number of months: " WITH NO ADVANCING
    ACCEPT Months.

CALCULATE-INTEREST-RATE.
    COMPUTE Monthly-Interest-Rate = Annual-Interest-Rate / 1200. *> Convert percentage to decimal
    COMPUTE Interest-Factor = 1 + Monthly-Interest-Rate.

CALCULATE-SAVINGS.
    MOVE 0 TO Total-Amount
    
    PERFORM VARYING Counter FROM 1 BY 1 UNTIL Counter > Months
        ADD Monthly-Savings TO Total-Amount
        COMPUTE Temp-Amount = Total-Amount * Interest-Factor
        MOVE Temp-Amount TO Total-Amount
    END-PERFORM.

DISPLAY-RESULTS.
    DISPLAY "The amount in the account is: $" Total-Amount.
