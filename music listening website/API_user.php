<?php 
include("./web/connection.php");
$sql = ("SELECT users_id,username,email FROM users");
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
?>