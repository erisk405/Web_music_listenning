<?php 
include("../web/connection.php");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // ตรวจสอบว่ามีข้อมูลที่ส่งมาหรือไม่
    if (!isset($_FILES['file-img-playlist']) && !isset($_POST['name-detail'])) {
        echo "ไม่มีข้อมูลที่ส่งมา";
    } else {
        if(isset($_FILES['file-img-playlist'])) {
            $fileImgPlaylist = $_FILES['file-img-playlist'];
            $playlist_id = $_POST['playlistID'];
            // ตรวจสอบและดำเนินการอัปโหลดไฟล์และบันทึกข้อมูลลงในฐานข้อมูลตามที่คุณต้องการ
            // และคืนค่าหลังจากทำเสร็จ
            $file_name = basename($fileImgPlaylist["name"]);
            echo $file_name;
            echo $playlist_id;
            $sql_oldImg = mysqli_query($conn, "SELECT playlist_image FROM playlists WHERE playlist_id= $playlist_id;");
            $row = mysqli_fetch_assoc($sql_oldImg);
            $oldFileName = $row['playlist_image'];
            
            $dir = "../img_playlist/";
            if(!file_exists($dir.$file_name)){
                if(file_exists($dir.$oldFileName)){
                    unlink($dir.$oldFileName);
                    echo "ลบไฟล์ $dir.$oldFileName เรียบร้อยแล้ว";
                }
                if(move_uploaded_file($fileImgPlaylist["tmp_name"],$dir.$file_name)){
                    echo "The file ".$file_name."hasbeen uploaded";
                }
            }else{
                if(file_exists($dir.$oldFileName)){
                    unlink($dir.$oldFileName);
                    echo "ลบไฟล์ $dir.$oldFileName เรียบร้อยแล้ว";
                }
                $New_FileName = time().$file_name;
                $file_name = $New_FileName;
                if(move_uploaded_file($fileImgPlaylist["tmp_name"],$dir.$file_name)){
                    echo "The file ".$file_name."hasbeen uploaded";
                }
            }
    
            $sql = "UPDATE playlists SET playlist_image = '$file_name'  WHERE  playlist_id= $playlist_id ";
            if ($conn->query($sql) === TRUE) {
                http_response_code(200); // ส่ง response code 200 (OK)
            } else {
                http_response_code(500); // ส่ง response code 500 (Internal Server Error)
            }
        } else {
            echo "ไม่มีข้อมูลรูปภาพที่ส่งมา";
        }

        if (isset($_POST['name-detail'])){
            $nameDetail = $_POST['name-detail'];
            $playlist_id = $_POST['playlistID'];
            echo $nameDetail;
            $sql = "UPDATE playlists SET playlist_name = '$nameDetail' WHERE  playlist_id= $playlist_id ";
            if ($conn->query($sql) === TRUE) {
                http_response_code(200); // ส่ง response code 200 (OK)
            } else {
                http_response_code(500); // ส่ง response code 500 (Internal Server Error)
            }
        }else {
            echo "ไม่มีข้อมูลชื่อที่ส่งมา";
        }
    }
}
?>