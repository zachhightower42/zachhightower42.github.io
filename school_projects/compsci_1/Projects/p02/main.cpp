// Author:      Zachary Hightower
// Course:      CSC 2134
// Assignment:  Project 2
// Due Date:    6/23/2022
// File name:   main.cpp
// Description: Code for a program that takes in mass and density values and
//runs them through a formula to find their volume. Mass in grams and density
//in cubic centimeters
#include <iostream>
#include <iomanip>
using namespace std;

int main() {

//declarations for the three values in the program
    double mass;
    double density;
    double volume;
//input for the mass and density values
    cout << "Enter the object's mass in grams."<< endl;
    cin >> mass;
    cout << "Enter the object's density in cubic cm."<< endl;
    cin >> density;
//performance of the formula
    cout << "Calculating..."<< endl;
    volume = mass / density;
    cout << mass << " / " << density << "=" << setprecision(2) << volume<< endl;
//final output of the  average
    cout << "Volume of the object = " << volume<< endl;
    cout << setprecision(2);
    return 0;
}