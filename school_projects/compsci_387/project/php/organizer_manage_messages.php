<?php 
    if (isset($_POST['OrganizerToAdminMsg'])) {
        require 'read.php';
        require 'create.php';
        session_start();

        $OrganizerID = $_SESSION['OrganizerID'];
        $content = $_POST['Message'];
        createAdminMessageFromOrganizer($content,$OrganizerID);

        $Admins = 'Admins';
        header("Location: ../php/organizer_messages.php?messageSent=$Admins");
        die();
    }
    if (isset($_POST['OrganizerToWorkerMsg'])) {
        require 'read.php';
        require 'create.php';
        session_start();

        $OrganizerID = $_SESSION['OrganizerID'];
        $content = $_POST['Message'];
        $workerUsername = $_POST['workerToMessage'];
        $workerID = readWorkerIDFromWorkerName($workerUsername)['WorkerID'];
        $attendeeData = readAttendeeDataFromUsername($workerUsername);
        $WorkerRealname = $attendeeData['RealName'];
  
        createWorkerMessageFromOrganizer($OrganizerID,$content,$workerID);

        
        header("Location: ../php/organizer_messages.php?messageSent=$WorkerRealname");
        die();
    }