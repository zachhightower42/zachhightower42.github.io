import streamlit as st
import sqlite3
import pandas as pd
from datetime import datetime
import smtplib
from email.mime.text import MIMEText

# --- Constants ---
DEPARTMENTS = [
    "Office", "Kitchen", "Maintenance", "Housekeeping",
    "Concessions", "Deans", "Nurse", "Camp Directors"
]
USER_ROLES = ["Member", "Admin", "Director"]

EMAIL_FROM = st.secrets["email"]["from"]
EMAIL_TO = st.secrets["email"]["to"]
EMAIL_PASS = st.secrets["email"]["password"]

# --- Database Setup ---
def get_db():
    conn = sqlite3.connect("inventory.db", check_same_thread=False)
    return conn

def init_db():
    conn = get_db()
    c = conn.cursor()
    # Users table
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT, email TEXT UNIQUE, password TEXT,
            department TEXT, role TEXT, approved INTEGER DEFAULT 0
        )
    ''')
    # Inventory table
    c.execute('''
        CREATE TABLE IF NOT EXISTS inventory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT, description TEXT, quantity INTEGER,
            reorder_point INTEGER, reorder_cost REAL,
            department TEXT, location TEXT,
            date_modified TEXT, modified_by TEXT
        )
    ''')
    # Proposals table
    c.execute('''
        CREATE TABLE IF NOT EXISTS proposals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT, item_id INTEGER, data TEXT,
            user_id INTEGER, department TEXT, status TEXT,
            date_submitted TEXT
        )
    ''')
    # History table
    c.execute('''
        CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            item_id INTEGER, action TEXT, user_id INTEGER,
            timestamp TEXT, details TEXT
        )
    ''')
    conn.commit()

init_db()

# --- Authentication (placeholder) ---
def login(email, password):
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE email=? AND password=? AND approved=1", (email, password))
    user = c.fetchone()
    return user

def get_user_role(user):
    return user[5]  # role

def get_user_department(user):
    return user[4]  # department

def send_email(subject, body):
    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = EMAIL_FROM
    msg["To"] = EMAIL_TO
    try:
        print("Connecting to SMTP server...")
        st.write("Connecting to SMTP server...")
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            print("Logging in to SMTP server...")
            st.write("Logging in to SMTP server...")
            server.login(EMAIL_FROM, EMAIL_PASS)
            print("Sending email...")
            st.write("Sending email...")
            server.sendmail(EMAIL_FROM, EMAIL_TO, msg.as_string())
            print("Email sent successfully.")
            st.write("Email sent successfully.")
    except Exception as e:
        print("Email failed:", e)
        st.error(f"Email failed: {e}")

# --- UI: Login/Register ---
def login_ui():
    st.title("IMC Inventory System")
    st.subheader("Login")
    email = st.text_input("Email")
    password = st.text_input("Password", type="password")
    if st.button("Login"):
        st.write("Attempting login...")
        user = login(email, password)
        if user:
            st.session_state['user'] = user
            st.success("Logged in!")
            st.experimental_rerun()
        else:
            st.error("Invalid credentials or not approved.")
    st.markdown("---")
    st.subheader("Request Access")
    with st.form("register_form"):
        name = st.text_input("Name")
        reg_email = st.text_input("Register Email")
        reg_dept = st.selectbox("Department", DEPARTMENTS)
        reg_password = st.text_input("Set Password", type="password")
        if st.form_submit_button("Request Access"):
            st.write("Submitting registration to database...")
            conn = get_db()
            c = conn.cursor()
            try:
                c.execute("INSERT INTO users (name, email, password, department, role, approved) VALUES (?, ?, ?, ?, ?, 0)",
                          (name, reg_email, reg_password, reg_dept, "Member"))
                conn.commit()
                st.success("Request submitted. Await approval.")
                print("Registration inserted into database.")
                st.write("Registration inserted into database.")
                # Send email to directors for approval
                subject = "New Inventory System Access Request"
                admin_url = "https://your-streamlit-url/?admin=1"
                body = (
                    f"Name: {name}\nEmail: {reg_email}\nDepartment: {reg_dept}\n\n"
                    f"Approve or deny this user in the admin panel:\n{admin_url}"
                )
                st.write("Attempting to send approval email...")
                send_email(subject, body)
            except sqlite3.IntegrityError:
                st.error("Email already registered.")
                print("Registration failed: Email already registered.")
                st.write("Registration failed: Email already registered.")

    st.markdown("---")
    st.subheader("Forgot Password?")
    with st.form("forgot_pw_form"):
        forgot_email = st.text_input("Enter your registered email")
        if st.form_submit_button("Request Password Reset"):
            st.write("Attempting to send password reset email...")
            subject = "Password Reset Request"
            body = f"Password reset requested for: {forgot_email}\nPlease review and respond."
            send_email(subject, body)
            st.success("Password reset request sent to camp directors.")

# --- Inventory CRUD ---
def get_inventory(department=None):
    conn = get_db()
    c = conn.cursor()
    if department:
        c.execute("SELECT * FROM inventory WHERE department=?", (department,))
    else:
        c.execute("SELECT * FROM inventory")
    rows = c.fetchall()
    cols = [desc[0] for desc in c.description]
    return pd.DataFrame(rows, columns=cols)

def add_inventory_item(data, user):
    conn = get_db()
    c = conn.cursor()
    now = datetime.now().isoformat()
    c.execute('''
        INSERT INTO inventory (name, description, quantity, reorder_point, reorder_cost, department, location, date_modified, modified_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        data['name'], data['description'], data['quantity'], data['reorder_point'],
        data['reorder_cost'], data['department'], data['location'], now, user[1]
    ))
    conn.commit()

def update_inventory_item(item_id, data, user):
    conn = get_db()
    c = conn.cursor()
    now = datetime.now().isoformat()
    c.execute('''
        UPDATE inventory SET name=?, description=?, quantity=?, reorder_point=?, reorder_cost=?, department=?, location=?, date_modified=?, modified_by=?
        WHERE id=?
    ''', (
        data['name'], data['description'], data['quantity'], data['reorder_point'],
        data['reorder_cost'], data['department'], data['location'], now, user[1], item_id
    ))
    conn.commit()

def delete_inventory_item(item_id):
    conn = get_db()
    c = conn.cursor()
    c.execute("DELETE FROM inventory WHERE id=?", (item_id,))
    conn.commit()

# --- Admin Panel ---
def admin_panel(user):
    st.title("Admin Panel")
    st.subheader("Pending User Approvals")
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE approved=0")
    pending = c.fetchall()
    if not pending:
        st.info("No pending users.")
    else:
        for u in pending:
            st.write(f"Name: {u[1]}, Email: {u[2]}, Dept: {u[4]}, Role: {u[5]}")
            col1, col2 = st.columns(2)
            with col1:
                if st.button(f"Approve {u[2]}"):
                    c.execute("UPDATE users SET approved=1 WHERE id=?", (u[0],))
                    conn.commit()
                    st.success(f"Approved {u[2]}")
            with col2:
                if st.button(f"Deny {u[2]}"):
                    c.execute("DELETE FROM users WHERE id=?", (u[0],))
                    conn.commit()
                    st.warning(f"Denied {u[2]}")
    st.markdown("---")
    st.subheader("All Users")
    c.execute("SELECT id, name, email, department, role, approved FROM users")
    df = pd.DataFrame(c.fetchall(), columns=["ID", "Name", "Email", "Department", "Role", "Approved"])
    st.dataframe(df)

# --- Main App ---
def main_app(user):
    st.sidebar.title(f"Welcome, {user[1]}")
    role = get_user_role(user)
    department = get_user_department(user)
    st.sidebar.write(f"Role: {role}")
    st.sidebar.write(f"Department: {department}")

    # Inventory Table
    st.header("Inventory")
    if role == "Director":
        dept_filter = st.selectbox("Filter by Department", ["All"] + DEPARTMENTS)
        df = get_inventory(None if dept_filter == "All" else dept_filter)
    else:
        df = get_inventory(department)
    st.dataframe(df)

    # Add/Edit/Delete (Admins/Directors)
    if role in ["Admin", "Director"]:
        st.subheader("Add Inventory Item")
        with st.form("add_item"):
            name = st.text_input("Name")
            desc = st.text_input("Description")
            qty = st.number_input("Quantity", min_value=0)
            reorder_point = st.number_input("Reorder Point", min_value=0)
            reorder_cost = st.number_input("Reorder Cost", min_value=0.0)
            loc = st.text_input("Location")
            dept = department if role == "Admin" else st.selectbox("Department", DEPARTMENTS)
            if st.form_submit_button("Add"):
                add_inventory_item({
                    "name": name, "description": desc, "quantity": qty,
                    "reorder_point": reorder_point, "reorder_cost": reorder_cost,
                    "department": dept, "location": loc
                }, user)
                st.success("Item added.")
                st.experimental_rerun()

        st.subheader("Edit/Delete Inventory Item")
        item_id = st.number_input("Item ID", min_value=1, step=1)
        if st.button("Delete Item"):
            delete_inventory_item(item_id)
            st.success("Item deleted.")
            st.experimental_rerun()
        # TODO: Edit item UI

    # Propose Edits (Members)
    if role == "Member":
        st.subheader("Propose Edit/Add/Delete")
        # TODO: Proposal submission UI

    # Export/Import
    st.subheader("Export/Import")
    if st.button("Export to CSV"):
        st.download_button("Download CSV", df.to_csv(index=False), "inventory.csv")
    # TODO: Import from CSV, Export to PDF

    # Alerts for low inventory
    st.subheader("Low Inventory Alerts")
    low_df = df[df['quantity'] <= df['reorder_point']]
    if not low_df.empty:
        st.warning("Some items are at or below reorder point!")
        st.dataframe(low_df)

    # TODO: Inventory history, graphs, user management, password reset, etc.

# --- App Entrypoint ---
if 'user' not in st.session_state:
    # Check for admin panel access via URL param
    if st.query_params.get("admin") == "1":
        # For security, you may want to require login as Director/Admin here
        admin_panel(None)
    else:
        login_ui()
else:
    # If admin panel param is set and user is Director/Admin, show admin panel
    if st.query_params.get("admin") == "1" and get_user_role(st.session_state['user']) in ["Admin", "Director"]:
        admin_panel(st.session_state['user'])
    else:
        main_app(st.session_state['user'])