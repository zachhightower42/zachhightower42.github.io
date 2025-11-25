<?php   

	require '/home/zphighto/connections/connect.php';
 	
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
        	// Get user input from the login form
        	$username = $_POST["username"];
        	$password = $_POST["password"];
	
		try{
        		// Prepare SQL query to fetch user from database
        		$stmt = $conn->prepare("SELECT username, password FROM users WHERE username = :username");
        		$stmt->bindParam(':username', $username);
        		$stmt->execute();
        		$user = $stmt->fetch(PDO::FETCH_ASSOC);

        		if ($user && password_verify($password, $user['password'])) {
           			// Password is correct, redirect to success page
				session_start();
                $message="";
                $empty=true;
				$_SESSION['username']=$user['username'];
           			 header("Location: index.php");
        		} else {
            			// Password is incorrect, display error message
                        $empty=false;
            			$message= "Incorrect username or password";
        		}
		}
		catch(PDOException $e) {
    			echo "Connection failed: " . $e->getMessage();
		}
	}
?>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles2.css">
    <title>Login Form</title>
</head>
<body>
 <div class="navbar">
<div class="title">Zachary Public Bookstore</div>
    </div>

    <div class="main-content">
    <h2>Login Form</h2>
    <form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
        Username: <input type="text" name="username" autocomplete="off"><br><br>
        Password: <input type="password" name="password"> <?php if(!$empty) {echo "<div class='error'>".$message."</div>";} ?>
        <input type="submit" name="submit" value="Login">
    </div>
<footer>
</footer>
</body>
</html>
