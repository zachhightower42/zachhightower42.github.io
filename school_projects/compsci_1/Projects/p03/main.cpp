// Author:      Zachary Hightower
// Course:      CSC 2134
// Assignment:  Project 03
// Due Date:    Jul/4/2022
// File name:   main.cpp
// Description: Program for determining whether a triangle is a right triangle or not a right triangle
#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;

int main() {

//declarations of the values in the program
    double side1;
    double side2;
    double side3;
    double answr;
//input for sides of the triangle
    cout << "Enter the first side of the triangle."<< endl;
    cin >> side1;
    cout << "Enter the second side of the triangle."<< endl;
    cin >> side2;
    cout << "Enter the third side of the triangle."<< endl;
    cin >> side3;
//check to see if any of the three combinations will meet requirements for a right triangle
//the necessity of it being not just an = but a == took me thirty actual minutes to figure out
    if (pow (side1, 2) == pow (side2, 2) + pow (side3, 2)){
        cout << "The triangle is a right triangle." << endl;
}
    else if (pow (side2, 2) == pow (side3, 2) + pow (side1, 2)){
        cout << "The triangle is a right triangle." << endl;
}
    else if (pow (side3, 2) == pow (side2, 2) + pow (side1, 2)){
        cout << "The triangle is a right triangle." << endl;
}
//and this is where it says it isn't a right triangle if it isn't
    else {
        cout << "The triangle is not a right triangle." << endl;
}
   
    return 0;
}