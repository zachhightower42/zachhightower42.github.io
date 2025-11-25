<?php
    
    //ATTENDEE DELETE METHODS
    function deleteAttendeeFromUsername($usernameToDelete){
        require '../connect.php';
        $stmt = $dbConn->prepare("DELETE FROM Attendee
                                  WHERE Username = :username");
        $stmt->bindParam(':username', $usernameToDelete);
        $stmt->execute();
    }
    function deleteAttendeeFromID($idToDelete){
        require '../connect.php';
        $stmt = $dbConn->prepare("DELETE FROM Attendee
                                  WHERE AttendeeID = :attendeeID");
        $stmt->bindParam(':attendeeID', $idToDelete);
        $stmt->execute();
    }
    //ATTENDEE-EVENT DELETE METHODS
    function deleteSpecificAttendeeEventFromAttendeeID($AttendeeIDtoDelete,$EventIDtoDelete){
        require '../connect.php';
        $stmt = $dbConn->prepare("DELETE FROM AttendeeEvent
                                  WHERE AttendeeID = :attendeeID AND EventID = :eventID");
        $stmt->bindParam(':attendeeID', $AttendeeIDtoDelete);
        $stmt->bindParam(':eventID', $EventIDtoDelete);
        $stmt->execute();
    }
    function deleteAllAttendeeEventFromAttendeeID($AttendeeIDtoDelete){
        require '../connect.php';
        $stmt = $dbConn->prepare("DELETE FROM AttendeeEvent
                                  WHERE AttendeeID = :attendeeID");
        $stmt->bindParam(':attendeeID', $AttendeeIDtoDelete);
        $stmt->execute();
    }
    function deleteAllAttendeeIDFromEventID($EventIDtoDelete){
        require '../connect.php';
        $stmt = $dbConn->prepare("DELETE FROM AttendeeEvent
                                  WHERE EventID = :eventID");
        $stmt->bindParam(':eventID', $EventIDtoDelete);
        $stmt->execute();
    }
    //ORGANIZER DELETE METHODS
    function deleteOrganizerFromOrganizerID($OrganizerIDtoDelete) {
        require '../connect.php';
        $stmt = $dbConn->prepare("DELETE FROM Organizer
                                  WHERE OrganizerID = :organizerID");
        $stmt->bindParam(':organizerID', $OrganizerIDtoDelete);
        $stmt->execute();
    }
    function deleteOrganizerFromAttendeeID($AttendeeIDtoDeleteOrganizer){
        require '../connect.php';
        $stmt = $dbConn->prepare("DELETE FROM Organizer
                                  WHERE AttendeeID = :attendeeID");
        $stmt->bindParam(':attendeeID', $AttendeeIDtoDeleteOrganizer);
        $stmt->execute();
    }
    //ORGANIZER-EVENT DELETE METHODS
    function deleteOrganizerEventFromOrganizerID($OrganizerIDtoDelete,$EventIDtoDelete){
        require '../connect.php';
        $stmt = $dbConn->prepare("DELETE FROM OrganizerEvent
                                  WHERE OrganizerID = :organizerID AND EventID = :eventID");
        $stmt->bindParam(':organizerID', $OrganizerIDtoDelete);
        $stmt->bindParam(':eventID', $EventIDtoDelete);
        $stmt->execute();
    }
    function deleteAllOrganizerEventsFromOrganizerId($OrganizerIDtoDelete){
        require '../connect.php';
        $stmt = $dbConn->prepare("DELETE FROM OrganizerEvent
                                  WHERE OrganizerID = :organizerID");
        $stmt->bindParam(':organizerID', $OrganizerIDtoDelete);
        $stmt->execute();
    }
    //WORKER DELETE METHODS
    function deleteWorkerFromWorkerID($WorkerIDtoDelete){
        require '../connect.php';
        $stmt = $dbConn->prepare("DELETE FROM Worker
                                  WHERE WorkerID = :workerID");
        $stmt->bindParam(':workerID', $WorkerIDtoDelete);
        $stmt->execute();
    }
    function deleteWorkerFromAttendeeID($AttendeeIDtoDelete){
        require '../connect.php';
        $stmt = $dbConn->prepare("DELETE FROM Worker
                                  WHERE AttendeeID = :attenddID");
        $stmt->bindParam(':attendeeID', $AttendeeIDtoDelete);
        $stmt->execute();
    }
    //WORKER-EVENT DELETE METHODS
    function deleteSpecificWorkerEvent($WorkerIDtoDelete, $EventIDtoDelete){
        require '../connect.php';
        $stmt = $dbConn->prepare("DELETE FROM WorkerEvent
                                  WHERE WorkerID = :workerID AND EventID = :eventID");
        $stmt->bindParam(':eventID', $EventIDtoDelete);
        $stmt->bindParam(':workerID', $WorkerIDtoDelete);
        $stmt->execute();
    }
    function deleteAllWorkerEventsFromWorkerID($WorkerIDtoDelete){
        require '../connect.php';
        $stmt = $dbConn->prepare("DELETE FROM WorkerEvent
                                  WHERE WorkerID = :workerID");
        $stmt->bindParam(':workerID', $WorkerIDtoDelete);
        $stmt->execute();
    }
    //LOCATION DELETE METHODS
    function deleteLocationFromLocationName($LocationNametoDelete){
        require '../connect.php';
        $stmt = $dbConn->prepare("DELETE FROM Location
                                  WHERE LocationName = :locationName");
        $stmt->bindParam(':locationName', $LocationNametoDelete);
        $stmt->execute();
    }
    function deleteLocationFromLocationID($LocationIDtoDelete){
        require '../connect.php';
        $stmt = $dbConn->prepare("DELETE FROM Location
                                  WHERE LocationID = :locationID");
        $stmt->bindParam(':locationID', $LocationIDtoDelete);
        $stmt->execute();
    }
    //EVENT DELETE METHODS
    function deleteEventFromEventName($EventNameToDelete){
        require '../connect.php';
        $stmt = $dbConn->prepare("DELETE FROM Events
                                  WHERE EventName = :eventName");
        $stmt->bindParam(':eventName', $EventNameToDelete);
        $stmt->execute();
    }
    function deleteEventFromEventID($EventIDToDelete){
        require '../connect.php';
        $stmt = $dbConn->prepare("DELETE FROM Events
                                  WHERE EventID = :eventID");
        $stmt->bindParam(':eventID', $EventIDToDelete);
        $stmt->execute();
    }

?>