<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Events</title>
    <link rel="stylesheet" href="../stylesheets/stylesheet_worker_events.css">
    <link rel="stylesheet" href="../stylesheets/stylesheet_admin_manage_workers.css">
</head>
<body>
    <header>
        <div class="logo">
            <h1>Ole Miss Events</h1>
        </div>
        <nav class="navbar">
            <ul>
                <li><a href="../php/dashboard_page.php" class="dropbtn">Back to Dashboard</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <div class="events-table-container">
            <h2>Manage Events</h2>
            <table class="events-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Time</th>
                        <th># of Likes</th>
                        <th>Event Creator</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="eventsTableBody">
                    <?php
                        require 'read.php';
                        $Events = readAllEventData();
                        foreach($Events as $event) {
                            $location = readAllLocationDataFromLocationID($event['LocationID']);
                            $locationName = $location['LocationName'];
                            // Combine date and time into a single string
                            $datetimeStartString = $event['EventDate'].' '.$event['StartTime'];
                            // Create a DateTime object
                            $date = DateTime::createFromFormat('Y-m-d H:i:s', $datetimeStartString);
                            $formattedDate = $date->format('F j, Y g:i A');
                    ?>
                                <tr>
                                    <td><?php echo htmlspecialchars($event['EventName']); ?></td>
                                    <td><?php echo htmlspecialchars($event['EventDescription']); ?></td>
                                    <td><?php echo htmlspecialchars($locationName); ?></td>
                                    <td><?php echo htmlspecialchars($formattedDate); ?></td>
                                    <td>
                                        <?php
                                            echo count(readAllAttendeeIDFromEventID($event['EventID']));
                                        ?>
                                    </td>
                                    <td>
                                        <?php
                                            $OrganizerID = readOrganizerIDFromEventID($event['EventID']);
                                            $OrganizerName = readOrganizerNameFromOrganizerID($OrganizerID['OrganizerID']);
                                            echo $OrganizerName['RealName'];
                                        ?>
                                    </td>
                                    <td>
                                        <form method="post" action="admin_actions.php">
                                            <button class="action-btn remove-btn" type="submit">Remove</button>
                                            <input type="hidden" name="eventID" value="<?php echo $event['EventID']; ?>">
                                        </form>
                                    </td>
                                </tr>
                        <?php } ?>
                </tbody>
            </div>
        </table>
        <?php
            if(isset($_GET['eventID'])) {
                require 'read.php';
                $EventData = readEventDataFromEventID($_POST['eventID']);
                $EventName = $EventData['EventName'];
                    echo '<div style="place-items: center">
                                <div class="event-card" style="text-align: center;">
                                    <h2>'.$EventName.' has been cancelled</h2>
                                <div>
                        </div';
            }
        ?> 
    </main>
</body>
</html>
