<?php
session_start();
session_destroy();
$loggedOut = "loggedOut";
header("Location: ../php/login_page.php?loggedOut=$loggedOut");
die();
?>