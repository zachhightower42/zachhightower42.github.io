<?php 
    if (isset($_POST['WorkerToAdminMsg'])) {
        require 'read.php';
        require 'create.php';
        session_start();

        $content = $_POST['Message'];
        $WorkerID = $_SESSION['WorkerID'];
        createAdminMessageFromWorker($content,$WorkerID);
        
        $Admins = 'Admins';
        header("Location: ../php/worker_messages.php?messageSent=$Admins");
        die();
    }
    if (isset($_POST['WorkerToOrganizerMsg'])) {
        require 'read.php';
        require 'create.php';
        session_start();

        $organizerName = $_POST['organizerToMessage'];
        $content = $_POST['Message'];
        $attendeeData = readAttendeeDataFromUsername($organizerName);
        $realName = $attendeeData['RealName'];
        $OrganizerID = readOrganizerIDFromAttendeeID($attendeeData['AttendeeID'])['OrganizerID'];
        $WorkerID = $_SESSION['WorkerID'];
        createOrganizerMessageFromWorker($WorkerID,$content,$OrganizerID);
        
        header("Location: ../php/worker_messages.php?messageSent=$realName");
        die();
    }