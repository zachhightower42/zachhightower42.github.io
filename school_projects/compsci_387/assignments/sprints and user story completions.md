# Sprints
**SPRINT 1** Next Meeting we should see that you have:

- **Define team roles** for the first sprint as well as the languages to be used in both front and back end as well as just generally working on learning the basics
- **Define 3 user stories** and **admin stories** of items that you think these groups would want in the product
- **EXTRA**: Begin working on Login Page Framework
--- 
**SPRINT 2** Next Meeting we should see that you have:

- **FRONTEND**: some kind of work-in-progress frontend login/landing page. We recommend using HTML, Javascript, and CSS!
- **BACKEND**: a mock-up of your database’s ERD. This should be in crow’s foot notation and make sure to specify primary keys and foreign keys!
--- 
**SPRINT 3** Next Meeting we should see that you have: 

**FRONTEND**: some kind of work-in-progress home page as well as making tweaks to your login page. Make sure to have a consistent visual theme, and it never hurts to make it look nice! 

**BACKEND**: a more finalized version of your database’s ERD. This should be in **crow’s foot notation** and you should use an application such as vertabelo to visualize it.

--- 

**SPRINT 4** Next Meeting we should see that you have:

**FRONTEND**: If you haven't gotten to a good place with login page and home page, continue to work on that! Make sure components of your frontend are functional using javascript or an alternative language. If you are in a good place then start working on your application's site map. An example of one is in the Group Requirements Doc pdf in resources. 

**BACKEND**: Again, refine your ERD if I specified that you have some more work to do. Go ahead and get into your group's turing account and your mysql (mariadb) account and create your first database table- whatever table you are using to store login information and user profiles. You can also write a .sql file, put it into your turing account (using cyberduck or filezilla if you are using mac), and then run it by using source (.sql file) in your terminal

--- 
**SPRINT 5**

Next Meeting we should see that you have: 

**FRONTEND**: Finish up login/signup/home pages and start working on your extra pages such as profile, FAQ, create Event, etc. Start finalizing your site map and work with backend to get your pages connected with the database. 

**BACKEND**: **Again**, refine your ERD if I specified that you have some more work to do. If I told you I was going to give extra help with yours, please message me because I forgot which ones I need to double check. Start creating all your data tables in SQL based on your ERD (vertabelo has a tool where it will literally generate the SQL for you). Start working with frontend to connect pages with database. You might want to start putting mock data in your data tables to see if they will display properly.

--- 

**SPRINT 6**

I know I was out last week so I won't expect anything except what I assigned you to do last sprint! This week I'll check in to see if everyone can get into the Github/gitlab and create branches and such. You should be doing this already! 

I know Group Requirement Document was due last week so let me know if you had any trouble with that!

--- 

**SPRINT 7**

I know things have been a little crazy recently, but this should be where you are getting in your project.

**FRONTEND**: Login and signup pages should be functional, even if not connected to the database. Home pages and other various pages such as profile/create event/etc. should also be created and have the components they should have. The home page should be connected to your database of events, displaying all of the mock data in some kind of table that you can clean up later.

**BACKEND**: You should have all of your data tables created and you should be putting some mock data in to be able to visualize it a little bit more. Start working on CRUD files (create.php, update.php, delete.php) and you will also need a session.php file to store the current session of the user.


--- 

**SPRINT 8** 

**FRONTEND**:
All pages should be created and connected to your backend. Your login and sign up pages should be functional AND connected to your backend. User information should be getting created and stored in your user table. As for your home page, you should have mock data created and visualized in some kind of card/table format. I should be able to look at this next time. You might want to play with expandable cards so that you can click on each event to see the information. Profile page should also be created and connected to backend. Just keep working on formatting and making sure information and functionality is as clear as possible 

**BACKEND**: You should have frontend connected with your database. All tables should be created. You should be working on php files that will be able to create, read, update, and delete entries in your database. By next meeting I would strive to create your session php file and your files that create entries in your database. This should be connected to some kind of "Create an Event" page, or however you are handling the entries.

# Progress Notes

**Sprint 1**
- Began working on getting everybody onto github and able to push/pull 
- Started working on the definition of all user stories
**Sprint 2**
- Finished login page framework on frontend
- Started work on the dashboard page, which is the main informational display of the project
- ERD created by backend, started working through potential issues and ensuring it is in third normal form
**Sprint 3**
- Finalized ERD on backend
- Frontend work on setting up event cards that display all the information about an event and allow the user to interact with it through buttons
**Sprint 4**
- Adding more functions and trying to get to a fully realized display for the events system before moving to functions that will be placed outside the dashboard. Also migrated all event card functions to the dashboard to allow for easier site navigation for all users
- Setup the database in mariaDB account for the group and started checking the connection scripts
**Sprint 5**
- Continued work from last objectives on the frontend
- Checked the database setup and made a few tweaks to the ERD to accommodate necessary changes. Started checking basic login structure and making sure it remains functional.
**Sprint 6**
- Work started on additional pages that will be used to support the main functions on the dashboard page for various users. This is where work has started on the 


# Sprints listing
- login
- signup 
- authentication
- prevent users from accessing areas that they do not need to
- display events
- allow users to like events
- allow event organizers to create events
- allow event organizers to delete events
- allow admins to delete events
- allow admins to approve events
- allow admins to reject events
- display notifications for significant changes for site users
- allow event organizers to staff their events with available workers
- allow workers to make a profile
- allow workers to update their profile
- hash passwords for security 
- allow admins to add event spaces
- 
