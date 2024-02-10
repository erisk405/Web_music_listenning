<?php
include("../web/connection.php");

$data = json_decode(file_get_contents("php://input"));

$user_id = $data->user_id;
$playlist_name = $data->playlist_name;
$category_id = $data->category_id;

$sql = "INSERT INTO playlists (user_id, playlist_name , category_id) VALUES ('$user_id', '$playlist_name' ,'$category_id')";
if ($conn->query($sql) === TRUE) {
    http_response_code(200); // ส่ง response code 200 (OK)
} else {
    http_response_code(500); // ส่ง response code 500 (Internal Server Error)
}

$conn->close();
?>
