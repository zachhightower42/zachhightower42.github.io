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

