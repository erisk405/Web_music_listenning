<?php
include("../web/connection.php");
if($_SERVER['REQUEST_METHOD'] == "POST"  && isset($_POST["category_id"]) && isset($_POST["category_name"])) { 
    $category_id = $_POST["category_id"];
    $category_name = $_POST["category_name"];
    echo $category_id;
    echo $category_name;
    $sql = "UPDATE category SET category.category_name = '$category_name' WHERE category.category_id = $category_id";
    if ($conn->query($sql) === TRUE) {
        http_response_code(200); // ส่ง response code 200 (OK)
    } else {
        http_response_code(500); // ส่ง response code 500 (Internal Server Error)
    }
    
    $conn->close();
}


?>