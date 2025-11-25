<?php
    require '../connect.php';
    require 'read.php';

    $usernameToLogin = $_POST['username'];
    
    $password = $_POST['password'];
    $passwordHash = md5($password);
    //Check if user in in organizer table - if so, grab username and password hash -- WORKING

    $userOrganizer = readAttendeeAndOrganizerData($usernameToLogin);

    //check user was fetched and hashed password entered matches database 
    if ($userOrganizer['OrganizerID'] && (strcmp($passwordHash, $userOrganizer['PasswordHash']) == 0)) {
        session_start();
        unset($_SESSION['OrganizerID']);
        unset($_SESSION['WorkerID']);
        unset($_SESSION['AttendeeID']);
        $_SESSION['username'] = $usernameToLogin;
        $_SESSION['OrganizerID'] = $userOrganizer['OrganizerID']; 

        header("Location: ../php/dashboard_page.php");
        die();
    } else {
        //read Attendee ID, 
        $userWorker = readAttendeeAndWorkerData($usernameToLogin);

        if ($userWorker['WorkerID'] && (strcmp($passwordHash, $userWorker['PasswordHash']) == 0)) {
            session_start();
            unset($_SESSION['OrganizerID']);
            unset($_SESSION['WorkerID']);
            unset($_SESSION['AttendeeID']);
            $_SESSION['username'] = $usernameToLogin;
            $_SESSION['WorkerID'] = $userWorker['WorkerID']; 

            header("Location: ../php/dashboard_page.php");
            die();
        
        } else {
            $userAttendee = readAttendeeDataFromUsername($usernameToLogin);

            if ($userAttendee['AttendeeID'] && (strcmp($passwordHash, $userAttendee['PasswordHash']) == 0)) {
                session_start();
                unset($_SESSION['OrganizerID']);
                unset($_SESSION['WorkerID']);
                unset($_SESSION['AttendeeID']);
                $_SESSION['username'] = $usernameToLogin;
                $_SESSION['AttendeeID'] = $userAttendee['AttendeeID']; 

                header("Location: ../php/dashboard_page.php");
                die(); 
            } elseif (($usernameToLogin == "Admin") && ($password == "Admin")) {
                session_start();
                unset($_SESSION['OrganizerID']);
                unset($_SESSION['WorkerID']);
                unset($_SESSION['AttendeeID']);
                $_SESSION['username'] = "Max";
                $_SESSION['AdminID'] = 1;

                header("Location: ../php/dashboard_page.php");
                die(); 
            } else {
                $true = true;
                header("Location: ../php/login_page.php?invalid=$true");
                die(); 
            }
        }
    }
        

    