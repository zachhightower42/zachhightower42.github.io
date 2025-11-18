%Course: CSCI 450, Section 1 
% Student Name: Zachary Hightower
%Student ID: 010944120
%Homework #10
%Due Date: 22-11-2024
% 
% In keeping with the Honor Code of UM, I have neither given nor received any 
%  inappropriate assistance from anyone other than the TA or the instructor. 
%
%Program Description: Prolog program for determining suspects in an investigation.


suspect(mike, gardener, 'has been observed around midnight', 'he is known to be broke').
suspect(brad, guard, 'has been observed around midnight', 'he is known to hate his job').
suspect(nina, guard, 'has been observed around midnight', 'she is known to steal regularly').
suspect(hope, curator, 'has been observed around noon', 'she is known to steal regularly').

timeofcrime('the crime was committed around midnight').
weakmotive('hating ones job is considered a weak motive').

% Rule to check if suspect had time to commit crime
hadTime(Name) :-
    suspect(Name, _, 'has been observed around midnight', _),
    timeofcrime('the crime was committed around midnight').

% Rule to check if suspect has strong motive
hasMotive(Name) :-
    suspect(Name, _, _, Motive),
    \+ (Motive = 'he is known to hate his job').

% Rule to find potential suspects who had both time and motive
whoCouldHaveDoneIt(X) :-
    suspect(Name, Job, Time, Motive),
    hadTime(Name),
    hasMotive(Name),
    X = suspect(Name, Job, Time, Motive).