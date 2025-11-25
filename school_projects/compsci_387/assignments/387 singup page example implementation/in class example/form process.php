<?php
	require '  ';
	$sid = $_POST['sid'];
	$fname = $_POST['fname'];
	$lname = $_POST['lname'];
	if ($sid == ''){
		$query = 'insert into student(firstname,lastname) values (?, ?)';
		$statement = $dbConn->prepare($query);
		$statement->execute([$fname, $lname]);
	}
	else{
		$query = 'insert into student(sid,firstname,lastname) values (?,?, ?)';
		$statement = $dbConn->prepare($query);
		$statement->execute([$sid, $fname, $lname]);
	}
	$query = 'select sid from student where firstname = ? and lastname = ? limit 1';
	$statement = $dbConn->prepare($query);
	$statement->execute([$fname, $lname]);
	$results = $statement->fetch();

	echo $results[0];
