<?php
    include("./web/connection.php");
    if(isset($_POST['submit'])){
        $username = $_POST['user'];
        $email = $_POST['email'];
        $password = $_POST['pass'];
        $cpassword = $_POST['cpass'];

        $sql = "SELECT * FROM Users WHERE username='$username'";
        $result = mysqli_query($conn, $sql);
        $count_user = mysqli_num_rows($result);

        $sql = "SELECT * FROM Users WHERE username='$email'";
        $result = mysqli_query($conn, $sql);
        $count_email = mysqli_num_rows($result);


        if($count_user == 0 & $count_email==0){
            if($password == $cpassword){
                $hash = password_hash($password,PASSWORD_DEFAULT);
                $sql = "INSERT INTO Users (username , email , password) VALUES('$username' , '$email' , '$hash')";
                $result = mysqli_query($conn, $sql);
                if($result){
                    header("Location: index.php");
                }
            }
            else{
                echo   '<script>
                            window.location.href = "index.php";
                            alert("Passwords do not match!!!");
                        </script>';
            }
        }
        else{
            if($count_user>0){
                echo '<script>
                        window.location.href = "index.php";
                        alert("Username already exists!!!");
                    </script>';
            }
            if($count_user>0){
                echo '<script>
                        window.location.href = "index.php";
                        alert("Email already exists!!!");
                    </script>';
            }
        }
    }

?>