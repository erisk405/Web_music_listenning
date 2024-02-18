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
                    <p class= "UserEmail">Email <span class="notice" id="notice_email"></span></p>
                    <form action="signup.php" method="POST" id="registrationForm">
                        <p>
                            <input id="UserEmail" type="email" placeholder="Your email address" name="email">
                        </p>
                        <p class="Username">
                            <div class="header_info">Username <span class="notice" id="notice_Uname"></span></div>
                            
                            <input id="Username" type="text" placeholder="This Uname will appear on your profile" name="user">
                        </p>
                        <p class="password">
                            <div class="header_info">Password <span class="notice" id="notice_Password"></span></div>
                            <input id="password" type="password" placeholder="Password" name="pass">
                        </p>
                        <p class="password">
                            <div class="header_info">Confirm-Password <span class="notice" id="notice_CPassword"></span></div>
                            <input id ="Cpassword" type="password" placeholder="Confirm-Password" name="cpass">
                            <a href="#">Recovery password</a>
                        </p>
                        <p>
                            <input type="submit" id="SendData" class="submit" value="Sign In" name="submit">
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
    <script src="./Register.js"></script>
</body>
</html>