// Author:      Zachary Paul Hightower
// Course:      CSC 2134
// Due Date:    6/16/2022
// File name:   main.cpp
// Description: Code for a program that takes five test scores
//as input and outputs their average. 
#include <iostream>
using namespace std;

int main() {

// test score sum and average declarations
    double score1;
    double score2;
    double score3;
    double score4;
    double score5;
    double sum;
    double average;
//input for scores
    cout << "Enter the first score."<< endl;
    cin >> score1;
    cout << "Enter the second score."<< endl;
    cin >> score2;
    cout << "Enter the third score."<< endl;
    cin >> score3;
    cout << "Enter the fourth score."<< endl;
    cin >> score4;
    cout << "Enter the fifth score."<< endl;
    cin >> score5;
//addition of scores
    cout << "Summation of Scores"<< endl;
    sum = score1 + score2 + score3 + score4 + score5;
    cout << score1 << " + " <<  score2 << " + " << score3 << " + " << score4<< " + " << score5 << " = " << sum<< endl;
//averaging the sum of scores
    cout << "Averaging..."<< endl;
    average = sum / 5;
    cout << sum << " / " << 5 << "=" << average<< endl;
//final output of the  average
    cout << "Average score is = " << average<< endl;
    return 0;
}