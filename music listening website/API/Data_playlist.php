<?php
include("../web/connection.php");

if (isset($_GET['category_id'])) {
    $category_id = $_GET['category_id'];

    $sql = "SELECT * FROM playlists  WHERE category_id = '$category_id' and category_id != 40"; 
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $data = array();
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
    } else {
        $data = array();
        echo json_encode($data);
    }
    $conn->close();
}
if (isset($_GET['playlist_id'])) {
    $playlist_id = $_GET['playlist_id'];
    $sql = "SELECT * FROM playlists WHERE playlist_id = $playlist_id"; 
    $result = $conn->query($sql);
    if ($result) {
        $data = array();
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
    } else {
        $data = array();
        echo json_encode($data);
    }
    $conn->close();
}

if (empty($_GET['category_id']) && empty($_GET['playlist_id'])) {
    $sql = "SELECT * FROM playlists WHERE category_id != 40";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $data = array();
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
    } else {
        echo "0 results";
    }
    $conn->close();
}

?>
