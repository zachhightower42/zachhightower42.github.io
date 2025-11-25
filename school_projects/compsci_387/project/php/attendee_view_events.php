
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Events - Attendee</title>
    <link rel="stylesheet" href="../stylesheets/stylesheeet_attendee_view.css">
    <script src="../scripts/attendee_view_events.js" defer></script>
</head>
<body>
    <header>
        <nav class="navbar">
            <ul>
                <li><a href="dashboard_page.html">Dashboard</a></li>
                <li><a href="#" class="active">View Events</a></li>
                <li><a href="#">Liked Events</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <h1>Upcoming Events</h1>
        <div class="events-container">
            <div class="event-card">
                <!-- change this so that php requests data for each card? -->
                <?php require 'read.php';
                      $upcomingEvents = readUpcomingEvents();
                      foreach($upcomingEvents as $event) {
                        //grabs and formats date from readUpcomingEvents() method above to then display data
                        $date = $event['eventDate']; // Example date
                        $startTime = $event['eventStartTime'];   // Example time
                        // Combine date and time into a single string
                        $datetimeStartString = $date . ' ' . $startTime;
                        // Create a DateTime object
                        $eventStartTime = new DateTime($datetimeStartString);
                        $formattedStartTime = $eventStartTime->format('l, F j, Y h:i A'); // Outputs: Thursday, November 21, 2024 03:30 PM
                        
                        echo "<h2>{$event['eventName']}</h2>";
                        echo "<p><strong>Time:</strong> {$formattedStartTime}</p>";
                        echo "<p><strong>Location:</strong> {$event['eventLocation']}</p>";
                        echo '<button class="like-btn" type="submit">Like</button>';
                      }
                ?>
            </div>
            <!-- More event cards can be added here -->
        </div>
    </main>
</body>
</html>
