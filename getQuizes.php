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
$json = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($json, true); // true for associative array

// Check if decoding was successful
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400); // Bad request
    die('Invalid JSON data');
}


$cid = json_decode($json, true);
$quizesSql = "SELECT * FROM quizzes where category_id = '$cid'";
$categorySql = "SELECT * FROM category where category_id = '$cid'";
$quizzesResult = mysqli_query($con, $quizesSql);
$categoryResult = mysqli_query($con, $categorySql);
$quizes = mysqli_fetch_all($quizzesResult, MYSQLI_ASSOC);
$category = mysqli_fetch_all($categoryResult, MYSQLI_ASSOC);

echo json_encode([
    'quizes' => $quizes,
    'category' => $category,
]);
?>