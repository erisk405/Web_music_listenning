<?php 
include("../web/connection.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true); 

    if ($data === null) {
        http_response_code(400);
        echo json_encode(array("error" => "Invalid JSON data"));
        exit;
    }

    $category_name = $data["Catagory_Name"];
    
    $sql = "INSERT INTO category(category_name) VALUES('$category_name')";
    if($conn -> query($sql) === TRUE){
        http_response_code(200); // ส่ง response code 200 (OK)
        echo json_encode(array("message" => "Category created successfully"));
    }else{
        http_response_code(500); // ส่ง response code 500 (Internal Server Error)
        echo json_encode(array("error" => "Error creating category"));
    }
$conn->close();
}
?>
