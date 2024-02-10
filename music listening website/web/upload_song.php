<?php
include("../web/connection.php");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // ตรวจสอบว่าข้อมูลที่ต้องการแสดงมีอยู่จริงหรือไม่
    if(isset($_POST['songs-name']) && isset($_FILES['file-img-songs']) && isset($_FILES['file-song-name']) && isset($_POST['id_artist'])){
        $songNames = $_POST['songs-name'];
        $fileImgSongs = $_FILES['file-img-songs'];
        $fileNameSongs = $_FILES['file-song-name'];
        $artist = $_POST['id_artist'];
        echo "artist:".$artist;
        // Loop ตามจำนวนข้อมูลที่ส่งมาแต่ละตัวใน array
        $dir_banner = "../img_song/";
        $dir_music = "../music/";
        for ($i = 0; $i < count($songNames); $i++) {
            $songName = $songNames[$i];
            $FileImgName = $fileImgSongs['name'][$i];
            $FileImgSize = $fileImgSongs['size'][$i];
            $FileNamesong = $fileNameSongs['name'][$i];
            // ทำการใช้ $songName, $fileName, $fileSize ตามที่ต้องการ เช่นบันทึกลงฐานข้อมูล หรือประมวลผลเพิ่มเติม

            // เช่น แสดงข้อมูลออกมาเป็นตัวอย่าง
            echo "Song Name: " . $songName . "<br>";
            echo "FileImgName: " . $FileImgName . "<br>";
            echo "FileImgSize: " . $FileImgSize . "<br>";
            echo "FileNamesong: " . $FileNamesong . "<br>";

            if (!file_exists($dir_banner.$FileImgName)){
                if (move_uploaded_file($_FILES["file-img-songs"]["tmp_name"][$i], $dir_banner.$FileImgName)) {
                    echo "The file ". $FileImgName. " has been uploaded.";
                }
            }
            else{
                $New_FileName = time().$FileImgName;
                $FileImgName = $New_FileName;
                if (move_uploaded_file($_FILES["file-img-songs"]["tmp_name"][$i], $dir_banner.$FileImgName)) {
                    echo "The file ". $FileImgName . " has been uploaded.";
                }
            }
            // -----------------------------------------------------------------
            if (!file_exists($dir_music.$FileNamesong)){
                if (move_uploaded_file($_FILES["file-song-name"]["tmp_name"][$i], $dir_music.$FileNamesong)) {
                    echo "The file mp.3 ". $FileNamesong. " has been uploaded.";
                }
            }
            else{
                $New_FileName = time().$FileNamesong;
                $FileNamesong = $New_FileName;
                if (move_uploaded_file($_FILES["file-song-name"]["tmp_name"][$i], $dir_music.$FileNamesong)) {
                    echo "The file mp.3 ". $FileNamesong . " has been uploaded.";
                }
            }

            $sql = "INSERT INTO songs(artist_id,song_title,Songs_filename,Songs_imgfilename) VALUES('$artist','$songName','$FileNamesong','$FileImgName')";
            $sql = mysqli_query($conn,$sql);
            if($sql){
                echo "asdsad";
            }
            else{
                echo "error";
            }
        }
    } else {
        echo "ไม่มีข้อมูลที่ต้องการแสดง";
    }
}
?>
