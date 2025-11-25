<?php 
    function renderUpcomingEvents() {
        require 'read.php';

        $upcomingEvents = readUpcomingEvents();
        echo '1';
        foreach($upcomingEvents as $event) {
            
            //grabs and formats date from readUpcomingEvents() method above to then display data
            $date = $event['eventDate'];
            $startTime = $event['eventStartTime'];
            // Combine date and time into a single string
            $datetimeStartString = $date . ' ' . $startTime;
            // Create a DateTime object
            $eventStartTime = new DateTime($datetimeString);
            $eventStartTime->format('l, F j, Y h:i A'); // Outputs: Thursday, November 21, 2024 03:30 PM

            //renders upcoming events
            echo '<h2><?php echo $event['eventName']; ?></h2>';
            echo '<p><strong>Time:</strong> <?php echo $eventStartTime; ?></p>';
            echo '<p><strong>Location:</strong><?php echo $event['eventLocation']; ?></p>';
            echo '<button class="like-btn">Liked</button>';
        }
    } 
    function renderLikedEvents($attendeeIDToRender) {
        require 'read.php';

        $attendeeEvents = readAllEventIDFromAttendeeID($attendeeIDToRender);
        foreach($attendeeEvents as $event) {

            //grabs and formats date from readAllEventIDFromAttendeeID() method above to then display data
            $date = $event['eventDate']; // Example date
            $startTime = $event['eventStartTime'];   // Example time
            // Combine date and time into a single string
            $datetimeStartString = $date . ' ' . $startTime;
            // Create a DateTime object
            $eventStartTime = new DateTime($datetimeString);
            $eventStartTime->format('l, F j, Y h:i A'); // Outputs: Thursday, November 21, 2024 03:30 PM
            
            

            //for rendering liked events
            echo '<h2><?php echo $event['eventName']; ?></h2>';
            echo '<div class="event-details">';
                echo '<p><strong>Time:</strong> <?php echo $eventStartTime; ?></p>';
                echo '<p><strong>Location:</strong><?php echo $event['eventLocation']; ?></p>';
                echo '<p class="event-description"><strong>Description:</strong> <?php echo $event['eventDescription']; ?></p>';
            echo '<form>';
                echo '<input type="hidden" name="LikeEventBtn" value="Liked"</input>';
                echo '<button class="like-btn" type="submit">Like</button>';
            echo '</form>';
        }
    } 
    if($_POST['showLikedEvents']) {
        echo '1';
        renderLikedEvents($_SESSION['AttendeeID']);
    }
    if($_POST['showUpcomingEvents']) {
        echo '1';
        renderUpcomingEvents();
    }
 ?>