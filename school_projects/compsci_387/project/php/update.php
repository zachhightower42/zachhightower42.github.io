<?php
    //ATTENDEE UPDATE METHODS
    function updateAttendeeUsername($attendeeID, $replaceName){
        require '../connect.php';
        $stmt = $dbConn->prepare( "UPDATE Attendee 
                                   SET Username = :replaceName
                                   WHERE AttendeeID = :attendeeID");
        $stmt->bindParam(':attendeeID', $attendeeID);
        $stmt->bindParam(':replaceName', $replaceName);
        $stmt->execute();
    }
    function updateAttendeeEmail($attendeeID, $replaceEmail){
        require '../connect.php';
        $stmt = $dbConn->prepare( "UPDATE Attendee 
                                   SET Email = :replaceEmail
                                   WHERE AttendeeID = :attendeeID");
        $stmt->bindParam(':eventID', $eventID);
        $stmt->bindParam(':replaceEmail', $replaceEmail);
        $stmt->execute();
    }
    function updateAttendeePassword($attendeeID, $replacePassword){
        require '../connect.php';
        $stmt = $dbConn->prepare( "UPDATE Attendee 
                                   SET PasswordHash = :replacePassword
                                   WHERE AttendeeID = :attendeeID");
        $stmt->bindParam(':eventID', $eventID);
        $stmt->bindParam(':replacePassword', $replacePassword);
        $stmt->execute();
    }
    //ATTENDEE-EVENT UPDATE METHODS

    //ORGANIZER UPDATE METHODS

    //ORGANIZER-EVENT UPDATE METHODS

    //EVENT UPDATE METHODS
    function updateEvent($eventID, $replaceName,$replaceDate,$replaceStartTime,$replaceEndTime,$replaceDescription,$locationID){
        require '../connect.php';
        $stmt = $dbConn->prepare( "UPDATE Events
                                   SET EventName = :replaceName,
                                   EventDate = :replaceDate,
                                   StartTime = :replaceStartTime,
                                   EndTime = :replaceEndTime,
                                   EventDescription = :replaceDescription,
                                   LocationID = :locationID
                                   WHERE EventID = :eventID");
        $stmt->bindParam(':eventID', $eventID);
        $stmt->bindParam(':replaceName', $replaceName);
        $stmt->bindParam(':replaceDate', $replaceDate);
        $stmt->bindParam(':replaceStartTime', $replaceStartTime);
        $stmt->bindParam(':replaceEndTime', $replaceEndTime);
        $stmt->bindParam(':replaceDescription', $replaceDescription);
        $stmt->bindParam(':locationID', $locationID);
        $stmt->execute();
    }
    function updateEventDate($eventID, $replaceDate){
        require '../connect.php';
        $stmt = $dbConn->prepare( "UPDATE Events
                                   SET EventDate = :replaceDate
                                   WHERE EventID = :eventID");
        $stmt->bindParam(':eventID', $eventID);
        $stmt->bindParam(':replaceDate', $replaceDate);
        $stmt->execute();
    }
    function updateEventStartTime ($eventID, $replaceStartTime){
        require '../connect.php';
        $stmt = $dbConn->prepare( "UPDATE Events
                                   SET StartTime = :replaceStartTime
                                   WHERE EventID = :eventID");
        $stmt->bindParam(':eventID', $eventID);
        $stmt->bindParam(':replaceStartTime', $replaceStartTime);
        $stmt->execute();
    }
    function updateEventEndTime ($eventID, $replaceEndTime){
        require '../connect.php';
        $stmt = $dbConn->prepare( "UPDATE Events
                                   SET EndTime = :replaceEndTime
                                   WHERE EventID = :eventID");
        $stmt->bindParam(':eventID', $eventID);
        $stmt->bindParam(':replaceEndTime', $replaceEndTime);
        $stmt->execute();
    }
    function updateEventDescription ($eventID, $replaceDescription){
        require '../connect.php';
        $stmt = $dbConn->prepare( "UPDATE Events
                                   SET EventDescription = :replaceDescription
                                   WHERE EventID = :eventID");
        $stmt->bindParam(':eventID', $eventID);
        $stmt->bindParam(':replaceDescription', $replaceDescription);
        $stmt->execute();
    }
    function updateEventLocationID ($eventID, $locationID){
        require '../connect.php';
        $stmt = $dbConn->prepare( "UPDATE Events
                                   SET LocationID = :locationID
                                   WHERE EventID = :eventID");
        $stmt->bindParam(':eventID', $eventID);
        $stmt->bindParam(':locationID', $locationID);
        $stmt->execute();
    }
    //LOCATION UPDATE METHODS
    function updateLocationName ($locationID, $newLocationName){
        require '../connect.php';
        $stmt = $dbConn->prepare( "UPDATE Location 
                                   SET LocationName = :newLocationName
                                   WHERE LocationID = :locationID");
        $stmt->bindParam(':locationID', $locationID);
        $stmt->bindParam(':newLocationName', $newLocationName);
        $stmt->execute();
    }
    function updateLocationCapacity ($locationID, $newCapacity){
        require '../connect.php';
        $stmt = $dbConn->prepare( "UPDATE Location 
                                   SET Capacity = :newCapacity
                                   WHERE LocationID = :locationID");
        $stmt->bindParam(':locationID', $locationID);
        $stmt->bindParam(':newCapacity', $newCapacity);
        $stmt->execute();
    }
    function updateLocationDescription($locationID, $newLocationDescription) {
        require '../connect.php';
        $stmt = $dbConn->prepare( "UPDATE Location 
                                   SET LocationDescription = :newLocationDescription
                                   WHERE LocationID = :locationID");
        $stmt->bindParam(':locationID', $locationID);
        $stmt->bindParam(':newLocationDescription', $newLocationDescription);
        $stmt->execute();
    }
    //WORKER UPDATE METHODS
    function updateWorker($workerID, $newNum, $startDay, $endDay, $startTime, $endTime) {
        require '../connect.php';
        $stmt = $dbConn->prepare( "UPDATE Worker 
                                   SET PhoneNum = :newNum, StartDay = :startDay, EndDay = :endDay, StartTime = :startTime, EndTime = :endTime
                                   WHERE WorkerID = :workerID");
        $stmt->bindParam(':workerID', $workerID);
        $stmt->bindParam(':newNum', $newNum);
        $stmt->bindParam(':startDay', $startDay);
        $stmt->bindParam(':endDay', $endDay);
        $stmt->bindParam(':startTime', $startTime);
        $stmt->bindParam(':endTime', $endTime);
        $stmt->execute();
    }
    //WORKER-EVENT UPDATE METHODS
?>