<?php
    if($_POST['eventRemove'] == true) {
        require 'delete.php';
        require 'read.php';

        session_start();
        $workerID = $_SESSION['WorkerID'];
        $eventData = readEventDataFromEventName($_POST['eventName']);
        
        $eventID = $eventData['EventID'];
        deleteSpecificWorkerEvent($workerID,$eventID);
        header("Location: ../php/worker_assigned_events.php");
        die();
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assigned Events - Worker Dashboard</title>
    <link rel="stylesheet" href="../stylesheets/stylesheet_worker_events.css">
</head>
<body>
    <header>
        <div class="logo">
            <h1>Ole Miss Events</h1>
        </div>
        <nav class="navbar">
            <ul>
                <li>
                    <a href="../php/dashboard_page.php" class="dropbtn">Back to Dashboard</a>
                </li>
            </ul>
        </nav>
    </header>
    
    <div class="events-table-container">
        <h1>My Assigned Events</h1>
        <table class="events-table">
            <thead>
                <tr>
                    <th>Event Name</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <?php
                    require 'read.php';
                    session_start();

                    $assignedEvents = readAllEventsFromWorkerID($_SESSION['WorkerID']);
                    if($assignedEvents) {
                        foreach($assignedEvents as $event) {
                          //YYYY-MM-DD current formate
                          $eventDate = $event['EventDate'];
                          //H:m:s current format
                          // Combine date and time into a single string
                          $datetimeStartString = $eventDate.' '.$event['StartTime'];
                          $datetimeEndString = $eventDate.' '.$event['EndTime'];
                          
                          $startDate = DateTime::createFromFormat('Y-m-d H:i:s', $datetimeStartString);
                          $formattedStartDate = $startDate->format('F j, Y g:i A');
                          
                          $endDate = DateTime::createFromFormat('Y-m-d H:i:s', $datetimeEndString);
                          $formattedEndDate = $endDate->format('F j, Y g:i A');

                          echo '<tr>
                                    <td>'.$event['EventName'].'</td>
                                    <td>'.$formattedStartDate.'</td>
                                    <td>'.$formattedEndDate.'</td>
                                    <td>
                                        <form method="post"> 
                                            <button class="action-btn remove-btn" onclick="this.closest(\'form\').submit();" >Remove Event</button> 
                                            <input type="hidden" name="eventRemove" value="true">
                                            <input type="hidden" name="eventName" value="'.$event['EventName'].'">
                                        </form>
                                    </td>
                                </tr>';

                        }
                    } else {
                        echo '<h>No Assigned Events</h>';
                    }
                ?>
            </tbody>
        </table>
    </div>
</body>
</html>