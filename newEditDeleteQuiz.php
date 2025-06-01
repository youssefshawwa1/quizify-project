<?php 
session_start();


if (!isset($_SESSION['user']) || $_SESSION['user']['logged_in'] !== true) {
    // Redirect to login if not authenticated
    header('Location: index.html');
    exit();
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    include "config.php";
    $currentUser = $_SESSION['user']['username'];

    $json = file_get_contents('php://input');
    
// Decode the JSON data
    $data = json_decode($json, true);



    $name = $data['name'] ?? null;
    $cid = $data['cid'] ?? null;
    $description = $data['description'] ?? null;
    $type = $data['type'];
    $query = "";
    if($type == "new"){
        $query = "INSERT INTO quizzes (quiz_name, category_id, description, instructor_username ) VALUES ('$name', '$cid', '$description', '$currentUser')";
        if(mysqli_query($con, $query)){
                echo json_encode([
                'success' => true,
                'message' => 'Quiz added successfully.'
            ]);
        }
        else{
                echo json_encode([
                'success' => false,
                'message' => 'Quiz not added',
            ]);
        }
    }
    else if($type == "edit"){
        $qid = $data['qid'];
        $query = "UPDATE quizzes SET quiz_name = '$name', description = '$description', instructor_username = $currentUser WHERE quiz_id = '$qid'";
        if(mysqli_query($con, $query)){
                echo json_encode([
                'success' => true,
                'message' => 'Quiz edited successfully.'
            ]);
        }
        else{
                echo json_encode([
                'success' => false,
                'message' => 'Quiz not edited',
            ]);
        }
    }
    else if($type == "delete"){
        $qid = $data['qid'];
        $query = "DELETE FROM scores WHERE quiz_id = '$qid';";
        $query2 = "DELETE FROM questions WHERE quiz_id = '$qid';";
        $query3 = "DELETE FROM quizzes WHERE quiz_id = '$qid';";
        $result1 = mysqli_query($con, $query);
        $result2 = mysqli_query($con, $query2);
        $result3 = mysqli_query($con, $query3);
        if($result1 && $result2 && $result3){
                echo json_encode([
                'success' => true,
                'message' => 'Quiz deleted successfully.'
            ]);
        }
        else{
                echo json_encode([
                'success' => false,
                'message' => 'Quiz not deleted',
            ]);
        }
    }




}


?>