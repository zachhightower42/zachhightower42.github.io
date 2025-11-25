<?php
    if($_POST['removeWorker']) {
        require 'delete.php';
        $workerID = $_POST['workerID'];
        deleteWorkerFromWorkerID($workerID);
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Workers</title>
    <link rel="stylesheet" href="../stylesheets/stylesheet_worker_events.css">
    <link rel="stylesheet" href="../stylesheets/stylesheet_admin_manage_workers.css">
    <style>
        form {
            display: flex;
            flex-direction: column;
            gap: 10px; /* Adds spacing between elements */
            width: 300px; /* Optional: set width for the form */
        }

        label, input, button {
            width: 100%; /* Make the elements fill the container */
        }
    </style>
    <script>
        function toggleAddFormDiv() {
            const formDiv = document.getElementById('myAddToEventForm');
            if (formDiv.style.display === 'none' || formDiv.style.display === '') {
                formDiv.style.display = 'block';
            } else {
                formDiv.style.display = 'none';
            }
        }
        function toggleRemoveFormDiv() {
            const formDiv = document.getElementById('myRemoveFromEventForm');
            if (formDiv.style.display === 'none' || formDiv.style.display === '') {
                formDiv.style.display = 'block';
            } else {
                formDiv.style.display = 'none';
            }
        }
        function toggleAddWorkerDiv() {
            const formDiv = document.getElementById('addWorkerForm');
            if (formDiv.style.display === 'none' || formDiv.style.display === '') {
                formDiv.style.display = 'block';
            } else {
                formDiv.style.display = 'none';
            }
        }
    </script>
</head>
<body>
    <header>
        <div class="logo">
            <h1>Ole Miss Events</h1>
        </div>
        <nav class="navbar">
            <ul>
                <div style="gap: 20px; display: flex; flex-direction: row;">
                    <li><a href="../php/dashboard_page.php" class="dropbtn">Back to Dashboard</a></li>
                    <li><button id="addWorkerBtn" class="action-btn" onclick="toggleAddWorkerDiv()">Add New Worker</button></li>
                    <li><button name="toggleAddEventForm" class="action-btn" onclick="toggleAddFormDiv()">Add to Event</button></li>
                    <li><button name="toggleRemoveEventForm" class="action-btn remove-btn" onclick="toggleRemoveFormDiv()">Remove from Event</button></li>
                </div>
            </ul>
        </nav>
    </header>

    <main>
        <div class="events-table-container">
            <h2>Manage Workers</h2>
            <table class="events-table">
                    <thead>
                        <tr>
                            <th>Worker Name</th>
                            <th>Schedule Availability</th>
                            <th>Assigned Events</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                <tbody id="workersTableBody">
                    <?php
                        require 'read.php'; 
                        $Workers = readAllWorkerData();
                        foreach($Workers as $worker) {
                            $name = readWorkerNameFromWorkerID($worker['WorkerID']);
                            $eventNames = readAllEventNamesFromWorkerID($worker['WorkerID']);

                            // create schedule availability
                            $dateString = $worker['StartDay']. '-' .$worker['EndDay'];

                            if(!empty($worker['StartTime']) && !empty($worker['EndTime']) && !empty($worker['StartDay']) && !empty($worker['EndDay'])) {
                                $startTime = new DateTime($worker['StartTime']); // Example time in 24-hour format
                                $endTime = new DateTime($worker['EndTime']); // Example time in 24-hour format
                                
                                $formattedStartTime = $startTime->format('g:i A');
                                $formattedEndTime = $endTime->format('g:i A');
                                $timeString = $formattedStartTime. '-'. $formattedEndTime;
                                $schedule = $dateString . ' ' . $timeString;
                            } else {
                                $schedule = "Send a message asking this worker to update their preferences...";
                            }
                    ?>
                                    <tr>
                                        <td> <?php echo $name['RealName']; ?></td>
                                        <td> <?php echo $schedule; ?></td>
                                        <td> 
                                            <?php 
                                                //format event names for display
                                                $counter == 0;
                                                foreach($eventNames as $eventName) {
                                                    if ($counter == 0) {
                                                        $eventNameFormat = ''.$eventName['EventName'];
                                                        $counter = $counter + 1;
                                                    } else {
                                                        $eventNameFormat = ', '.$eventName['EventName'];
                                                    }
                                                    echo $eventNameFormat;
                                                }
                                                unset($counter);
                                            ?>
                                        </td>
                                        <td> 
                                            <form method="post">
                                                <button name="removeWorkerForm" class="action-btn remove-btn" onclick="this.closest('form').submit();">Delete Worker</button> 
                                                <input type="hidden" name="removeWorker" value="true">
                                                <input type="hidden" name="workerID" value="<?php echo $worker['WorkerID'];?>">
                                            </form>
                                        </td>
                                    <tr>
                    <?php } ?>
                </tbody>
            </table>
        </div>
        <div style="place-items: center;";>
            <?php
                if ($_GET['NewWorker']) {
                    echo '<div class="event-card">
                            <h2>New Worker Entry '.$_GET['NewWorker'].' has been created</h2
                        </div';
                }
            ?>
        </div>
        <div style="display: flex; flex-direction: row;place-items: center;gap: 20px;">
            <div id="myAddToEventForm" style="display: none;place-items: center;background-color: #12284C;padding: 10px;float: left;width: 33.33%;border-radius: 25px;">
                <form method="post" action="admin_actions.php">
                    <input type="text" name="eventName" placeholder="Event Name" style="width: 290px;height:25px;border-radius: 10px;">
                    <input type="text" name="workerName" placeholder="Worker Name" style="width: 290px;height:25px;border-radius: 10px;">
                    <input type="hidden" name="AddToEvent" value="true">
                    <button type="submit" class="action-btn">Submit Addition</button>
                </form>
            </div>
            <div id="myRemoveFromEventForm" style="display: none;place-items: center;background-color: #12284C;padding: 10px;float: left;width: 33.33%;border-radius: 25px;">
                <form method="post" action="admin_actions.php">
                    <input type="text" name="eventName" placeholder="Event Name" style="width: 290px;height:25px;border-radius: 10px;">
                    <input type="text" name="workerName" placeholder="Worker Name" style="width: 290px;height:25px;border-radius: 10px;">
                    <input type="hidden" name="RemoveFromEvent" value="true">
                    <button type="submit" class="action-btn remove-btn">Submit Deletion</button>
                </form>        
            </div>
            <div id="addWorkerForm" style="display: none;place-items: center; background-color: #12284C;padding: 10px;float: left;width: 33.33%;border-radius: 25px;">
                <form method="post" action="admin_actions.php" style="text-align: center;">
                    <select name="AttendeeToPromoteToWorker" style="width: 290px;height: 30px;border-radius:10px;">
                        <option value="none">Select An Attendee To Promote Below</option>
                        <?php 
                            $attendeeNames = readAllAttendeeNames();
                            if ($attendeeNames) {
                                foreach($attendeeNames as $attendeeName) {
                                    $username = $attendeeName['Username'];
                                    $attendeeID = readAttendeeDataFromUsername($username)['AttendeeID'];
                                    $workerID = readWorkerIDFromWorkerName($username)['WorkerID'];
                                    $workerData = readWorkerDataFromWorkerID($workerID);
                                    $organizerData = readOrganizerIDFromAttendeeID($attendeeID);
                                    //checking attendee id does not correspond to Organizer data
                                    if(!$workerData && !$organizerData) {
                                        echo '<option value="'.$username.'">'.$attendeeName['RealName'].'</option>';
                                    }
                                } 
                            }
                        ?>
                    </select>
                    <button type="submit" class="action-btn">Create New Worker</button>
                </form>
            </div>
        </div>
    </main>
    <?php
        if(isset($_GET['mode'])) {
            if($_GET['mode'] == "add") { 
                echo '<div style="place-items: center">
                        <div class="event-card" style="text-align: center;">
                            <h2>'.$_GET['workerName'].' has been added to '. $_GET['eventName'].' </h2>
                        <div>
                    </div';
            } else if ($_GET['mode'] == "remove") {
                echo '<div style="place-items: center">
                            <div class="event-card" style="text-align: center;">
                                <h2>'.$_GET['workerName'].' has been removed from '.$_GET['eventName'].' </h2>
                            <div>
                    </div';
            }
        } else if (isset($_GET['error'])) {
            if ($_GET['error'] == "WorkerWorking"){
                echo '<div style="place-items: center">
                        <div class="event-card" style="text-align: center;">
                            <h2>Worker Is Already Working This Event</h2>
                        <div>
                      </div';

            } else if ($_GET['error'] == "WorkerNotWorking"){
                echo '<div style="place-items: center">
                        <div class="event-card" style="text-align: center;">    
                            <h2>Worker Is Not Working This Event</h2>
                        <div>
                      </div';
            }       
        }
    ?>
</body>
</html>
