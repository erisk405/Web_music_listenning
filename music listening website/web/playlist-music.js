// go to Goto_page_list เหนื่อยฉิบหายก็ต้องมานั่งเม้นอีก เดี๋ยวตัวเองไม่รู้เรื่องแม้ง
// ส้วนนี้ทำใว้ก่อน เมื่อมีการคลิกที่  product-permalink ก็คือเมื่อคลิกplaylist นั่นแหละ แต่ยังไม่ได้จัดการทั้งหมเเพราะ
// product_permalink ต้องเป็น querySelectorAll เนื่องจากมีหลาย playlist

// เนื่องจากไม่อยากให้ไม่มีการโหลดหรือรีเฟรชหน้า webpage จึงต้องเขียนfunction ในการ fetch API มาจากDatabases
// การทำงาน addPlaylist() คือ จะเป็นการCreate playlist ขึ้นมาใหม่ จากนั้นก็จะนำข้อมูลไปเก็บใว้ที่ databases


function addPlaylist(category_id) {
  const displayData = document.getElementById(`wrapper-playlist${category_id}`),
    carousel_item_normal = displayData.querySelector(".wrapper.swiper-wrapper");
  // ส่ง request ไปยังเซิร์ฟเวอร์ด้วย fetch API และเนื่องจากผมไม่มี input เข้ามารับค่าผมจึงส่งเป็น Json ไปโดยใช้ JSON.stringify ในการแปลง
  fetch("../API/playlist_api.php", {
    method: "POST", // ใช้เมธอด POST เพื่อส่งข้อมูล
    headers: {    // ใช้Content-Type เพื่อบอกว่า ข้อมูลที่จะส่งไปนั้นเป็นแบบ JSON.
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ //ในส่วนจะส่งไปแค่นี้ เพื่อให้สร้างแค่ playlist เปล่าๆมา จากนั้นค่อยไปเพิ่มฟังชั่นในการแก้ไขทีหลัง
      user_id: UserID, // id admin
      category_id: `${category_id}`,
    }),
  })
    .then((response) => { //ส่วนนี้ จะว่า fetch ไปยัง API ในบรรทัดก่อนหน้า โดยการตรวจสอบว่า response.ok หรือ
      if (response.ok) {
        return fetch(`../API/Data_playlist.php?category_id=${category_id}`); //ถ้าหากไม่มีอะไรผิดพลาดให้นำข้อมูลจาก data_playlist.php  ที่สร้างใว้มาใช้ แลพ // Query Parameter ส่งค่า category_id เพื่อไปกรองเอาแค่ที่ตรงกันกับ ID
      } else {
        alert("There was a problem adding the playlist.");
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // เนื่องจากfetch มาจาก server มันจะเป็น response แบบ Stream เลยต้องแปลงเป็น  JSON format เพื่อจะนำไปใช้ใน Data
    })
    .then((data) => { // จากนั้นก็ลุยเลยครับ เข้าข้อมูลมาย่อยใส่เข้าไปใน HTML ของเราซะ ซึ่งตรงนี้เป็นส่วนของ card playlist
      carousel_item_normal.innerHTML = ""; //เพื่อนำไปแสดงผลได้เลยโดยไม่ต้องrefresh webpage 
      data.forEach((item) => {
        const playlistImage = item.playlist_image ? `../img_playlist/${item.playlist_image}` : '../img_playlist/music-icon.jpg';
        const dot_title = item.playlist_name ? item.playlist_name : `playlist` + `${item.playlist_id}`
        let carousel_playlist = `  <div class="carousel-item swiper-slide">
                                      <a href="#" class="product-permalink" playlist_id ="${item.playlist_id}"></a>
                                      <div class="dot-image">
                                        <div class="thumbnail">
                                          <img playlist_id="${item.playlist_id}" src="${playlistImage}" alt="">
                                        </div>
                                        <div class="actions" actions_Playlist_id = "${item.playlist_id}">
                                          <ul>
                                            <li><a href="#"><i class="ri-play-fill"></i></a></li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div class="dot-info">
                                        <h3 class="dot-title"><a href="#" playlist_id="${item.playlist_id}">${dot_title}</a></h3>
                                      <div class="dot-detail">
                                        <span class="before">This playlist create for</span>
                                      </div>
                                    </div>
                                  </div>`;
        carousel_item_normal.innerHTML += carousel_playlist;
      });
      fetchInitialDataCategory();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("There was a problem adding the playlist or fetching data.");
    });
}
function fetchInitialData(category_id) {  //ง่ายๆเลยคือ  addPlaylist() เก็บข้อมูลเข้าไป fetchInitialData() ใช้เพื่อแสดงผลตอนที่เราload webpage
  console.log(category_id)
  return new Promise((resolve, reject) => {
    const displayData = document.getElementById(`wrapper-playlist${category_id}`),
      carousel_item = displayData.querySelector(".wrapper.swiper-wrapper");
    fetch(`../API/Data_playlist.php?category_id=${category_id}`) // Query Parameter ส่งค่า category_id เพื่อไปกรองเอาแค่ที่ตรงกันกับ ID
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // แปลงข้อมูลที่ได้รับเป็น JSON
      })
      .then((data) => {
        if (data.length > 0) {
          // แสดงข้อมูลเริ่มต้นที่ได้จากฐานข้อมูล
          data.forEach((item) => {
            const playlistImage = item.playlist_image ? `../img_playlist/${item.playlist_image}` : '../img_playlist/music-icon.jpg';
            const dot_title = item.playlist_name ? item.playlist_name : `playlist` + `${item.playlist_id}`
            let carousel_playlist = `<div class="carousel-item swiper-slide">
                                      <a href="#" class="product-permalink" playlist_id ="${item.playlist_id}"></a>
                                      <div class="dot-image">
                                        <div class="thumbnail">
                                          <img src="${playlistImage}" playlist_id="${item.playlist_id}" alt="">
                                        </div>
                                        <div class="actions" actions_playlist_id = "${item.playlist_id}">
                                          <ul>
                                            <li><a href="#"><i class="ri-play-fill"></i></a></li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div class="dot-info">
                                        <h3 class="dot-title"><a href="#" playlist_id="${item.playlist_id}">${dot_title}</a></h3>
                                      <div class="dot-detail">
                                        <span class="before">This playlist create for</span>
                                      </div>
                                    </div>
                                  </div>`;
            carousel_item.insertAdjacentHTML("beforeend", carousel_playlist);
          });
          resolve();
        } else {
          resolve();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}
function createAndAddToPlaylist(artistId, index) { //เหมือน function addPlaylist() แต่ function สำหรับplaylist ที่เป็น Artist เท่านั้น
  const displayData = document.querySelector(".content.artist"),
    carousel_item_artist = displayData.querySelector(".wrapper.swiper-wrapper");
  fetch('../API/playlist_artist.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // กำหนด Content-Type เป็น JSON
    },
    body: JSON.stringify({ //ตรงส่วนนี้ผมจะนำ index มาเพื่อระบุด้วยเนื่องจากว่า ArtistMusic ถูกเก็บเป็น Array จากตารางของ Artist
      user_id: "1", // ia admin
      playlist_name: `${ArtistMusic[index].artist_name}`,
      playlist_image: `${ArtistMusic[index].img_file}`,
      artistId: artistId,
      categoryID: 40,// เป็น artist playlist
    }),
  })
    .then((response) => {
      if (response.ok) {
        return fetch("../API/Data_playlist_artist.php");
      } else {
        alert("There was a problem adding the playlist.");
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // แปลงข้อมูลที่ได้รับเป็น JSON
    })
    .then(data => {
      const lastIndex = data.length - 1;
      const lastItem = data[lastIndex];
      let carousel_artist = `<div class="carousel-item swiper-slide">
                                  <a href="#1" class="product-permalink artist"></a>
                                  <div class="dot-image artist">
                                      <div class="thumbnail-artist">
                                          <img src="../img/${ArtistMusic[index].img_file}" alt="">
                                      </div>
                                      <div class="actions" actions_Playlist_id = "${lastItem.playlist_id}">
                                          <ul>
                                              <li><a href=""><i class="ri-play-fill"></i></a></li>
                                          </ul>
                                      </div>
                                  </div>
                                  <div class="dot-info">
                                      <h3 class="dot-title"><a href="">${lastItem.playlist_name}</a></h3>
                                      <div class="dot-detail">
                                          <span class="before">The toy,atom channakan</span>
                                      </div>
                                  </div>
                              </div>`;
      carousel_item_artist.insertAdjacentHTML("beforeend", carousel_artist);
      fetchInitialDataArtist();
    })

    .catch((error) => {
      console.error("Error:", error);
      alert("There was a problem fetching initial data.");
    });
}
function DeleteOrAddPlaylistArtist(target) { //function นี้เป็นการส่งค่าของ artistId เพื่อไปลบ ข้อมูลใน artist ที่อยู่่ภายใน playlist มีใว้เพื่อให้สอดคล้องกับ function fetchInitialUseOrNot
  fetch("../API/Delete_data_artist.php", {
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      artist_id: target,
    }),
  })
    .then((response) => {
      if (response.ok) {
        fetchInitialDataArtist()
      } else {
        alert("There was a problem adding the playlist.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("There was a problem fetching data.");
    });
}
function fetchInitialDataArtist() { //เหมือนกับ fetchInitialData() นั่นแหละ แต่เป็นของ Playlist Artist 
  const displayData = document.querySelector(".content.artist"),
    carousel_item_artist = displayData.querySelector(".wrapper.swiper-wrapper");
  fetch("../API/Data_playlist_artist.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      carousel_item_artist.innerHTML = '';
      data.forEach((item) => {
        let carousel_artist = `<div class="carousel-item swiper-slide">
                                <a href="#1" class="product-permalink artist" playlist_id ="${item.playlist_id}" Artist_id ="${item.artist_id}"></a>
                                <div class="dot-image artist">
                                    <div class="thumbnail-artist">
                                        <img src="../img/${item.playlist_image}" alt="">
                                    </div>
                                    <div class="actions artist" actions_Playlist_id = "${item.playlist_id}">
                                        <ul>
                                            <li><a href="#"><i class="ri-play-fill"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="dot-info">
                                    <h3 class="dot-title"><a href="">${item.playlist_name}</a></h3>
                                    <div class="dot-detail">
                                        <span class="before">The toy,atom channakan</span>
                                    </div>
                                </div>
                            </div>`;
        carousel_item_artist.insertAdjacentHTML("beforeend", carousel_artist);
      });
      initSwiper();

      const product_permalink_artist = document.querySelectorAll(".product-permalink.artist");
      product_permalink_artist.forEach((content, index) => {
        content.addEventListener('click', () => {
          const insert_song = document.querySelector(".insert_song"); // ปิดส่วน search ที่ต้องการจะ add เพลงออก เพราะเป้น playlist artist
          insert_song.style.display = "none";
          fetch("../API/API_playlist_song.php")
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response from playlist_song was not ok")
              }
              return response.json();
            })
            .then((data_playlist_song) => {
              console.log(data_playlist_song)

              //ในส่วนนี้ไม่มีอะไร แค่เข้าถึง CSS ในการแก้ใขในเรื่อง permission ของ User ที่จะมองเห็น
              const nav_title_element = document.querySelector(".nav-title > .duration-time span");
              const nav_title_element2 = document.querySelector(".nav-title > .duration-time");
              const nav_title_element3 = document.querySelector(".nav-title > .Date-add");
              nav_title_element3.style.width = "140px"
              nav_title_element2.style.width = "30px";
              nav_title_element.style.display = "none";
              // ---------------------------------------------------------------------------
              const artist_id = content.getAttribute("Artist_id");
              const foundArtist = ArtistMusic.find(data => data.artist_id === artist_id)
              const playlist_id_local = content.getAttribute("playlist_id"); // เราจะเอาข้อมูล โดยที่จะใช้  playlist_id ระบุเป้าหมาย
              const SongOfPlaylist = data_playlist_song.filter(data_playlist => data_playlist.playlist_id === `${playlist_id_local}`) // จากนั้นก็กรองด้วย filter 


              // playlist_nav_var ไม่ต้อง งงว่ามาจากไหน ก้้อปมาจาก script.js line 662 ส่วนของ for_upload_content
              let playlist_nav_var = `<div class="Pnav-left">
                                <i class="ri-play-circle-fill" Pnav-index="${playlist_id_local}"></i>
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
                            <div class="Pnav-right">
                                <a href="#">list <i class="ri-list-check"></i></a>
                            </div>`
              playlist_nav.innerHTML = playlist_nav_var;



              // ------------------------------------------------------------------------------
              //  Btn_green ตรงนี้เผื่อใว้ เดี๋ยวค่อยมาทำ จะเป็นส้วนการทำงานเวลาที่กดปุ่มเล่นเพลง ในplaylist นี้
              // ------------------------------------------------------------------------------
              const Pnav_left = document.querySelector(".Pnav-left"),
                Btn_green = Pnav_left.querySelector("i");
              Btn_green.addEventListener('click', () => {
                const actions_playlist = document.querySelector(`.actions[actions_Playlist_id="${playlist_id_local}"]`); // ใช้ตัวแปรนี้เพื่อแทนปุ่มกดplay ที่อยู่ส่วน Hover playlist
                ClassListofButtonplaylist = ''; // ต้องใช้เพื่อเช็คจะส่ง  actions_playlist เพื่อใช้งาน function ToggleBtn_Allactions ที่อยู่ใน playPauseBtn
                ClassListofButtonplaylist = actions_playlist;
                OnplaylistSong = []; // ต้องเคลียร์ array ก่อน push ค่าเข้าไป
                const sortedSongs = SongOfPlaylist.map(playlistItem => {  // นำ song_id ที่อยู่ใน SongOfPlaylist  เพื่อกรอง array Allmusic ให้มีแค่ เพลงของ playlistนั้นๆ 
                  const foundSong = allMusic.find(song => song.song_id === playlistItem.song_id); //และที่ต้องใช้ Map เนื่องจากมัน Return ค่ากลับมาได้
                  OnplaylistSong.push(foundSong); // ต้องเก็บใว้ใน Array ที่เป็น global
                  return foundSong;
                });
                // console.log(OnplaylistSong);
                let countSong = 1;
                musicIndex = 1; // set music เป็น 1 ตามarray ที่เรากรองมา

                if (playlist_id_local !== NowPlayingListSong) {
                  Taglist.innerHTML = ''; // clear taglist เพื่อ Requeue ใหม่
                  isSpecialCondition = false; // ปิดการใช้งานในเงื่อนไขของ Artist
                  isPlaylistCondition = true;// เปิดการใช้งานในเงื่อนไขของ Playlist
                  isPrivatePlaylistCondition = false; // เป็น condition ใว้ใชักับ private playlist
                  NowPlayingListSong = [];// ต้องเคลียร์ array ก่อน push ค่าเข้าไป
                  NowPlayingListSong = playlist_id_local; // ใช้เพื่อนำมาเช็คว่า playlistไหนกำลังเล่นอยู่
                  sortedSongs.forEach((music, i) => { // ไอ้ส่วนนี้ก้อปหลายที่มาก จะทำเป็นfunction ละครั้งหน้า // เป็นส่วนในการแสดงQueue ในแถบด้านขวา
                    let boxlist = `<div class="box-list" box-index="${countSong}" artist_name="${music.artist}" playlist_id="${playlist_id_local}"> 
                                        <a href="#" class="for-select"></a>
                                        <audio class="${music.src}" id="NOW${music.src}" src="../music/${music.src}"></audio>
                                        <div class="playing"></div>
                                        <div class="dot-image">               
                                            <img src="../img_song/${music.img}" alt="">
                                        </div>
                                        <div class="detail">
                                            <label for="">${music.name}</label>
                                            <span>${music.artist}</span>
                                        </div>
                                      </div>`;
                    Taglist.insertAdjacentHTML("beforeend", boxlist);
                    countSong++;
                  });
                  resetBtn();
                  Btn_insite();
                  playingStateList();
                  playingNow(); // แสดง Icon ในการเล่น
                  updateImageQueue(OnplaylistSong); // update song ตามที่เรากรองออกมาจาก playlist ได้เลย 
                  loadMusicOnplaylist(musicIndex, OnplaylistSong)// ส่งตำแหน่งของเพลงออกไป
                  MusicPlayer.playMusic();
                  ToggleBtn_Allactions(ClassListofButtonplaylist); // เรียกใช้ function toggle ปุ่ม อยู่ที่ script.js  line.224

                } else {
                  isMusicPaused = music_box.classList.contains("paused");
                  isMusicPaused ? MusicPlayer.pauseMusic() : MusicPlayer.playMusic();
                  Btn_insite();
                  togglePlayStop();
                  ToggleBtn_Allactions(ClassListofButtonplaylist); // เรียกใช้ function toggle ปุ่ม อยู่ที่ script.js  line.224
                }
              })

              // ตรงนีเป็นส่วนของการ เปลี่นนรูปเวลาที่มีการคลิกแต่ละเพลง
              let someListImage = `<img src="../img/${foundArtist.img_file}">`;
              let somePlaylist_title = `<p>playlist</p>
                                    <h1 class="artist">${foundArtist.artist_name}</h1>
                                    <p class="associate-artist">${foundArtist.artist_name} , Musketeers ,follow and more</p>
                                    <div class="detail">
                                        <i class="ri-music-fill"></i>Spotify
                                        <span>•</span>
                                        <p class="amout-of-song">50song,</p>
                                    </div>`;

              // ลบข้อมูลเก่าที่อาจมีอยู่ใน all_music_list ก่อนเสมอ
              all_music_list.innerHTML = '';
              // สร้าง HTML สำหรับแสดงรายการเพลงทีละเพลง
              let Song_serial_number = 1;
              SongOfPlaylist.forEach((data, i) => {
                const Song = allMusic.find(findSong => findSong.song_id === data.song_id);
                const Personal_artist_list = `<div class="box-music-list" id="box-music-list${Song.song_id}" >
                                              <a href="#" class="box-music-list-btn"  box-index="${i + 1}"></a>
                                              <div class="title-of-song">
                                                  <div class="playing" id="PlayBtnOnPlaylist${Song.song_id}">
                                                    <i class="ri-play-fill"></i>
                                                  </div>
                                                  <span class="index">${Song_serial_number}</span>
                                                  <img src="../img_song/${Song.img}" alt="">
                                                  <div class="name-song">
                                                      <span>${Song.name}</span>
                                                      <span class="artist">${Song.artist}</span>
                                                  </div>
                                              </div>
                                              <div class="Date-add-on-list">
                                                <span>5 day ago</span>
                                              </div>
                                              <div class="duration-of-song">
                                                  <label class="container-music" id="heart_list${Song.song_id}">
                                                      <input type="checkbox" id="heart_on_check">
                                                      <div class="checkmark">
                                                          <svg viewBox="0 0 256 256">
                                                              <rect fill="none" height="256" width="256"></rect>
                                                              <path d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z" stroke-width="20px" stroke="#FFF" fill="none"></path>
                                                          </svg>
                                                      </div>
                                                  </label>
                                                  <span id="SONG${Song.song_id}" class="duration"></span>
                                                  <audio class="SONG${Song.song_id}" src="../music/${Song.src}"></audio>
                                              </div>
                                          </div>`;

                Song_serial_number += 1;
                // เพิ่ม HTML สำหรับแต่ละเพลงลงใน all_music_list
                all_music_list.insertAdjacentHTML("beforeend", Personal_artist_list);



                let liAudioTag = all_music_list.querySelector(`.SONG${Song.song_id}`);
                let liAudioDuration = all_music_list.querySelector(`#SONG${Song.song_id}`);
                // console.log(liAudioTag);
                liAudioTag.addEventListener("loadeddata", () => {
                  let audioDuration = liAudioTag.duration;
                  let totalMin = Math.floor(audioDuration / 60);
                  let totalSec = Math.floor(audioDuration % 60);

                  if (totalSec < 10) {
                    totalSec = `0${totalSec}`;
                  }

                  liAudioDuration.innerText = `${totalMin}:${totalSec}`;
                });

                const heart_list = document.getElementById(`heart_list${Song.song_id}`);
                const inside_heart_list = heart_list.querySelector('#heart_on_check');
                const PlayBtnOnPlaylist = document.getElementById(`PlayBtnOnPlaylist${Song.song_id}`);
                heart_list.style.opacity = '0';
                PlayBtnOnPlaylist.style.opacity = '0';
                inside_heart_list.addEventListener('change', function () {
                  if (this.checked) {
                    heart_list.style.opacity = '1';
                  } else {
                    heart_list.style.opacity = '0';
                  }
                });
                const boxMusicList = document.querySelector(`#box-music-list${Song.song_id}`);
                boxMusicList.addEventListener('mouseover', function () { // เมื่อนำเมาส์ไป hover ที่ boxMusicList
                  const insideHeartList = heart_list.querySelector('#heart_on_check');
                  if (!insideHeartList.checked) {
                    heart_list.style.opacity = '1';
                  }
                  if (!PlayBtnOnPlaylist.classList.contains("showState")) {
                    PlayBtnOnPlaylist.style.opacity = '1';
                  }
                });
                boxMusicList.addEventListener('mouseout', function () {  // เมื่อนำเมาส์ออกไป ที่ boxMusicList
                  const insideHeartList = heart_list.querySelector('#heart_on_check');
                  if (!insideHeartList.checked) {
                    heart_list.style.opacity = '0';
                  }
                  if (!PlayBtnOnPlaylist.classList.contains("showState")) {
                    PlayBtnOnPlaylist.style.opacity = '0';
                  }
                });
              });
              console.log(musicIndex)
              // ------------------------------------------------------------------------------
              //  ส่วนของเมื่อกดเพลงใน เพล์ลิสนั้นๆ
              // ------------------------------------------------------------------------------
              playlist_id_onGlobal = '';
              playlist_id_onGlobal = playlist_id_local; // กำหนดให้รู้ว่าตอนนี้กำลังเล่น playlistไหนอยู่
              if (playlist_id_onGlobal === NowPlayingListSong) {  // ตรงส่วนของเงื่อนไขนี้ใช้ใว้เพื่อให้ปุ่ม play ด้านในplaylist สอดคล้องกับ Mediaplayด้านล่าง
                playingStateList();
                Btn_follow_Midia();
              }



              const box_music_list_btn = all_music_list.querySelectorAll('.box-music-list-btn'); // all_music_list เคยประกาศใว้แล้วที่ script line 759
              box_music_list_btn.forEach((content, i) => {
                content.addEventListener('click', () => {
                  musicIndex = i + 1;
                  const actions_playlist = document.querySelector(`.actions[actions_Playlist_id="${playlist_id_local}"]`); // ใช้ตัวแปรนี้เพื่อแทนปุ่มกดplay ที่อยู่ส่วน Hover playlist
                  ClassListofButtonplaylist = ''; // ต้องใช้เพื่อเช็คจะส่ง  actions_playlist เพื่อใช้งาน function ToggleBtn_Allactions ที่อยู่ใน playPauseBtn
                  ClassListofButtonplaylist = actions_playlist;
                  OnplaylistSong = []; // ต้องเคลียร์ array ก่อน push ค่าเข้าไป
                  const sortedSongs = SongOfPlaylist.map(playlistItem => {  // นำ song_id ที่อยู่ใน SongOfPlaylist  เพื่อกรอง array Allmusic ให้มีแค่ เพลงของ playlistนั้นๆ 
                    const foundSong = allMusic.find(song => song.song_id === playlistItem.song_id); //และที่ต้องใช้ Map เนื่องจากมัน Return ค่ากลับมาได้
                    OnplaylistSong.push(foundSong); // ต้องเก็บใว้ใน Array ที่เป็น global
                    return foundSong;
                  });
                  if (playlist_id_local !== NowPlayingListSong) {
                    isSpecialCondition = false; // ปิดการใช้งานในเงื่อนไขของ Artist
                    isPlaylistCondition = true;// เปิดการใช้งานในเงื่อนไขของ Playlist
                    isPrivatePlaylistCondition = false; // isPrivatePlaylistConditionเป็นเงื่อนไขที่ใช้แยก playlist ระหว่าง Admin และ User
                    Taglist.innerHTML = ''; // clear taglist เพื่อ Requeue ใหม่
                    NowPlayingListSong = [];// ต้องเคลียร์ array ก่อน push ค่าเข้าไป
                    NowPlayingListSong = playlist_id_local; // ใช้เพื่อนำมาเช็คว่า playlistไหนกำลังเล่นอยู่
                    sortedSongs.forEach((music, i) => { // ไอ้ส่วนนี้ก้อปหลายที่มาก จะทำเป็นfunction ละครั้งหน้า // เป็นส่วนในการแสดงQueue ในแถบด้านขวา
                      let boxlist = `<div class="box-list" box-index="${i + 1}" artist_name="${music.artist}" playlist_id="${playlist_id_local}"> 
                                          <a href="#" class="for-select"></a>
                                          <audio class="${music.src}" id="NOW${music.src}" src="../music/${music.src}"></audio>
                                          <div class="playing"></div>
                                          <div class="dot-image">               
                                              <img src="../img_song/${music.img}" alt="">
                                          </div>
                                          <div class="detail">
                                              <label for="">${music.name}</label>
                                              <span>${music.artist}</span>
                                          </div>
                                        </div>`;
                      Taglist.insertAdjacentHTML("beforeend", boxlist);
                    });
                  }

                  playingStateList();
                  clicked(content)
                  Btn_follow_Midia();
                  ResetBtn_Allactions(ClassListofButtonplaylist)
                  playingNow(); // แสดง Icon ในการเล่น
                  updateImageQueue(OnplaylistSong); // update song ตามที่เรากรองออกมาจาก playlist ได้เลย 
                })
              })
              // --------------------------------------------------------
              // ส่วนของการทำวันที่ ในตอนที่add-song หรือ เพลงเข้ามา ของ playlist
              // --------------------------------------------------------
              const dateAddonElement = document.querySelectorAll(".Date-add-on-list");
              for (i = 0; i < SongOfPlaylist.length; i++) {
                const Song = allMusic.find(findSong => findSong.song_id === SongOfPlaylist[i].song_id);

                const MusicDate = new Date(Song.DateAdded);
                const diffTime = Math.abs(songAddedDate - MusicDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                // แสดงผลลัพธ์ในส่วนของ "Date-add-on"
                dateAddonElement[i].innerHTML = `<span>${diffDays} day${diffDays !== 1 ? 's' : ''} ago</span>`;
              }


              playlist_image.innerHTML = someListImage;
              playlist_title.innerHTML = somePlaylist_title;

              Goto_page_list.classList.add('active');
              container_top.classList.add("active");
              Goto_home_page.classList.remove('active');
              Goto_search_page.classList.remove('active');
              insite_upload_page.classList.remove('active');
            })
            .catch((error) => { // ดัก error ของ ../API/API_playlist_song.php
              console.error("Error:", error);
              alert("There was a problem fetching additional data.");
            });
        });
      });

      SetupActionsPlaylistsArtist();

    })
    .catch((error) => { // ดัก error ของ ../API/data_playlist_artist.php
      console.error("Error:", error);
      alert("There was a problem fetching initial data.");
    });
}
function fetchInitialUseOrNot(playlistLink, artistId) { //function นี้ทำมาใว้เพื่อแสดงผลสถานะของ Playlist Artist ให้ถูกต้องเฉยๆ
  fetch("../API/Data_playlist_artist.php") // โดยการที่เราจะส้ง playlistLink และ  artistId มาเพื่อระบุและจัดการสถานะ
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((PlaylistSong) => {
      const found = PlaylistSong.some((item) => item.artist_id === artistId);
      if (found) {
        playlistLink.classList.remove('not-being-used');
        playlistLink.classList.add('being-used');
        playlistLink.innerText = 'Used';
      } else {
        playlistLink.classList.remove('being-used');
        playlistLink.classList.add('not-being-used');
        playlistLink.innerText = 'Add-to-playlist';
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("There was a problem fetching data.");
    });
}

// --------------------------------------------------
// ส่วนของการ create category จริงๆเหนื่อยมาก เดี๋ยวมาเม้นต่อ
// --------------------------------------------------
function fetchInitialDataCategory() { //function ที่ใช้ในการแสดง category ทั้งหมดที่เราสร้างขึ้นมา 
  const item_box = container_button.querySelector('.item-box'); //  container_button มาจาก active.js  line 63
  const content_common = item_box.querySelectorAll('.content');

  fetch("../API/Data_category.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP-status: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      data.sort((a, b) => a.category_id - b.category_id);
      content_common.forEach((contentElement, index) => { // ทำไว้เพื่อให้มัน clear content.category ก่อนครั้งแรก
        if (index > 1) {
          contentElement.remove();
        }
      })
      data.forEach((content) => {
        let category_header = `<div class="content" id="wrapper-playlist${content.category_id}">
                                      <div class="content-header">
                                          <h2>${content.category_name}</h2>
                                          <div class="content-add-playlist">
                                              <div class="more-select" id="more-select${content.category_id}" category_id="${content.category_id}">
                                                  <a href="#"><i class="ri-more-line"></i></a>
                                              </div>
                                              <div class="more-detail" id="more-detail${content.category_id}">
                                                  <div class="wrapper">
                                                      <a href="#" class="Add-playlist" id="Add-playlist${content.category_id}" category_id="${content.category_id}"><i class="ri-add-circle-line"></i><span>Add playlist</span></a>
                                                      <a href="#" id="Edit-playlist" trigger-button data-target="Edit-catagory-popup" category_id="${content.category_id}" category_Name="${content.category_name}"><i class="ri-edit-line"></i><span>Edit Name</span></a>
                                                      <a href="#" id="Go-to-Delete-category" category_id="${content.category_id}" trigger-button data-target="Delete-category" ><i class="ri-subtract-line"></i><span>Delete playlist</span></a>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="carousel">
                                          <div class="inner-wrapper">
                                              <div class="dotgrid carouselbox swiper">
                                                  <div class="wrapper swiper-wrapper">
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
                                  </div>`;

        item_box.insertAdjacentHTML("beforeend", category_header);
      });
      // ------------------------------------------------------------
      //          การทำงานในส่วนของการแก้ไขค่าของ Category 
      // ------------------------------------------------------------
      const Edit_playlist = document.querySelectorAll('#Edit-playlist');
      const form_Edit_Name_catagory = document.querySelector('.form-Edit-Name-catagory');
      Edit_playlist.forEach(content => {
        content.addEventListener('click', () => {
          const category_id = content.getAttribute("category_id")
          const wrapper_playlist = document.querySelector(`#wrapper-playlist${category_id}`);
          form_Edit_Name_catagory.innerHTML = '';
          let form_Edit_Name_catagory_var = `
                                              <label for="Edit-Name-catagory" class="wrapper Edit-Name-catagory" >
                                                  <span>Name catagory</span>
                                                  <input type="text" id="Edit-Name-catagory" placeholder="Input your catagory">
                                              </label>
                                              <p>this is  for create catagory when you want to create playlist</p>
                                              <div class="catagory-btn">
                                                  <button class="Edit-catagory-popup-btn">Save</button>
                                              </div>`;
          form_Edit_Name_catagory.insertAdjacentHTML("beforeend", form_Edit_Name_catagory_var)


          const Edit_catagory_popup_btn = document.querySelector('.Edit-catagory-popup-btn');
          const Edit_Name_catagory = document.getElementById('Edit-Name-catagory')
          Edit_Name_catagory.setAttribute("value", content.getAttribute("category_Name"))
          Edit_catagory_popup_btn.addEventListener('click', () => {
            const content_header = wrapper_playlist.querySelector(".content-header > h2")
            content_header.innerText = Edit_Name_catagory.value;

            SaveEditNameCategory(category_id, Edit_Name_catagory.value);
            closeEdit_category();
          });
        });
      });

      // ------------------------------------------------------------
      //          การทำงานในส่วนของการค่าลบ Category 
      // ------------------------------------------------------------
      const Go_to_Delete_category = document.querySelectorAll('#Go-to-Delete-category');
      const form_Delete_confirm = document.querySelector('.form-Delete-confirm');
      Go_to_Delete_category.forEach(content => {
        content.addEventListener('click', () => {
          const category_id = content.getAttribute("category_id")
          const wrapper_playlist = document.querySelector(`#wrapper-playlist${category_id}`);
          form_Delete_confirm.innerHTML = '';
          let form_Delete_confirm_var = `
                                    <a href="#" class="cancel-confirm" close-button >Cancle</a>
                                    <button class="Delete-category-btn">Confirm</button>`;
          form_Delete_confirm.insertAdjacentHTML("beforeend", form_Delete_confirm_var)

          const Delete_category_btn = document.querySelector(".Delete-category-btn");
          Delete_category_btn.addEventListener('click', () => {
            console.log(Delete_category_btn);
            DeleteCategory(category_id);

            // Check if wrapper_playlist contains carousel-item before removing
            if (wrapper_playlist.querySelector('.carousel-item')) {
              alert("ยังมีplaylistอยู่ในcategoryนี้ ไม่สามารถลบได้")
              console.log("Wrapper playlist does not contain carousel-item. Not removing.");
            } else {
              wrapper_playlist.remove();
            }

            closeDelete_category();
          })
        })
      });

      // -----------------------------------------------------------------------------
      //      more_select หรือก็คือส่วนหน้าต่าง function ที่ใช้ในการ add-playlist ต่างๆนั้นแหละ
      // ----------------------------------------------------------------------------

      const more_select = document.querySelectorAll('.more-select');
      const more_detail = document.querySelectorAll('.more-detail');
      let fetchPermalinkCalled = false; // Variable to track if fetchInitialPermalink has been called
      const promises = [];
      more_select.forEach((select, index) => {
        const categoryId = select.getAttribute("category_id");
        select.addEventListener('click', () => {
          const more_detail_show = document.getElementById('more-detail' + categoryId);
          more_detail_show.classList.toggle("active");
        })
        promises.push(fetchInitialData(categoryId));// เพิ่ม Promise สำหรับการเรียก fetchInitialData() เข้าไปใน array promises
      });
      Promise.all(promises)
        .then(() => {
          if (!fetchPermalinkCalled) {
            fetchPermalinkCalled = true;
            fetchInitialPermalink();// เรียกใช้ fetchInitialPermalink() เมื่อทุก Promise เสร็จสมบูรณ์
            SetupActionsPlaylists();/// action play ของ playlist ที่ไม่ใช้ playlist Artist 
            initSwiper();
            triggerOpen();
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });

      // -------------------------------------------------------------------------------------------
      //   เมื่อเรากดที่ Add-playlist ในส่วนของ หน้าต่าง menu ใน more-detail เพื่อใช้ในการ add playlist ต่างๆ 
      // --------------------------------------------------------------------------------------------
      const addPlaylistBtn = document.querySelectorAll('.Add-playlist');
      addPlaylistBtn.forEach(content => {
        content.addEventListener('click', () => {
          addPlaylist(content.getAttribute("category_id")); // สร้างplaylist ตาม ID ที่กด 
        });
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("There was a problem fetching data.");
    });
}
function saveCatagory() {//เหมือนกับ fetchInitialData() นั่นแหละ แต่เป็นของ Playlist Artist 
  const nameCatagoryInput = document.getElementById('Name-catagory').value;
  const item_box = container_button.querySelector('.item-box'); //  มาจาก container_button line 63
  if (nameCatagoryInput.trim() === '') { // ดักข้อมูลที่อาจจะเป็น การเว้นช่องว่างด้านหน้า หรือด้านหลัง
    alert('Please enter a catagory name.');
    return;
  }
  // สร้างข้อมูลที่จะส่งไปที่ API
  const Catagory = {
    Catagory_Name: nameCatagoryInput.trim()
  };

  fetch('../API/API_catagory.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Catagory)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return fetch("../API/Data_category.php");
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((category_data) => {
      const lastIndex = category_data.length - 1;
      const lastItem = category_data[lastIndex];
      let category_header = `<div class="content" id="wrapper-playlist${lastItem.category_id}">
                                    <div class="content-header">
                                        <h2>${lastItem.category_name}</h2>
                                        <div class="content-add-playlist">
                                            <div class="more-select" id="more-select${lastItem.category_id}">
                                                <a href="#"><i class="ri-more-line"></i></a>
                                            </div>
                                            <div class="more-detail" id="more-detail${lastItem.category_id}">
                                                <div class="wrapper">
                                                    <a href="#" class="Add-playlist" id="Add-playlist${lastItem.category_id}" category_id="${lastItem.category_id}"><i class="ri-add-circle-line"></i><span>Add playlist</span></a>
                                                    <a href="#" id="Edit-playlist"><i class="ri-edit-line"></i><span>Edit Name</span></a>
                                                    <a href="#"><i class="ri-subtract-line"></i><span>Delete playlist</span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel">
                                        <div class="inner-wrapper">
                                            <div class="dotgrid carouselbox swiper">
                                                <div class="wrapper swiper-wrapper">
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
                                </div>`;
      item_box.insertAdjacentHTML("beforeend", category_header);
      fetchInitialDataCategory();
      closePopup_catagory_popup();
    })
    .catch(error => {
      console.error("Error", error)
      alert("There was a problem catagory data.");
    })


}

// -----------------------------------------------------------
// ส่วนของการ Addเพลง เข้ามาใน playlist จริงๆเหนื่อยมาก เดี๋ยวมาเม้นต่อ
// -----------------------------------------------------------
function fetchAddSongPlaylist(playlist_id) {//เหมือนกับ fetchInitialData() นั่นแหละ แต่เป็นของ Playlist Artist 

  const insert_song = document.querySelector(".insert_song"); // เปิดส่วน search ที่ต้องการจะ add เพลง
  insert_song.style.display = "block";

  fetch("../API/API_playlist_song.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data_playlist) => {
      const SongOfPlaylist = data_playlist.filter(data => data.playlist_id === playlist_id)
      const sortedSongs = allMusic.filter(playlistItem => { /// กรอง playlist ให้ไม่มีตัวที่ถูก add ไปแล้ว
        const foundSong = SongOfPlaylist.find(song => song.song_id === playlistItem.song_id);
        if (!foundSong) {
          return true;
        }
        return false;
      });


      sortedSongsToPlaylist(SongOfPlaylist, playlist_id);

      insert_song.innerHTML = ''; // clear ข้อมูลก่อน
      let insert_song_var = `<div class="insert_song-header">
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
                              </div>`;
      insert_song.insertAdjacentHTML("beforeend", insert_song_var);
      sortedSongs.forEach(data => { // ข้อมูลเมื่อต้องการ insert ข้อมูล
        let insert_song_main_var = `<div class="insert_song-main">
                                        <div class="wrapper">
                                            <div class="img_insert_song">
                                                <img src="../img_song/${data.img}" alt="">
                                            </div>
                                            <div class="insert_song_title">
                                                <h2>${data.name}</h2>
                                                <p>${data.artist}</p>
                                            </div>
                                        </div>
                                        <div class="content-add-song-btn" song_id = ${data.song_id}>
                                            <a href="#" class="add-song-btn">Add</a>
                                        </div>
                                    </div>`;
        insert_song.insertAdjacentHTML("beforeend", insert_song_main_var)
      })
      const content_add_song_btn = document.querySelectorAll(".content-add-song-btn");
      content_add_song_btn.forEach(add => {
        add.addEventListener('click', () => {
          addSongToPlaylist(playlist_id, add.getAttribute("song_id"), (SongOfPlaylist.length))
        })
      });
      const DeleteFromPlaylist = document.querySelectorAll('.DeleteFromPlaylist')
      DeleteFromPlaylist.forEach(Del => {
        Del.addEventListener('click', () => {
          let song_id = Del.getAttribute("SongID")
          console.log(song_id)
          DeletePlaylistSong(playlist_id, song_id)
        });
      });
      updateDateandTimeMusic(SongOfPlaylist);
    })
    .catch((error) => {
      console.error("Error: fetchInitialInplaylist", error);
    });
}
function fetchInitialPermalink() { /// function ที่ใช้เพื่อ showข้อมูลภายในหน้านั้นๆ
  let playlist_id_local = '';
  const product_permalink_common = document.querySelectorAll(".product-permalink:not(.artist)");
  const Setting_detail_main = document.querySelector('.Setting-detail-main');
  product_permalink_common.forEach((content, index) => {
    content.addEventListener("click", (event) => {
      event.preventDefault();
      playlist_id_local = content.getAttribute("playlist_id");
      console.log(index)
      fetch("../API/API_playlist_song.php")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response from playlist_song was not ok")
          }
          return response.json();
        })
        .then((data_playlist_song) => {
          // console.log(data_playlist_song)

          //ในส่วนนี้ไม่มีอะไร แค่เข้าถึง CSS ในการแก้ใขในเรื่อง permission ของ User ที่จะมองเห็น
          const nav_title_element = document.querySelector(".nav-title > .duration-time span");
          const nav_title_element2 = document.querySelector(".nav-title > .duration-time");
          const nav_title_element3 = document.querySelector(".nav-title > .Date-add");
          nav_title_element3.style.width = "130px"
          nav_title_element2.style.width = "80px";
          nav_title_element.style.display = "none";
          // ---------------------------------------------------------------------------
          // เราจะเอาข้อมูล โดยที่จะใช้  playlist_id ระบุเป้าหมาย

          // playlist_nav ไม่ต้อง งงว่ามาจากไหน ก้้อปมาจาก script.js line 831 ส่วนของ for_upload_content
          let playlist_nav_var = `<div class="Pnav-left">
                                        <i class="ri-play-circle-fill" Pnav-index="${playlist_id_local}"></i>
                                        <label class="container-music">
                                            <input type="checkbox">
                                            <div class="checkmark">
                                                <svg viewBox="0 0 256 256">
                                                    <rect fill="none" height="256" width="256"></rect>
                                                    <path d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z" stroke-width="20px" stroke="#FFF" fill="none"></path>
                                                </svg>
                                            </div>
                                        </label>
                                        <div class= "more-setting">
                                          <i class="ri-more-line"></i>
                                        </div>
                                        <div class="more-setting-detail">
                                            <div class="wrapper">
                                                <a href="#" id="Edit-playlist" trigger-button data-target="Setting-detail-popup"><i class="ri-edit-line"></i><span>Edit Detail</span></a>
                                                <a href="#" id="delete-playlist" trigger-button data-target ="Delete-song-popup-onlist"><i class="ri-subtract-line"></i><span>Delete playlist</span></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="Pnav-right">
                                        <a href="#">list <i class="ri-list-check"></i></a>
                                    </div>`
          playlist_nav.innerHTML = playlist_nav_var;

          // ----------------------------------------------------
          // ส่วนแสดงผลรูปภาพ หน้าปก playlist
          // ตรงนีเป็นส่วนของการ เปลี่นนรูปเวลาที่มีการคลิกแต่ละเพลง
          // ----------------------------------------------------
          Setting_detail_main.innerHTML = ''; // ต้อง สร้าง form ขึ้นมาใหม่เพราะ ถ้าไม่ทำแบบนี้มันจะ stack ค่า ไปเรื่อยๆ ลองแก้ละไม่ได้สักทีปวดหัวฉิบหาย
          let Setting_detail_main_var = `<div>
                                            <div class="wrap-Setting-detail-main">
                                                <label for="file-detail-playlist" class="custum-file-upload" id="custum-detail-playlist-upload">
                                                    <div class="icon">
                                                        <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path> </g></svg>
                                                    </div>
                                                    <input id="file-detail-playlist" type="file" accept="image/*" name="file-img-playlist">
                                                    <img class="img-forShow">
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
                                        </div>`;
          Setting_detail_main.insertAdjacentHTML('beforeend', Setting_detail_main_var);

          const submit_detail = document.querySelector('.submit-detail');
          submit_detail.addEventListener('click', () => {
            console.log(playlist_id_local);
            SaveDetail(playlist_id_local);
          });

          const Delete_confirm = document.querySelector('.Delete-song-popup-onlist .Delete-confirm');
          Delete_confirm.innerHTML = '';
          let Delete_confirm_var = `
                                    <form>
                                        <a href="#" class="cancel-confirm" close-button >Cancle</a>
                                        <button class="delete-song-playlist">Confirm</button>
                                    </form>`;
          Delete_confirm.insertAdjacentHTML("beforeend", Delete_confirm_var)
          const delete_song_playlist = document.querySelector('.delete-song-playlist');
          delete_song_playlist.addEventListener('click', () => {
            DeletePlaylist(playlist_id_local) // ส่งค่าไปเมื่อจะทำการลบ Playlist นั้นๆ
          });

          triggerOpen();
          upload_img_custum_detail(); // function ที่ใช้ในการ upload file รูป มาจาก active.js line 327


          updateBannerHeaderplaylist(playlist_id_local);
          fetchAddSongPlaylist(playlist_id_local);// แสดง ขอมูลที่ต้องการจะ Add music เข้ามา
          // ------------------------------------------------------
          // SongOfPlaylist เป็นส่วนของ List ย่อยๆ ใน playlist
          // ------------------------------------------------------
          const SongOfPlaylist = data_playlist_song.filter(data_playlist => data_playlist.playlist_id === `${playlist_id_local}`) // จากนั้นก็กรองด้วย filter 
          console.log(SongOfPlaylist);
          // -----------------------------------------------------------------
          // ด้านล่างนี้เป็นส่วนของ เปิดหน้า popup ขึ้นมาและ set detail ของ playlist นั้น
          // -----------------------------------------------------------------
          const more_setting = document.querySelector(".more-setting");
          const more_setting_detail = document.querySelector(".more-setting-detail");
          more_setting.addEventListener('click', () => {
            more_setting_detail.classList.toggle("active");
          });



          const Pnav_left = document.querySelector(".Pnav-left"),
            Btn_green = Pnav_left.querySelector("i");
          Btn_green.addEventListener('click', () => {
            const actions_playlist = document.querySelector(`.actions[actions_Playlist_id="${playlist_id_local}"]`); // ใช้ตัวแปรนี้เพื่อแทนปุ่มกดplay ที่อยู่ส่วน Hover playlist
            ClassListofButtonplaylist = ''; // ต้องใช้เพื่อเช็คจะส่ง  actions_playlist เพื่อใช้งาน function ToggleBtn_Allactions ที่อยู่ใน playPauseBtn
            ClassListofButtonplaylist = actions_playlist;
            OnplaylistSong = []; // ต้องเคลียร์ array ก่อน push ค่าเข้าไป
            const sortedSongs = SongOfPlaylist.map(playlistItem => {  // นำ song_id ที่อยู่ใน SongOfPlaylist  เพื่อกรอง array Allmusic ให้มีแค่ เพลงของ playlistนั้นๆ 
              const foundSong = allMusic.find(song => song.song_id === playlistItem.song_id); //และที่ต้องใช้ Map เนื่องจากมัน Return ค่ากลับมาได้
              OnplaylistSong.push(foundSong); // ต้องเก็บใว้ใน Array ที่เป็น global
              return foundSong;
            });
            let countSong = 1;
            musicIndex = 1; // set music เป็น 1 ตามarray ที่เรากรองมา
            if (playlist_id_local !== NowPlayingListSong) {
              Taglist.innerHTML = '';
              isSpecialCondition = false; // ปิดการใช้งานในเงื่อนไขของ Artist
              isPlaylistCondition = true;// เปิดการใช้งานในเงื่อนไขของ Playlist
              isPrivatePlaylistCondition= false; // isPrivatePlaylistConditionเป็นเงื่อนไขที่ใช้แยก playlist ระหว่าง Admin และ User
              NowPlayingListSong = [];// ต้องเคลียร์ array ก่อน push ค่าเข้าไป
              NowPlayingListSong = playlist_id_local; // ใช้เพื่อนำมาเช็คว่า playlistไหนกำลังเล่นอยู่
              sortedSongs.forEach((music, i) => {
                let boxlist = `<div class="box-list" box-index="${countSong}" artist_name="${music.artist}" playlist_id="${playlist_id_local}"> 
                                        <a href="#" class="for-select"></a>
                                        <audio class="${music.src}" id="NOW${music.src}" src="../music/${music.src}"></audio>
                                        <div class="playing"></div>
                                        <div class="dot-image">               
                                            <img src="../img_song/${music.img}" alt="">
                                        </div>
                                        <div class="detail">
                                            <label for="">${music.name}</label>
                                            <span>${music.artist}</span>
                                        </div>
                                      </div>`;
                Taglist.insertAdjacentHTML("beforeend", boxlist);
                countSong++;
              });
              resetBtn();
              Btn_insite();
              playingStateList();
              playingNow(); // แสดง Icon ในการเล่น
              updateImageQueue(OnplaylistSong); // update song ตามที่เรากรองออกมาจาก playlist ได้เลย 
              loadMusicOnplaylist(musicIndex, OnplaylistSong)// ส่งตำแหน่งของเพลงออกไป
              MusicPlayer.playMusic();
              ToggleBtn_Allactions(ClassListofButtonplaylist); // เรียกใช้ function toggle ปุ่ม อยู่ที่ script.js  line.224
            } else {
              isMusicPaused = music_box.classList.contains("paused");
              isMusicPaused ? MusicPlayer.pauseMusic() : MusicPlayer.playMusic();
              Btn_insite();
              togglePlayStop();
              ToggleBtn_Allactions(ClassListofButtonplaylist); // เรียกใช้ function toggle ปุ่ม อยู่ที่ script.js  line.224
            }
          })
          console.log(musicIndex)

          // อันนี้เป็นส่วนของ การแสดงผลแต่ละ layout ต่างๆ ที่ถูกปิดใว้

          Goto_page_list.classList.add('active');
          container_top.classList.add("active");
          Goto_home_page.classList.remove('active');
          Goto_search_page.classList.remove('active');
          insite_upload_page.classList.remove('active');
        })
        .catch((error) => { // ดัก error ของ ../API/API_playlist_song.php
          console.error("Error: fetchInitialPermalink", error);
        });
    });
  });
}
function UseOrNot(playlistLink, artistId, index) { // function นี้มีใว้เพื่อเรียกใช้  createAndAddToPlaylist โดยเฉพาะ โดยให้ artistId, index ระบุค่าเท่านั้น
  if (playlistLink.classList.contains('being-used')) {
    playlistLink.classList.remove('being-used');
    playlistLink.classList.add('not-being-used');
    playlistLink.innerText = 'Add-to-playlist';
  } else {
    playlistLink.classList.remove('not-being-used');
    playlistLink.classList.add('being-used');
    playlistLink.innerText = 'Used';
  }
  createAndAddToPlaylist(artistId, index);
}
function addSongToPlaylist(playlist_id, song_id, indexLenth) { //function ที่ใช้ในการ addเพลง ลงไปใน Playlist จำเป็นต้องส่งค่า playlist_id , song_id และ จำนวนเพลงใน playlist นั้นด้วย indexLenth
  fetch("../API/InsertPlaylistSong.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      playlist_id: playlist_id,
      song_id: song_id,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const Song = allMusic.find(data => data.song_id === song_id);
      const Personal_artist_list = `<div class="box-music-list" id="box-music-list${Song.song_id}" >
                                              <a href="#" class="box-music-list-btn"  box-index="${i + 1}"></a>
                                              <div class="title-of-song">
                                                  <div class="playing" id="PlayBtnOnPlaylist${Song.song_id}">
                                                    <i class="ri-play-fill"></i>
                                                  </div>
                                                  <span class="index">${indexLenth + 1}</span>
                                                  <img src="../img_song/${Song.img}" alt="">
                                                  <div class="name-song">
                                                      <span>${Song.name}</span>
                                                      <span class="artist">${Song.artist}</span>
                                                  </div>
                                              </div>
                                              <div class="Date-add-on-list">
                                                <span>5 day ago</span>
                                              </div>
                                              <div class="duration-of-song">
                                                  <label class="container-music" id="heart_list${Song.song_id}">
                                                      <input type="checkbox" id="heart_on_check">
                                                      <div class="checkmark">
                                                          <svg viewBox="0 0 256 256">
                                                              <rect fill="none" height="256" width="256"></rect>
                                                              <path d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z" stroke-width="20px" stroke="#FFF" fill="none"></path>
                                                          </svg>
                                                      </div>
                                                  </label>
                                                  <span id="SONG${Song.song_id}" class="duration"></span>
                                                  <audio class="SONG${Song.song_id}" src="../music/${Song.src}"></audio>
                                                  <div class = "DeleteFromPlaylist" SongID="${Song.song_id}" id="DeleteFromPlaylist${Song.song_id}" trigger-button data-target ="Delete-song-popup-onlist">
                                                      <a><i class="ri-close-line"></i></a>
                                                  </div>
                                              </div>
                                          </div>`;

      // เพิ่ม HTML สำหรับแต่ละเพลงลงใน all_music_list
      all_music_list.insertAdjacentHTML("beforeend", Personal_artist_list);
      //-------------------------------------------------------------------------------------------------

      let liAudioTag = all_music_list.querySelector(`.SONG${Song.song_id}`);
      let liAudioDuration = all_music_list.querySelector(`#SONG${Song.song_id}`);
      // console.log(liAudioTag);
      liAudioTag.addEventListener("loadeddata", () => {
        let audioDuration = liAudioTag.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);

        if (totalSec < 10) {
          totalSec = `0${totalSec}`;
        }

        liAudioDuration.innerText = `${totalMin}:${totalSec}`;
      });

      const heart_list = document.getElementById(`heart_list${Song.song_id}`);
      const inside_heart_list = heart_list.querySelector('#heart_on_check');
      const PlayBtnOnPlaylist = document.getElementById(`PlayBtnOnPlaylist${Song.song_id}`);
      const DeleteFromPlaylist = document.getElementById(`DeleteFromPlaylist${Song.song_id}`);
      heart_list.style.opacity = '0';
      PlayBtnOnPlaylist.style.opacity = '0';
      DeleteFromPlaylist.style.opacity = '0';
      inside_heart_list.addEventListener('change', function () {
        if (this.checked) {
          heart_list.style.opacity = '1';
        } else {
          heart_list.style.opacity = '0';
        }
      });
      const boxMusicList = document.querySelector(`#box-music-list${Song.song_id}`);
      boxMusicList.addEventListener('mouseover', function () { // เมื่อนำเมาส์ไป hover ที่ boxMusicList
        const insideHeartList = heart_list.querySelector('#heart_on_check');
        if (!insideHeartList.checked) {
          heart_list.style.opacity = '1';
        }
        if (!PlayBtnOnPlaylist.classList.contains("showState")) {
          PlayBtnOnPlaylist.style.opacity = '1';
        }
        DeleteFromPlaylist.style.opacity = '1';
      });
      boxMusicList.addEventListener('mouseout', function () {  // เมื่อนำเมาส์ออกไป ที่ boxMusicList
        const insideHeartList = heart_list.querySelector('#heart_on_check');
        if (!insideHeartList.checked) {
          heart_list.style.opacity = '0';
        }
        if (!PlayBtnOnPlaylist.classList.contains("showState")) {
          PlayBtnOnPlaylist.style.opacity = '0';
        }
        DeleteFromPlaylist.style.opacity = '0';
      });

      fetchAddSongPlaylist(playlist_id);
      updateDateandTimeMusicPerOne(Song, indexLenth);
      triggerOpen();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("There was a problem fetching InsertPlaylistSong data.");
    });
}
function DeletePlaylistSong(playlist_id, song_id) {
  const formData = new FormData(); // สร้าง ไว้เพื่อส่งข้อมูลตอนที่กำลัง fetch API
  formData.append('playlist_id', playlist_id);
  formData.append('song_id', song_id);
  fetch("../API/DeletePlaylistSong.php", {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok on DeletePlaylistSong')
      }
      fetchAddSongPlaylist(playlist_id);
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
}
function DeletePlaylist(playlist_id) {
  const BTN_HOME = document.getElementById('home');
  let formData = new FormData();
  formData.append("playlist_id", playlist_id)
  fetch("../API/Delete_Playlist.php", {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok on DeletePlaylist")
      }
      response.text();
      fetchInitialDataCategory();
      BTN_HOME.click();
      close_Delete_playlist_popup();
    })
    .catch(error => {
      console.error('There was an error!', error)
    });
}

function sortedSongsToPlaylist(SongOfPlaylist, playlist_id_local) {// กรองเพลงลงไปใน playlist
  const sortedSongs = SongOfPlaylist.map(playlistItem => { /// กรอง playlist ให้ไม่มีตัวที่ถูก add ไปแล้ว
    const foundSong = allMusic.find(song => song.song_id === playlistItem.song_id);
    return foundSong;
  });
  if (sortedSongs.length == 0) {
    all_music_list.innerHTML = '';
  }
  let Song_serial_number = 1;
  all_music_list.innerHTML = '';
  sortedSongs.forEach((Song, i) => {
    const Personal_artist_list = `<div class="box-music-list" id="box-music-list${Song.song_id}" >
                                          <a href="#" class="box-music-list-btn"  box-index="${i + 1}"></a>
                                          <div class="title-of-song">
                                              <div class="playing" id="PlayBtnOnPlaylist${Song.song_id}">
                                                <i class="ri-play-fill"></i>
                                              </div>
                                              <span class="index">${Song_serial_number}</span>
                                              <img src="../img_song/${Song.img}" alt="">
                                              <div class="name-song">
                                                  <span>${Song.name}</span>
                                                  <span class="artist">${Song.artist}</span>
                                              </div>
                                          </div>
                                          <div class="Date-add-on-list">
                                            <span>5 day ago</span>
                                          </div>
                                          <div class="duration-of-song">
                                              <label class="container-music" id="heart_list${Song.song_id}">
                                                  <input type="checkbox" id="heart_on_check">
                                                  <div class="checkmark">
                                                      <svg viewBox="0 0 256 256">
                                                          <rect fill="none" height="256" width="256"></rect>
                                                          <path d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z" stroke-width="20px" stroke="#FFF" fill="none"></path>
                                                      </svg>
                                                  </div>
                                              </label>
                                              <span id="SONG${Song.song_id}" class="duration"></span>
                                              <audio class="SONG${Song.song_id}" src="../music/${Song.src}"></audio>
                                              <div class = "DeleteFromPlaylist" SongID="${Song.song_id}" id="DeleteFromPlaylist${Song.song_id}">
                                                  <a><i class="ri-close-line"></i></a>
                                              </div>
                                          </div>
                                      </div>`;

    Song_serial_number += 1;
    // เพิ่ม HTML สำหรับแต่ละเพลงลงใน all_music_list
    all_music_list.insertAdjacentHTML("beforeend", Personal_artist_list);
    //-------------------------------------------------------------------------------------------------



    let liAudioTag = all_music_list.querySelector(`.SONG${Song.song_id}`);
    let liAudioDuration = all_music_list.querySelector(`#SONG${Song.song_id}`);
    // console.log(liAudioTag);
    liAudioTag.addEventListener("loadeddata", () => {
      let audioDuration = liAudioTag.duration;
      let totalMin = Math.floor(audioDuration / 60);
      let totalSec = Math.floor(audioDuration % 60);

      if (totalSec < 10) {
        totalSec = `0${totalSec}`;
      }

      liAudioDuration.innerText = `${totalMin}:${totalSec}`;
    });

    const heart_list = document.getElementById(`heart_list${Song.song_id}`);
    const inside_heart_list = heart_list.querySelector('#heart_on_check');
    const PlayBtnOnPlaylist = document.getElementById(`PlayBtnOnPlaylist${Song.song_id}`);
    const DeleteFromPlaylist = document.getElementById(`DeleteFromPlaylist${Song.song_id}`);
    heart_list.style.opacity = '0';
    PlayBtnOnPlaylist.style.opacity = '0';
    DeleteFromPlaylist.style.opacity = '0';
    inside_heart_list.addEventListener('change', function () {
      if (this.checked) {
        heart_list.style.opacity = '1';
      } else {
        heart_list.style.opacity = '0';
      }
    });
    const boxMusicList = document.querySelector(`#box-music-list${Song.song_id}`);
    boxMusicList.addEventListener('mouseover', function () { // เมื่อนำเมาส์ไป hover ที่ boxMusicList
      const insideHeartList = heart_list.querySelector('#heart_on_check');
      if (!insideHeartList.checked) {
        heart_list.style.opacity = '1';
      }
      if (!PlayBtnOnPlaylist.classList.contains("showState")) {
        PlayBtnOnPlaylist.style.opacity = '1';
      }
      DeleteFromPlaylist.style.opacity = '1';
    });
    boxMusicList.addEventListener('mouseout', function () {  // เมื่อนำเมาส์ออกไป ที่ boxMusicList
      const insideHeartList = heart_list.querySelector('#heart_on_check');
      if (!insideHeartList.checked) {
        heart_list.style.opacity = '0';
      }
      if (!PlayBtnOnPlaylist.classList.contains("showState")) {
        PlayBtnOnPlaylist.style.opacity = '0';
      }
      DeleteFromPlaylist.style.opacity = '0';
    });

  });
  updateDateandTimeMusic(sortedSongs); // ทำหน้าที่บอกเวลาของ song added โดยการที่จะส่งจำนวนของเลพงที่อยู่ใน Playlist นั้นเข้าไป
  // -------------------------------------------------------------------------------------------------------------
  //  ส่วนของเมื่อกดเพลงใน เพล์ลิสนั้นๆ ก้อปมาจากที่เคยทำใว้แล้วใน function  fetchInitialDataArtist line 197 ขี้เกียจมานั่งไล่โค้ดละ เขียนมั่วฉิบหาย
  // -------------------------------------------------------------------------------------------------------
  playlist_id_onGlobal = '';
  playlist_id_onGlobal = playlist_id_local; // กำหนดให้รู้ว่าตอนนี้กำลังเล่น playlistไหนอยู่
  if (playlist_id_onGlobal === NowPlayingListSong) {  // ตรงส่วนของเงื่อนไขนี้ใช้ใว้เพื่อให้ปุ่ม play ด้านในplaylist สอดคล้องกับ Mediaplayด้านล่าง
    playingStateList();
    Btn_follow_Midia();
  }
  const box_music_list_btn = all_music_list.querySelectorAll('.box-music-list-btn'); // all_music_list เคยประกาศใว้แล้วที่ script line 759
  console.log(box_music_list_btn)
  box_music_list_btn.forEach((content, i) => {
    content.addEventListener('click', () => {
      isSpecialCondition = false; // ปิดการใช้งานในเงื่อนไขของ Artist
      isPlaylistCondition = true;// เปิดการใช้งานในเงื่อนไขของ Playlist
      isPrivatePlaylistCondition = false; // isPrivatePlaylistConditionเป็นเงื่อนไขที่ใช้แยก playlist ระหว่าง Admin และ User
      musicIndex = i + 1;
      const actions_playlist = document.querySelector(`.actions[actions_Playlist_id="${playlist_id_local}"]`); // ใช้ตัวแปรนี้เพื่อแทนปุ่มกดplay ที่อยู่ส่วน Hover playlist
      ClassListofButtonplaylist = ''; // ต้องใช้เพื่อเช็คจะส่ง  actions_playlist เพื่อใช้งาน function ToggleBtn_Allactions ที่อยู่ใน playPauseBtn
      ClassListofButtonplaylist = actions_playlist;
      OnplaylistSong = []; // ต้องเคลียร์ array ก่อน push ค่าเข้าไป
      const sortedSongs = SongOfPlaylist.map(playlistItem => {  // นำ song_id ที่อยู่ใน SongOfPlaylist  เพื่อกรอง array Allmusic ให้มีแค่ เพลงของ playlistนั้นๆ 
        const foundSong = allMusic.find(song => song.song_id === playlistItem.song_id); //และที่ต้องใช้ Map เนื่องจากมัน Return ค่ากลับมาได้
        OnplaylistSong.push(foundSong); // ต้องเก็บใว้ใน Array ที่เป็น global
        return foundSong;
      });
      if (playlist_id_local !== NowPlayingListSong) {
        Taglist.innerHTML = ''; // clear taglist เพื่อ Requeue ใหม่
        NowPlayingListSong = [];// ต้องเคลียร์ array ก่อน push ค่าเข้าไป
        NowPlayingListSong = playlist_id_local; // ใช้เพื่อนำมาเช็คว่า playlistไหนกำลังเล่นอยู่
        sortedSongs.forEach((music, i) => { // ไอ้ส่วนนี้ก้อปหลายที่มาก จะทำเป็นfunction ละครั้งหน้า // เป็นส่วนในการแสดงQueue ในแถบด้านขวา
          let boxlist = `<div class="box-list" box-index="${i + 1}" artist_name="${music.artist}" playlist_id="${playlist_id_local}"> 
                                          <a href="#" class="for-select"></a>
                                          <audio class="${music.src}" id="NOW${music.src}" src="../music/${music.src}"></audio>
                                          <div class="playing"></div>
                                          <div class="dot-image">               
                                              <img src="../img_song/${music.img}" alt="">
                                          </div>
                                          <div class="detail">
                                              <label for="">${music.name}</label>
                                              <span>${music.artist}</span>
                                          </div>
                                        </div>`;
          Taglist.insertAdjacentHTML("beforeend", boxlist);
        });
      }

      playingStateList();
      clicked(content)
      Btn_follow_Midia();
      ResetBtn_Allactions(ClassListofButtonplaylist)
      playingNow(); // แสดง Icon ในการเล่น
      updateImageQueue(OnplaylistSong); // update song ตามที่เรากรองออกมาจาก playlist ได้เลย 
    })
  })
}
function sortedSongsPrivatePlaylist(SongOfPlaylist, playlist_id_local) {// กรองเพลงลงไปใน playlist
  const sortedSongs = SongOfPlaylist.map(playlistItem => { /// กรอง playlist ให้ไม่มีตัวที่ถูก add ไปแล้ว
    const foundSong = allMusic.find(song => song.song_id === playlistItem.song_id);
    return foundSong;
  });
  if (sortedSongs.length == 0) {
    all_music_list.innerHTML = '';
  }
  let Song_serial_number = 1;
  all_music_list.innerHTML = '';
  sortedSongs.forEach((Song, i) => {
    const Personal_artist_list = `<div class="box-music-list" id="box-music-list${Song.song_id}" >
                                          <a href="#" class="box-music-list-btn"  box-index="${i + 1}"></a>
                                          <div class="title-of-song">
                                              <div class="playing" id="PlayBtnOnPlaylist${Song.song_id}">
                                                <i class="ri-play-fill"></i>
                                              </div>
                                              <span class="index">${Song_serial_number}</span>
                                              <img src="../img_song/${Song.img}" alt="">
                                              <div class="name-song">
                                                  <span>${Song.name}</span>
                                                  <span class="artist">${Song.artist}</span>
                                              </div>
                                          </div>
                                          <div class="Date-add-on-list">
                                            <span>5 day ago</span>
                                          </div>
                                          <div class="duration-of-song">
                                              <label class="container-music" id="heart_list${Song.song_id}">
                                                  <input type="checkbox" id="heart_on_check">
                                                  <div class="checkmark">
                                                      <svg viewBox="0 0 256 256">
                                                          <rect fill="none" height="256" width="256"></rect>
                                                          <path d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z" stroke-width="20px" stroke="#FFF" fill="none"></path>
                                                      </svg>
                                                  </div>
                                              </label>
                                              <span id="SONG${Song.song_id}" class="duration"></span>
                                              <audio class="SONG${Song.song_id}" src="../music/${Song.src}"></audio>
                                              <div class = "DeleteFromPlaylist" SongID="${Song.song_id}" id="DeleteFromPlaylist${Song.song_id}">
                                                  <a><i class="ri-close-line"></i></a>
                                              </div>
                                          </div>
                                      </div>`;

    Song_serial_number += 1;
    // เพิ่ม HTML สำหรับแต่ละเพลงลงใน all_music_list
    all_music_list.insertAdjacentHTML("beforeend", Personal_artist_list);
    //-------------------------------------------------------------------------------------------------



    let liAudioTag = all_music_list.querySelector(`.SONG${Song.song_id}`);
    let liAudioDuration = all_music_list.querySelector(`#SONG${Song.song_id}`);
    // console.log(liAudioTag);
    liAudioTag.addEventListener("loadeddata", () => {
      let audioDuration = liAudioTag.duration;
      let totalMin = Math.floor(audioDuration / 60);
      let totalSec = Math.floor(audioDuration % 60);

      if (totalSec < 10) {
        totalSec = `0${totalSec}`;
      }

      liAudioDuration.innerText = `${totalMin}:${totalSec}`;
    });

    const heart_list = document.getElementById(`heart_list${Song.song_id}`);
    const inside_heart_list = heart_list.querySelector('#heart_on_check');
    const PlayBtnOnPlaylist = document.getElementById(`PlayBtnOnPlaylist${Song.song_id}`);
    const DeleteFromPlaylist = document.getElementById(`DeleteFromPlaylist${Song.song_id}`);
    heart_list.style.opacity = '0';
    PlayBtnOnPlaylist.style.opacity = '0';
    DeleteFromPlaylist.style.opacity = '0';
    inside_heart_list.addEventListener('change', function () {
      if (this.checked) {
        heart_list.style.opacity = '1';
      } else {
        heart_list.style.opacity = '0';
      }
    });
    const boxMusicList = document.querySelector(`#box-music-list${Song.song_id}`);
    boxMusicList.addEventListener('mouseover', function () { // เมื่อนำเมาส์ไป hover ที่ boxMusicList
      const insideHeartList = heart_list.querySelector('#heart_on_check');
      if (!insideHeartList.checked) {
        heart_list.style.opacity = '1';
      }
      if (!PlayBtnOnPlaylist.classList.contains("showState")) {
        PlayBtnOnPlaylist.style.opacity = '1';
      }
      DeleteFromPlaylist.style.opacity = '1';
    });
    boxMusicList.addEventListener('mouseout', function () {  // เมื่อนำเมาส์ออกไป ที่ boxMusicList
      const insideHeartList = heart_list.querySelector('#heart_on_check');
      if (!insideHeartList.checked) {
        heart_list.style.opacity = '0';
      }
      if (!PlayBtnOnPlaylist.classList.contains("showState")) {
        PlayBtnOnPlaylist.style.opacity = '0';
      }
      DeleteFromPlaylist.style.opacity = '0';
    });

  });
  updateDateandTimeMusic(sortedSongs); // ทำหน้าที่บอกเวลาของ song added โดยการที่จะส่งจำนวนของเลพงที่อยู่ใน Playlist นั้นเข้าไป
  // -------------------------------------------------------------------------------------------------------------
  //  ส่วนของเมื่อกดเพลงใน เพล์ลิสนั้นๆ ก้อปมาจากที่เคยทำใว้แล้วใน function  fetchInitialDataArtist line 197 ขี้เกียจมานั่งไล่โค้ดละ เขียนมั่วฉิบหาย
  // -------------------------------------------------------------------------------------------------------
  playlist_id_onGlobal = '';
  playlist_id_onGlobal = playlist_id_local; // กำหนดให้รู้ว่าตอนนี้กำลังเล่น playlistไหนอยู่
  if (playlist_id_onGlobal === NowPlayingListSong) {  // ตรงส่วนของเงื่อนไขนี้ใช้ใว้เพื่อให้ปุ่ม play ด้านในplaylist สอดคล้องกับ Mediaplayด้านล่าง
    playingStateList();
    Btn_follow_Midia();
  }
  const box_music_list_btn = all_music_list.querySelectorAll('.box-music-list-btn'); // all_music_list เคยประกาศใว้แล้วที่ script line 759
  console.log(box_music_list_btn)
  box_music_list_btn.forEach((content, i) => {
    content.addEventListener('click', () => {
      isSpecialCondition = false; // ปิดการใช้งานในเงื่อนไขของ Artist
      isPlaylistCondition = true;// เปิดการใช้งานในเงื่อนไขของ Playlist
      isPrivatePlaylistCondition = true; // isPrivatePlaylistConditionเป็นเงื่อนไขที่ใช้แยก playlist ระหว่าง Admin และ User
      musicIndex = i + 1;
      const actions_playlist = document.querySelector(`.actions[actions_Playlist_id="${playlist_id_local}"]`); // ใช้ตัวแปรนี้เพื่อแทนปุ่มกดplay ที่อยู่ส่วน Hover playlist
      ClassListofButtonplaylist = ''; // ต้องใช้เพื่อเช็คจะส่ง  actions_playlist เพื่อใช้งาน function ToggleBtn_Allactions ที่อยู่ใน playPauseBtn
      ClassListofButtonplaylist = actions_playlist;
      OnplaylistSong = []; // ต้องเคลียร์ array ก่อน push ค่าเข้าไป
      const sortedSongs = SongOfPlaylist.map(playlistItem => {  // นำ song_id ที่อยู่ใน SongOfPlaylist  เพื่อกรอง array Allmusic ให้มีแค่ เพลงของ playlistนั้นๆ 
        const foundSong = allMusic.find(song => song.song_id === playlistItem.song_id); //และที่ต้องใช้ Map เนื่องจากมัน Return ค่ากลับมาได้
        OnplaylistSong.push(foundSong); // ต้องเก็บใว้ใน Array ที่เป็น global
        return foundSong;
      });
      if (playlist_id_local !== NowPlayingListSong) {
        Taglist.innerHTML = ''; // clear taglist เพื่อ Requeue ใหม่
        NowPlayingListSong = [];// ต้องเคลียร์ array ก่อน push ค่าเข้าไป
        NowPlayingListSong = playlist_id_local; // ใช้เพื่อนำมาเช็คว่า playlistไหนกำลังเล่นอยู่
        sortedSongs.forEach((music, i) => { // ไอ้ส่วนนี้ก้อปหลายที่มาก จะทำเป็นfunction ละครั้งหน้า // เป็นส่วนในการแสดงQueue ในแถบด้านขวา
          let boxlist = `<div class="box-list" box-index="${i + 1}" artist_name="${music.artist}" playlist_id="${playlist_id_local}"> 
                                          <a href="#" class="for-select"></a>
                                          <audio class="${music.src}" id="NOW${music.src}" src="../music/${music.src}"></audio>
                                          <div class="playing"></div>
                                          <div class="dot-image">               
                                              <img src="../img_song/${music.img}" alt="">
                                          </div>
                                          <div class="detail">
                                              <label for="">${music.name}</label>
                                              <span>${music.artist}</span>
                                          </div>
                                        </div>`;
          Taglist.insertAdjacentHTML("beforeend", boxlist);
        });
      }

      playingStateList();
      clicked(content)
      Btn_follow_Midia();
      playingNow(); // แสดง Icon ในการเล่น
      updateImageQueue(OnplaylistSong); // update song ตามที่เรากรองออกมาจาก playlist ได้เลย 
    })
  })
}

const add_catagory_popup = document.querySelector('.add-catagory-popup');
const catagory_btn = add_catagory_popup.querySelector('.catagory-btn button');
const Select_artist_popup = document.getElementById('Select-artist-popup'),
  artist_box_content = Select_artist_popup.querySelector('.wrapper-box'),
  box_artist_playlist = artist_box_content.querySelectorAll('.box');
document.addEventListener("DOMContentLoaded", function () {
  fetchInitialDataCategory();
  fetchInitialDataArtist();
  fetchInitialPrivateUserPlaylist(UserID);

  ArtistMusic.forEach((item, i) => {
    let box_artist = ` <div class="box">
                              <div class="detail">
                                  <div class="title-index">
                                      <span>${i + 1}</span>
                                  </div>
                                  <div class="wrap-img">
                                      <img src="../img/${item.img_file}" alt="">
                                  </div>
                                  <div class="wrap-name">
                                      <span>${item.artist_name}</span>
                                  </div>
                              </div>
                              <div class="add-to-playlist">
                                  <a href="#"  id="playlist-link-${item.artist_id}" playlist-artist-index="${item.artist_id}">Add-to-playlist</a>
                              </div>
                          </div>`
    artist_box_content.insertAdjacentHTML("beforeend", box_artist);

    const playlistLink = document.getElementById(`playlist-link-${item.artist_id}`);
    fetchInitialUseOrNot(playlistLink, item.artist_id);

    playlistLink.addEventListener('click', function (event) {
      event.preventDefault();
      const artistId = this.getAttribute('playlist-artist-index');
      if (playlistLink.classList.contains('being-used')) {
        playlistLink.classList.remove('being-used');
        playlistLink.classList.add('not-being-used');
        playlistLink.innerText = 'Add-to-playlist';
        DeleteOrAddPlaylistArtist(artistId);
      } else {
        UseOrNot(playlistLink, artistId, i);
      }
    });
  });
});

catagory_btn.addEventListener('click', function (even) {
  even.preventDefault();
  saveCatagory();
});


// ----------------------------------------------------
// ใช้สำหรับ popup ที่จะกดSave ของปุ่ม แล้วให้ปิดไปตามคำสั่ง
// ----------------------------------------------------

function closePopup_catagory_popup() {  // ใช้function เพื่อปิด popup catagory 
  const overlay = document.querySelector('.overlay');
  add_catagory_popup.classList.remove("active");
  overlay.classList.remove("active");
}
function close_Delete_playlist_popup() {  // ใช้function เพื่อปิด popup catagory 
  const Delete_song_popup_onlist = document.querySelector('.Delete-song-popup-onlist');
  const overlay = document.querySelector('.overlay');
  Delete_song_popup_onlist.classList.remove("active");
  overlay.classList.remove("active");
}
function closeSetting_detail_popup() {
  const Setting_detail_popup = document.querySelector('.Setting-detail-popup');
  const overlay = document.querySelector('.overlay');
  Setting_detail_popup.classList.remove("active");
  overlay.classList.remove("active");
}
function closeEdit_category() {
  const Edit_catagory_popup = document.querySelector('.Edit-catagory-popup');
  const overlay = document.querySelector('.overlay');
  Edit_catagory_popup.classList.remove("active");
  overlay.classList.remove("active");
}
function closeDelete_category() {
  const Delete_category = document.querySelector('.Delete-category');
  const overlay = document.querySelector('.overlay');
  Delete_category.classList.remove("active");
  overlay.classList.remove("active");
}

// ----------------------------------------------------
// ใช้สำหรับ function ในการ update ค่าต่างๆ
// ----------------------------------------------------

function updateDateandTimeMusic(SongOfPlaylist) {
  const dateAddonElement = document.querySelectorAll(".Date-add-on-list");
  for (i = 0; i < SongOfPlaylist.length; i++) {
    const Song = allMusic.find(findSong => findSong.song_id === SongOfPlaylist[i].song_id);

    const MusicDate = new Date(Song.DateAdded);
    const diffTime = Math.abs(songAddedDate - MusicDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // แสดงผลลัพธ์ในส่วนของ "Date-add-on"
    dateAddonElement[i].innerHTML = `<span>${diffDays} day${diffDays !== 1 ? 's' : ''} ago</span>`;
  }
}
function updateDateandTimeMusicPerOne(Song, index) {
  const dateAddonElement = document.querySelectorAll(".Date-add-on-list");

  const MusicDate = new Date(Song.DateAdded);
  const diffTime = Math.abs(songAddedDate - MusicDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  // แสดงผลลัพธ์ในส่วนของ "Date-add-on"
  dateAddonElement[index].innerHTML = `<span>${diffDays} day${diffDays !== 1 ? 's' : ''} ago</span>`;
}

function SaveDetail(playlist_id) { // function  ที่ใช้ในการ Save detail
  const formData = new FormData();
  const wrap_Setting_detail_main = document.querySelector('.wrap-Setting-detail-main')
  let fileInput = document.getElementById('file-detail-playlist');
  let nameInput = document.getElementById('In-Name-detail');
  let warningDisplayed = document.querySelector('.warningDisplayed');
  if (warningDisplayed) {
    warningDisplayed.remove();
  }
  if (nameInput.value.trim() !== '') {
    formData.append('file-img-playlist', fileInput.files[0]);
    formData.append('name-detail', nameInput.value.trim());
    formData.append('playlistID', playlist_id);
    fileInput.value = '';
    nameInput.value = '';
    console.log(playlist_id)
    fetch('../API/SetdetailPlaylist.php', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok on submit_detail')
        }
        return response.text();
      })
      .then(data => {
        console.log(data);
        updateBannerHeaderplaylist(playlist_id);
        let warningDisplayed = document.querySelector('.warningDisplayed');
        if (warningDisplayed) {
          warningDisplayed.remove();
        }
        closeSetting_detail_popup();
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  } else {
    let waring = `<p class="warningDisplayed" style="color: red;">ฮั่นแน่ กำลังหาบัคนะน่ะ~</p>`;
    wrap_Setting_detail_main.insertAdjacentHTML('beforebegin', waring);
  }
}

function updateBannerHeaderplaylist(playlist_id) {
  fetch(`../API/Data_playlist.php?playlist_id=${playlist_id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response Data_playlis was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // ----------------------------------------------------
      // ส่วนแสดงผลรูปภาพ หน้าปก playlist
      // ตรงนีเป็นส่วนของการ เปลี่นนรูปเวลาที่มีการคลิกแต่ละเพลง
      // ----------------------------------------------------
      console.log(data[0]);
      const In_Name_detail = document.getElementById('In-Name-detail');
      const playlistImage = data[0].playlist_image ? `../img_playlist/${data[0].playlist_image}` : '../img_playlist/music-icon.jpg';
      const dot_title = data[0].playlist_name ? data[0].playlist_name : `playlist` + `${data[0].playlist_id}`

      const img_forShow = document.querySelector('.img-forShow');
      if (img_forShow) {
        img_forShow.setAttribute("src", playlistImage);
      } else {
        console.error("Element with class .img-forShow not found.");
      }
      In_Name_detail.value = data[0].playlist_name;


      data.forEach(content => {
        const playlistImage = content.playlist_image ? `../img_playlist/${content.playlist_image}` : '../img_playlist/music-icon.jpg';
        let someListImage = `<img src="${playlistImage}">`;
        let somePlaylist_title = `<p>playlist</p>
                                <h1 class="artist">${dot_title}</h1>
                                <p class="associate-artist">${dot_title}, Musketeers ,follow and more</p>
                                <div class="detail">
                                    <i class="ri-music-fill"></i>Spotify
                                    <span>•</span>
                                    <p class="amout-of-song">0song,</p>
                                </div>`;

        playlist_image.innerHTML = someListImage;
        playlist_title.innerHTML = somePlaylist_title;
      });
    })
    .catch(error => {
      console.error("Error", error)
    });
}

// ไว้สำหรับอัพเดทรูป ถูกเรียกใช้ที่ Homepage active handleButtonClick active.js line 72
const updateThumbnail = update => {
  document.querySelectorAll('.thumbnail > img').forEach(content => {
    const filteredData = update.find(data => data.playlist_id === content.getAttribute("playlist_id"));
    if (filteredData) {
      const playlistImage = filteredData.playlist_image ? `../img_playlist/${filteredData.playlist_image}` : '../img_playlist/music-icon.jpg';
      content.setAttribute("src", playlistImage);
    }
  });
};
// ไว้สำหรับอัพเดพชื่อ Playlist ถูกเรียกใช้ที่ Homepage active handleButtonClick active.js line 72
const updateDotTitle = update => {
  document.querySelectorAll('.dot-title > a[playlist_id]').forEach(content => {
    const filteredData = update.find(data => data.playlist_id === content.getAttribute("playlist_id"));
    const dot_title = filteredData.playlist_name ? filteredData.playlist_name : `playlist` + `${filteredData.playlist_id}`

    if (dot_title) {
      content.textContent = dot_title;
    }
  });
};


// ---------------------------------------------------------------------------------------------
//   ที่ต้องทำใว้ 2 function เพราะ วางแผนมาไม่ดี ทำให้ ถ้า Allactions_playlist 
//   ถ้าโดยอิงจาก document ทั้งหมด มันจะทำให้ เกิดการ ซ้อนทับfunctionกัน และ stack ค่าไปเรื่อยๆ เลยต้องใช้วิธีนี้
// ---------------------------------------------------------------------------------------------
function SetupActionsPlaylists() {
  // -----------------------------------------------------------------------------
  // ส่วนนี้จะเป็นของปุ่มplay ที่อยู่ด้านในของ playlist แต่ละตัว เป็นแค่การแสดงผลเมื่อมีการคลิกเฉยๆ
  // -----------------------------------------------------------------------------
  const Allactions_playlist = document.querySelectorAll('.actions:not(.artist)');
  Allactions_playlist.forEach(actions_playlist => {
    actions_playlist.addEventListener('click', () => {
      fetch('../API/API_playlist_song.php')
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response from Allactions_playlist was not ok")
          }
          return response.json();
        })
        .then(data_action => {
          const playlist_id_local = actions_playlist.getAttribute("actions_Playlist_id");
          const SongOfPlaylist = data_action.filter(data_playlist => data_playlist.playlist_id === `${playlist_id_local}`) // จากนั้นก็กรองด้วย filter 


          OnplaylistSong = []; // ต้องเคลียร์ array ก่อน push ค่าเข้าไป
          const sortedSongs = SongOfPlaylist.map(playlistItem => {  // นำ song_id ที่อยู่ใน SongOfPlaylist  เพื่อกรอง array Allmusic ให้มีแค่ เพลงของ playlistนั้นๆ 
            const foundSong = allMusic.find(song => song.song_id === playlistItem.song_id); //และที่ต้องใช้ Map เนื่องจากมัน Return ค่ากลับมาได้
            OnplaylistSong.push(foundSong); // ต้องเก็บใว้ใน Array ที่เป็น global
            return foundSong;
          });
          console.log(sortedSongs)
          ClassListofButtonplaylist = ''; // ต้องใช้เพื่อเช็คจะส่ง  actions_playlist เพื่อใช้งาน function ToggleBtn_Allactions ที่อยู่ใน playPauseBtn
          ClassListofButtonplaylist = actions_playlist;
          if (sortedSongs.length === 0) {
            alert("ไม่มีเพลงใน playlist ไปAddก่อนโว้ยยย")
            console.log("ไม่มีเพลงใน playlist");
            // แจ้งเตือนหรือแสดงข้อความบน UI เพื่อแจ้งให้ผู้ใช้ทราบว่าไม่มีเพลงใน playlist
          } else {
            // กระบวนการปกติเมื่อมีเพลงใน playlist
            ClassListofButtonplaylist = '';
            ClassListofButtonplaylist = actions_playlist;
            let countSong = 1;
            musicIndex = 1;
            if (playlist_id_local !== NowPlayingListSong) {
              Taglist.innerHTML = '';
              isSpecialCondition = false; // เงื่อนไขมั่ว ทำมาแล้วเลยใช้ๆไป  เป็นส่วนของAdmin หน้า Upload
              isPlaylistCondition = true; // เงื่อนเพื่อบอกว่านี่คือ playlist ปกติ ที่ adminสร้าง 
              isPrivatePlaylistCondition = false; // isPrivatePlaylistConditionเป็นเงื่อนไขที่ใช้แยก playlist ระหว่าง Admin และ User
              sortedSongs.forEach((music, i) => {
                NowPlayingListSong = [];
                NowPlayingListSong = playlist_id_local;
                let boxlist = `<div class="box-list" box-index="${countSong}" artist_name="${music.artist}" playlist_id="${playlist_id_local}"> 
                                                <a href="#" class="for-select"></a>
                                                <audio class="${music.src}" id="NOW${music.src}" src="../music/${music.src}"></audio>
                                                <div class="playing"></div>
                                                <div class="dot-image">               
                                                    <img src="../img_song/${music.img}" alt="">
                                                </div>
                                                <div class="detail">
                                                    <label for="">${music.name}</label>
                                                    <span>${music.artist}</span>
                                                </div>
                                              </div>`;
                Taglist.insertAdjacentHTML("beforeend", boxlist);
                countSong++;
              });
              resetBtn();
              playingNow();
              updateImageQueue(OnplaylistSong);
              loadMusicOnplaylist(musicIndex, OnplaylistSong)
              MusicPlayer.playMusic();
              ToggleBtn_Allactions(ClassListofButtonplaylist);
            } else {
              isMusicPaused = music_box.classList.contains("paused");
              isMusicPaused ? MusicPlayer.pauseMusic() : MusicPlayer.playMusic();
              togglePlayStop();
              ToggleBtn_Allactions(ClassListofButtonplaylist);
            }
          }


        })
        .catch((error) => {
          console.error("Error:", error);
          alert("There was a problem fetching Allactions data.")
        });
    });
  });
}
function SetupActionsPlaylistsArtist() {
  // -----------------------------------------------------------------------------
  // ส่วนนี้จะเป็นของปุ่มplay ที่อยู่ด้านในของ playlist แต่ละตัว เป็นแค่การแสดงผลเมื่อมีการคลิกเฉยๆ
  // -----------------------------------------------------------------------------
  const Allactions_playlist = document.querySelectorAll('.actions.artist');
  Allactions_playlist.forEach(actions_playlist => {
    actions_playlist.addEventListener('click', () => {
      fetch('../API/API_playlist_song.php')
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response from Allactions_playlist was not ok")
          }
          return response.json();
        })
        .then(data_action => {
          const playlist_id_local = actions_playlist.getAttribute("actions_Playlist_id");
          const SongOfPlaylist = data_action.filter(data_playlist => data_playlist.playlist_id === `${playlist_id_local}`) // จากนั้นก็กรองด้วย filter 


          OnplaylistSong = []; // ต้องเคลียร์ array ก่อน push ค่าเข้าไป
          const sortedSongs = SongOfPlaylist.map(playlistItem => {  // นำ song_id ที่อยู่ใน SongOfPlaylist  เพื่อกรอง array Allmusic ให้มีแค่ เพลงของ playlistนั้นๆ 
            const foundSong = allMusic.find(song => song.song_id === playlistItem.song_id); //และที่ต้องใช้ Map เนื่องจากมัน Return ค่ากลับมาได้
            OnplaylistSong.push(foundSong); // ต้องเก็บใว้ใน Array ที่เป็น global
            return foundSong;
          });
          console.log(sortedSongs)
          ClassListofButtonplaylist = ''; // ต้องใช้เพื่อเช็คจะส่ง  actions_playlist เพื่อใช้งาน function ToggleBtn_Allactions ที่อยู่ใน playPauseBtn
          ClassListofButtonplaylist = actions_playlist;
          if (sortedSongs.length === 0) {
            alert("ไม่มีเพลงใน playlist ไปAddก่อนโว้ยยย")
            console.log("ไม่มีเพลงใน playlist");
            // แจ้งเตือนหรือแสดงข้อความบน UI เพื่อแจ้งให้ผู้ใช้ทราบว่าไม่มีเพลงใน playlist
          } else {
            // กระบวนการปกติเมื่อมีเพลงใน playlist
            ClassListofButtonplaylist = '';
            ClassListofButtonplaylist = actions_playlist;
            let countSong = 1;
            musicIndex = 1;
            if (playlist_id_local !== NowPlayingListSong) {
              Taglist.innerHTML = '';
              isSpecialCondition = false;
              isPlaylistCondition = true;
              isPrivatePlaylistCondition = false; // isPrivatePlaylistConditionเป็นเงื่อนไขที่ใช้แยก playlist ระหว่าง Admin และ User
              sortedSongs.forEach((music, i) => {
                NowPlayingListSong = [];
                NowPlayingListSong = playlist_id_local;
                let boxlist = `<div class="box-list" box-index="${countSong}" artist_name="${music.artist}" playlist_id="${playlist_id_local}"> 
                                                  <a href="#" class="for-select"></a>
                                                  <audio class="${music.src}" id="NOW${music.src}" src="../music/${music.src}"></audio>
                                                  <div class="playing"></div>
                                                  <div class="dot-image">               
                                                      <img src="../img_song/${music.img}" alt="">
                                                  </div>
                                                  <div class="detail">
                                                      <label for="">${music.name}</label>
                                                      <span>${music.artist}</span>
                                                  </div>
                                                </div>`;
                Taglist.insertAdjacentHTML("beforeend", boxlist);
                countSong++;
              });
              resetBtn();
              playingNow();
              updateImageQueue(OnplaylistSong);
              loadMusicOnplaylist(musicIndex, OnplaylistSong)
              MusicPlayer.playMusic();
              ToggleBtn_Allactions(ClassListofButtonplaylist);
            } else {
              isMusicPaused = music_box.classList.contains("paused");
              isMusicPaused ? MusicPlayer.pauseMusic() : MusicPlayer.playMusic();
              togglePlayStop();
              ToggleBtn_Allactions(ClassListofButtonplaylist);
            }
          }


        })
        .catch((error) => {
          console.error("Error:", error);
          alert("There was a problem fetching Allactions data.")
        });
    });
  });
}

// ----------------------------------------------------------
//  function ที่ใช้ในการจัดการ Save  และ Delete ของ category
// -------------------------------------------------------------

function SaveEditNameCategory(category_id, category_name) {
  let formData = new FormData();
  formData.append("category_id", category_id)
  formData.append("category_name", category_name)
  fetch("../API/Edit_category.php", {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok on SaveEditNameCategory")
      }
      response.text();
    })
    .catch(error => {
      console.error("Error", error)
    })
}
function DeleteCategory(category_id) {
  let formData = new FormData();
  formData.append("category_id", category_id)
  fetch("../API/Delete_category.php", {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error was error on DeleteCategory")
      }
      response.text()
    })
    .catch(error => {
      console.error("Error", error)
    })
}


// ----------------------------------------------------------
//  function ที่ใช้ในการจัดการ Private User Playlist
// -------------------------------------------------------------
function fetchAddSongToPrivatePlaylist(playlist_id) {//เหมือนกับ fetchInitialData() นั่นแหละ แต่เป็นของ Playlist Artist 

  const insert_song = document.querySelector(".insert_song"); // เปิดส่วน search ที่ต้องการจะ add เพลง
  insert_song.style.display = "block";

  fetch("../API/API_playlist_song.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data_playlist) => {
      const SongOfPlaylist = data_playlist.filter(data => data.playlist_id === playlist_id)
      const sortedSongs = allMusic.filter(playlistItem => { /// กรอง playlist ให้ไม่มีตัวที่ถูก add ไปแล้ว
        const foundSong = SongOfPlaylist.find(song => song.song_id === playlistItem.song_id);
        if (!foundSong) {
          return true;
        }
        return false;
      });

      sortedSongsPrivatePlaylist(SongOfPlaylist, playlist_id);

      insert_song.innerHTML = ''; // clear ข้อมูลก่อน
      let insert_song_var = `<div class="insert_song-header">
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
                              </div>`;
      insert_song.insertAdjacentHTML("beforeend", insert_song_var);
      sortedSongs.forEach(data => { // ข้อมูลเมื่อต้องการ insert ข้อมูล
        let insert_song_main_var = `<div class="insert_song-main">
                                        <div class="wrapper">
                                            <div class="img_insert_song">
                                                <img src="../img_song/${data.img}" alt="">
                                            </div>
                                            <div class="insert_song_title">
                                                <h2>${data.name}</h2>
                                                <p>${data.artist}</p>
                                            </div>
                                        </div>
                                        <div class="content-add-song-btn" song_id = ${data.song_id}>
                                            <a href="#" class="add-song-btn">Add</a>
                                        </div>
                                    </div>`;
        insert_song.insertAdjacentHTML("beforeend", insert_song_main_var)
      })
      const content_add_song_btn = document.querySelectorAll(".content-add-song-btn");
      content_add_song_btn.forEach(add => {
        add.addEventListener('click', () => {
          addSongToPlaylist(playlist_id, add.getAttribute("song_id"), (SongOfPlaylist.length))
        })
      });
      const DeleteFromPlaylist = document.querySelectorAll('.DeleteFromPlaylist')
      DeleteFromPlaylist.forEach(Del => {
        Del.addEventListener('click', () => {
          let song_id = Del.getAttribute("SongID")
          console.log(song_id)
          DeletePlaylistSong(playlist_id, song_id)
        });
      });
      updateDateandTimeMusic(SongOfPlaylist);
    })
    .catch((error) => {
      console.error("Error: fetchInitialInplaylist", error);
    });
}
function fetchAddPrivateUserPlaylist() {

}
function fetchInitialPrivateUserPlaylist(UserID) {
  const form_playlist_private = document.getElementById('form-playlist-private');
  const Setting_detail_main = document.querySelector('.Setting-detail-main');
  let fromdata = new FormData();
  fromdata.append("UserID", UserID)
  fetch("../API/Data_playlistPrivate.php", {
    method: "POST",
    body: fromdata
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("response was not ok in PrivateUsePlaylistr")
      }
      return response.json();
    })
    .then(data => {
      form_playlist_private.innerHTML = ''
      data.forEach(item => {
        const playlistImage = item.playlist_image ? `../img_playlist/${item.playlist_image}` : '../img_playlist/music-icon.jpg';
        const dot_title = item.playlist_name ? item.playlist_name : `playlist` + `${item.playlist_id}`
        let listitem_var = `<a href="#">
                                <li class="listitem" playlist_id = ${item.playlist_id}>
                                    <img src="${playlistImage}" alt="">
                                    <div class="detail">
                                        <p>${dot_title}</p>
                                        <span>Playlist | ${Username}</span>
                                    </div>
                                </li>
                              </a>`;
        form_playlist_private.insertAdjacentHTML("beforeend", listitem_var);
      });

      listItems_btn();

      const listitem_front = document.querySelectorAll('.listitem');
      listitem_front.forEach((content, index) => {
        content.addEventListener("click", (event) => {
          event.preventDefault();
          let playlist_id_local = content.getAttribute("playlist_id");

          fetch("../API/API_playlist_song.php")
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response from playlist_song was not ok")
              }
              return response.json();
            })
            .then((data_playlist_song) => {
              // console.log(data_playlist_song)

              //ในส่วนนี้ไม่มีอะไร แค่เข้าถึง CSS ในการแก้ใขในเรื่อง permission ของ User ที่จะมองเห็น
              const nav_title_element = document.querySelector(".nav-title > .duration-time span");
              const nav_title_element2 = document.querySelector(".nav-title > .duration-time");
              const nav_title_element3 = document.querySelector(".nav-title > .Date-add");
              nav_title_element3.style.width = "130px"
              nav_title_element2.style.width = "80px";
              nav_title_element.style.display = "none";
              // ---------------------------------------------------------------------------
              // เราจะเอาข้อมูล โดยที่จะใช้  playlist_id ระบุเป้าหมาย

              // playlist_nav ไม่ต้อง งงว่ามาจากไหน ก้้อปมาจาก script.js line 831 ส่วนของ for_upload_content
              let playlist_nav_var = `<div class="Pnav-left">
                                                <i class="ri-play-circle-fill" Pnav-index="${playlist_id_local}"></i>
                                                <label class="container-music">
                                                    <input type="checkbox">
                                                    <div class="checkmark">
                                                        <svg viewBox="0 0 256 256">
                                                            <rect fill="none" height="256" width="256"></rect>
                                                            <path d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z" stroke-width="20px" stroke="#FFF" fill="none"></path>
                                                        </svg>
                                                    </div>
                                                </label>
                                                <div class= "more-setting">
                                                  <i class="ri-more-line"></i>
                                                </div>
                                                <div class="more-setting-detail">
                                                    <div class="wrapper">
                                                        <a href="#" id="Edit-playlist" trigger-button data-target="Setting-detail-popup"><i class="ri-edit-line"></i><span>Edit Detail</span></a>
                                                        <a href="#" id="delete-playlist" trigger-button data-target ="Delete-song-popup-onlist"><i class="ri-subtract-line"></i><span>Delete playlist</span></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="Pnav-right">
                                                <a href="#">list <i class="ri-list-check"></i></a>
                                            </div>`
              playlist_nav.innerHTML = playlist_nav_var;

              // ----------------------------------------------------
              // ส่วนแสดงผลรูปภาพ หน้าปก playlist
              // ตรงนีเป็นส่วนของการ เปลี่นนรูปเวลาที่มีการคลิกแต่ละเพลง
              // ----------------------------------------------------
              Setting_detail_main.innerHTML = ''; // ต้อง สร้าง form ขึ้นมาใหม่เพราะ ถ้าไม่ทำแบบนี้มันจะ stack ค่า ไปเรื่อยๆ ลองแก้ละไม่ได้สักทีปวดหัวฉิบหาย
              let Setting_detail_main_var = `<div>
                                                    <div class="wrap-Setting-detail-main">
                                                        <label for="file-detail-playlist" class="custum-file-upload" id="custum-detail-playlist-upload">
                                                            <div class="icon">
                                                                <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path> </g></svg>
                                                            </div>
                                                            <input id="file-detail-playlist" type="file" accept="image/*" name="file-img-playlist">
                                                            <img class="img-forShow">
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
                                                </div>`;
              Setting_detail_main.insertAdjacentHTML('beforeend', Setting_detail_main_var);

              const submit_detail = document.querySelector('.submit-detail');
              submit_detail.addEventListener('click', () => {
                console.log(playlist_id_local);
                SaveDetail(playlist_id_local);
              });

              const Delete_confirm = document.querySelector('.Delete-song-popup-onlist .Delete-confirm');
              Delete_confirm.innerHTML = '';
              let Delete_confirm_var = `
                                            <form>
                                                <a href="#" class="cancel-confirm" close-button >Cancle</a>
                                                <button class="delete-song-playlist">Confirm</button>
                                            </form>`;
              Delete_confirm.insertAdjacentHTML("beforeend", Delete_confirm_var)
              const delete_song_playlist = document.querySelector('.delete-song-playlist');
              delete_song_playlist.addEventListener('click', () => {
                DeletePlaylist(playlist_id_local) // ส่งค่าไปเมื่อจะทำการลบ Playlist นั้นๆ
              });

              triggerOpen();
              upload_img_custum_detail(); // function ที่ใช้ในการ upload file รูป มาจาก active.js line 327


              updateBannerHeaderplaylist(playlist_id_local);
              fetchAddSongToPrivatePlaylist(playlist_id_local);// แสดง ขอมูลที่ต้องการจะ Add music เข้ามา
              // ------------------------------------------------------
              // SongOfPlaylist เป็นส่วนของ List ย่อยๆ ใน playlist
              // ------------------------------------------------------
              const SongOfPlaylist = data_playlist_song.filter(data_playlist => data_playlist.playlist_id === `${playlist_id_local}`) // จากนั้นก็กรองด้วย filter 
              console.log(SongOfPlaylist);
              // -----------------------------------------------------------------
              // ด้านล่างนี้เป็นส่วนของ เปิดหน้า popup ขึ้นมาและ set detail ของ playlist นั้น
              // -----------------------------------------------------------------
              const more_setting = document.querySelector(".more-setting");
              const more_setting_detail = document.querySelector(".more-setting-detail");
              more_setting.addEventListener('click', () => {
                more_setting_detail.classList.toggle("active");
              });



              const Pnav_left = document.querySelector(".Pnav-left"),
                Btn_green = Pnav_left.querySelector("i");
              Btn_green.addEventListener('click', () => {
                resetActions();
                isSpecialCondition = false; // ปิดการใช้งานในเงื่อนไขของ Artist
                isPlaylistCondition = true;// เปิดการใช้งานในเงื่อนไขของ Playlist
                isPrivatePlaylistCondition = true;// isPrivatePlaylistConditionเป็นเงื่อนไขที่ใช้แยก playlist ระหว่าง Admin และ User
                OnplaylistSong = []; // ต้องเคลียร์ array ก่อน push ค่าเข้าไป
                const sortedSongs = SongOfPlaylist.map(playlistItem => {  // นำ song_id ที่อยู่ใน SongOfPlaylist  เพื่อกรอง array Allmusic ให้มีแค่ เพลงของ playlistนั้นๆ 
                  const foundSong = allMusic.find(song => song.song_id === playlistItem.song_id); //และที่ต้องใช้ Map เนื่องจากมัน Return ค่ากลับมาได้
                  OnplaylistSong.push(foundSong); // ต้องเก็บใว้ใน Array ที่เป็น global
                  return foundSong;
                });
                let countSong = 1;
                musicIndex = 1; // set music เป็น 1 ตามarray ที่เรากรองมา
                if (playlist_id_local !== NowPlayingListSong) {
                  Taglist.innerHTML = '';
                  NowPlayingListSong = [];// ต้องเคลียร์ array ก่อน push ค่าเข้าไป
                  NowPlayingListSong = playlist_id_local; // ใช้เพื่อนำมาเช็คว่า playlistไหนกำลังเล่นอยู่
                  sortedSongs.forEach((music, i) => {
                    let boxlist = `<div class="box-list" box-index="${countSong}" artist_name="${music.artist}" playlist_id="${playlist_id_local}"> 
                                                <a href="#" class="for-select"></a>
                                                <audio class="${music.src}" id="NOW${music.src}" src="../music/${music.src}"></audio>
                                                <div class="playing"></div>
                                                <div class="dot-image">               
                                                    <img src="../img_song/${music.img}" alt="">
                                                </div>
                                                <div class="detail">
                                                    <label for="">${music.name}</label>
                                                    <span>${music.artist}</span>
                                                </div>
                                              </div>`;
                    Taglist.insertAdjacentHTML("beforeend", boxlist);
                    countSong++;
                  });
                  resetBtn();
                  Btn_insite();
                  playingStateList();
                  playingNow(); // แสดง Icon ในการเล่น
                  updateImageQueue(OnplaylistSong); // update song ตามที่เรากรองออกมาจาก playlist ได้เลย 
                  loadMusicOnplaylist(musicIndex, OnplaylistSong)// ส่งตำแหน่งของเพลงออกไป
                  MusicPlayer.playMusic();
                } else {
                  isMusicPaused = music_box.classList.contains("paused");
                  isMusicPaused ? MusicPlayer.pauseMusic() : MusicPlayer.playMusic();
                  Btn_insite();
                  togglePlayStop();
                }
              })
              console.log(musicIndex)

              // อันนี้เป็นส่วนของ การแสดงผลแต่ละ layout ต่างๆ ที่ถูกปิดใว้

              Goto_page_list.classList.add('active');
              container_top.classList.add("active");
              Goto_home_page.classList.remove('active');
              Goto_search_page.classList.remove('active');
              insite_upload_page.classList.remove('active');
            })
            .catch((error) => { // ดัก error ของ ../API/API_playlist_song.php
              console.error("Error: fetchInitialPrivateplaylist", error);
            });
        });
      });
    })
    .catch(error => {
      console.error("Error", error)
    })
}


const AddPrivatePlaylist = document.getElementById('AddPrivatePlaylist'); // ส่วนของ การสร้างเพล์ลิส ของ USER
AddPrivatePlaylist.addEventListener('click', () => {

  listItems_btn();
});

