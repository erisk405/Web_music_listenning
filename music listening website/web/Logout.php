<?php 
include("../web/connection.php");
session_start();

session_destroy();
header("Location: ../index.php");
?>