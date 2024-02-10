<?php
include("../web/connection.php");

$data = json_decode(file_get_contents("php://input"));

$user_id = $data->user_id;
$playlist_name = $data->playlist_name;
$playlist_image = $data->playlist_image;
$is_global = $data->is_global;
$artistId = $data->artistId;
$category = $data-> categoryID;

$sql = "INSERT INTO playlists (user_id, playlist_name, playlist_image,category_id) VALUES ('$user_id', '$playlist_name','$playlist_image' ,$category)";
$result = mysqli_query($conn, $sql);
if (!$result) {
    die("Error: " . mysqli_error($conn));
}

$lastInsertedId = mysqli_insert_id($conn); 


$sql_select_songs = "SELECT song_id FROM songs WHERE artist_id = $artistId";
$result_songs = mysqli_query($conn, $sql_select_songs);
if (!$result_songs) {
    die("Error: " . mysqli_error($conn));
}
while ($row = mysqli_fetch_assoc($result_songs)) {
    $song_id = $row['song_id'];
    $sql_add_to_playlist = "INSERT INTO playlist_song (playlist_id, song_id) VALUES ('$lastInsertedId', '$song_id')";
    $result_add_to_playlist = mysqli_query($conn, $sql_add_to_playlist);

    if (!$result_add_to_playlist) {
        die("Error: " . mysqli_error($conn));
    }
}
$conn->close();
?>
