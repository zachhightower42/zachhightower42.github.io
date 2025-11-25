<?php
    require 'read.php';
    require 'update.php';
    session_start();

    $StartDay = $_POST['StartDay'];
    $EndDay = $_POST['EndDay'];
    $startTime = $_POST['startTime'];
    $endTime = $_POST['endTime'];
    $name = $_POST['name'];
    $workerID = $_SESSION['WorkerID'];
    $newNum = $_POST['phoneNum'];

    if(readWorkerDataFromWorkerID($workerID)) {

        updateWorker($workerID,$newNum,$StartDay,$EndDay,$startTime,$endTime);
        $workerName = readWorkerNameFromWorkerID($workerID);
        $attendeeID = readAttendeeDataFromUsername($workerName['Username'])['AttendeeID'];
        updateAttendeeUsername($attendeeID, $name);

        $data = "WorkerUpdated";
        header("Location: ../php/dashboard_page.php?param=$data");
        die();
    } else {
        echo 'Worker Data Not Found... Sorry!';
        $url = "../php/dashboard_page.php";
        $text = "Click here to go back to the dashboard";
        echo nl2br("\n");
        echo nl2br("\n");
        echo '<a href="' . $url . '">' . $text . '</a>';
    }

