// Author:      Zachary Hightower
// Course:      CSC 2134
// Assignment:  Project number 4
// Due Date:    7/7/2022
// File name:   main.cpp
// Description: Code is for determining the effects of the input growth rate on the input populations of town a and b after
//set amount of years
#include <iostream>

using namespace std;
//realized that I hadn't put many comments in the code for the first submission of this assignment
//was a little frustrated with it and trying to get it done after working 9 to 4 today
int main()
{
    //declaration of variables
    int pna, pnb, yr = 0; 
    double gtha, gthb; 
//entry for the variables
    cout << "Enter population and growth of Town A ";
    cin >> pna >> gtha;
    cout << endl;

    cout << "Enter population and growth of Town B ";
    cin >> pnb >> gthb;
    cout << endl;
//bounds of the function
    if (pna < pnb && gtha > gthb) {       
        do {
            //calculation for pop growth in one year
            (pna = ((gtha / 100) * pna) + pna);
            (pnb = ((gthb / 100) * pnb) + pnb);
            yr++;
        } while (pna < pnb);
    //final output
//realized on going back that the output didn't have grammatically correct spacing and didn't actually say years
//unfortunately, it is up to me to realize that I need to put the word years and not just a variable that means years
        cout << "After " << yr << " years the population of town A will be greater than or equal to the population of town B." << endl;
        cout << "After " << yr << " years the population of Town A is: " << pna << endl;
        cout << "After " << yr << " years the population of Town B is: " << pnb << endl;
    } else {
        cout << "Input Error";
    }
    //hope that your day is going well and that you're able to get what you need
    //I read that announcement you posted today about the difficult times you're in when I got back
    //not sure if there's anything I can do, as a student, to help you with this
    //if you need someone to talk to or to play board games with, I'd be down
    //hope that it helps knowing there's another person who cares what's going on in your life
    return 0;
}