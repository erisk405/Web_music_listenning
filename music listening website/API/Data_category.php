<?php
include("../web/connection.php");
$sql = "SELECT * FROM category WHERE category.category_id != 40";  // 40 คือส่วนของ artist  ห้ามไปยุ่ง
$result = $conn->query($sql);
if($result->num_rows > 0){
    $data = array();
    while($row = $result->fetch_assoc()){
        $data[] = $row;
    }
    echo json_encode($data);
}else{
    echo "0 results";
}

?>