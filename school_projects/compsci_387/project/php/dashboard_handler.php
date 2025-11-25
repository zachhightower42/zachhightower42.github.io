<?php
    require 'create.php';
    require 'read.php';
    require 'update.php';
    session_start();

    if (isset($_POST['submitEventForm'])){
        if(isset($_SESSION['OrganizerID'])) {
            //set variables required for error checks and creating event from submitted form check
            $OrganizerID = $_SESSION['OrganizerID'];
            $eName = $_POST['eventName'];
            $date = $_POST['eventDate'];
            $startTime = $_POST['eventStartTime'];
            $endTime = $_POST['eventEndTime'];
            $description = $_POST['eventDescription'];
            $locationName = $_POST['eventLocation'];

            //create event in database and echo if created
            createEvent($OrganizerID, $eName, $date, $startTime, $endTime, $description, $locationName);
            //redirect back to dashboard after createEvent
            
            $Event = "EventCreated";
            header("Location: ../php/dashboard_page.php?Event=$Event");
            die();
        } 
    }
    if (isset($_POST['updateEventForm'])){
        if(isset($_SESSION['OrganizerID'])) {
            //set variables required for error checks and creating event from submitted form check
            
            $eventID =$_POST['updateEventForm'];
            $replaceName = $_POST['eventName'];
            $replaceDate = $_POST['eventDate'];
            $replaceStartTime = $_POST['eventStartTime'];
            $replaceEndTime = $_POST['eventEndTime'];
            $replaceDescription = $_POST['eventDescription'];
            $locationName = $_POST['eventLocation'];
            $locationID = readAllLocationDataFromLocationName($locationName)['LocationID'];

            //create event in database and echo if created
            updateEvent($eventID, $replaceName,$replaceDate,$replaceStartTime,$replaceEndTime,$replaceDescription,$locationID);
            //redirect back to dashboard after createEvent
            
            $Event = "EventUpdated";
            header("Location: ../php/dashboard_page.php?Event=$Event");
            die();
        } 
    }
