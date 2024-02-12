<?php
include("../web/connection.php");
if($_SERVER['REQUEST_METHOD'] == "POST" AND isset($_POST["UserID"])){
    $user_id = $_POST["UserID"];
    
    $sql = "SELECT * FROM playlists WHERE user_id = $user_id AND category_id != 40";
    $result = $conn->query($sql); 
    if($result -> num_rows > 0){
        $data = array();
        while($row = $result->fetch_assoc()){
            $data[] = $row;
        }
        echo json_encode($data);
    }else{
        $data = array();
        echo json_encode($data);
    }
    $conn->close();
}

?>