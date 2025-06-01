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



    $qid = $data;

    $questionsSql = "SELECT * FROM questions WHERE quiz_id = '$qid'";
    $quizSql = "SELECT * FROM quizzes WHERE quiz_id = '$qid'";
    $questionsResult = mysqli_query($con, $questionsSql);
    $quizResult = mysqli_query($con, $quizSql);
    
    $toalQuery = "SELECT COUNT(*) as total FROM scores WHERE quiz_id = '$qid'";
    $totalResult = mysqli_query($con, $toalQuery);
    $averageQuery = "SELECT AVG(score) as average FROM scores WHERE quiz_id = '$qid'";
    $averageResult = mysqli_query($con, $averageQuery);

    if($questionsResult && $quizResult && $averageResult && $totalResult){
        $questions = mysqli_fetch_all($questionsResult, MYSQLI_ASSOC);
        $quiz = mysqli_fetch_all($quizResult, MYSQLI_ASSOC);
        $total = mysqli_fetch_all($totalResult, MYSQLI_ASSOC);
        $average = mysqli_fetch_all($averageResult, MYSQLI_ASSOC);
            echo json_encode([
            'success' => true,
            'data' => [
                'questions' => $questions,
                'quiz' => $quiz,
                'average' =>  number_format($average[0]['average'], 2),
                'totalSubmition' => $total[0]['total']
                ]
        ]);
    }
    else{
            echo json_encode([
            'success' => false,
            'data' => []
        ]);
    }

}

?>