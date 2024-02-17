<?php 
    include("../web/connection.php");
    // ตรงนี้เป็นส่วนของการ Delete-songs
    if(isset($_POST) && isset($_POST['Delete-confirm'])){
        $song_id_to_delete = $_POST['Delete-confirm'];
        $song_img_to_delete = $_POST['Delete-img-song'];
        $Delete_music_file = $_POST['Delete-src-song'];
        $dir = "../img_song/";
        $dir_music = "../music/";

        if(file_exists($dir.$song_img_to_delete) && file_exists($dir_music.$Delete_music_file)){
            unlink($dir.$song_img_to_delete);
            unlink($dir_music.$Delete_music_file);
            echo "ลบไฟล์ $dir.$song_img_to_delete เรียบร้อยแล้ว";
            echo "ลบไฟล์ $dir_music.$Delete_music_file เรียบร้อยแล้ว";
        }
        else{
            echo "ไม่พบไฟล์รูปภาพของSongs";
        }


        $sql = "DELETE FROM songs WHERE song_id = $song_id_to_delete";
        if ($conn -> query($sql)){
            header("Location: Home.php");
        }else{
            echo "ลบไม่สำเร็จ";
        }
    } else{
        echo "ไม่พบ";
    }
    // ตรงนี้เป็นส่วนของการ Delete-artist
    try {
        if(isset($_POST) && isset($_POST['Delete-artist-input'])){
            $artist_id_to_delete = $_POST['Delete-artist-input'];
            $File_img_name  = $_POST['Delete-artist-img'];
            $dir = "../img/";
    
            $sql_Artist = "DELETE FROM artists WHERE artist_id = $artist_id_to_delete";
            $result = mysqli_query($conn, $sql_Artist);
            
            if ($result) {
                if(file_exists($dir.$File_img_name)){
                    unlink($dir.$File_img_name);
                    echo "ลบไฟล์ $dir.$File_img_name เรียบร้อยแล้ว";
                } else {
                    echo "ไม่พบไฟล์รูปภาพของ Artist";
                }
            } else {
                echo "ลบไม่สำเร็จ";
            }
        } else {
            echo "ไม่พบ";
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo 'Error: ' . $e->getMessage();
    }
    

?>