<?php
session_start(); // Must be at the very top, before any output

header('Content-Type: application/json');

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

// Replace with your actual user validation (database check recommended)
include "config.php";

$sql  = "SELECT password FROM instructors WHERE username ='$username'";
$result = mysqli_query($con, $sql);
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);


if (isset($data[0]['password']) && $data[0]['password'] === $password) {
    // Store user info in session
    $_SESSION['user'] = [
        'username' => $username,
        'logged_in' => true,
        'login_time' => time()
    ];
    
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
}

?>