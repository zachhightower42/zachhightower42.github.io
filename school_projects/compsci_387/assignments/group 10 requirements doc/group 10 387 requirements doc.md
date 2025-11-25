# Goals

- **Event Creation**: Allow event organizers to create events.
- **Event Management**: Allow admins to approve events, cancel events, and manage event spaces. Allow organizers to edit their events and cancel them. 
- **Worker Assignments**: Let event workers view their assigned events and post the hours they can work. 
- **Role-Based Access**: Role based permissions for admins, organizers, workers, and attendees. 
- **Notification System**: Notify users (via web portal) about event approvals, cancellations, or updates.
- **Searchable Events**: Allow attendees to search through approved events and like them to receive updates. 
  
## Minimum Viable Product

The MVP is a web-based event management system with four user roles: admins, organizers, workers, and attendees. Admins have top level permissions to access and edit the system. Admin approval is required for events. Organizers can create events, edit them, and receive notifications about  approval. Event workers can view their assigned events and post their workable hours. A notification system informs users of event updates via the portal and email. A drop-down menu displays available spaces for event organizers and admins.

---

# User Personas

- **Admin**: 
  - Highest level user, responsible for approving events and managing overall system operations.
- **Event Organizer**: 
  - Creates events, manages event details, and receives approval/rejection notifications. Can choose from workers with available times to staff their event. 
- **Event Worker**: 
  -  Able to sign up to work, view assigned shifts, and update workable hours. Can view event information related to their assigned role.
- **Attendee**: 
  -  View approved events and like events to receive notifications and easily find them again.
---

# User Stories

1. **Event Organizer**:
   - As an event organizer, I want to create an event, so I can host it.
   - As an event organizer, I want to receive notifications about space approvals or denials, so I know what to do next.
   - As an event organizer, I want to search for spaces, so I can find the one that fits my needs.
   - As an event organizer, I want to assign staff, so I the event will run smoothly.

2. **Event Worker**:
   - As an event worker, I want to access the web portal, so I can sign up for work.
   - As an event worker, I want to view events I’m scheduled to work, so I can plan my schedule.

3. **Admin**:
   - As an admin, I want to approve or deny events, so I can manage event quality.
   - As an admin, I want to cancel events, so I can ensure attendee and worker safety.
   - As an admin, I want to manage event spaces, so I can ensure the listed spaces are accurate.
   - As an admin, I want to manage other users permissions, so I can ensure that no user can access features they are not meant to. 
   - As an admin, I want to maintain system health, so all users are able to use the system.
4. **Attendee**
   - As an attendee, I want to view approved events, so I can decide whether or not to attend them.
   - As an attendee, I want to like events, so I can track those specific events.

---
# ERD
![[erd group 10 1.png]]

---
# Sitemap and Page Descriptions

- **Login Page**: Users log in with their credentials.
- **Signup Page**: New users can create an account. Given basic level permissions on signup with more advanced permissions assigned by admin.
- **Dashboard**: Displays events and allows users to perform actions according to their role. Event organizers can swap to a view of their events only and see status updates. Workers can swap to a view of assigned events and see notifications. Admins can sort for pending requests and manage event.
	- **Event Space Search**: Search function for available spaces.
	- **Event Creation Popup**: Form for event organizers to submit event details and request a space.
- **Worker Sign-Up Page/Hours Update**: Form for event workers to enter their information and workable hours.
- **Admin Page**: A page for admins to approve/reject events, manage other users, and manage spaces.

## Wireframe
![[wireframe for OM Events group10.png]]
  
---

# Non-Functional Requirements

- **Scalability**: The system must efficiently handle multiple concurrent users, events, and event spaces.
- **Security**: Ensure secure user authentication and role-based access to sensitive features.
- **User Experience**: Provide an intuitive interface for all roles, with simple navigation.
- **Performance**: The system must have quick load times and realtime event and space updates.
- **Data Backup**: The system should have regular data backups to ensure that records are not lost.

---

# Risks

- **Double-Booking**: Potential for spaces to be double-booked by different event organizers. Mitigated by availability updates and approval requirements.
- **Info Security**: Will be handling sensitive user info at many stages. (E.g. Worker names and contact info.)  
- **Missable Updates**: Important updates could be missed if users do not check event portal. (E.g. Showing up for a cancelled event)

---

# Future Iterations
- **Mobile App**:
  - A mobile app with push notifications for event updates and reminders.
- **Enhanced Search Features**:
  - Event organizers can filter event spaces by venue type, booking history, and venue photos to find the best match.
- **Most Liked Events**:
  - Display a selection of the most liked events on the dashboard
- **Staffing automation**
  - Allow workers to give a list of preferred to least preferred event types and let the system automatically place them into approved events.