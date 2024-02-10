<?php
    include("./web/connection.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register page</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
</head>
<body> 
    <div id="page" class="site">
        <div class="container">
            <div class="Regis">
                <div class="hero-regis">
                    <img src="asset/music_back.jpg" alt="">
                    <h1>Sign Up to <br>Open The Eris Music</h1>
                    <p>If you have an account,<br> you can <a href="index.php">Login here</a></p>
                </div>
                <div class="main">
                    <h1>Register</h1>
                    <p>Email</p>
                    <form action="signup.php" method="POST">
                        <p>
                            <input type="email" placeholder="Your email address" name="email">
                        </p>
                        <p class="Username">
                            Username
                            <input type="text" placeholder="This Uname will appear on your profile" name="user">
                        </p>
                        <p class="password">
                            Password
                            <input type="password" placeholder="Password" name="pass">
                        </p>
                        <p class="password">
                            Confirm-Password
                            <input type="password" placeholder="Confirm-Password" name="cpass">
                            <a href="#">Recovery password</a>
                        </p>
                        <p>
                            <input type="submit" class="submit" value="Sign In" name="submit">
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