-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-10-10 01:57:09.274

-- tables
-- Table: Doctor
CREATE TABLE Doctor (
    Doctor_id int  NOT NULL,
    DoctorName varchar(50)  NOT NULL,
    Secretary varchar(50)  NOT NULL,
    CONSTRAINT Doctor_pk PRIMARY KEY (Doctor_id)
);

-- Table: Patient
CREATE TABLE Patient (
    Patient_id int  NOT NULL,
    Name varchar(30)  NOT NULL,
    DOB date  NOT NULL,
    Address varchar(50)  NOT NULL,
    CONSTRAINT Patient_pk PRIMARY KEY (Patient_id)
);

-- Table: Prescription
CREATE TABLE Prescription (
    Scrip_id int  NOT NULL,
    Drug varchar(50)  NOT NULL,
    Date date  NOT NULL,
    Dosage varchar(30)  NOT NULL,
    pat_id int  NOT NULL,
    doc_id int  NOT NULL,
    CONSTRAINT Prescription_pk PRIMARY KEY (Scrip_id)
);

-- Table: patient_doc_bridge
CREATE TABLE patient_doc_bridge (
    Doctor_id int  NOT NULL,
    Patient_id int  NOT NULL,
    CONSTRAINT doc_pat_id PRIMARY KEY (Patient_id,Doctor_id)
);

-- foreign keys
-- Reference: Prescription_patient_doc_bridge (table: Prescription)
ALTER TABLE Prescription ADD CONSTRAINT Prescription_patient_doc_bridge FOREIGN KEY Prescription_patient_doc_bridge (pat_id,doc_id)
    REFERENCES patient_doc_bridge (Patient_id,Doctor_id);

-- Reference: patient_doc_bridge_Doctor (table: patient_doc_bridge)
ALTER TABLE patient_doc_bridge ADD CONSTRAINT patient_doc_bridge_Doctor FOREIGN KEY patient_doc_bridge_Doctor (Doctor_id)
    REFERENCES Doctor (Doctor_id);

-- Reference: patient_doc_bridge_patient (table: patient_doc_bridge)
ALTER TABLE patient_doc_bridge ADD CONSTRAINT patient_doc_bridge_patient FOREIGN KEY patient_doc_bridge_patient (Patient_id)
    REFERENCES Patient (Patient_id);

-- End of file.

