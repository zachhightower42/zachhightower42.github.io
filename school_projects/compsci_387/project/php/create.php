<?php

    date_default_timezone_set("America/Chicago");
    //create messages
    function createWorkerMessageFromAdmin($content,$WorkerID) {
        require '../connect.php';
        $currentDate = date('Y-m-d');
        $currentTime = date('H:i:s');
        $adminID = 1;
        $stmt = $dbConn->prepare("INSERT INTO WorkerMessages(WorkerID,content,Admin_ID,MessageDate,MessageTime)
                                  VALUES(:workerID,:content,:admin_ID,:messageDate,:messageTime)");
        $stmt->bindParam(':workerID', $WorkerID);
        $stmt->bindParam(':content', $content);
        $stmt->bindParam(':admin_ID', $adminID);
        $stmt->bindParam(':messageDate', $currentDate);
        $stmt->bindParam(':messageTime', $currentTime);
        $stmt->execute();
    }
    function createWorkerMessageFromOrganizer($OrganizerID,$content,$WorkerID) {
        require '../connect.php';
        $currentDate = date('Y-m-d');
        $currentTime = date('H:i:s');
        $stmt = $dbConn->prepare("INSERT INTO WorkerMessages(WorkerID,content,Organizer_ID,MessageDate,MessageTime)
                                  VALUES(:workerID,:content,:organizer_ID,:messageDate,:messageTime)");
        $stmt->bindParam(':workerID', $WorkerID);
        $stmt->bindParam(':content', $content);
        $stmt->bindParam(':organizer_ID', $OrganizerID);
        $stmt->bindParam(':messageDate', $currentDate);
        $stmt->bindParam(':messageTime', $currentTime);
        $stmt->execute();
    }
    function createOrganizerMessageFromAdmin($content,$OrganizerID) {
        require '../connect.php';
        $currentDate = date('Y-m-d');
        $currentTime = date('H:i:s');
        $adminID = 1;
        $stmt = $dbConn->prepare("INSERT INTO OrganizerMessages(OrganizerID,content,Admin_ID,MessageDate,MessageTime)
                                  VALUES(:organizerID,:content,:admin_ID,:messageDate,:messageTime)");
        $stmt->bindParam(':organizerID', $OrganizerID);
        $stmt->bindParam(':content', $content);
        $stmt->bindParam(':admin_ID', $adminID);
        $stmt->bindParam(':messageDate', $currentDate);
        $stmt->bindParam(':messageTime', $currentTime);
        $stmt->execute();
    }
    function createOrganizerMessageFromWorker($WorkerID,$content,$OrganizerID) {
        require '../connect.php';
        $currentDate = date('Y-m-d');
        $currentTime = date('H:i:s');
        $stmt = $dbConn->prepare("INSERT INTO OrganizerMessages(OrganizerID,content,Worker_ID,MessageDate,MessageTime)
                                  VALUES(:organizerID,:content,:worker_ID,:messageDate,:messageTime)");
        $stmt->bindParam(':organizerID', $OrganizerID);
        $stmt->bindParam(':content', $content);
        $stmt->bindParam(':worker_ID', $WorkerID);
        $stmt->bindParam(':messageDate', $currentDate);
        $stmt->bindParam(':messageTime', $currentTime);
        $stmt->execute();
    }
    function createAdminMessageFromOrganizer($content,$OrganizerID) {
        require '../connect.php';
        $currentDate = date('Y-m-d');
        $currentTime = date('H:i:s');
        $adminID = 1;
        $stmt = $dbConn->prepare("INSERT INTO AdminMessages(AdminID,content,Organizer_ID,MessageDate,MessageTime)
                                  VALUES(:adminID,:content,:organizerID,:messageDate,:messageTime)");
        $stmt->bindParam(':adminID', $adminID);
        $stmt->bindParam(':content', $content);
        $stmt->bindParam(':organizerID', $OrganizerID);
        $stmt->bindParam(':messageDate', $currentDate);
        $stmt->bindParam(':messageTime', $currentTime);
        $stmt->execute();
    }
    function createAdminMessageFromWorker($content,$WorkerID) {
        require '../connect.php';
        $currentDate = date('Y-m-d');
        $currentTime = date('H:i:s');
        $adminID = 1;
        $stmt = $dbConn->prepare("INSERT INTO AdminMessages(AdminID,content,Worker_ID,MessageDate,MessageTime)
                                  VALUES(:adminID,:content,:worker_ID,:messageDate,:messageTime)");
        $stmt->bindParam(':adminID', $adminID);
        $stmt->bindParam(':content', $content);
        $stmt->bindParam(':worker_ID', $WorkerID);
        $stmt->bindParam(':messageDate', $currentDate);
        $stmt->bindParam(':messageTime', $currentTime);
        $stmt->execute();
    }
    function createAttendee($email,$username,$realname,$passwordHash) {
        require '../connect.php';
        $stmt = $dbConn->prepare("INSERT INTO Attendee(Email,Username,RealName,PasswordHash) 
                                  VALUES(:email,:username,:realName,:passwordHash)");
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':realName', $realname);
        $stmt->bindParam(':passwordHash', $passwordHash);
        $stmt->execute();
    }
    function createAttendeeEvent($AttendeeID, $EventID) {
        require '../connect.php';
        $stmt = $dbConn->prepare("INSERT INTO AttendeeEvent(AttendeeID, EventID)
                                  VALUES(:attendeeID, :eventID)");
        $stmt->bindParam(':attendeeID', $AttendeeID);
        $stmt->bindParam(':eventID', $EventID);
        $stmt->execute();
    }
    function createOrganizerEvent ($EventIDToInput, $OrganizerIDToInput){
        require '../connect.php';
        $stmt = $dbConn->prepare("INSERT INTO OrganizerEvent(OrganizerID,EventID)
                                  VALUES(:organizerID, :eventID)");
        $stmt->bindParam(':organizerID', $OrganizerIDToInput);
        $stmt->bindParam(':eventID', $EventIDToInput);           
        $stmt->execute();
    }
    //createEvent function creates OrganizerEvent entry as well to make sure they are linked
    //MUST BE CALLED WITH THE ORGANIZER ID FROM SESSION 
    //STORAGE AFTER LOGIN - NO OTHER IDENTIFYING DATA IN 
    //ORGANIZER TABLE EXCEPT ATTENDEEID WHICH WILL NOT BE PRESENT IN 
    //SESSION STORAGE IF ORGANIZERID IS
    function createEvent($OrganizerID, $eName, $date, $startTime, $endTime, $description, $locationName) {
        require '../connect.php';
        require 'read.php';

        //fetch locationID from html form locationName
        $locationData = readAllLocationDataFromLocationName($locationName);
        $locationID = $locationData['LocationID']; 

        $eventCreatedCheck = readEventDataFromEventName($eName);
        
        if(!$eventCreatedCheck) {
            //create event sql entry with form data parameters
            $stmt = $dbConn->prepare("INSERT INTO Events(EventName,EventDate,StartTime,EndTime,EventDescription,LocationID)
                                      VALUES(:eventName,:eventDate,:startTime,:endTime,:eventDescription,:locationID)");
            $stmt->bindParam(':eventName', $eName);
            $stmt->bindParam(':eventDate', $date);
            $stmt->bindParam(':startTime', $startTime);
            $stmt->bindParam(':endTime', $endTime);
            $stmt->bindParam(':eventDescription', $description);
            $stmt->bindParam(':locationID', $locationID);
            $stmt->execute();
        }
        
        //grab eventID based on info just put in and to make sure event creation worked.
        $eventData = readEventDataFromEventName($eName);
        if(isset($eventData['EventID'])) {
            $EventID = $eventData['EventID'];
        } else {
            ///////////////NEED ERROR HANDLING//////////////
            echo "Something went wrong.";
        }
        //create entry in linking table between organizer and Event, 
        //also ensures that only organizer can create events
        createOrganizerEvent($EventID, $OrganizerID);
    }

    function createLocation ($locationName, $capactiy, $description){
        require '../connect.php';
        $stmt = $dbConn->prepare("INSERT INTO Location(LocationName, Capacity, LocationDescription)
                                 VALUES(:locationName,:capactiy,:locationDescription)");
        $stmt->bindParam(':locationName', $locationName);
        $stmt->bindParam(':capactiy', $capactiy);
        $stmt->bindParam(':attendelocationDescriptioneID', $description);
        $stmt->execute();
    }
    function createOrganizer ($AttendeeID){
        require '../connect.php';
        $stmt = $dbConn->prepare("INSERT INTO Organizer(AttendeeID)
                                  VALUES(:attendeeID)");
        $stmt->bindParam(':attendeeID', $AttendeeID);
        $stmt->execute();
    }
    function createWorker ($AttendeeID){
        require '../connect.php';
        $stmt = $dbConn->prepare("INSERT INTO Worker(PhoneNum, AttendeeID)
                                 VALUES(:phoneNum, :attendeeID)");
        $stmt->bindParam(':phoneNum', $phoneNum);
        $stmt->bindParam(':attendeeID', $AttendeeID);
        $stmt->execute();
    }
    function createWorkerEvent ($WorkerID, $EventID){
        require '../connect.php';
        $stmt = $dbConn->prepare("INSERT INTO WorkerEvent(WorkerID, EventID)
                                  VALUES(:workerID, :eventID)");
        $stmt->bindParam(':workerID', $WorkerID);
        $stmt->bindParam(':eventID', $EventID);
        $stmt->execute();
    }
?>