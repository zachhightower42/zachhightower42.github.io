
Outline for an inventory system using the streamlit library. 

Basic inventory display andd management features for a summer camp with multiple deparments.

Needs to have the following features:
- display inventory items in a table
- add new inventory items
- edit existing inventory items
- delete inventory items
- display inventory items by department
- setup login to handle multiple users with different permissions
- search inventory items by name, id, or description
- filter inventory items by department, location, or quantity
- sort inventory items by name, id, quantity, reorder point, or date modified
- allow low level users to propose edits, additions, and deletions to inventory items for their department
- export inventory data to CSV
- import inventory data from CSV
- allow export to an easily printable pdf format
- give alerts when an inventory item is low
- track inventory item history (who added/edited/deleted an item and when)
- allow viewing inventory edit history by item or by changelog organized by user
- i forgot my password support (sends an email to the camp directors for password reset approval)
- display reorder cost of inventory items as a total and by item
- display most purchased/used inventory items in an easily viewable graph
- display current quantity of inventory items and how close they are to reorder point in an easily viewable graph
- give each item an id, name, description, quantity, reorder point, reorder cost, department, and location
- store user data and inventory data in a database (sqlite or similar)

New user addition pipeline:

1. User requests access to the inventory system by filling out a form with their name, email, department, and password.
2. An email is sent to the camp directors with the user's information and a link to approve, deny, or modify the user's access. If denied or modified, camp director will be prompted for reasoning.
3. A. If approved, the user is added to the inventory system with the specified department and permissions.
3. B. If denied, the user is sent an email notifying them of the denial and a reason for the denial.

Department Member Permissions:
- View Inventory: All users can view the inventory for their department.
- Propose edits, additions, and deletions: Can propose edits, additions, and deletions to inventory items for their department. These proposals will be sent to the Department Admins for approval.

Department Admin Permissions:
- view Inventory: All users can view the inventory for their department
- Add Inventory Items: Can add new inventory items for their department.
- Edit Inventory Items: Can edit existing inventory items for their department.
- Delete Inventory Items: Can delete inventory items for their department.
- View Inventory History: Can view the history of inventory items for their department.
- Approve/deny proposed edits, additions, and deletions: Can approve or deny proposed edits, additions, and deletions to inventory items for their department.
- Manage Users WITHIN DEPARTMENT: Can add, edit, and delete users and their permissions within their department.

Camp Director Permissions:
- View Inventory: All users can view the inventory for all departments.
- Add Inventory Items: Can add new inventory items for all departments.
- Edit Inventory Items: Can edit existing inventory items for all departments.
- Delete Inventory Items: Can delete inventory items for all departments.
- View Inventory History: Can view the history of inventory items for all departments.
- Manage Users ACROSS DEPARTMENTS: Can add, edit, and delete users and their permissions.


Number of departments and their names are as follows:
1. Office
2. Kitchen
3. Maintenance
4. Housekeeping
5. Concessions
6. Deans
7. Nurse
8. Camp Directors
