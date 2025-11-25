<?php
   $servername = "localhost";
   $DBusername = "group10-f24";
   $DBpassword = "Group10_387";
   $db = "group10-f24";

   try {
      $dbConn = new PDO("mysql:host=$servername;dbname=$db", $DBusername, $DBpassword);
      // set the PDO error mode to exception
      $dbConn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   } catch(PDOException $e) {
      echo "Connection failed: " . $e->getMessage();
   }
?>


