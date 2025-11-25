<!-- dashboard-->

<!--
 * The main HTML page for the dashboard functionality of the application.
  This page includes a navigation menu with dropdown options for different user roles
  (Attendee, Organizer, Worker, Admin), as well as a main content area with a welcome message.
 -->
 <?php
    require 'read.php';
    // Check for eventLiked/eventUnliked for the database update
    if($_POST['eventLiked']) {
      session_start();
      require 'create.php';

      $attendeeID = $_SESSION['AttendeeID'];
      $eventData = readEventDataFromEventName($_POST['eventLikedName']);
      
      $eventIDtoLike = $eventData['EventID'];
      createAttendeeEvent($attendeeID,$eventIDtoLike);
      $stay = true;
      header("Location: ../php/dashboard_page.php");
      die();
    }
    if($_POST['eventUnLiked']) {
      session_start();
      require 'delete.php';

      $attendeeID = $_SESSION['AttendeeID'];
      $eventData = readEventDataFromEventName($_POST['eventUnlikedName']);
        
      $eventIDToUnLike = $eventData['EventID'];
      deleteSpecificAttendeeEventFromAttendeeID($attendeeID,$eventIDToUnLike);

      $showLikedEvents = "true";
      header("Location: ../php/dashboard_page.php?showLikedEvents=$showLikedEvents");
      die();
    }

 ?>
 <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dashboard</title>
    <link rel="stylesheet" href="../stylesheets/stylesheet_dashboard.css"/>
    <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
    <script src="../scripts/dashboard.js" defer></script>
  </head>
  <body>
    <header>
      <div class="logo">
        <h1>Ole Miss Events</h1>
      </div>
      <nav class="navbar" style="display: flex; justify-content: space-between; width: 100%;">
    <div class="nav-left">
        <?php 
          session_start(); 
          if($_SESSION['OrganizerID']) {
            $organizerName = readOrganizerNameFromOrganizerID($_SESSION['OrganizerID'])['RealName'];
            echo '<ul> 
                    <li class="dropdown">
                      <a href="#" class="dropbtn">Organizer: '.$organizerName.'</a>
                      <div class="dropdown-content">
                        <form method="post">
                          <div style="place-items: center;">
                            <a onclick="this.closest(\'form\').submit();">Create an Event</a>
                          </div>
                          <input type="hidden" name="showCreateEventForm" value="true">
                        </form>
                        <div style="place-items: center;">
                          <a href="../php/organizer_messages.php">Messages</a>
                        </div>

                      </div>
                    </li>
                  </ul>';
          } elseif ($_SESSION['WorkerID']) {
              $workerName = readWorkerNameFromWorkerID($_SESSION['WorkerID'])['RealName'];
              echo '<ul>
                      <li class="dropdown">
                      <a href="#" class="dropbtn">Worker: '.$workerName.'</a>
                        <div class="dropdown-content">
                          <a href="../php/worker_assigned_events.php">View Assigned Events</a>
                          <a href="../php/worker_profile.php">Update Schedule</a>
                          <a href="../php/worker_messages.php">Messages</a>
                        </div>
                      </li>
                    </ul>';
          } elseif ($_SESSION['AttendeeID']) { 
              $attendeeName = readAttendeeDataFromAttendeeID($_SESSION['AttendeeID'])['RealName'];
              echo '<ul>
                      <li class="dropdown">
                      <a href="#" class="dropbtn">Worker: '.$attendeeName.'</a>
                        <div class="dropdown-content">
                            <form method="post">
                              <p onclick="this.closest(\'form\').submit();" style="text-align: center;">Show Liked Events</p>
                              <input type="hidden" name="showLikedEvents" value="true">
                            </form>
                            <form method="post">
                              <p onclick="this.closest(\'form\').submit();" style="text-align: center;">Show Upcoming Events</p>
                              <input type="hidden" name="showUpcomingEvents" value="true">
                            </form>
                        </div>
                      </li>
                    </ul>';
          } elseif ($_SESSION['AdminID']) {
              echo '<ul>
                      <li class="dropdown">
                        <a href="#" class="dropbtn">Admin</a>
                        <div class="dropdown-content">
                          <a href="../php/admin_manage_events.php">Manage Events</a>
                          <a href="../php/admin_manage_workers.php">Manage Workers</a>
                          <a href="../php/admin_manage_organizers.php">Manage Organizers</a>
                          <a href="../php/admin_messages.php">Admin Messages</a>
                        </div>
                      </li>
                    </ul>';
          }; 
        ?>
    </div>
    <div class="nav-right" style="margin-left: auto; display: flex; align-items: center;">
        <form action="../php/logout.php" method="post">
            <button type="submit" class="signout-btn" style="font-family: 'Merriweather', Arial, sans-serif; color: #cf152d; text-shadow: -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff; font-size: 18px; text-decoration: none; padding: 10px; cursor: pointer; border: none; background: none;">Sign Out</button>
        </form>
    </div>
</nav>
      </header>
    <main>
    </main>
    <div class="events-container" id="events-container">
      <?php 
        session_start();
        if($_SESSION['AttendeeID']) {
            if ($_POST['showUpcomingEvents']) {
                $upcomingEvents = readUpcomingEvents();
                if($upcomingEvents) {
          echo '<div> 
                  <div style="height: 60px;">
                    <h2 style="text-transform: uppercase; letter-spacing: 2px; font-weight: bold; font-family: \'Merriweather\', Arial, sans-serif; color: #cf152d; text-shadow: -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff; font-size: 24px; margin: 0;text-align: center; width: 100%;">Upcoming Events</h2>
                  </div>
                  <div style="display: flex;">';
                    foreach($upcomingEvents as $event) {
                      //grabs and formats date from readUpcomingEvents() method above to then display data
                      $location = readAllLocationDataFromLocationID($event['LocationID']);
                      $locationName = $location['LocationName'];
                      //YYYY-MM-DD current formate
                      $eventDate = $event['EventDate'];
                      //H:m:s current format
                      $startTime = $event['StartTime'];
                      // Combine date and time into a single string
                      $datetimeStartString = $eventDate.' '.$startTime;
                      
                      // Create a DateTime object
                      $date = DateTime::createFromFormat('Y-m-d H:i:s', $datetimeStartString);
                      $formattedDate = $date->format('F j, Y g:i A');
      
                      if (!readAttendeeEvent($_SESSION['AttendeeID'], $event['EventID'])) {
                          echo '<div class="event-card">';
                              echo '<h2> Event Name: ' . $event['EventName'] . ' </h2>';
                              echo '<div class="event-details">';
                                  echo '<p><strong>Date: </strong>' . $formattedDate . '</p>';
                                  echo '<p><strong>Location: </strong>' . $locationName . '</p>';
                                  echo '<p class="event-description"><strong>Description: </strong>' . $event['EventDescription'] . '</p>';
                                  echo '<form method="post">';
                                        echo '<button class="like-btn" onclick="this.closest(\'form\').submit();">Like</button>';
                                        echo '<input type="hidden" name="eventLiked" value="true">';
                                        echo '<input type="hidden" name="eventLikedName" value="'.$event['EventName'].'">';
                                  echo '</form>';
                              echo '</div>';
                          echo '</div>';
                    }
                  }
                    echo '</div>';
                  echo '</div';
                } else {
                    echo '<div> <h2 style="text-transform: uppercase; letter-spacing: 2px; font-weight: bold; font-family: \'Merriweather\', Arial, sans-serif; color: #cf152d; text-shadow: -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff; font-size: 24px; margin: 0;text-align: center; width: 100%;">No Upcoming Events</h2>
                <div style="display: flex;">';
                }
            } else if ($_POST['showLikedEvents'] == true || $_GET['showLikedEvents']) {
                $user = readAttendeeDataFromAttendeeID($_SESSION['AttendeeID']);
                $likedEvents = readAllLikedEventsfromUsername($user['Username']);
                if($likedEvents) {
                    echo '<div> 
                <div style="height: 60px;">
                  <h2 style="text-transform: uppercase; letter-spacing: 2px; font-weight: bold; font-family: \'Merriweather\', Arial, sans-serif; color: #cf152d; text-shadow: -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff; font-size: 24px; margin: 0;text-align: center; width: 100%;">Liked events</h2>
                </div>
              <div style="display: flex;">';
                    //display liked events
                    foreach($likedEvents as $likedEvent) {
                      //grabs and formats date from readUpcomingEvents() method above to then display data
                      $location = readAllLocationDataFromLocationID($likedEvent['LocationID']);
                      $locationName = $location['LocationName'];
                      //YYYY-MM-DD current formate
                      $eventDate = $likedEvent['EventDate'];
                      //H:m:s current format
                      $startTime = $likedEvent['StartTime'];
                      // Combine date and time into a single string
                      $datetimeStartString = $eventDate.' '.$startTime;
                      
                      // Create a DateTime object
                      $date = DateTime::createFromFormat('Y-m-d H:i:s', $datetimeStartString);
                      $formattedDate = $date->format('F j, Y g:i A');
      
                      echo '<div class="event-card">';
                          echo '<h2> Event Name: ' . $likedEvent['EventName'] . ' </h2>';
                          echo '<div class="event-details">';
                              echo '<p><strong>Date: </strong>' . $formattedDate . '</p>';
                              echo '<p><strong>Location: </strong>' . $locationName . '</p>';
                              echo '<p class="event-description"><strong>Description: </strong>' . $likedEvent['EventDescription'] . '</p>';
                              echo '<div style="place-items: center;">';
                                echo '<form method="post">';
                                    echo '<button class="like-btn" onclick="this.closest(\'form\').submit();">Unlike</button>';
                                    echo '<input type="hidden" name="eventUnLiked" value="true">';
                                    echo '<input type="hidden" name="eventUnlikedName" value="'.$likedEvent['EventName'].'">';
                                echo '</form>';
                              echo '</div>';
                          echo '</div>';
                      echo '</div>';
                    }
                      echo '</div';
                    echo '</div';
                } else {
                    echo '<div> <h2 style="text-transform: uppercase; letter-spacing: 2px; font-weight: bold; font-family: \'Merriweather\', Arial, sans-serif; color: #cf152d; text-shadow: -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff; font-size: 24px; margin: 0;text-align: center; width: 100%;">No Liked Events</h2>
                <div style="display: flex;">';
                }
              } else {
                  $upcomingEvents = readUpcomingEvents();
                  if($upcomingEvents) {
                      echo '<div> 
                      <div style="height: 60px;">
                        <h2 style="text-transform: uppercase; letter-spacing: 2px; font-weight: bold; font-family: \'Merriweather\', Arial, sans-serif; color: #cf152d; text-shadow: -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff; font-size: 24px; margin: 0;text-align: center; width: 100%;">Upcoming Events</h2>
                      </div>
                <div style="display: flex;">';
                      foreach($upcomingEvents as $event) {
                        //grabs and formats date from readUpcomingEvents() method above to then display data
                        $location = readAllLocationDataFromLocationID($event['LocationID']);
                        $locationName = $location['LocationName'];
                        //YYYY-MM-DD current formate
                        $eventDate = $event['EventDate'];
                        //H:m:s current format
                        $startTime = $event['StartTime'];
                        // Combine date and time into a single string
                        $datetimeStartString = $eventDate.' '.$startTime;
                        
                        // Create a DateTime object
                        $date = DateTime::createFromFormat('Y-m-d H:i:s', $datetimeStartString);
                        $formattedDate = $date->format('F j, Y g:i A');
        
                        if (!readAttendeeEvent($_SESSION['AttendeeID'], $event['EventID'])) {
                            echo '<div class="event-card">';
                                echo '<h2> Event Name: ' . $event['EventName'] . ' </h2>';
                                echo '<div class="event-details">';
                                    echo '<p><strong>Date: </strong>' . $formattedDate . '</p>';
                                    echo '<p><strong>Location: </strong>' . $locationName . '</p>';
                                    echo '<p class="event-description"><strong>Description: </strong>' . $event['EventDescription'] . '</p>';
                                    echo '<form method="post">';
                                          echo '<button class="like-btn" onclick="this.closest(\'form\').submit();">Like</button>';
                                          echo '<input type="hidden" name="eventLiked" value="true">';
                                          echo '<input type="hidden" name="eventLikedName" value="'.$event['EventName'].'">';
                                    echo '</form>';
                                echo '</div>';
                            echo '</div>';
                        }
                    }
                      echo '</div>';
                    echo '</div';
                  } else {
                      echo '<div> <h2 style="text-transform: uppercase; letter-spacing: 2px; font-weight: bold; font-family: \'Merriweather\', Arial, sans-serif; color: #cf152d; text-shadow: -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff; font-size: 24px; margin: 0;text-align: center; width: 100%;">No Upcoming Events</h2>
                <div style="display: flex;">';
                  }
              }
        } else if ($_SESSION['WorkerID']) {
            if ($_GET['param'] == "WorkerUpdated") {
              echo '<div class="event-card">';
                echo '<h2 style="text-align: center;font-size: 300%;"> Worker Data Updated! </h2>';
              echo '</div>';
            }
        } else if ($_SESSION['OrganizerID']) {
            $Events = readAllEventData();
            echo '<div> <h2 style="text-transform: uppercase;height: 60px;letter-spacing: 2px; font-weight: bold; font-family: \'Merriweather\', Arial, sans-serif; color: #cf152d; text-shadow: -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff; font-size: 24px; margin: 0;text-align: center; width: 100%;">Created Events</h2>
                <div style="display: flex;">';
            if($Events) {
                foreach($Events as $event) {
                  //grabs and formats date from readUpcomingEvents() method above to then display data
                  $location = readAllLocationDataFromLocationID($event['LocationID']);
                  $locationName = $location['LocationName'];
                  //YYYY-MM-DD current formate
                  $eventDate = $event['EventDate'];
                  //H:m:s current format
                  $startTime = $event['StartTime'];
                  // Combine date and time into a single string
                  $datetimeStartString = $eventDate.' '.$startTime;
                  
                  // Create a DateTime object
                  $date = DateTime::createFromFormat('Y-m-d H:i:s', $datetimeStartString);
                  $formattedDate = $date->format('F j, Y g:i A');
                  //sets createdEvents
                  if($_SESSION['OrganizerID'] == readOrganizerIDFromEventID($event['EventID'])['OrganizerID']) {
                    echo '<div class="event-card">';
                          echo '<h2> Event Name: ' . $event['EventName'] . ' </h2>';
                          echo '<div class="event-details">';
                              echo '<p><strong>Date: </strong>' . $formattedDate . '</p>';
                              echo '<p><strong>Location: </strong>' . $locationName . '</p>';
                              echo '<p class="event-description"><strong>Description: </strong>' . $event['EventDescription'] . '</p>';
                              echo '<form method="post">';
                                          echo '<button class="like-btn" onclick="this.closest(\'form\').submit();">Update This Event</button>';
                                          echo '<input type="hidden" name="showEventUpdateForm" value="true">';
                                          echo '<input type="hidden" name="eventIDToUpdate" value="'.$event['EventID'].'">';
                              echo '</form>';
                          echo '</div>';
                      echo '</div>';
                  }
                }
            } else {
                echo '<div> <h2 style="text-transform: uppercase; letter-spacing: 2px; font-weight: bold; font-family: \'Merriweather\', Arial, sans-serif; color: #cf152d; text-shadow: -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff; font-size: 24px; margin: 0;text-align: center; width: 100%;">No Created Events</h2>
                <div style="display: flex;">';
            }
              echo '</div';
            echo '</div>';
        }
      ?>
    </div>

    <?php             
            if ($_GET['Event'] == "EventUpdated") {
              echo '<div class="event-card">';
                echo '<h2 style="text-align: center;font-size: 300%;"> Event Updated! </h2>';
              echo '</div>';
            } else if ($_GET['Event'] == "EventCreated") {
              echo '<div class="event-card">';
                echo '<h2 style="text-align: center;font-size: 300%;"> Event Created! </h2>';
              echo '</div>';
            }
            if($_POST['showCreateEventForm'] == true) { ?>
        <div class="event-card">
          <h2 style="color: blue;text-align: center;">Create an Event</h2>
          <form action="dashboard_handler.php" method="post" id="createEventForm">
            <input type="text" id="eventName" name="eventName" placeholder="Event Name" required 
                    maxlength="25"
                    oninput="this.value = this.value.split(/\s+/).slice(0,10).join(' ')">
            <textarea id="eventDescription" placeholder="Event Description" name="eventDescription" required
                      maxlength="500"
                      oninput="this.value = this.value.split(/\s+/).slice(0,200).join(' ')"></textarea>
              <select id="eventLocation" name="eventLocation" required>
                <option value="">Select a location</option>
                <option value="The Grove" >The Grove</option>
                <option value="Vaught-Hemingway Stadium">Vaught-Hemingway Stadium</option>
                <option value="The Pavilion">The Pavilion</option>
                <option value="The Union">The Union</option>
              </select>
              <input type="date" name="eventDate" id="eventDate" required>
              <input type="time" name="eventStartTime" id="eventStartTime" required>
              <input type="time" name="eventEndTime" id="eventEndTime" required>
              <input type="hidden" name="submitEventForm" value="true">
              <button type="submit">Create Event</button>
          </form>
        </div>
    <?php } else if ($_POST['showEventUpdateForm'] == true) { 
              $eventData = readEventDataFromEventID($_POST['eventIDToUpdate']);
    ?>
          <div class="event-card">
              <h2 style="color: blue;text-align: center;">Update Event: <?php echo $eventData['EventName']; ?></h2>
              <form action="dashboard_handler.php" method="post" id="createEventForm">
                <input type="text" id="eventName" name="eventName" placeholder="Event Name" required 
                        maxlength="25"
                        oninput="this.value = this.value.split(/\s+/).slice(0,10).join(' ')">
                <textarea id="eventDescription" placeholder="Event Description" name="eventDescription" required
                          maxlength="500"
                          oninput="this.value = this.value.split(/\s+/).slice(0,200).join(' ')"></textarea>
                  <select id="eventLocation" name="eventLocation" required>
                    <option value="">Select a location</option>
                    <option value="The Grove" >The Grove</option>
                    <option value="Vaught-Hemingway Stadium">Vaught-Hemingway Stadium</option>
                    <option value="The Pavilion">The Pavilion</option>
                    <option value="The Union">The Union</option>
                  </select>
                  <input type="date" name="eventDate" id="eventDate" required>
                  <input type="time" name="eventStartTime" id="eventStartTime" required>
                  <input type="time" name="eventEndTime" id="eventEndTime" required>
                  <input type="hidden" name="updateEventForm" value="<?php echo $eventData['EventID']; ?>">
                  <button type="submit">Update Event</button>
              </form>
          </div>
    <?php } ?>
  </body>
</html>