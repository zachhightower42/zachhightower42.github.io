<?php
$host = 'turing.cs.olemiss.edu';  
$dbname = 'zphighto';  
$username = 'zphighto';  
$password = 'Melancholia42!';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully";
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    error_log("Database connection failed: " . $e->getMessage(), 0);
    die();
}

