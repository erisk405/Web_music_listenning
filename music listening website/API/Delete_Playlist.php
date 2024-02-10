<?php 
include("../web/connection.php");
if($_SERVER["REQUEST_METHOD"] == "POST" and isset($_POST['playlist_id'])){
    $playlist_id = $_POST['playlist_id'];

    $sql = "DELETE FROM playlists
            WHERE playlists.playlist_id = $playlist_id";
    $result_delete = $conn->query($sql);
    
    if ($result_delete) {
        echo "Deleted playlist successfully.";
    } else {
        echo "Not successfully";
    }
}
?>