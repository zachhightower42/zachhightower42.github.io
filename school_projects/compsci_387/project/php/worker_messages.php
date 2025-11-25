<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Workers</title>
    <link rel="stylesheet" href="../stylesheets/stylesheet_worker_events.css">
    <link rel="stylesheet" href="../stylesheets/stylesheet_admin_manage_workers.css">
    <script>
        function toggleSendAdminMessageDiv() {
            const formDiv = document.getElementById('sendAdminMessageForm');
            if (formDiv.style.display === 'none' || formDiv.style.display === '') {
                formDiv.style.display = 'block';
            } else {
                formDiv.style.display = 'none';
            }
        }
        function toggleSendOrganizerMessageDiv() {
            const formDiv = document.getElementById('sendOrganizerMessageForm');
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
                <li><button name="sendMessageForm" class="action-btn" onclick="toggleSendAdminMessageDiv();">Message An Admin</button></li>
                <li><button name="sendMessageForm" class="action-btn" onclick="toggleSendOrganizerMessageDiv();">Message An Organizer</button></li>
            </ul>
        </nav>
    </header>

    <main>
        <div class="events-table-container">
            <h1>Messages</h1>
            <table class="events-table">
                <thead>
                    <tr>
                        <th>Sender</th>
                        <th>Content</th>
                        <th>Received</th>
                    </tr>
                </thead>
                <tbody id="workersTableBody">
                    <?php
                        require 'read.php'; 
                        session_start();
                        $messages = readWorkerMessages($_SESSION['WorkerID']);
                        foreach ($messages as $message) {
                            if ($message['Organizer_ID'] != null) {
                                $name = readOrganizerNameFromOrganizerID($message['Organizer_ID'])['RealName'];
                            } else {
                                $name = "Admins";
                            }
                            $date = DateTime::createFromFormat('Y-m-d H:i:s', $message['MessageDate'].' '.$message['MessageTime']);
                            $formattedDate = $date->format('F j, Y g:i A');
                    ?>
                                    <tr>
                                        <td> <?php echo $name ?></td>
                                        <td> <?php echo $message['content']; ?></td>
                                        <td> <?php echo $formattedDate; ?></td>
                                    <tr>
                    <?php } ?>
                </tbody>
            </table>
        </div>
    </main>
    <div>
        <div id="sendAdminMessageForm" style="display: none;background-color: #12284C;padding: 10px;max-width: 600px;margin: 0 auto;border-radius: 25px;">
                <form method="post" action="worker_manage_messages.php" style="text-align: center;">
                    <select name="adminToMessage" style="width: 250px;height: 40px;border-radius: 15px;;">
                        <option value="admin">Message Admins</option>
                    </select>
                    <input 
                        style="width: 250px;height: 40px;border-radius: 15px;"
                        type="text" 
                        name="Message" 
                        placeholder="Write your message here..." 
                        required />
                    <input type="hidden" name="WorkerToAdminMsg" value="true">
                    <button type="submit" class="action-btn">Send</button>
                </form>
        </div>
        <div id="sendOrganizerMessageForm" style="display: none;background-color: #12284C;padding: 10px;max-width: 600px;margin: 0 auto;border-radius: 25px;">
                <form method="post" action="worker_manage_messages.php" style="text-align: center;">
                    <select name="organizerToMessage" style="width: 250px;height: 40px;border-radius: 15px;">
                        <option value="none">Select an Organizer to Message</option>
                        <?php 
                            $organizerData = readAllOrganizerData();
                            if ($organizerData) {
                                foreach($organizerData as $organizer) {
                                    $realName = readOrganizerNameFromOrganizerID($organizer['OrganizerID'])['RealName'];
                                    $attendeeID = readAttendeeIDFromOrganizerID($organizer['OrganizerID'])['AttendeeID'];
                                    $username = readAttendeeDataFromRealName($realName)['Username'];
                                    echo '<option value="'.$username.'">'.$realName.'</option>';
                                }
                            }
                        ?>
                    </select>
                    <input 
                        style="width: 250px;height: 40px;border-radius: 15px;"
                        type="text" 
                        name="Message" 
                        placeholder="Write your message here..." 
                        required />
                    <input type="hidden" name="WorkerToOrganizerMsg" value="true">
                    <button type="submit" class="action-btn">Send</button>
                </form>
        </div>
    </div>
    <div style="place-items: center;">
        <?php 
            if (isset($_GET['messageSent'])) {
                echo '<div class="event-card">';
                  echo '<h2 style="text-align: center;font-size: 250%;"> Message to '.$_GET['messageSent'].' sent! </h2>';
                echo '</div>';
              }
        ?>
    </div>

</body>
</html>
