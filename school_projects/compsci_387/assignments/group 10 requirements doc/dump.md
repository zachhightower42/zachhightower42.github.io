Use the following as a template for the requirements document.
# Goals


## Minimum Viable Product

---

# User Personas

---

# User Stories

---

#  Sitemap and Page Descriptions


---

# Non-Functional Requirements

---

# Risks

---

# Future Iterations

The following is an example of a filled out requirements document
# Goals

- **Note Contribution**: Allow students to contribute notes to the system.
- **Note Searching**: Allow students to search for notes in the system.
- **Course Organization**: Organize notes by class and label by topic.
- **Role-Based Access**: Ensure that only students associated with a course can view and contribute to notes.
- **Instructor and TA Permissions**:
    - TAs and instructors have the same abilities as students, with additional privileges to mark notes as preferred.
    - Instructors and admins can add/remove TAs.
    - Admins can add new instructors.
- **Moderation and Management**:
    - TAs and higher roles have moderation abilities (approving, marking preferred, deleting notes)
    - Instructors can create classes and divide them into sections.
- **File Restrictions**: Uploaded notes are restricted to `.pdf` format.
- **Student Interaction**:
    - Notes are downloadable as `.pdf` files.
- **Access Options**: Provide a code-based joining option in addition to open joining for courses.
## Minimum Viable Product
The minimum viable product is a notes system that allows students to contribute and search for notes, organized by class and labeled by topic. The roles will moderate access, so only students in a course can view and upload notes. Instructors and TAs handle course moderation, marking notes preferred, removing objectionable content or useless content. Admins will manage user roles and step in to resolve issues experienced by lower permission users. All uploaded notes will be in `.pdf` format, and students will be able to download notes as `.pdf` files. Access will be handled by join code, or search and choose. 

---

# User Personas

- **Admin**:
    - Top level user responsible for maintaining the system, debugging, and assisting instructors and TAs.
    - Can manage all users, add/remove instructors, and control system-wide functions.
- **Instructor**:
    - Manages courses, moderates notes, and handles access controls. Can divide classes into sections and appoint TAs.
- **TA**:
    - Assists instructors in moderating notes and comments. Can approve, edit, delete notes, and mark preferred notes.
- **Student**:
    - The primary user of the system who can contribute, find, like, dislike, and download notes.
- **Former Student**:
    - Still able to view notes but can no longer contribute or comment.

---

# User Stories

1. **Student Contributions**:
    - As a student, I want to contribute notes so that I can organize them for future reference.
    - As a student, I want to access my notes from anywhere so that I can review them.
    - As a student, I want to label my notes by topic so they can easily be found.
2. **Note Discovery**:
    - As a student, I want to search for notes so that I can study for specific parts of the course I have problems with.
    - As a student, I want to see which notes are preferred so I know what is best to study.
3. **Instructor and TA Moderation**:
    - As a TA, I want to approve or delete material so that the course remains properly instructive.
    - As an instructor, I want to mark notes as preferred so that students know which notes are most correct/helpful.
    - As an instructor, I want to manage my TAs so that the course runs smoothly
1. **Admin Tasks**:
    - As an admin, I want to add or remove instructors so that courses can be effectively managed.
    - As an admin, I want to maintain the health of the system, so that all users are satisfied.

---

#  Sitemap and Page Descriptions

- **Login Page**: Authentication page for students, instructors, TAs, and admins.
- **Home Page**: Personalized dashboard showing recent notes, heat system, and class navigation.
- **Course Search Results**: Search results for available courses that the user can join.
- **Course Page**: Overview of the course with options to view and upload notes.
- **Section Page**: Separate page for each section of a course, displaying notes related to that section.
- **Note Display Page**: A detailed view of a selected note, with download and interaction options
- **Note Upload/Edit Page**: Form for students to upload new notes or TAs/Instructors to edit existing notes.
 ![[wireframe for 387 individual.png]]


---

# Non-Functional Requirements

- **Scalability**: The system must handle a large number of students, courses, and notes without issue.
- **Security**: Secure student information and notes with controlled access and role-based permissions.
- **User experience**: The interface should be intuitive and accessible for all roles, with minimal learning time.
- **Performance**: Ensure fast loading times and efficient searches across notes and courses.
- **Backup and Recovery**: Regular data backups will help to prevent loss of notes and ensure the system can be restored in case of failure.

---

# Risks

- **Privacy**: Potential leaks of student data, including notes and personal details, must be handled through access control and careful moderation. 
- **Social Targeting**: Students could be targeted for positive or negative reasons based on quality of  notes. Implementing full or partial anonymity for contributors will help with this. 
- **Academic Integrity**: Students may attempt to upload completed coursework, like homework or project solutions, which could ruin evaluation for that particular piece of coursework. 

---

# Future Iterations

- **Personalized Home Page**:
    - A personalized home page for each student displaying new and trending notes in their enrolled classes.
-  **Student Interaction**:
    - Students can mark notes as liked or disliked.
    - Students may comment on notes, but comments must be approved by TAs or higher.


Pull from the following materials when creating the new individual requirements document. 

  

CSCI 387 

Prospectus

  

Group Name: 

Compile It Like It’s Hot

  

Group Number: 10 

  
  

OM Events is an event management system that helps run events smoothly on campus. It allows users to request a particular event space or submit an event that a manager can assign a space to. It also helps keep event workers informed about which events have been assigned to them. What follows are a few different proposals for the system, organized from least to most difficult.

The minimum viable product is served through a web page and supports three distinct user types, managers, event organizers, and event workers. Managers have the highest permissions in the system. They can cancel events, assign spaces, make spaces unavailable, change event or event space descriptions, and process booking requests sent by event organizers. Event organizers and managers will view a drop down list displaying the currently available spaces. Event organizers may request space for an event at a specific time. Event workers will be able to sign up to work through the web portal. They will be able to view events they have been booked for and the positions assigned to them. 

The next level of features expands on the MVP. It includes a fourth user type, attendee. Attendees will be prospective event-goers, able to search for upcoming events and sign up to receive notifications from events that interest them. Workers will be able to search upcoming events and choose ones they wish to work at, should they wish to do so. Upcoming events will now have a follower count associated with them, showing how many have signed up to receive notifications about it. Managers and Event organizers will be able to see available spaces by searching a list and when one is selected, the system will display a page of general information. General information here is capacity, booking history, seating type, and type of venue. Event organizers will also be able to choose venue types when requesting a space. This will help managers in determining which event space to assign, when the organizer does not have a specific one in mind. Notifications will be served to the users both in the web portal and through email, should they sign up for it. 

The furthest stretch goals of the OM events service expands into a simple mobile app. The most consequential additional feature made possible by the mobile version will be allowing users to receive push notifications. Push notifications would allow for all previous notifications to be served in an easier to process form. They would also allow for more real time communications. E.g “Event starts in 15 minutes.” The search function for events in this version will also allow managers and event organizers the ability to tag events. This will be largely to the benefit of attendees, allowing them to find events that suit them easier. The search function for venue spaces and events will also be expanded to include photos, in addition to text.

# User stories

## User

- As an event organizer, I want to request a space, so that I can host my event.
- As a (prospective) event worker, I want to access the web portal, so that I can sign up for event work
- As an event worker, I want to access the web portal, so I can view the events I am assigned to work
- As an event organizer, I want to search the list of available spaces, so that I can quickly find a space for my event

## Admin

- As a manager, I want to cancel events, so that I can control the spaces used
- As a manager, I want to make spaces unavailable, so that I can control the spaces used
- As a manager, I want to add/remove event organizers, so that approved organizers can host events.




Sitemap

- Login
- Signup
- Dashboard
- Admin page