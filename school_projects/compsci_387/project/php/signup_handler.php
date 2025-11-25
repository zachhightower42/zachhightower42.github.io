<?php
    require '../connect.php';
    
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        //assign variables
        $username = $_POST['username'];
        $realname = $_POST['realname'];
        $password = $_POST['password'];
        $password_confirm = $_POST['password_confirm'];
        $email = $_POST['email'];

        $hashedPassword = md5($password);

        try {
            //query to check if username exists in db.
            $stmt = $dbConn->prepare("SELECT * 
                                      FROM Attendee 
                                      WHERE Username = :username");
            $stmt->bindParam(':username', $username);
            $stmt->execute();

            if($stmt->fetchColumn() > 0) {
                //username/pass already exists error
                header("Location: ../HTML/signup_page.html?error=invalidLogin");
                die("Error: Username already exists");
            } elseif($password != $password_confirm){
                //passwords do not match error
                header("Location: ../HTML/signup_page.html?error=invalid");
                die("Error: Passwords do not match");
            }else{
                require 'create.php';
                createAttendee($email,$username,$realname,$hashedPassword);
                header("Location: ../HTML/login_page.html");
                die();
            }
        } catch (PDOException $e) {
            echo "Connection Failed" + $e.getMessage();
        }
    }
?>
