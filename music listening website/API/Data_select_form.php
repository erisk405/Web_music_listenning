<?php 
include("../web/connection.php");

$sql = "SELECT * FROM playlists
        WHERE playlists.category_id != 40 AND playlists.category_id != 45"; // ต้องไม่ใช่ Private playlisy และ Playlist Artist
$result = $conn -> query($sql);
if($result -> num_rows > 0){
    $data = array();
    while($row = $result -> fetch_assoc()){
        $data[] = $row;
    }
    echo json_encode($data);
}else {
    echo "0 results";
}

$conn->close();
?>
