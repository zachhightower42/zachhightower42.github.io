-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-10-01 18:47:05.299

-- tables
-- Table: client
CREATE TABLE client (
    client_num int  NOT NULL,
    name varchar(30)  NOT NULL,
    Location varchar(50)  NOT NULL,
    manager_ManagerNum int  NOT NULL,
    CONSTRAINT client_pk PRIMARY KEY (client_num)
);

-- Table: contract
CREATE TABLE contract (
    Contract_Num int  NOT NULL,
    Est_cost float  NOT NULL,
    Completion_date date  NOT NULL,
    client_client_num int  NOT NULL,
    CONSTRAINT contract_pk PRIMARY KEY (Contract_Num)
);

-- Table: contract_staff_bridge
CREATE TABLE contract_staff_bridge (
    contract_Contract_Num int  NOT NULL,
    staff_Staff_NUm int  NOT NULL,
    CONSTRAINT contract_staff_bridge_pk PRIMARY KEY (contract_Contract_Num,staff_Staff_NUm)
);

-- Table: manager
CREATE TABLE manager (
    ManagerNum int  NOT NULL,
    Managar_name varchar(30)  NOT NULL,
    Manager_location varchar(50)  NOT NULL,
    CONSTRAINT manager_pk PRIMARY KEY (ManagerNum)
);

-- Table: staff
CREATE TABLE staff (
    Staff_NUm int  NOT NULL,
    Staff_name varchar(30)  NOT NULL,
    Staff_location varchar(50)  NOT NULL,
    CONSTRAINT staff_pk PRIMARY KEY (Staff_NUm)
);

-- foreign keys
-- Reference: client_manager (table: client)
ALTER TABLE client ADD CONSTRAINT client_manager FOREIGN KEY client_manager (manager_ManagerNum)
    REFERENCES manager (ManagerNum);

-- Reference: contract_client (table: contract)
ALTER TABLE contract ADD CONSTRAINT contract_client FOREIGN KEY contract_client (client_client_num)
    REFERENCES client (client_num);

-- Reference: contract_staff_bridge_contract (table: contract_staff_bridge)
ALTER TABLE contract_staff_bridge ADD CONSTRAINT contract_staff_bridge_contract FOREIGN KEY contract_staff_bridge_contract (contract_Contract_Num)
    REFERENCES contract (Contract_Num);

-- Reference: contract_staff_bridge_staff (table: contract_staff_bridge)
ALTER TABLE contract_staff_bridge ADD CONSTRAINT contract_staff_bridge_staff FOREIGN KEY contract_staff_bridge_staff (staff_Staff_NUm)
    REFERENCES staff (Staff_NUm);

-- End of file.

