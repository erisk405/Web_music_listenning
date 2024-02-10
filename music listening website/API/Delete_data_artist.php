<?php
include("../web/connection.php");
$data = json_decode(file_get_contents("php://input"));
$artistId = $data->artist_id;

$sql_delete = " DELETE playlists
                FROM playlists
                INNER JOIN (
                    SELECT DISTINCT playlists.playlist_id
                    FROM playlists
                    JOIN (
                        SELECT playlist_song.playlist_id, songs.artist_id
                        FROM playlist_song
                        INNER JOIN songs ON playlist_song.song_id = songs.song_id
                        GROUP BY playlist_song.playlist_id, songs.artist_id
                    ) AS LISTSONG ON playlists.playlist_id = LISTSONG.playlist_id
                    WHERE LISTSONG.artist_id = '$artistId'  AND playlists.category_id = 40 
                ) AS Subquery ON playlists.playlist_id = Subquery.playlist_id ;"; // เพิ่มคำสั่ง SQL สำหรับการลบข้อมูล และ 40 คือ category ของ artist เท่านั้น
$result_delete = $conn->query($sql_delete);
if(!$result_delete){
    echo "Record deleted fail"; // แสดงข้อความสำเร็จหากลบข้อมูลสำเร็จ
}

?>