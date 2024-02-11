<?php
include("../web/connection.php");
if($_SERVER['REQUEST_METHOD'] == "POST"  && isset($_POST["category_id"])) { 
    $category_id = $_POST["category_id"];

    $sql = "DELETE category FROM category WHERE category.category_id='$category_id'";
    if ($conn->query($sql) === TRUE) {
        http_response_code(200); // ส่ง response code 200 (OK)
    } else {
        http_response_code(500); // ส่ง response code 500 (Internal Server Error)
    }
    
    $conn->close();
}

?>