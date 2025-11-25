<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Worker Profile</title>
    <link rel="stylesheet" href="../stylesheets/stylesheet_worker_profile.css">
    <script src="../scripts/worker_profile.js" defer></script>
</head>
<body>
    <header class="main-header">
        <h1 class="logo-text">Ole Miss</h1>
    </header>
    <div class="profile-container">
        <h1>Worker Profile</h1>
        <form action="../php/update_worker_profile.php" method="post">
            <div class="form-group">
                <input type="text" id="name" name="name" placeholder="Full Name" required>
            </div>
            <div class="form-group">
                <input type="text" name="phoneNum" placeholder="PhoneNum" required>
            </div>
            
            <div class="form-group">
                    <h2>Availability & Working Hours</h2>
                    <div style="display: flex; justify-content: center; align-items: center; gap: 10px; flex-direction: row;">
                        <select name="StartDay" style="text-align: center;height:40px;">
                            <option value="Mon">Monday</option>
                            <option value="Tue">Tuesday</option>
                            <option value="Wed">Wednesday</option>
                            <option value="Thu">Thursday</option>
                            <option value="Fri">Friday</option>
                            <option value="Sat">Saturday</option>
                            <option value="Sun">Sunday</option>
                        </select>
                        <p style="font-size: 20px; color: white;">To<p>
                        <select name="EndDay" style="text-align: center;height:40px;">
                            <option value="Mon">Monday</option>
                            <option value="Tue">Tuesday</option>
                            <option value="Wed">Wednesday</option>
                            <option value="Thu">Thursday</option>
                            <option value="Fri">Friday</option>
                            <option value="Sat">Saturday</option>
                            <option value="Sun">Sunday</option>
                        </select>
                    </div>
                        <div class="time-slots-container" id="timeSlots">
                            <div class="time-slot">
                                <input type="time" class="start-time" name="startTime">
                                <div style="place-items:center;">
                                    <p style="font-size: 20px; color: white;">To<p>
                                </div>
                                <input type="time" class="end-time" name="endTime">
                            </div>
                        </div>
                    
            </div>
            <input type="submit" value="Save Profile">
        </form>
    </div>
</body>
</html>
<body>
        <nav class="navbar">
            <ul>
                <li>
                    <div class="logo">
                        <h1>Ole Miss Events</h1>
                    </div>
                    <a href="../php/dashboard_page.php" class="dropbtn">Back to Dashboard</a>
                </li>
            </ul>
        </nav>
