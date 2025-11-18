
# Course: CSCI 256, Section 1
# Student Name: [Student Name]
# Student ID: [Student ID]
# Lab 12
# Due Date: [Due Date]

# In keeping with the Honor Code of UM, I have neither given nor received 
# inappropriate assistance from anyone other than the TA.

# Program Description: This program implements a Car class with private attributes
# for make and year model, along with getter and setter methods

class Car:
    def __init__(self, mk, yr):
        self.__make = mk
        self.__yearModel = yr
        
    def setMake(self, mk):
        self.__make = mk
        
    def setYearModel(self, yr):
        self.__yearModel = yr
        
    def getMake(self):
        return self.__make
        
    def getYearModel(self):
        return self.__yearModel
