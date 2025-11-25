<?php
    if($_POST['removeOrganizer']) {
        require 'delete.php';
        $organizerID = $_POST['OrganizerID'];
        deleteOrganizerFromOrganizerID($organizerID);
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Organizers</title>
    <link rel="stylesheet" href="../stylesheets/stylesheet_worker_events.css">
    <link rel="stylesheet" href="../stylesheets/stylesheet_admin_manage_workers.css">
    <script>
        function toggleAddOrganizerDiv() {
            const formDiv = document.getElementById('addOrganizerForm');
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
                <li><a href="../php/dashboard_page.php" class="dropbtn">Back to Dashboard</a></li>
                <li>
                    <button name="toggleAddOrganizerForm" class="action-btn" onclick="toggleAddOrganizerDiv()">Add New Organizer</button>
                </li>
            </ul>
        </nav>
    </header>
    <main>
        <div class="events-table-container">
            <h2>Manage Event Organizers</h2>
            <table class="events-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Upcoming Events</th>
                        <th>Past Events</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="organizersTableBody">
                <?php
                    require 'read.php'; 
                    
                    $Organizers = readAllOrganizerData();
                    $currentDay = date('Y-m-d H:i:s');
                    foreach($Organizers as $organizer) {
                        $name = readOrganizerNameFromOrganizerID($organizer['OrganizerID'])['RealName'];
                        $eventIDs = readAllEventIDFromOrganizerID($organizer['OrganizerID']);
                        $upcoming = [];
                        $past = [];
                        foreach($eventIDs as $eventID) {
                            $eventData = readEventDataFromEventID($eventID['EventID']);
                            $checkDate = $eventData['EventDate'].' '.$eventData['StartTime'];
                            
                            if($currentDay <= $checkDate) {
                                array_push($upcoming, $eventData['EventName']);
                            } else if($currentDay > $checkDate) {
                                array_push($past, $eventData['EventName']);
                            }
                        }
                ?>
                                <tr>
                                    <td> <?php echo $name; ?></td>
                                    <td> 
                                        <?php 
                                            if ($upcoming)  {
                                                $counter = 0;
                                                foreach ($upcoming as $upcomingEvent) {
                                                    if($counter == 0) {
                                                        echo $upcomingEvent;
                                                        $counter = 1;
                                                    } else {
                                                        echo ', '.$upcomingEvent;
                                                    }
                                                }  
                                            } else {
                                                echo "No Upcoming Events";
                                            }
                                        ?>
                                    </td>
                                    <td> 
                                        <?php 
                                            if ($past) {
                                                $counter == 0;
                                                foreach ($past as $pastEvent) {
                                                    if($counter == 0) {
                                                        echo $pastEvent;
                                                        $counter = 1;
                                                    } else {
                                                        echo ', '.$pastEvent;
                                                    }
                                                }  
                                            } else {
                                                echo "No Past Events";
                                            }
                                        ?>
                                    </td>
                                    <td>
                                        <form method="post">
                                            <button name="removeOrganizerForm" class="action-btn remove-btn" onclick="this.closest('form').submit();">Delete Organizer</button> 
                                            <input type="hidden" name="removeOrganizer" value="true">
                                            <input type="hidden" name="OrganizerID" value="<?php echo $organizer['OrganizerID'];?>">
                                        </form>
                                    <td>
                                <tr>
                <?php } ?>
                </tbody>
            </table>
        </div>  
        <?php
            if ($_GET['NewOrganizer']) {
                echo '<div class="event-card">
                        <h2>New Organizer Entry '.$_GET['NewOrganizer'].' has been created</h2
                      </div';
            }
        ?>
    </main>

    <!-- Add Organizer Form -->
    <div id="addOrganizerForm" style="display: none;background-color: #12284C;padding: 10px;max-width: 800px;margin: 0 auto;border-radius: 25px;">
            <form method="post" action="admin_actions.php" style="text-align: center;">
                <select name="AttendeeToPromoteToOrganizer" style="width: 290px;height: 40px;border-radius: 15px;">
                    <option value="none">Select An Attendee To Promote Below</option>
                    <?php 
                        $attendeeNames = readAllAttendeeNames();
                        if ($attendeeNames) {
                            foreach($attendeeNames as $attendeeName) {
                                $username = $attendeeName['Username'];
                                $attendeeID = readAttendeeDataFromUsername($username)['AttendeeID'];
                                $organizerData = readOrganizerIDFromAttendeeID($attendeeID);
                                $workerID = readWorkerIDFromWorkerName($username)['WorkerID'];
                                $workerData = readWorkerDataFromWorkerID($workerID);
                                //checking attendee id does not correspond to Organizer data
                                if(!$organizerData && !$workerData) {
                                    echo '<option value="'.$username.'">'.$attendeeName['RealName'].'</option>';
                                }
                            } 
                        }
                    ?>
                </select>
                <button type="submit" class="action-btn">Create New Organizer</button>
            </form>
    </div>
    

    <!-- Message Organizer Modal -->
    <div id="messageModal" class="modal">
        <div class="modal-content">
            <span class="close">×</span>
            <h2>Send Message</h2>
            <form id="messageForm">
                <textarea id="messageContent" placeholder="Enter your message" required></textarea>
                <button type="submit" class="action-btn">Send Message</button>
            </form>
        </div>
    </div>
</body>
</html>
