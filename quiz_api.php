<?php

header('Content-Type: application/json');
include "config.php";
    if(!$con){
        echo json_encode([
            'success' => false,
            'message' => 'Database connection failed: ' . mysql_connect_error()
        ]);
        exit;
    }
    
    $request = $_GET['request'] ?? "";
    $category_id = $_GET['cid'] ?? "";
    $quiz_id = $_GET['qid'] ?? "";

    $valid_requests = ['quizzes', "categories", "questions", "score"];

    if(!in_array($request, $valid_requests)){
        echo json_encode([
            'success' => flase,
            'message' => "Invalid request parameter. Use: quizzes, categories, or questions!"
        ]);
        mysqli_close($con);
        exit;
    }


    if($request == "categories"){
        $query = "SELECT * FROM category";
        $result = mysqli_query($con, $query);
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    else if($request == "quizzes"){
        if($category_id){
                    $query = "SELECT * FROM quizzes where category_id = '$category_id'";
                    $result = mysqli_query($con, $query);
                    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        } else{
                $query = "SELECT * FROM quizzes";
                $result = mysqli_query($con, $query);
                $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        }
    }
    else if($request == "questions"){
        if($quiz_id){
                $query = "SELECT question_id, question, option_1, option_2, option_3, option_4 FROM questions WHERE quiz_id = '$quiz_id'";
                $result = mysqli_query($con, $query);
                $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        }
        else{
            $data = [];
        }
    }
    else if($request == "score"){



$json = file_get_contents('php://input');


$data = json_decode($json, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    die('Invalid JSON data');
}

echo json_encode([
    'status' => 'success',
    'message' => 'Data received',
    'score' => $data
]);

    }
    else{
        $data = [];
    }



// Return JSON response
echo json_encode([
    'success' => true,
    'request' => $request,
    'data' => $data,
    'count' => count($data)
]);
mysqli_close($con);
?>