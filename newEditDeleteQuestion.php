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


    $question = $data['question'] ?? null;
    $option_1 = $data['option_1'] ?? null;
    $option_2 = $data['option_2'] ?? null;
    $option_3 = $data['option_3'] ?? null;
    $option_4 = $data['option_4'] ?? null;
    $currect = $data['currect'] ?? null;
    $qid = $data['qid'] ?? null;
    $type = $data['type'];
    $question_id = $data['question_id'] ?? null; // Optional, for edit/delete case`
    $query = "";
    $query2 = "";


    if($type == "new"){
        $query = "INSERT INTO questions (question, quiz_id, option_1, option_2, option_3, option_4, correct_option, username) 
        VALUES ('$question', '$qid', '$option_1', '$option_2', '$option_3', '$option_4', '$currect', '$currentUser');";
        $query2 = "UPDATE quizzes SET nb_questions = nb_questions + 1 WHERE quiz_id = '$qid';";
        $queryRestul = mysqli_query($con, $query);
        $query2Result = mysqli_query($con, $query2);

        if($queryRestul && $query2Result){
                echo json_encode([
                'success' => true,
            ]);
        }
        else{
                echo json_encode([
                'success' => false,
            ]);
        }

    }
   else if($type == "edit"){
        $message = "Question updated successfully.";
        $query = "UPDATE questions 
                SET question = '$question',
                    option_1 = '$option_1',
                    option_2 = '$option_2',
                    option_3 = '$option_3',
                    option_4 = '$option_4',
                    correct_option = '$currect',
                    username = '$currentUser'
                WHERE question_id = '$question_id'";

        if(mysqli_query($con, $query)){
                echo json_encode([
                'success' => true,
            ]);
        }
        else{
                echo json_encode([
                'success' => false,
            ]);
        }




    }

    else if($type == "delete"){
        $query = "DELETE FROM questions WHERE question_id = '$question_id';";
        $query2 = "UPDATE quizzes SET nb_questions = nb_questions - 1 WHERE quiz_id = '$qid';";
        $queryRestul = mysqli_query($con, $query);
        $query2Result = mysqli_query($con, $query2);

        if($queryRestul && $query2Result){
                echo json_encode([
                'success' => true,
            ]);
        }
        else{
                echo json_encode([
                'success' => false,
            ]);
        }
    }

}
?>