<?php
    include("../web/connection.php");
    function uploadFile($fileInputName, $destinationDir){
        $file_name = basename($_FILES[$fileInputName]["name"]);
        $dir = $destinationDir;
        
        if (!file_exists($dir.$file_name)){
            if (move_uploaded_file($_FILES[$fileInputName]["tmp_name"], $dir.$file_name)) {
                echo "The file ". $file_name. " has been uploaded.";
                return $file_name;
            }
        } else {
            $New_FileName = time().$file_name;
            $file_name = $New_FileName;
            if (move_uploaded_file($_FILES[$fileInputName]["tmp_name"], $dir.$file_name)) {
                echo "The file ". $file_name. " has been uploaded.";
                return $file_name;
            }
        }
        return null;
    }
        
    function updateNameSong($conn, $Edit_song_name, $song_on_edit){
        $sql = "UPDATE songs SET song_title = '$Edit_song_name' WHERE song_id = $song_on_edit";
        $result = $conn -> query($sql);
        if ($result) {
            header("Location: Home.php");
        } else {
            echo "มีข้อผิดพลาดเกิดขึ้นในการแก้ไขข้อมูล";
        }
    }
    function updateImgsong($conn, $file_img_name, $song_on_edit){
        $sql = "UPDATE songs SET Songs_imgfilename = '$file_img_name' WHERE song_id = $song_on_edit";
        $result = $conn -> query($sql);
        if ($result) {
            header("Location: Home.php");
        } else {
            echo "มีข้อผิดพลาดเกิดขึ้นในการแก้ไขข้อมูล";
        }
    }
    function updateFilesong($conn, $file_song, $song_on_edit){
        $sql = "UPDATE songs SET Songs_filename = '$file_song' WHERE song_id = $song_on_edit";
        $result = $conn -> query($sql);
        if ($result) {
            header("Location: Home.php");
        } else {
            echo "มีข้อผิดพลาดเกิดขึ้นในการแก้ไขข้อมูล";
        }
    }

    
    if(isset($_POST) && isset($_POST['Edit-songs-name'])){
        echo '<pre>';
        print_r($_POST);
        print_r($_FILES);
        echo '</pre>';
        $dir_banner = "../img_song/";
        $dir_music = "../music/";

        $Edit_song_name = $_POST['Edit-songs-name'];
        $song_on_edit = $_POST['song-id'];
        $file_img_name = basename($_FILES["Edit-file-img-songs"]["name"]);
        $file_song = basename($_FILES["Edit-file-song-name"]["name"]);

        
        $Old_img_name = $_POST['old-img-song'];
        $old_img_name_path = $dir_banner.$Old_img_name;

        $old_file_song = $_POST['old_file_song'];
        $old_file_song_path = $dir_music.$old_file_song;

        if(!empty($file_img_name)){
            if (file_exists($old_img_name_path)) {
                unlink($old_img_name_path);
                echo "ลบไฟล์ $old_img_name_path เรียบร้อยแล้ว";

                $file_img_name = uploadFile("Edit-file-img-songs" , $dir_banner);
                updateImgsong($conn, $file_img_name, $song_on_edit);
            }else{
                echo "ไม่พบไฟล์รูป $Old_img_name ในโฟลเดอร์";
            }
        }else{
            echo "ไม่มีไฟล์เข้ามา";
        }
        if(!empty($file_song)){
            if(file_exists($old_file_song_path)){
                unlink($old_file_song_path);
                echo "ลบไฟล์ $old_file_song_path เรียบร้อยแล้ว";

                $file_song = uploadFile("Edit-file-song-name" , $dir_music);
                updateFilesong($conn, $file_song, $song_on_edit);
            }else{
                echo "ไม่พบไฟล์รูป $Old_img_name ในโฟลเดอร์";
            }
        }else{
            echo "ไม่มีไฟล์เพลงเข้ามา";
        }
        updateNameSong($conn, $Edit_song_name, $song_on_edit);
    }
?>