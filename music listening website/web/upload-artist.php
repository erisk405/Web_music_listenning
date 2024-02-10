<?php 
include("../web/connection.php");

if(isset($_POST) and isset($_POST['artist-name'])){

    $artist_name = $_POST['artist-name'];

    echo '<pre>';
    print_r($_POST);
    print_r($_FILES);
    echo '</pre>';
    $file_name = basename($_FILES["file-img-artist"]["name"]);
    $dir = "../img/";
    if (!file_exists($dir.$file_name)){
        if (move_uploaded_file($_FILES["file-img-artist"]["tmp_name"], $dir.$file_name)) {
            echo "The file ". basename( $_FILES["file-img-artist"]["name"]). " has been uploaded.";
        }
        header("Location: Home.php");
    }else{
        $New_FileName = time().$file_name;
        $file_name = $New_FileName;
        if (move_uploaded_file($_FILES["file-img-artist"]["tmp_name"], $dir.$file_name)) {
            echo "The file ". basename( $_FILES["file-img-artist"]["name"]). " has been uploaded.";
        }
    }

    $sql = "INSERT INTO artists(artist_name,image_filename) VALUES('$artist_name','$file_name')";
    $sql = mysqli_query($conn,$sql);
}

if(isset($_POST) and isset($_POST['Edit-artist-name'])){
    echo '<pre>';
    print_r($_POST);
    print_r($_FILES);
    echo '</pre>';

    $dir = "../img/";
    $Edit_artist_name = $_POST['Edit-artist-name'];
    $artist_on_edit = $_POST['artist-id'];
    $file_name = basename($_FILES["Edit-file-img-artist"]["name"]);

    $Old_file_name = $_POST['old-name-img'];
    $old_file_path = $dir.$Old_file_name;


    if(!empty($file_name)){
        if (file_exists($old_file_path)) {
            unlink($old_file_path);
            echo "ลบไฟล์ $Old_file_name เรียบร้อยแล้ว";
    
            if (!file_exists($dir.$file_name)){
                if (move_uploaded_file($_FILES["Edit-file-img-artist"]["tmp_name"], $dir.$file_name)) {
                    echo "The file ". basename( $_FILES["Edit-file-img-artist"]["name"]). " has been uploaded.";
                }
                header("Location: Home.php");
            }
            else{
                $New_FileName = time().$file_name;
                $file_name = $New_FileName;
                if (move_uploaded_file($_FILES["Edit-file-img-artist"]["tmp_name"], $dir.$file_name)) {
                    echo "The file ". basename( $_FILES["Edit-file-img-artist"]["name"]). " has been uploaded.";
                }
            }
            $sql = "UPDATE artists SET artist_name = '$Edit_artist_name', image_filename = '$file_name' WHERE artist_id = $artist_on_edit";
            $result = $conn -> query($sql);
            
            if ($result) {
                header("Location: Home.php");
                exit();
                
            } else {
                echo "มีข้อผิดพลาดเกิดขึ้นในการแก้ไขข้อมูล";
            }

        } else {
            echo "ไม่พบไฟล์ $Old_file_name ในโฟลเดอร์";
        }
    
    }
    else{
        echo "ไม่มีไฟล์รูปเข้ามา";

        $sql = "UPDATE artists SET artist_name = '$Edit_artist_name' WHERE artist_id = $artist_on_edit";
        $result = $conn -> query($sql);
            
        if ($result) {
            header("Location: Home.php");
            exit();
        } else {
            echo "มีข้อผิดพลาดเกิดขึ้นในการแก้ไขข้อมูล";
        }
    }
    

}

?>