<!-- 
 * This section of the login_page.html file contains the login form for the application.
  The form includes input fields for the username and password,
   as well as a login button and a sign up button.
 -->
<!-- login-->  
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login Page</title>
    <link rel="stylesheet" href="../stylesheets/stylesheet_login.css" />
    <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
    <script src="../scripts/login.js" defer></script>
  </head>
  <body>
    <header class="main-header">
      <h1 class="logo-text">Ole Miss</h1>
      <?php 
      if (htmlspecialchars($_GET['loggedOut']) == 'loggedOut') {
                echo '<div>
                        <h style="font-size: 40px;color:white;" >Logged Out Successfully</h>
                      </div>';
            }
      ?>
    </header>
    <div class="login-container">
      <h1>Login</h1>
      <?php if ($_GET['invalid']) {
              echo '<p style="color:red;">Error, please try again</p>';
            }
      ?>
      <form action="../php/login_handler.php" method="post">
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input type="submit" value="Login" />
        <button type="button" onclick="window.location.href='signup_page.html'">
          Sign Up
        </button>
      </form>
    </div>
  </body>
</html>
