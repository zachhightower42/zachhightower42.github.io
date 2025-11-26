// Author:      Zachary Paul Hightower
// Course:      CSC 2134
// Assignment:  Project 5
// Due Date:    7/15/2022
// File name:   main.cpp
// Description: code for accepting x and y coordinates of a circle's center and podouble on a circle. Meant to return radius, diameter,
//circumference, and area of the circle. 
#include <iostream>
#include <iomanip>
#include<cmath>
const double pie=3.1416;
using namespace std;
//naming the functions and laying out what goes inside them
double dia(double xcle, double xpnt, double ycle, double ypnt);
double rad(double xcle, double xpnt, double ycle, double ypnt);
double cir(double ra);
double are(double ra);
int main()
{
//value declaration for the xs and ys
 double xcle;
 double xpnt;
 double ycle;
 double ypnt;
 
   //input entry for the x and y of the circle and the point
    cout<<"Enter the x and y cordinates of center of the circle: ";
    cin>>xcle>>ycle;
   
   
    cout <<endl<<"Enter the x and y coordinates of a point on the circle: ";
    cin>>xpnt>>ypnt;
//final output for radius, diamter, circumference, and area
//initially thought I could get away with sticking just rad or dia in here so that it would pull the value from later
//and put it here, but that kept returning issues, so I looked back at examples and explanations in the lab and materials
//which told me I needed to put the function in here, from what I gather.
//setprecision was giving me trouble for a little while. had to look up how to set it to fixed so that it would go from the
//decimal point and not just the number of significant figures
    cout<<setprecision (2) << fixed <<"Radius = "<<rad(xcle,xpnt,ycle,ypnt)<<endl;
    cout<<setprecision (2) << fixed <<"Diameter = "<<rad(xcle,xpnt,ycle,ypnt) + rad(xcle,xpnt,ycle,ypnt)<<endl;
    cout<<setprecision (2) << fixed <<"Circumference = "<<cir(rad(xcle,xpnt,ycle,ypnt))<<endl;
    cout<<setprecision (2) << fixed <<"Area = "<<are(rad(xcle,xpnt,ycle,ypnt))<<endl;
 return 0;
}
//originally had it so that it was trying to do two things here. Those two things being diamater and radius 
//but kept running into issues trying to get 
//dia value to appear in the above output. Split into two different things so that it would be easier to handle.
//kind of hard sometimes not to knee jerk put things as int, when they need to be double.
double dia(double xcle, double xpnt, double ycle, double ypnt)
{        //finding the diamater of the circle, for the longest time this was giving me back half the value it should have
//cutting it down to where it just returns the function didn't fix the issue
//eventually sat down and redid all the code in a different file and that one didn't give me half the value back
//I have no idea what I did to screw it up, but it is screwed up in the original file.
      return sqrt(pow(xpnt - xcle, 2) + pow(ypnt - ycle, 2));                  
}

double rad(double xcle, double xpnt, double ycle, double ypnt)
{        //finding the radius
//in the original file this thing was giving me the same value as the above in the output
//typing it all up again seems to have fixed the problem. Genuinely wondering if I just pressed a button that put something
//into a spot that I just can't see and it's in the background screwing up the original file
  return dia(xcle, xpnt, ycle, ypnt);                                  
}

double cir(double ra)
{        //finding the circumference
   return 2 * pie * ra;
}

double are(double ra)
{       //finding the area
   return pie * pow(ra, 2);
}