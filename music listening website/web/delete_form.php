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
    if(isset($_POST) && isset($_POST['Delete-artist-input'])){
        $artist_id_to_delete = $_POST['Delete-artist-input'];
        $File_img_name  = $_POST['Delete-artist-img'];
        $dir = "../img/";
        if(file_exists($dir.$File_img_name)){
            unlink($dir.$File_img_name);
            echo "ลบไฟล์ $dir.$File_img_name เรียบร้อยแล้ว";
        }
        else{
            echo "ไม่พบไฟล์รูปภาพของArtist";
        }
        $sql_songs = "SELECT Songs_filename,Songs_imgfilename FROM songs WHERE artist_id = $artist_id_to_delete";
        $result_songs = $conn->query($sql_songs);
        if ($result_songs->num_rows > 0) {
            while ($row = $result_songs->fetch_assoc()) {
                $song_file_to_delete = "../music/".$row['Songs_filename'];
                $song_img_to_delete = "../img_song/".$row['Songs_imgfilename'];
                if (file_exists($song_file_to_delete) && file_exists($song_img_to_delete)) {
                    unlink($song_file_to_delete);
                    unlink($song_img_to_delete);
                    echo "ลบไฟล์ $song_file_to_delete เรียบร้อยแล้ว";
                } else {
                    echo "ไม่พบไฟล์เพลง: $song_file_to_delete";
                }
            }
        }
        $sql_Artist = "DELETE FROM artists WHERE artist_id = $artist_id_to_delete";
        $sql_Songs = "DELETE FROM songs WHERE artist_id = $artist_id_to_delete";

        if ($conn -> query($sql_Artist) && $conn -> query($sql_Songs)){
            header("Location: Home.php");
        }else{
            echo "ลบไม่สำเร็จ";
        }
    }else{
        echo "ไม่พบ";
    }

?>