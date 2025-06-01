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

    $type = $data['type'];
    $name = $data['name'] ?? "";
    $image_url = $data['img'] ?? "";
    $description = $data['description'] ?? "";


    if($type == 'new'){
        $query = "INSERT INTO category (category_name, instructor_username, description, img_url) VALUES ('$name', '$currentUser', '$description', '$image_url')";
        if(mysqli_query($con, $query)){
                echo json_encode([
                'success' => true,
                'message' => 'Category created successfully.'
            ]);
        }
        else{
                echo json_encode([
                'success' => false,
                'message' => 'Category not created',
            ]);
        }
    }
    else if($type == 'edit'){
        $id = $data["cid"];

        $query = "UPDATE category SET category_name = '$name', instructor_username = '$currentUser', description = '$description',  img_url = '$image_url'  WHERE category_id = '$id'";
            if(mysqli_query($con, $query)){
                    echo json_encode([
                    'success' => true,
                    'message' => 'Category updated successfully.'
                ]);
            }
            else{
                    echo json_encode([
                    'success' => false,
                    'message' => 'Category not updated',
                ]);
            }
    } 
    else if($type == 'delete'){
        $id = $data["cid"];

        $query = "DELETE FROM category WHERE category_id = '$id';";
            if(mysqli_query($con, $query)){
                    echo json_encode([
                    'success' => true,
                    'message' => 'Category deleted successfully.'
                ]);
            }
            else{
                    echo json_encode([
                    'success' => false,
                    'message' => 'Category not deleted',
                ]);
            }
    }



}

?>