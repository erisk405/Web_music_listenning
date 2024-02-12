<?php 
include("../web/connection.php");
if($_SERVER["REQUEST_METHOD"] == "POST" and isset($_POST['playlist_id'])){
    $playlist_id = $_POST['playlist_id'];

    
    $dir = "../img_playlist/";
    $sql_oldImg = mysqli_query($conn, "SELECT playlist_image FROM playlists WHERE playlist_id= $playlist_id;");
    $row = mysqli_fetch_assoc($sql_oldImg);
    $oldFileIMGName = $row['playlist_image'];

    if(file_exists($dir.$oldFileIMGName)){
        unlink($dir.$oldFileIMGName);
        echo "ลบไฟล์ $dir.$oldFileIMGName เรียบร้อยแล้ว";
    }else{
        echo "ไม่พบไฟล์";
    }

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