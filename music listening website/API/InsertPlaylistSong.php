<?php
include("../web/connection.php");
$data = json_decode(file_get_contents("php://input"));
$playlist_id = $data->playlist_id;
$song_id = $data->song_id;

$sql_insert = "INSERT INTO playlist_song(playlist_id,song_id) VALUE('$playlist_id','$song_id')";
if ($conn->query($sql_insert) === TRUE) {
    http_response_code(200); // ส่ง response code 200 (OK)
} else {
    http_response_code(500); // ส่ง response code 500 (Internal Server Error)
}
$conn->close();
?>