<?php
include("../web/connection.php");
// join ตาราง เพื่อหาว่าศิลปินคนไหนอยู่ใน playlist Id ไหน
$sql = 'SELECT playlists.playlist_id,
            playlists.playlist_name,
            playlists.playlist_image,
            LISTSONG.artist_id
        FROM playlists,(
        SELECT playlist_song.playlist_id , songs.artist_id
        FROM playlist_song 
        INNER JOIN songs 
        ON playlist_song.song_id = songs.song_id
        GROUP BY playlist_song.playlist_id, songs.artist_id) AS LISTSONG
        WHERE playlists.playlist_id = LISTSONG.playlist_id AND  playlists.category_id = 40 '; 
        
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    $data = array();
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo "0 results";
}

$conn->close();
?>
