<?php 
    include("../web/connection.php");

    function DeleteFile($destinationDir,$fileInputName) {
        $filePath = $destinationDir . $fileInputName;
        if (file_exists($filePath)) {
            unlink($filePath);
            echo "ลบไฟล์ $filePath เรียบร้อยแล้ว";
        } else {
            echo "ไม่พบไฟล์รูป $filePath ในโฟลเดอร์";
        }
    }

    if (isset($_POST['Delete-id-select'])) {
        $songsID = $_POST['Delete-id-select'];
        $songsIMG = $_POST['Delete-img-select'];
        $songsMUSIC = $_POST['Delete-music-select'];
        $dir_banner = "../img_song/";
        $dir_music = "../music/";

        foreach ($songsID as $index => $songID) {
            $songIDArray = explode(',', $songID); // Splitting received IDs
            foreach ($songIDArray as $idToDelete) {
                // Using prepared statement to avoid SQL injection
                $stmt = $conn->prepare("DELETE FROM songs WHERE song_id = ?");
                $stmt->bind_param("s", $idToDelete);
                if ($stmt->execute()) {
                    echo "ลบเพลง ID $idToDelete เรียบร้อยแล้ว";
                } else {
                    echo "เกิดข้อผิดพลาดในการลบ: " . $conn->error;
                }
            }
        }

        foreach ($songsIMG as $index => $songIMG) {
            $songsIMGArray = explode(',', $songIMG);
            foreach ($songsIMGArray as $imgToDelete) {
                DeleteFile($dir_banner, $imgToDelete);
            }
        }

        foreach ($songsMUSIC as $index => $songMUSIC) {
            $songsMUSICArray = explode(',', $songMUSIC); 
            foreach ($songsMUSICArray as $musicToDelete) {
                DeleteFile($dir_music, $musicToDelete);
            }
        }
        
        header("Location: Home.php");

    } else {
        echo "ไม่พบ Delete-id-select";
    }
?>
