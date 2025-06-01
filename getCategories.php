<?php
session_start(); // Must be at the very top

include "config.php";
// Check if user is logged in
if (!isset($_SESSION['user']) || $_SESSION['user']['logged_in'] !== true) {
    // Redirect to login if not authenticated
    header('Location: index.html');
    exit();
}

// Now you can access user information
$currentUser = $_SESSION['user']['username'];

$query = "SELECT * FROM category";
$result = mysqli_query($con, $query);
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($data);

?>