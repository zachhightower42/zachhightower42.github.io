-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-10-16 20:46:29.859

-- tables
-- Table: Attendee
CREATE TABLE Attendee (
    AttendeeID int  NOT NULL AUTO_INCREMENT,
    Email varchar(50)  NOT NULL,
    Username varchar(20)  NOT NULL,
    Password varchar(30)  NOT NULL,
    CONSTRAINT Attendee_pk PRIMARY KEY (AttendeeID)
);

-- Table: AttendeeEvent
CREATE TABLE AttendeeEvent (
    AttendeeID int  NOT NULL,
    EventID int  NOT NULL,
    CONSTRAINT AttendeeEvent_pk PRIMARY KEY (AttendeeID,EventID)
);

-- Table: AttendeeToWorker
CREATE TABLE AttendeeToWorker (
    AttendeeID int  NOT NULL,
    WorkerID int  NOT NULL,
    CONSTRAINT AttendeeToWorker_pk PRIMARY KEY (AttendeeID,WorkerID)
);

-- Table: Event
CREATE TABLE Event (
    EventID int  NOT NULL AUTO_INCREMENT,
    EventName varchar(50)  NOT NULL,
    Date date  NOT NULL,
    StartTime time  NOT NULL,
    EndTime time  NOT NULL,
    Description varchar(500)  NOT NULL,
    LocationID int  NOT NULL,
    CONSTRAINT Event_pk PRIMARY KEY (EventID)
);

-- Table: Location
CREATE TABLE Location (
    LocationID int  NOT NULL AUTO_INCREMENT,
    LocationName varchar(50)  NOT NULL,
    Capacity int  NOT NULL,
    LocationDescription text  NOT NULL,
    CONSTRAINT Location_pk PRIMARY KEY (LocationID)
);

-- Table: Organizer
CREATE TABLE Organizer (
    OrganizerID int  NOT NULL AUTO_INCREMENT,
    Username varchar(40)  NOT NULL,
    Email varchar(50)  NOT NULL,
    Password varchar(50)  NOT NULL,
    CONSTRAINT Organizer_pk PRIMARY KEY (OrganizerID)
);

-- Table: OrganizerEvent
CREATE TABLE OrganizerEvent (
    OrganizerID int  NOT NULL,
    EventID int  NOT NULL,
    CONSTRAINT OrganizerEvent_pk PRIMARY KEY (OrganizerID,EventID)
);

-- Table: Worker
CREATE TABLE Worker (
    WorkerID int  NOT NULL,
    PhoneNum varchar(15)  NOT NULL,
    CONSTRAINT Worker_pk PRIMARY KEY (WorkerID)
);

-- Table: WorkerEvent
CREATE TABLE WorkerEvent (
    WorkerID int  NOT NULL,
    EventID int  NOT NULL,
    CONSTRAINT WorkerEvent_pk PRIMARY KEY (WorkerID,EventID)
);

-- foreign keys
-- Reference: AttendeeEvent_Attendee (table: AttendeeEvent)
ALTER TABLE AttendeeEvent ADD CONSTRAINT AttendeeEvent_Attendee
    FOREIGN KEY (AttendeeID)
    REFERENCES Attendee (AttendeeID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: AttendeeEvent_Event (table: AttendeeEvent)
ALTER TABLE AttendeeEvent ADD CONSTRAINT AttendeeEvent_Event
    FOREIGN KEY (EventID)
    REFERENCES Event (EventID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: AttendeeToWorker_Attendee (table: AttendeeToWorker)
ALTER TABLE AttendeeToWorker ADD CONSTRAINT AttendeeToWorker_Attendee
    FOREIGN KEY (AttendeeID)
    REFERENCES Attendee (AttendeeID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: AttendeeToWorker_Worker (table: AttendeeToWorker)
ALTER TABLE AttendeeToWorker ADD CONSTRAINT AttendeeToWorker_Worker
    FOREIGN KEY (WorkerID)
    REFERENCES Worker (WorkerID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Event_Location (table: Event)
ALTER TABLE Event ADD CONSTRAINT Event_Location
    FOREIGN KEY (LocationID)
    REFERENCES Location (LocationID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: OrganizerEventDetails_Organizer (table: OrganizerEvent)
ALTER TABLE OrganizerEvent ADD CONSTRAINT OrganizerEventDetails_Organizer
    FOREIGN KEY (OrganizerID)
    REFERENCES Organizer (OrganizerID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: OrganizerEvent_Event (table: OrganizerEvent)
ALTER TABLE OrganizerEvent ADD CONSTRAINT OrganizerEvent_Event
    FOREIGN KEY (EventID)
    REFERENCES Event (EventID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: WorkerEvent_Event (table: WorkerEvent)
ALTER TABLE WorkerEvent ADD CONSTRAINT WorkerEvent_Event
    FOREIGN KEY (EventID)
    REFERENCES Event (EventID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: WorkerEvent_Worker (table: WorkerEvent)
ALTER TABLE WorkerEvent ADD CONSTRAINT WorkerEvent_Worker
    FOREIGN KEY (WorkerID)
    REFERENCES Worker (WorkerID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

