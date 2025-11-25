<?php
    //ATTENDEE READ METHODS
    function readAttendeeDataFromUsername($usernameAttendee){
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT *
                                  FROM Attendee
                                  WHERE Username = :username");
        $stmt->bindParam(':username', $usernameAttendee);
        $stmt->execute();
        $AttendeeDataFromUsername = $stmt->fetch(PDO::FETCH_ASSOC);
        return $AttendeeDataFromUsername;
    }
    function readAttendeeDataFromRealName($realNameAttendee){
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT *
                                  FROM Attendee
                                  WHERE RealName = :realname");
        $stmt->bindParam(':realname', $realNameAttendee);
        $stmt->execute();
        $AttendeeDataFromRealname = $stmt->fetch(PDO::FETCH_ASSOC);
        return $AttendeeDataFromRealname;
    }
    function readAttendeeDataFromAttendeeID($IDAttendee){
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT *
                                  FROM Attendee
                                  WHERE AttendeeID = :attendeeID");
        $stmt->bindParam(':attendeeID', $IDAttendee);
        $stmt->execute();
        $AttendeeDataFromID = $stmt->fetch(PDO::FETCH_ASSOC);
        return $AttendeeDataFromID;
    }
    function readAttendeeIDFromOrganizerID($OrganizerID){
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT *
                                  FROM Attendee
                                  JOIN Organizer
                                  ON Attendee.AttendeeID = Organizer.AttendeeID
                                  WHERE OrganizerID = :organizerID");
        $stmt->bindParam(':organizerID', $OrganizerID);
        $stmt->execute();
        $AttendeeDataFromOrganizerID = $stmt->fetch(PDO::FETCH_ASSOC);
        return $AttendeeDataFromOrganizerID;
    }
    function readAllAttendeeNames() {
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT RealName, Username
                                  FROM Attendee");
        $stmt->execute();
        $AttendeeData = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $AttendeeData;
    }
    //ATTENDEE-EVENT READ METHODS
    function readAllAttendeeIDFromEventID($EventID){
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT AttendeeID
                                  FROM AttendeeEvent
                                  WHERE EventID = :eventID");
        $stmt->bindParam(':eventID', $EventID);
        $stmt->execute();
        $AllAttendeeIDs = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $AllAttendeeIDs;
    }
    function readAllEventIDFromAttendeeID($AttendeeID){
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT EventID
                                  FROM AttendeeEvent
                                  WHERE AttendeeID = :attendeeID");
        $stmt->bindParam(':attendeeID', $AttendeeID);
        $stmt->execute();
        $AllEventIDs = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $AllEventIDs;
    }
    function readAttendeeEvent($AttendeeID,$EventID){
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT EventID
                                  FROM AttendeeEvent
                                  WHERE AttendeeID = :attendeeID && EventID = :eventID");
        $stmt->bindParam(':attendeeID', $AttendeeID);
        $stmt->bindParam(':eventID', $EventID);
        $stmt->execute();
        $AllEventIDs = $stmt->fetch(PDO::FETCH_ASSOC);
        return $AllEventIDs;
    }
    //EVENT READ METHODS
    function readEventDataFromEventName($EventName){
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT *
                                  FROM Events
                                  WHERE EventName = :eventName");
        $stmt->bindParam(':eventName', $EventName);
        $stmt->execute();
        $EventDataFromName = $stmt->fetch(PDO::FETCH_ASSOC);
        return $EventDataFromName;
    }
    function readEventDataFromEventID($EventID){
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT *
                                  FROM Events
                                  WHERE EventID = :eventID");
        $stmt->bindParam(':eventID', $EventID);
        $stmt->execute();
        $EventDataFromID = $stmt->fetch(PDO::FETCH_ASSOC);
        return $EventDataFromID;
    }
    function readEventIDFromEventName($EventName){
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT Events.EventID
                                  FROM Events
                                  WHERE EventName = :eventName");
        $stmt->bindParam(':eventName', $EventName);
        $stmt->execute();
        $EventDataFromID = $stmt->fetch(PDO::FETCH_ASSOC);
        return $EventDataFromID;
    }
    function readUpcomingEvents() {
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT *
                                  FROM Events
                                  WHERE EventDate BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY)");
        $stmt->execute();
        $upcomingEventsToReturn = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $upcomingEventsToReturn;
    }
    function readAllEventData() {
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT *
                                  FROM Events");
        $stmt->execute();
        $EventData = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $EventData;
    }
    //LOCATION READ METHODS
    function readAllLocationDataFromLocationID($LocationID){
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT *
                                  FROM Location
                                  WHERE LocationID = :locationID");
        $stmt->bindParam(':locationID', $LocationID);
        $stmt->execute();
        $LocationDataFromID = $stmt->fetch(PDO::FETCH_ASSOC);
        return $LocationDataFromID;
    }
    function readAllLocationDataFromLocationName($LocationName){
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT *
                                  FROM Location
                                  WHERE LocationName = :locationName");
        $stmt->bindParam(':locationName', $LocationName);
        $stmt->execute();
        $LocationDataFromName = $stmt->fetch(PDO::FETCH_ASSOC);
        return $LocationDataFromName;
    }
    //ORGANIZER READ METHODS
    function readAllOrganizerData() {
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT *
                                  FROM Organizer");
        $stmt->execute();
        $OrganizerData = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $OrganizerData;
    }
    function readOrganizerNameFromOrganizerID($OrganizerID) {
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT Attendee.RealName
                                  FROM Attendee
                                  JOIN Organizer
                                  ON Attendee.AttendeeID = Organizer.AttendeeID
                                  WHERE OrganizerID = :organizerID");
        $stmt->bindParam(':organizerID', $OrganizerID);
        $stmt->execute();
        $OrganizerNameToReturn = $stmt->fetch(PDO::FETCH_ASSOC);
        return $OrganizerNameToReturn;
    }
    function readOrganizerDataFromID($OrganizerID) {
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT *
                                  FROM Organizer
                                  WHERE OrganizerID = :organizerID");
        $stmt->bindParam(':organizerID', $OrganizerID);
        $stmt->execute();
        $OrganizerData= $stmt->fetch(PDO::FETCH_ASSOC);
        return $OrganizerData;
    }
    function readOrganizerIDFromAttendeeID($AttendeeID){
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT OrganizerID
                                  FROM Organizer
                                  WHERE AttendeeID = :attendeeID");
        $stmt->bindParam(':attendeeID', $AttendeeID);
        $stmt->execute();
        $OrganizerIDFromAttendeeID = $stmt->fetch(PDO::FETCH_ASSOC);
        return $OrganizerIDFromAttendeeID;
    }
    //ORGANIZER EVENT READ METHODS
    function readAllEventIDFromOrganizerID($OrganizerID){
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT EventID
                                  FROM OrganizerEvent
                                  WHERE OrganizerID = :organizerID");
        $stmt->bindParam(':organizerID', $OrganizerID);
        $stmt->execute();
        $EventIDsFromOrganizerID = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $EventIDsFromOrganizerID;
    }
    function readOrganizerIDFromEventID($EventID){
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT OrganizerID
                                  FROM OrganizerEvent
                                  WHERE EventID = :eventID");
        $stmt->bindParam(':eventID', $EventID);
        $stmt->execute();
        $OrganizerIDFromEventID = $stmt->fetch(PDO::FETCH_ASSOC);
        return $OrganizerIDFromEventID;
    }
    //WORKER READ METHODS
    function readWorkerDataFromWorkerID($WorkerID){
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT *
                                  FROM Worker
                                  WHERE WorkerID = :workerID");
        $stmt->bindParam(':workerID', $WorkerID);
        $stmt->execute();
        $WorkerData = $stmt->fetch(PDO::FETCH_ASSOC);
        return $WorkerData;
    }
    function readWorkerNameFromWorkerID($WorkerID) {
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT Attendee.RealName
                                  FROM Attendee
                                  JOIN Worker
                                  ON Attendee.AttendeeID = Worker.AttendeeID
                                  WHERE Worker.WorkerID = :workerID");
        $stmt->bindParam(':workerID', $WorkerID);
        $stmt->execute();
        $WorkerNameToReturn = $stmt->fetch(PDO::FETCH_ASSOC);
        return $WorkerNameToReturn;
    }
    function readWorkerIDFromWorkerName($WorkerName) {
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT Worker.WorkerID
                                  FROM Worker
                                  JOIN Attendee
                                  ON Worker.AttendeeID = Attendee.AttendeeID
                                  WHERE Attendee.Username = :workerName");
        $stmt->bindParam(':workerName', $WorkerName);
        $stmt->execute();
        $WorkerIDtoReturn = $stmt->fetch(PDO::FETCH_ASSOC);
        return $WorkerIDtoReturn;
    }
    function readAllWorkerData() {
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT *
                                  FROM Worker");
        $stmt->execute();
        $WorkerData = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $WorkerData;
    }
    
    //WORKER-EVENT READ METHODS
    function readWorkerEvent($WorkerID, $EventID){
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT *
                                  FROM WorkerEvent
                                  WHERE EventID = :eventID
                                  AND WorkerID = :workerID");
        $stmt->bindParam(':eventID', $EventID);
        $stmt->bindParam(':workerID', $WorkerID);
        $stmt->execute();
        $WorkerEvent = $stmt->fetch(PDO::FETCH_ASSOC);
        return $WorkerEvent;
    }
    function readAllWorkerIDFromEventID($EventID){
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT WorkerID
                                  FROM WorkerEvent
                                  WHERE EventID = :eventID");
        $stmt->bindParam(':eventID', $EventID);
        $stmt->execute();
        $WorkerIDs = $stmt->fetch(PDO::FETCH_ASSOC);
        return $WorkerIDs;
    }
    function readAllEventIDFromWorkerID($WorkerID){
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT EventID
                                  FROM WorkerEvent
                                  WHERE WorkerID = :workerID");
        $stmt->bindParam(':workerID', $WorkerID);
        $stmt->execute();
        $EventIDsFromWorkerID = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $EventIDsFromWorkerID;
    }
    function readAllEventsFromWorkerID($WorkerID){
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT Events.StartTime,Events.EndTime,Events.EventName,Events.EventDate
                                  FROM Events
                                  JOIN WorkerEvent
                                  ON WorkerEvent.EventID = Events.EventID
                                  WHERE WorkerEvent.WorkerID = :workerID");
        $stmt->bindParam(':workerID', $WorkerID);
        $stmt->execute();
        $EventIDsFromWorkerID = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $EventIDsFromWorkerID;
    }
    function readAllEventNamesFromWorkerID($WorkerID) {
        require '../connect.php';
        $stmt = $dbConn->prepare("SELECT Events.EventName
                                  FROM WorkerEvent
                                  JOIN Events
                                  ON WorkerEvent.EventID = Events.EventID 
                                  WHERE WorkerEvent.WorkerID = :workerID");
        $stmt->bindParam(':workerID', $WorkerID);
        $stmt->execute();
        $EventNamesFromWorkerID = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $EventNamesFromWorkerID;
    }
    //LOGIN METHODS
    function readAttendeeAndWorkerData($usernameLogin) {
        require '../connect.php';
        $query = "SELECT *
                  FROM Attendee
                  JOIN Worker 
                  ON Attendee.AttendeeID = Worker.AttendeeID
                  WHERE Attendee.Username = :username";
        $stmt = $dbConn->prepare($query);
        $stmt->bindParam(':username', $usernameLogin);
        $stmt->execute();
        $userToReturn = $stmt->fetch(PDO::FETCH_ASSOC);
        return $userToReturn;
    }
    function readAttendeeAndOrganizerData($usernameLogin) {
        require '../connect.php';
        $query = "SELECT *
                  FROM Attendee
                  JOIN Organizer 
                  ON Attendee.AttendeeID = Organizer.AttendeeID
                  WHERE Attendee.Username = :username";
        $stmt = $dbConn->prepare($query);
        $stmt->bindParam(':username', $usernameLogin);
        $stmt->execute();
        $userToReturn = $stmt->fetch(PDO::FETCH_ASSOC);
        return $userToReturn;
    }
    //large queries
    function readAllLikedEventsfromUsername($Username) {
        require '../connect.php';
        $query = "SELECT *
                  FROM Events
                  JOIN AttendeeEvent
                  ON Events.EventID = AttendeeEvent.EventID
                  JOIN Attendee
                  ON AttendeeEvent.AttendeeID = Attendee.AttendeeID
                  WHERE Attendee.Username = :username";
        $stmt = $dbConn->prepare($query);
        $stmt->bindParam(':username', $Username);
        $stmt->execute();
        $allLikedEvents = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $allLikedEvents;
    }
    function readAdminMessages() {
        require '../connect.php';
        $query = "SELECT *
                  FROM AdminMessages";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();
        $adminMessages = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $adminMessages;
    }
    function readOrganizerMessages($OrganizerID) {
        require '../connect.php';
        $query = "SELECT *
                  FROM OrganizerMessages
                  WHERE OrganizerID = :organizerID";
        $stmt = $dbConn->prepare($query);
        $stmt->bindParam(':organizerID', $OrganizerID);
        $stmt->execute();
        $organizerMessages = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $organizerMessages;
    }
    function readWorkerMessages($WorkerID) {
        require '../connect.php';
        $query = "SELECT *
                  FROM WorkerMessages
                  WHERE WorkerID = :workerID";
        $stmt = $dbConn->prepare($query);
        $stmt->bindParam(':workerID', $WorkerID);
        $stmt->execute();
        $workerMessages = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $workerMessages;
    }
?>