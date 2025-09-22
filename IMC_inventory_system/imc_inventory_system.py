import streamlit as st
import sqlite3
import pandas as pd
from datetime import datetime

# --- Constants ---
DEPARTMENTS = [
    "Office", "Kitchen", "Maintenance", "Housekeeping",
    "Concessions", "Deans", "Nurse", "Camp Directors"
]
USER_ROLES = ["Member", "Admin", "Director"]

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

# --- UI: Login/Register ---
def login_ui():
    st.title("IMC Inventory System")
    st.subheader("Login")
    email = st.text_input("Email")
    password = st.text_input("Password", type="password")
    if st.button("Login"):
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
            conn = get_db()
            c = conn.cursor()
            try:
                c.execute("INSERT INTO users (name, email, password, department, role, approved) VALUES (?, ?, ?, ?, ?, 0)",
                          (name, reg_email, reg_password, reg_dept, "Member"))
                conn.commit()
                st.success("Request submitted. Await approval.")
                # TODO: Send email to directors for approval
            except sqlite3.IntegrityError:
                st.error("Email already registered.")

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
    login_ui()
else:
    main_app(st.session_state['user'])