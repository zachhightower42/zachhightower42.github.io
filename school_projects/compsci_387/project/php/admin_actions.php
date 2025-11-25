<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Retrieve form data
        if ($_POST['AddToEvent'] == 'true') {
            require 'create.php';
            require 'read.php';

            $mode = "add";
            $EventNametoCreate = $_POST['eventName'];
            $WorkerNameToCreate = $_POST['workerName'];
            $EventIDtoCreate = readEventIDFromEventName($EventNametoCreate);
            $WorkerIDtoCreate = readWorkerIDFromWorkerName($WorkerNameToCreate);

            if(!readWorkerEvent($WorkerIDtoCreate['WorkerID'],$EventIDtoCreate['EventID'])) {
                createWorkerEvent($WorkerIDtoCreate['WorkerID'],$EventIDtoCreate['EventID']);
                header("Location: ../php/admin_manage_workers.php?workerName=$WorkerNameToCreate&eventName=$EventNametoCreate&mode=$mode");
                die();
            } else {
                $error = "WorkerWorking";
                header("Location: ../php/admin_manage_workers.php?error=$error");
                die();
            }
        } 
        if ($_POST['RemoveFromEvent'] == 'true') {
            require 'delete.php';
            require 'read.php';

            $mode = "remove";
            $WorkerNameToDelete = $_POST['workerName'];
            $EventNametoDelete = $_POST['eventName'];
            $EventIDtoDelete = readEventIDFromEventName($EventNametoDelete);
            $WorkerIDtoDelete = readWorkerIDFromWorkerName($WorkerNameToDelete);

            if(readWorkerEvent($WorkerIDtoDelete['WorkerID'],$EventIDtoDelete['EventID'])) {
                deleteSpecificWorkerEvent($WorkerIDtoDelete['WorkerID'], $EventIDtoDelete['EventID']);
                header("Location: ../php/admin_manage_workers.php?workerName=$WorkerNameToDelete&eventName=$EventNametoDelete&mode=$mode");
                die();
            } else {
                $error = "WorkerNotWorking";
                header("Location: ../php/admin_manage_workers.php?error=$error");
                die();
            }
        }
        if (isset($_POST['eventID'])) {
            require 'delete.php';

            deleteEventFromEventID($_POST['eventID']);
            deleteAllAttendeeIDFromEventID($_POST['eventID']);
            deleteAllWorkerEventsFromWorkerID($_POST['eventID']);
            deleteAllAttendeeEventFromAttendeeID($_POST['eventID']);
            $eventID = $_POST['eventID'];
            header("Location: ../php/admin_manage_events.php?eventID=$eventID");
            die();
        }
        if (isset($_POST['AttendeeToPromoteToOrganizer'])) {
            require 'read.php';
            require 'create.php';

            $attendeeData = readAttendeeDataFromUsername($_POST['AttendeeToPromoteToOrganizer']);
            $attendeeRealName = $attendeeData['RealName'];
            $attendeeID = $attendeeData['AttendeeID'];
            createOrganizer($attendeeID);

            header("Location: ../php/admin_manage_organizers.php?NewOrganizer=$attendeeRealName");
            die();
        }
        if (isset($_POST['AttendeeToPromoteToWorker'])) {
            require 'read.php';
            require 'create.php';

            $attendeeData = readAttendeeDataFromUsername($_POST['AttendeeToPromoteToWorker']);
            $attendeRealName = $attendeeData['RealName'];
            $attendeeID = $attendeeData['AttendeeID'];
            createWorker($attendeeID);

            header("Location: ../php/admin_manage_workers.php?NewWorker=$attendeRealName");
            die();
        }
        if (isset($_POST['AdminToWorkerMsg'])) {
            require 'read.php';
            require 'create.php';
            session_start();

            $workerName = $_POST['workerToMessage'];
            $workerID = readWorkerIDFromWorkerName($workerName)['WorkerID'];
            $attendeeData = readAttendeeDataFromUsername($workerName);
            $attendeeID = $attendeeData['AttendeeID'];
            $workerRealname = $attendeeData['RealName'];
            $content = $_POST['Message'];
            $adminID = $_SESSION['AdminID'];
            createWorkerMessageFromAdmin($content,$workerID);
            
            header("Location: ../php/admin_messages.php?messageSent=$workerRealname");
            die();
        }
        if (isset($_POST['AdminToOrganizerMsg'])) {
            require 'read.php';
            require 'create.php';
            session_start();

            $organizerUsername = $_POST['organizerToMessage'];
            $attendeeData = readAttendeeDataFromUsername($organizerUsername);
            $attendeeID = $attendeeData['AttendeeID'];
            $organizerID = readOrganizerIDFromAttendeeID($attendeeID)['OrganizerID'];
            $content = $_POST['Message'];
            $adminID = $_SESSION['AdminID'];
            $organizerRealname = $attendeeData['RealName'];

            createOrganizerMessageFromAdmin($content,$organizerID);
            
            header("Location: ../php/admin_messages.php?messageSent=$organizerRealname");
            die();
        }
        

    }