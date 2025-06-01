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



    $qid = $data['qid'];
    $orderBy = $data['order'];
    $query = "SELECT * FROM scores WHERE quiz_id = '$qid' ORDER BY $orderBy DESC";
    $result = mysqli_query($con, $query);

    

    if($result){
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);

            echo json_encode([
            'success' => true,
            'data' => $data,
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