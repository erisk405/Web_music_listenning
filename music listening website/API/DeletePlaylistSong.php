<?php 
include("../web/connection.php");
if ($_SERVER["REQUEST_METHOD"] == "POST" and  isset($_POST['playlist_id'])) {
    $playlist_id = $_POST['playlist_id'];
    $song_id = $_POST['song_id'];

    $sql = "DELETE FROM playlist_song 
            WHERE playlist_song.playlist_id = $playlist_id and playlist_song.song_id = $song_id";
    $result_delete = $conn->query($sql);
    
    if ($result_delete) {
        echo "Deleted song from the playlist successfully.";
    } else {
        echo "Not successfully";
    }
}
?>