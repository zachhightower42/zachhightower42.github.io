Project 387
Zachary Hightower changelog 10/3/2024
- Fixed styling for the login and signnup pages
The login and signup process should now run smoothly,
the logo text shouldn't display over anything anymore
and is no longer interactable, so the user won't be 
prevented from interacting with the login or singup containers. 
- Added more to the dashboard page and made css and js files for it
- Dashboard page now has a navigation bar that handles the four user types
Attendee, Worker, Organizer, and Admin. Drop down menus appear when the user
hovers over the section on the navigation bar that allows the user to select
where they want to go next.
Zachary Hightower changelog 10/9/2024
- Updated the dashboard page so that it now includes swapping background images
- Added documentation to the top of every file that explains what it's used for
- Updated the actual text that displays on the daskboard page to OM events
Zachary Hightower changelog 10/20/2024
- Gave the organizer Create Event button a function to allow creation of event cards
- Added functionality to events so that they now start in a space saving collapsed state
- Added description to event cards
    Todo
    [x] debug event cards collapsing at the same time when only one is clicked
    [x] debug the attendee View Liked Events button not actually showing only liked events
    [x] add option to delete events
    [x] add option to edit events

Zachary Hightower changelog 11/4/2024
- Fixed the event cards uncollapsing at the same time when only one is clicked,
it was an issue with the flexbox extending too far
- Clicking the liked events button now actually cuts things back down to liked events 
- edit button is implemented but I need to fix how it does not remove the event card from the page
it leaves a fully empty one
- edit button issue is fixed, it was an issue with the empty event not being removed from the array
- added limits on description and title length
- made sure that the description handles overflow properly

THIS IS HERE TO LET ME KNOW THE MOST RECENT PUSH WORKED NOV 21ST