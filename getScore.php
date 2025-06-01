<?php
// process.php
// Get the raw JSON data from the request body
$json = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($json, true); // true for associative array

// Check if decoding was successful
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400); // Bad request
    die('Invalid JSON data');
}

// Access your data
$qid = $data["info"]["qid"];
$cid = $data["info"]["cid"];
$cname = $data["info"]["cname"];
$qname = $data["info"]["qname"];
$stdAnsweres = $data["answeres"];
// Process data (e.g., save to database)
include 'config.php';
$sql = "SELECT question_id, correct_option FROM questions WHERE quiz_id = '$qid'";
$result = mysqli_query($con, $sql);
$questoins = mysqli_fetch_all($result, MYSQLI_ASSOC);
$rightAnsweres = [];
foreach($questoins as $q){
    $rightAnsweres[$q["question_id"]] = $q["correct_option"];
}
$nbOfQuestions = count($stdAnsweres);
$i = 0; 
foreach($stdAnsweres as $q => $value){
    if($rightAnsweres[$q] == $value){
        $i++;
    }
}
$score = $i / $nbOfQuestions;
$score = $score * 100;
 $sql_insert = "INSERT INTO scores (quiz_id, score) VALUES ( '$qid', '$score')";

 $sql_avg = "SELECT AVG(score) as average_score FROM scores";

 mysqli_query($con, $sql_insert);

 $avg_result = mysqli_query($con, $sql_avg);

 $average = mysqli_fetch_all($avg_result, MYSQLI_ASSOC);

header('Content-Type: application/json');
echo json_encode([
    'status' => 'success',
    'cid' => $cid,
    'cname' => $cname,
    'qname' =>$qname,
    'qid' => $qid,
    "score" => number_format($score, 2),
    "average" => number_format($average[0]["average_score"], 2)

]);
?>