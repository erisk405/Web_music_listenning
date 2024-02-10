<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login page</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
</head>
<body> 
    <div id="page" class="site">
        <div class="container">
            <div class="login">
                <div class="hero">
                    <img src="asset/music_back3.jpg" alt="">
                    <h1>Sign In to <br>Open The Eris Music</h1>
                    <p>If you don't have an account,<br> you can <a href="Regiter.php">Register here</a></p>
                </div>
                <div class="main">
                    <h1>Login</h1>
                    <p>Username</p>
                    <form action="index.php" method="POST">
                        <p>
                            <input type="username" placeholder="Your Username" name="user">
                        </p>
                        <p class="password">
                            Password
                            <input type="password" placeholder="Password" name="pass">
                            <a href="#">Recovery password</a>
                        </p>
                        <p>
                            <input type="submit" class="submit" value="Sign In">
                        </p>
                    </form>
                    <div class="option">
                        <div class="separator">
                            <p>or continue with</p>
                        </div>
                        <ul>
                            <li><a href="#"><i class="ri-google-fill ri-2x"></i></a></li>
                            <li><a href="#"><i class="ri-apple-fill ri-2x"></i></a></li>
                            <li><a href="#"><i class="ri-facebook-fill ri-2x"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

<?php
include("./web/connection.php");

if (isset($_POST) && !empty($_POST)){
    $username = $_POST['user'];
    $password = $_POST['pass'];

    $sql = "SELECT * FROM Users WHERE username = '$username'";
    $result = mysqli_query($conn, $sql);

    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $hashed_password = $row['password'];

        if (password_verify($password, $hashed_password)) {
            header("Location: ./web/Home.php");
            exit(); // Ensure script stops execution after redirection
        } else {
            echo "Incorrect username or password";
        }
    } else {
        echo "User does not exist";
    }
}
?>
