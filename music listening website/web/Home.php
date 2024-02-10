<?php
include("./connection.php");
// ดึงข้อมูลส่วนของ ตาราง artist
$sql = "SELECT * FROM artists";
$result = $conn->query($sql);
// ดึงข้อมูลส่วนของ ตาราง artist
$sql2 = "SELECT songs.*, Artists.artist_name
        FROM Songs
        JOIN Artists ON Songs.artist_id = Artists.artist_id;";
$result_song = $conn->query($sql2);

$artist = array();
while ($row = $result -> fetch_assoc()) {
    $artist[] = array(
        'artist_id' => $row['artist_id'],
        'artist_name' => $row['artist_name'],
        'img_file' => $row['image_filename'],
        'Artist_date' => $row['Artist_date']
    );
}

$songs = array();
while($row = $result_song -> fetch_assoc()){
    $songs[] = array(
        'song_id' => $row['song_id'],
        'artist_id' => $row['artist_id'],
        'artist' => $row['artist_name'],
        'song_likes' => $row['song_likes'],
        'name' => $row['song_title'],
        'src' => $row['Songs_filename'],
        'img' => $row['Songs_imgfilename'],
        'DateAdded' => $row['date_added']
    );
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spotifie-web-player</title>
    <link rel="stylesheet" href="./style-web.css">
    <link rel="apple-touch-icon" sizes="180x180" href="../favicon_io/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="../favicon_io/favicon-32x32.png">
    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
    <link rel="stylesheet" href=" https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

    <!-- นำเข้าไฟล์ CSS ของ simplebar -->
    <link rel="stylesheet" href="https://unpkg.com/simplebar@latest/dist/simplebar.min.css">
    <!-- นำเข้าไฟล์ JavaScript ของ simplebar -->
    <script src="https://unpkg.com/simplebar@latest/dist/simplebar.min.js"></script>

</head>
<body>
    <div class="site">
        <div class="site-left" id="leftPanel">
            <div class="container-left">
                <div class="header-left">
                    <div class="wrap">
                        <a href="#" id="home" class="home"><i class="ri-home-smile-line"></i>
                            <span>Home</span>
                        </a>
                    </div>
                    <div class="wrap">
                        <a href="#" id="Search" class="Search"><i class="ri-search-line"></i>
                            <span>Search</span>
                        </a>
                    </div>
                </div>
                <div class="Browse">
                    <div class="Your-Library">
                        <div class="wrapper">
                            <img src="../asset/library.png" alt="">
                            <h1>My Library</h1>
                        </div>
                        <div class="wrapper">
                            <a href="#"><i class="ri-add-line"></i></a>
                            <a href="#" id="resizeButton" class="ri-arrow-right-s-line"></a>
                        </div>
                    </div>
                    <div class="in-library">
                        <form action="" class="section-library" method="">
                            <button>
                                <span>Playlist</span>
                            </button>
                            <button>
                                <span>Albums</span>
                            </button>
                        </form>
                        <section class="container-library">
                            <form action="">
                                <div class="wrap-library">
                                    <a href="#" id="search-library"><i class="ri-search-line"></i></a>
                                    <input type="text" name="" id="search-item" placeholder="Search name">
                                </div>
                                <div class="filter">
                                    <a href="#" id=""><i class="ri-filter-3-line"></i></a>
                                </div>
                            </form>
                        </section>
                        <div class="wrap-all-list">
                            <div class="content">
                                <form class="box" method="" action="">
                                    <a href="#">
                                        <li class="listitem">
                                            <img src="../asset/box1.jpg" alt="">
                                            <div class="detail">
                                                <p>Free bird</p>
                                                <span>Playlist | krittaphat</span>
                                            </div>
                                        </li>
                                    </a>
                                    <a href="#">
                                        <li class="listitem">
                                            <img src="../asset/box2.jpg" alt="">
                                            <div class="detail">
                                                <p>Tree Dog</p>
                                                <span>Playlist | krittaphat</span>
                                            </div>
                                        </li>
                                    </a>
                                    <a href="#">
                                        <li class="listitem">
                                            <img src="../asset/box3.jpg" alt="">
                                            <div class="detail">
                                                <p>The toy</p>
                                                <span>Playlist | krittaphat</span>
                                            </div>
                                        </li>
                                    </a>
                                    <a href="#">
                                        <li class="listitem">
                                            <img src="../asset/box4.jpg" alt="">
                                            <div class="detail">
                                                <p>Lugagu</p>
                                                <span>Playlist | krittaphat</span>
                                            </div>
                                        </li>
                                    </a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="site-right custom-scrollbar">
            <!-- ทำมาใช้สี background ของ site-right-wrapper เฉยๆนะ555  -->
            <div class="site-right-wrapper">  
                <div class="for-over-background"></div>
                <div class="container-top">
                    <!-- backgroudmagic -->
                    <div class="wrap-container">
                        <div class="header-left_site-right">
                            <div class="wrap">
                                <div class="search">
                                    <a href="#"><i class="ri-arrow-left-s-line"></i></a>
                                    <a href="#"><i class="ri-arrow-right-s-line"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="header-right_site-right">
                            <div class="wrap">
                                <div class="add-new-tab" trigger-button data-target="add-catagory-popup">
                                    <a href="#"><i class="ri-add-fill"></i>Add Tap</a>
                                </div>
                                <div class="upload" id="upload">
                                    <i class="ri-add-circle-line"></i>
                                    <a href="#">upload</a>
                                </div>
                                <div class="logout">
                                    <button>logout</button>
                                </div>
                                <div class="user">
                                    <a href="#"><i class="ri-user-line"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-button">
                    <div class="main_site-right active">
                        <div class="wrapper">
                            <div class="item-box">
                                <div class="content User">
                                    <h1>Good afternoon</h1>
                                    <div class="all-in-list">
                                        <div class="box">
                                            <div class="playlist_your_made">
                                                <a href="#">
                                                    <img src="../asset/banner1.jpg" alt="">
                                                    <span>liked songs</span>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="box">
                                            <div class="playlist_your_made">
                                                <a href="#">
                                                    <img src="../asset/banner2.jpg" alt="">
                                                    <span>Daily Mix 2</span>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="box">
                                            <div class="playlist_your_made">
                                                <a href="#">
                                                    <img src="../asset/banner3.jpg" alt="">
                                                    <span>daily mix 3</span>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="box">
                                            <div class="playlist_your_made">
                                                <a href="#">
                                                    <img src="../asset/banner4.png" alt="">
                                                    <span>this is YOASOBO</span>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="box">
                                            <div class="playlist_your_made">
                                                <a href="#">
                                                    <img src="../asset/banner5.jpg" alt="">
                                                    <span>taylor swift raaop</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="content artist">
                                    <div class="content-header">
                                        <h2>All-artist</h2>
                                        <a href="#" trigger-button data-target="Select-artist-popup"><i class="ri-music-2-line"></i>Add music artist</a>
                                    </div>
                                    <div class="carousel">
                                        <div class="inner-wrapper">
                                            <div class="dotgrid carouselbox swiper">
                                                <div class="wrapper swiper-wrapper">
                                                    <div class="carousel-item swiper-slide">
                                                        <a href="#1" class="product-permalink"></a>
                                                        <div class="dot-image artist">
                                                            <div class="thumbnail-artist">
                                                                <img src="../asset/music-icon.jpg" alt="">
                                                            </div>
                                                            <div class="actions">
                                                                <ul>
                                                                    <li><a href=""><i class="ri-play-fill"></i></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div class="dot-info">
                                                            <h3 class="dot-title"><a href="">The toy</a></h3>
                                                            <div class="dot-detail">
                                                                <span class="before">The toy,atom channakan</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="nav">
                                                    <div class="swiper-button-next">
                                                        <i class="ri-arrow-right-line"></i>
                                                    </div>
                                                    <div class="swiper-button-prev">
                                                        <i class="ri-arrow-left-line"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="insite_the_playlist">
                        <div class="playlist-header">
                            <div class="wrapper-playlist">
                                <div class="playlist-image">
                                    <img src="../img/nontanon.jpg" alt="">
                                </div>
                                <div class="playlist-title">
                                    <p>playlist</p>
                                    <h1 class="artist">nont  tanont</h1>
                                    <p class="associate-artist">The toy , Musketeers ,follow and more</p>
                                    <div class="detail">
                                        <i class="ri-music-fill"></i>Spotify
                                        <span>•</span>
                                        <p class="amout-of-song">50song,</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="playlist-nav">
                        </div>
                        <div class="nav-title">
                            <div class="title">
                                <p>#</p>
                                <span>title</span>
                            </div>
                            <div class="Date-add">  
                                <span>Date-add</span>
                            </div>
                            <div class="duration-time">
                                <i class="ri-time-line"></i>
                                <span>manage</span>
                            </div>
                        </div>
                        <div class="all-music-list">
                            <div class="box-music-list">
                                <div class="title-of-song">
                                    <span class="index">1</span>
                                    <img src="../img/nontanon.jpg" alt="">
                                    <div class="name-song">
                                        <span>พูดไม่ออก</span>
                                        <span class="artist">The toy</span>
                                    </div>
                                </div>
                                <div class="duration-of-song">
                                    <span class="duration">6:14</span>
                                </div>
                            </div>
                        </div>
                        <div class="insert_song">
                            <div class="insert_song-header">
                                <div class="title-head">
                                    <h3>Let's find something for your playlist</h3>
                                </div>
                                <div class="group">
                                    <svg viewBox="0 0 24 24" aria-hidden="true" class="icon">
                                        <g>
                                        <path
                                            d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                                        ></path>
                                        </g>
                                    </svg>
                                    <input class="input" type="search" placeholder="Search" />
                                </div>
                            </div>
                            <div class="insert_song-main">
                                <div class="wrapper">
                                    <div class="img_insert_song">
                                        <img src="../asset/music-icon.jpg" alt="">
                                    </div>
                                    <div class="insert_song_title">
                                        <h2>TOY</h2>
                                        <p>THE TOY</p>
                                    </div>
                                </div>
                                <div class="content-add-song-btn">
                                    <a href="#" class="add-song-btn">Add</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="insite_search_page">
                        <div class="Browse-all">
                            <div class="Browse-all-header">
                                <h3>Browse all</h3>
                                <div class="Add-genre">
                                    <a href="#" trigger-button data-target="Setting-detail-popup"><i class="ri-add-line" ></i>Add genre</a>
                                </div>
                            </div>
                            <div class="grid-container">
                                <div class="box-genre">
                                    <div class="genre-title">Music</div>
                                    <div class="genre-img">
                                        <img src="../img/nontanon.jpg" alt="">
                                    </div>
                                </div>
                                <div class="box-genre">
                                    <div class="genre-title">Music</div>
                                    <div class="genre-img">
                                        <img src="../img/nontanon.jpg" alt="">
                                    </div>
                                </div>
                                <div class="box-genre">
                                    <div class="genre-title">Music</div>
                                    <div class="genre-img">
                                        <img src="../img/nontanon.jpg" alt="">
                                    </div>
                                </div>
                                <div class="box-genre">
                                    <div class="genre-title">Music</div>
                                    <div class="genre-img">
                                        <img src="../img/nontanon.jpg" alt="">
                                    </div>
                                </div>
                                <div class="box-genre">
                                    <div class="genre-title">Music</div>
                                    <div class="genre-img">
                                        <img src="../img/nontanon.jpg" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="insite_upload_page">
                        <div class="wrapper-upload">
                            <div class="all-artist">
                                <h1>All Artist</h1>                        
                            </div>
                            <div class="container-Search">
                                <input type="text" placeholder="Search" name="text" class="input">
                                <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fill-rule="evenodd"></path>
                                </svg>
                                <button class="Add-artist"  trigger-button data-target="Add-artist-popup" ><i class="ri-add-line"></i>Add artist</button>
                            </div>  
                        </div>
                        <div class="upload-container">
                            <div class="upload-title">
                                <div class="title">
                                    <p>#</p>
                                    <span>title</span>
                                </div>
                                <div class="Date-added">
                                    <span>Date added</span>
                                </div>
                                <div class="management">
                                    <i class="ri-chat-upload-line"></i>
                                    <i class="ri-edit-box-line"></i>
                                    <i class="ri-delete-bin-line"></i>
                                </div>
                            </div>

                        </div>
                        <div class="pagination-container">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="site-queue custom-scrollbar2" id="RightPanel">
            <div class="wrapper">
                <div class="heading-queue">
                    <label for="">Queue Of Music</label>
                    <a href="#" id="close"><i class="ri-close-line"></i></a>
                </div>
                <div class="queue-image">
                          <!-- updateImageQueue script 243 -->
                </div>
                <div class="title-info">
                    <div class="wrap">
                        <!-- updateImageQueue script 243 -->
                    </div>
                    <div class="wrap">
                        <label class="container-music">
                            <input type="checkbox">
                            <div class="checkmark">
                                <svg viewBox="0 0 256 256">
                                    <rect fill="none" height="256" width="256"></rect>
                                    <path d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z" stroke-width="20px" stroke="#FFF" fill="none"></path>
                                </svg>
                            </div>
                        </label>
                    </div>
                </div>
                <div class="queue-list ">
                    <div class="wrap">
                        <span>Next in queue</span>
                        <a href="#">Open queue</a>
                    </div>
                    <div class="wrap-queue-list">
                       <!-- in script  204  -->
                    </div>
                </div>
            </div>
        </div>
        <footer class="footer">
            <div class="music-box">
                <div class="wrap-music">
                    <div class="image-area">
                        <img src="" alt="">
                    </div>
                    <div class="detail">
                        <p class="name"></p>
                        <span class="artist"></span>
                    </div>
                    <label class="container-music">
                        <input type="checkbox">
                        <div class="checkmark">
                            <svg viewBox="0 0 256 256">
                                <rect fill="none" height="256" width="256"></rect>
                                <path d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z" stroke-width="20px" stroke="#FFF" fill="none"></path>
                            </svg>
                        </div>
                    </label>
                </div>
                <div class="wrap-music">
                    <div class="media-play">
                        <div class="top">
                            <a href="#" id="repeat"><i class="ri-repeat-2-line" title="Playlist looped"></i></a>
                            <a href="#" id="skip-left"><i class="ri-skip-left-fill"></i></a>
                            <a href="#" class="play-stop"><i class="ri-play-circle-fill"></i></a>
                            <a href="#" id="skip-right"><i class="ri-skip-right-fill"></i></a>
                            <a href="#" id="download-cloud"><i class="ri-download-cloud-line"></i></a>
                        </div>
                    </div>
                    <div class="progress-area">
                        <div class="progess-bar"></div>
                    </div>
                    <div class="timer">
                        <span class="current">0:00</span>
                        <span class="duration"></span>
                    </div>
                    <audio id="main-audio" src=""></audio>
                </div>
                <div class="wrap-music">
                    <div class="queue" id="open">
                        <a href="#" class="in-queue"><i class="ri-play-list-fill"></i></a>
                    </div>
                    <div class="volume">
                        <label class="slider-volume">
                            <input type="range" id="volumeControl" class="level" min="0" max="1" step="0.01" value=".5">
                            <a href="#" class="in-volume"><i class="ri-volume-up-fill"></i></a>
                        </label>
                    </div>
                </div>
            </div>
        </footer>
    </div>

    <div class="overlay" data-overlay></div>
    <div class="Add-artist-popup" id="Add-artist-popup">
        <h2>Add Artist</h2>
        <form action="upload-artist.php" method="POST" enctype="multipart/form-data">
            <label for="file-img-artist" class="custum-file-upload">
                <div class="icon">
                    <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path> </g></svg>
                </div>
                <div class="text">
                   <span>Click to upload image</span>
                </div>
                <input id="file-img-artist" type="file" accept="image/*" name="file-img-artist" required>
            </label>   
            <div class="seperate"></div>
            <input class="input-name-artist" type="text" placeholder="Name" name="artist-name" required>  
            <div class="wrapper">
                <button class="submit">Submit</button>
                <a href="#"class="cancel" close-button >Cancle</a>
            </div>           
        </form>
    </div>
    <div class="Add-song-popup" id="Add-song-popup">
        <div class="container-Add-song"> 
            <a href="#" class="close-btn"><i class="ri-close-line" close-button></i></a>
            <div class="Add-song-header" id="Add-song-header">
                <h1>Add Songs</h1>
                <p></p>
            </div>
            <div class="Add-song-main custom-scrollbar3">
                <form action="./upload_song.php" class="inp-group" enctype="multipart/form-data">
                    <div class="wrapper">
                        <div class="wrap-custum-file-upload" id="content-song-file-upload">
                            <label for="file-img-song-1" class="custum-file-upload" id="custum-file-song-upload-1">
                                <div class="icon">
                                    <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path> </g></svg>
                                </div>
                                   <input id="file-img-song-1" type="file" name="file-img-songs[]" required>
                            </label>
                            <div> 
                                <span>Name</span>
                                <input type="text" placeholder="Music name" name="songs-name[]" required>
                                <span>File mp3 </span>
                                <div class="mp3-only">
                                    <input type="file" class="song-file" id="for-file-song-name" name="file-song-name[]" required> 
                                    <label for="for-file-song-name" class="for-edit-file-input" >
                                        Select
                                    </label>
                                </div>
                            </div>
                            <div class="delete-content-song" id="delete-content-song-1">
                                <i class="ri-close-circle-fill"></i>
                            </div>  
                        </div>              
                    </div>
                </form>
            </div>
            <div class="Add-song-footer">
                <a href="#" class="add-song"><i class="ri-add-circle-line"></i></a>
                <div class="wrapper-submit">
                    <button type="submit">comfirm</button>
                </div>  
            </div>
        </div>
        <div class="backgourd-song-popup">
            <img src="../img/nontanon.jpg" alt="">
        </div>
    </div>
    <div class="Setting-detail-popup" id="Setting-detail-popup">
        <div class="container-detail-playlist"> 
            <a href="#" class="close-btn"  close-button><i class="ri-close-line"></i></a>
            <div class="Setting-detail-header">
                <h2>Edit details</h2>
            </div>
            <div class="Setting-detail-main">
                <form>
                    <div class="wrap-Setting-detail-main">
                        <label for="file-detail-playlist" class="custum-file-upload" id="custum-detail-playlist-upload">
                            <div class="icon">
                                <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path> </g></svg>
                            </div>
                            <input id="file-detail-playlist" type="file" accept="image/*" name="file-img-playlist">
                        </label>
                        <div class="wrap-Name-detail">
                                <div class="Name-detail">
                                <label for="In-Name-detail">Name</label>
                                <input type="text" id="In-Name-detail" placeholder="Name detail">
                            </div>
                            <div class="colorPicker">
                                <label for="colorPicker">Color</label>
                                <input type="color" id="colorPicker" name="colorPicker" value="#0F0F0F">
                            </div>
                        </div>
                    </div>
                    <div class="wrapper">
                        <button class="submit-detail">Save</button>
                    </div>  
                </form>
            </div>
            <div class="Setting-detail-footer">
                <p>By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.</p>
            </div>
        </div>
    </div>
    <div class="Edit-artist-popup" id="Edit-artist-popup">
        <h2 class="Edit-header">Edit Artist</h2>
        <form action="upload-artist.php" method="POST" enctype="multipart/form-data">
            <label for="Edit-file-img-artist" class="custum-file-upload" id="custum-edit-file-upload">
                <div class="icon">
                    <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path> </g></svg>
                </div>
                <div class="text">
                   <span>Click to upload image</span>
                </div>
                <input id="Edit-file-img-artist" type="file" accept="image/*" name="Edit-file-img-artist" >
                <img src="../img/nontanon.jpg" alt="">
            </label>   
            <div class="seperate"></div>
            <input class="old-name-img" type="text" hidden name="old-name-img">     
            <input class="artist-id-on-edit" hidden name="artist-id">
            <input class="input-name-artist" type="text" placeholder="Name" name="Edit-artist-name" required>  
            <div class="wrapper">
                <button class="submit">Submit</button>
                <a href="#"class="cancel" close-button >Cancle</a></button>
            </div>      
        </form>
    </div>
    <div class="Edit-song-popup" id="Edit-song-popup">
        <div class="container-Edit-song"> 
            <a href="#" class="close-btn"><i class="ri-close-line" close-button></i></a>
            <div class="Edit-song-header" id="Edit-song-header">
                <h2><span>Edit</span> | Songs</h2>
            </div>
            <div class="Edit-song-main">
                <form action="Edit_song.php" method="POST" class="Edit-inp-group" enctype="multipart/form-data">
                    <div class="wrapper">
                        <div class="wrap-custum-file-upload" id="content-song-file-upload">
                            <label for="Edit-file-img-song" class="custum-file-upload" id="custum-Edit-song-upload">
                                <div class="icon">
                                    <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path> </g></svg>
                                </div>
                                <input id="Edit-file-img-song" type="file" name="Edit-file-img-songs">
                                <img src="" alt="">
                            </label>
                            <div class="wrap-edit-mp3-only"> 
                                <span>Name</span>
                                <input class="inputEditNamesong" type="text"  placeholder="Music name" name="Edit-songs-name" required>
                                <input class="song-id-on-edit" hidden name="song-id">
                                <input class="old-img-song" type="text" hidden name="old-img-song">   
                                <input class="old_file_song" type="text" hidden name="old_file_song">   
                                <span>File mp.3</span>
                                <div class="edit-mp3-only">
                                    <input type="file" class="song-file" id="Edit-file-song-name" name="Edit-file-song-name"> 
                                    <label for="Edit-file-song-name" class="for-edit-file-input" >
                                        Select
                                    </label>
                                </div>
                            </div>
                        </div>              
                    </div>
                    <div class="wraper-button">
                        <button type="submit">Save</button>
                    </div>
                    <div class="context">
                    <p>By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.</p>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="Delete-artist-popup" id="Delete-artist-popup">
        <div class="header-delete">
            <h2>Delete <span>artist</span> ?</h2>
            <p>Please make sure If you delete this artist This will cause all songs by this artist to be deleted.</p>
        </div>
        <div class="Delete-confirm">
            <form action="delete_form.php" method="POST">
                <input class="Input-delete-artist-img" hidden name="Delete-artist-img">
                <input class="Delete-artist-input" hidden name="Delete-artist-input">
                <a href="#" class="cancel-confirm" close-button >Cancle</a>
                <button type="submit">Confirm</button>
            </form>
        </div>
    </div>
    <div class="Delete-song-popup" id="Delete-song-popup">
        <div class="header-delete">
            <h2>Delete song?</h2>
            <p>You insist on Delete <span>On List</span>, right?</p>
        </div>
        <div class="Delete-confirm">
            <form action="delete_form.php" method="POST" enctype="multipart/form-data">
                <input class="Delete-img-song-input" hidden name="Delete-img-song">
                <input class="Delete-src-song-input" hidden name="Delete-src-song">
                <input class="Delete-confirm-input" hidden name="Delete-confirm">
                <a href="#" class="cancel-confirm" close-button >Cancle</a>
                <button type="submit">Confirm</button>
            </form>
        </div>
    </div>
    <div class="Delete-select-popup" id="Delete-select-popup">
        <div class="header-delete">
            <h2>Delete song?</h2>
            <p>You insist on Delete <span>On List</span>, right?</p>
        </div>
        <div class="Delete-confirm">
            <form action="select_delete.php" method="POST" enctype="multipart/form-data">
                <input class="Delete-id-select" hidden name="Delete-id-select[]">
                <input class="Delete-img-select" hidden name="Delete-img-select[]">
                <input class="Delete-music-select" hidden name="Delete-music-select[]">
                <a href="#" class="cancel-confirm" close-button >Cancle</a>
                <button type="submit">Confirm</button>
            </form>
        </div>
    </div>
    
    <div class="add-catagory-popup" id="add-catagory-popup">
        <a href="#" class="close-btn"><i class="ri-close-line" close-button></i></a>
        <h2>Create Catagory</h2>
        <form action="">
            <label for="Name-catagory" class="wrapper">
                <span>Name catagory</span>
                <input type="text" id="Name-catagory" placeholder="Input your catagory">
            </label>
            <p>this is  for create catagory when you want to create playlist</p>
            <div class="catagory-btn">
                <button>Save</button>
            </div>
        </form>
    </div>

    <div class="Select-artist-popup custom-scrollbar4" id="Select-artist-popup">
        <div class="container-Select-artist">
            <a href="#" class="close-btn"><i class="ri-close-line" close-button></i></a>
            <div class="header-Select-artist-popup">
                <h3>Let's find something for your playlist</h3>
            </div>
        </div>
        <div class="group">
            <svg viewBox="0 0 24 24" aria-hidden="true" class="icon">
                <g>
                <path
                    d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                ></path>
                </g>
            </svg>
            <input class="input" type="search" placeholder="Search" />
        </div>
        <div class="artist-box-content">
            <div class="title-info">
                <div class="wrap">
                    <span>#</span>
                    <span>Name</span>   
                </div>
                <span>Add Artist to playlist</span>   
            </div>
            <div class="wrapper-box">

            </div>
        </div>
    </div>

    <div class="Delete-song-popup-onlist" id="Delete-song-popup-onlist">
        <div class="header-delete">
            <h2>Delete playlist?</h2>
            <p>You insist to Delete <span>On playList</span>, right?</p>
        </div>
        <div class="Delete-confirm">
            <form>
                <a href="#" class="cancel-confirm" close-button >Cancle</a>
                <button class="delete-song-playlist">Confirm</button>
            </form>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script>var allMusic = <?php echo json_encode($songs); ?>;</script>
    <script>var ArtistMusic = <?php echo json_encode($artist); ?>;</script>
    <script src="./active.js"></script>
    <script src="./script.js"></script>
    <script src="./playlist-music.js"></script>
</body>
</html>