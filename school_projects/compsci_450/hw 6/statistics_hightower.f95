
! -------------------------------------------------------------------------
! Course: CSCI 450, Section 1
! Student Name: Zachary Hightower
! Student ID: 010944120
! Homework #6 Problem 4
! Due Date: 10/18/2024
! 
! In keeping with the Honor Code of UM, I have neither given nor received 
! any inappropriate assistance from anyone other than the TA or the instructor.
! 
! Program Description: fortran program for calculating and displaying user entered
! test score statistics (mean and standard deviation) 
! -------------------------------------------------------------------------

program TestScoresStatistics
    implicit none

    ! Declare variables
    integer :: i, numScores
    real :: mean, stddev, sum, sumSq, variance, score
    real, dimension(:), allocatable :: scores
    real, dimension(:), allocatable :: tempScores

    ! Initialize sum and sum of squares
    sum = 0.0
    sumSq = 0.0
    numScores = 0

    ! Allocate initial memory for the scores array
    allocate(scores(0))

    ! Read test scores from the user
    print *, "Enter the test scores one by one (enter -1 to stop):"
    do
        read *, score
        if (score == -1.0) exit

        ! Increase the number of scores
        numScores = numScores + 1

        ! Reallocate the scores array to accommodate the new score
        allocate(tempScores(numScores))
        if (numScores > 1) then
            tempScores(1:numScores-1) = scores
        end if
        tempScores(numScores) = score
        call move_alloc(from=tempScores, to=scores)

        sum = sum + score     ! Add the score to the total sum
        sumSq = sumSq + score**2  ! Add the square of the score to sumSq
    end do

    if (numScores > 0) then
        ! Calculate the mean
        mean = sum / numScores
        ! Calculate the variance using a more stable formula
        variance = (sumSq - (sum**2 / numScores)) / (numScores - 1)

        ! Calculate the standard deviation
        stddev = sqrt(variance)
        ! Display the mean and standard deviation
        print *, "The mean is ", mean
        print *, "The standard deviation is ", stddev
    else
        print *, "No valid scores were entered."
    end if

end program TestScoresStatistics