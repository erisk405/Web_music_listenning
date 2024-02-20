

// --------------------------------

// ส่วนของการฟังเพลงแล้วจ้าตรงนี้

// --------------------------------

const songAddedDate = new Date(); // วันที่ปัจจุบัน

const music_box = document.querySelector(".music-box"),
  musicImg = music_box.querySelector(".image-area img"),
  musicName = music_box.querySelector(".detail .name"),
  musicArtist = music_box.querySelector(".detail .artist"),
  mainAudio = music_box.querySelector("#main-audio"),
  playPauseBtn = music_box.querySelector(".play-stop"),
  prevBtn = music_box.querySelector("#skip-left"),
  nextBtn = music_box.querySelector("#skip-right"),
  progressArea = music_box.querySelector(".progress-area"),
  progressBar = music_box.querySelector(".progess-bar");

// จริงๆจะsetเป็น  musicIndex  = 2 ก็ได้แต่แค่อยากให้มัน random ตอน page refresh เฉยๆ ไม่มีไร
let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
let isSpecialCondition = false;  // เงื่อนไข เมื่อเปิดเพลงในการกรองศิลปินของ Admin
let isPlaylistCondition = false; // เงื่อนไข เมื่อเปิดเพลงในแต่ละ playlist ของ Admin
let isPrivatePlaylistCondition = false;// เป็นเงื่อนไขที่ใช้แยก playlist ระหว่าง Admin และ User
let OnplaylistSong = [];// ข้อมูลเพลงใน playlist 
let NowPlayingListSong = [];  // เก็บสถานะของ playlist ว่า playlist ไหนกำลังเล่นอยู่
let playlist_id_onGlobal = '';

window.addEventListener("load", () => {
  loadMusic(musicIndex); //calling load music function once window loaded
  playingNow();
  updateImageQueue(allMusic);
  RemoveMusicState();
});



// load music function
function loadMusic(indexNumb) {
  // ตรงนี้ต้องแน่ใจว่า allMusic มีค่าหรือไม่ และ indexNumb ที่ส่งมาต้องไม่เกินขอบเขตของ allMusic.length
  if (allMusic && indexNumb >= 1 && indexNumb <= allMusic.length) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `../img_song/${allMusic[indexNumb - 1].img}`;
    mainAudio.src = `../music/${allMusic[indexNumb - 1].src}`;
  } else {
    console.error('Invalid index or allMusic is not defined');
  }
}

// load music function ของ playlist
function loadMusicOnplaylist(indexNumb, sortedSongs) { // ณับ indexของเพลงเข้ามา และ รับ array ที่เพลงในplaylist ที่ถูกsorted แล้ว
  if (sortedSongs && indexNumb >= 1 && indexNumb <= sortedSongs.length) {
    musicName.innerText = sortedSongs[indexNumb - 1].name;
    musicArtist.innerText = sortedSongs[indexNumb - 1].artist;
    musicImg.src = `../img_song/${sortedSongs[indexNumb - 1].img}`;
    mainAudio.src = `../music/${sortedSongs[indexNumb - 1].src}`;
  } else {
    console.error('Invalid index or allMusic is not defined');
  }
}


// ฟังชั่นมีใว้เพื่อกรองเพลงใน category ที่เป็นของ ศิลปินเท่านั้น โดยจะให้ filter ในการกรองarray ตัวนั้นๆ  เดี๋ยวกลับมาcommentนะ เหนื่อยมาก กลับไปกับfunctionตัวเดีบว
function loadMusicByArtist(indexNumb, artistName) { // ok เอาสรุปก็ จำเป็นต้องส่ง ชื่อ ศิลปินคนนั้นๆเข้ามา(artistName) แล้วก็ index ของเพลง 
  if (allMusic && indexNumb >= 1 && indexNumb <= allMusic.length) {// โดยที่ function ตัวนี้ มันเพลงarrayโดยเริ่มต้น index ใหม่ 
    const filteredMusic = allMusic.filter(music => music.artist === artistName);
    if (filteredMusic.length > 0 && indexNumb <= filteredMusic.length) {
      musicName.innerText = filteredMusic[indexNumb - 1].name;
      musicArtist.innerText = filteredMusic[indexNumb - 1].artist;
      musicImg.src = `../img_song/${filteredMusic[indexNumb - 1].img}`;
      mainAudio.src = `../music/${filteredMusic[indexNumb - 1].src}`;
    } else {
      console.error('Invalid index or artist not found');
    }
  } else {
    console.error('Invalid index or allMusic is not defined');
  }
}

// next music function for specific artist
let artistIndexGlobal = 6;  // set ใว้ เพื่อเป็นตัวแปร global
function filterArtist(artistName) {   //funtionนี้จะกรองarray ของเพลงทั้งหมด ให้เหลือแค่ ศิลปินคนนั้นๆ
  const filteredMusic = allMusic.filter(music => music.artist === artistName);
  return filteredMusic;
}

const MusicPlayer = {    // funtion เหล่านี้เป็น media ทั้งหมด เช่น play , stop , next , prev
  isMusicPaused: true,
  // ฟังก์ชันสำหรับเล่นเพลง
  playMusic() {
    music_box.classList.add("paused");
    mainAudio.play();
  },
  pauseMusic() {
    music_box.classList.remove("paused");
    mainAudio.pause();
  },
  nextMusic() {
    resetBtn();  // อันนี้มีใว้เพื่อ reset ค่าให้ Icon เป็น "กำลังเล่น" เพราะเนื่องจาก เวลาที่กด next ก็ให้เริ่มเล่นเพลงไปเลย

    musicIndex++;
    // ถ้า musicIndex > ความยาวของ  allMusic ก็จะset  musicIndex เป็น 1
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);   // ฟังชั่น  loadMusic ทั้งหลายเหล่านี้ มีใว้เพื่อแสดงผลของ media ของ footer ก็คือพวก ชื่อเพลง ที่กำลังเล่นอยู่ สถานะต่างๆ 
    this.playMusic();
    playingNow(); // function playingnow เป็นการทำงานในส่วนของ queue ในแถบด้านขวามือเมื่อกดปุ่ม queue 
    updateImageQueue(allMusic); // อัพเดทรูปภาพ
  },
  // ฟังก์ชันสำหรับไปยังเพลงก่อนหน้า
  prevMusic() {
    resetBtn();
    // here just increment of index by 1 
    musicIndex--;
    // ถ้า musicIndex > 1   ก็จะset  musicIndex เป็น allMusic.length
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    this.playMusic();
    playingNow();
    updateImageQueue(allMusic);
  },

  nextMusicForArtist() { // ฟังชั่นนี้มีใว้เป็นใช้แทน nextMusic เพราะว่าเมื่อเรา filter array allmusic การจัดเรียงในarray จะเปลี่ยนแปลงเลยต้องใช้functionนี้เพื่อให้สอดคล้องกัน
    resetBtn_insite();
    resetBtn();
    const maxIndex = filterArtist(localStorage.getItem('currentArtist')).length; //ใช้ ฟังชั่น filterArtistในการกรอง array ชื่อ artist จะมาจาก Local storage
    musicIndex++;
    if (musicIndex > maxIndex) {
      musicIndex = 1; // loop back to the first song of the artist
    }
    loadMusicByArtist(musicIndex, localStorage.getItem('currentArtist'));
    this.playMusic();
    playingNow();
    updateImageQueue(filterArtist(localStorage.getItem('currentArtist'))); // อัพเดทรูปภาพตาม array ที่ถูกกรอง\
  },

  prevMusicForArtist() {
    resetBtn_insite();
    resetBtn();
    const maxIndex = filterArtist(localStorage.getItem('currentArtist')).length;
    musicIndex--;
    if (musicIndex < 1) {
      musicIndex = maxIndex; // loop back to the last song of the artist
    }

    loadMusicByArtist(musicIndex, localStorage.getItem('currentArtist'));
    this.playMusic();
    playingNow();
    updateImageQueue(filterArtist(localStorage.getItem('currentArtist')));
  },

  nextMusicForPlaylist() {
    const maxIndex = OnplaylistSong.length;
    musicIndex++;
    if (musicIndex > maxIndex) {
      musicIndex = 1;
    }
    if (playlist_id_onGlobal === NowPlayingListSong) {
      playingStateList();
      Btn_follow_Midia();
    }

    resetBtn();
    if (!isPrivatePlaylistCondition) {// เป็นเงื่อนไขที่ใช้แยก playlist ระหว่าง Admin และ User
      ResetBtn_Allactions(ClassListofButtonplaylist);
    }
    loadMusicOnplaylist(musicIndex, OnplaylistSong);
    this.playMusic();
    playingNow();
    updateImageQueue(OnplaylistSong);
  },

  prevMusicForPlaylist() {
    const maxIndex = OnplaylistSong.length;
    musicIndex--;
    if (musicIndex < 1) {
      musicIndex = maxIndex;
    }
    if (playlist_id_onGlobal === NowPlayingListSong) {
      playingStateList();
      Btn_follow_Midia();
    }

    resetBtn();
    if (!isPrivatePlaylistCondition) { // เป็นเงื่อนไขที่ใช้แยก playlist ระหว่าง Admin และ User
      ResetBtn_Allactions(ClassListofButtonplaylist);
    }
    loadMusicOnplaylist(musicIndex, OnplaylistSong);
    this.playMusic();
    playingNow();
    updateImageQueue(OnplaylistSong);
  },
};


// funtion(reset button) ไม่มีไรมาก set ในสถานะเป็น "กำลังเล่น"
function resetBtn() {
  const icon = playPauseBtn.querySelector("i");
  const isMusicPaused = music_box.classList.contains("paused");
  if (!isMusicPaused) {
    icon.classList.remove("ri-pause-circle-fill");
    icon.classList.remove("ri-play-circle-fill");
    icon.classList.add("ri-pause-circle-fill");
  }
}


// funtion(artist reset button) เหมือนกับ function ข้างบนเลยแต่เป็นของ artist 
function resetBtn_insite() {
  const Pnav_left = document.querySelector(".Pnav-left"),
    Btn_green = Pnav_left.querySelector("i");
  const isMusicPaused = music_box.classList.contains("paused");
  if (!isMusicPaused && localStorage.getItem('AtercurrentArtist') === localStorage.getItem('currentArtist')) { // ทำต้องคำสั่งนี้เช็ค เพราะเพื่อให้การทำงานในการreset มันสอดคล้องกับตัวอื่นๆ 
    Btn_green.classList.remove("ri-pause-circle-fill");
    Btn_green.classList.remove("ri-play-circle-fill");
    Btn_green.classList.add("ri-pause-circle-fill");
  }
}

// swap icon funtion นี้มีใว้สลับ icon ตอนที่ click ปุ่มเล่นเฉยๆ
function togglePlayStop() {
  const icon = playPauseBtn.querySelector("i");

  if (icon.classList.contains("ri-play-circle-fill")) {
    icon.classList.remove("ri-play-circle-fill");
    icon.classList.add("ri-pause-circle-fill");
  } else {
    icon.classList.remove("ri-pause-circle-fill");
    icon.classList.add("ri-play-circle-fill");
  }
}

// togglePlaySto in artist เหมือนข้างบนแต่เป็นของ artist
function Btn_insite() {
  const Pnav_left = document.querySelector(".Pnav-left"),
    Btn_green = Pnav_left.querySelector("i");
  if (Btn_green.classList.contains("ri-play-circle-fill")) {
    Btn_green.classList.remove("ri-play-circle-fill");
    Btn_green.classList.add("ri-pause-circle-fill");
  }
  else {
    Btn_green.classList.remove("ri-pause-circle-fill");
    Btn_green.classList.add("ri-play-circle-fill");
  }
}



// ------------------------------------------------------
//  ด้านล่างนี้เป็นส่วนของ  การ สับเปลี่ยนiconด้านหน้าของ playlist 
// ------------------------------------------------------
// function ของ toggle และแยกแยะแต่ละปุ่มของ ปุ่มเล่นเพลงที่Hoverอยู่ ของแต่ละ box playlist
function ToggleBtn_Allactions(actions_playlist) {
  const Allactions_playlist = document.querySelectorAll('.actions');
  Allactions_playlist.forEach(item => {
    if (item !== actions_playlist) {
      item.classList.remove('clicked');
      const icon = item.querySelector('i');
      if (icon.classList.contains('ri-pause-mini-line')) {
        icon.classList.remove('ri-pause-mini-line');
        icon.classList.add('ri-play-fill');
      }
    }
  });
  const actions_icon = actions_playlist.querySelector('i');
  if (actions_icon.classList.contains('ri-play-fill')) {
    actions_icon.classList.remove('ri-play-fill');
    actions_icon.classList.add('ri-pause-mini-line');
    actions_playlist.classList.add('clicked'); // เพิ่ม class 'clicked' เมื่อถูกคลิก
  } else {
    actions_icon.classList.remove('ri-pause-mini-line');
    actions_icon.classList.add('ri-play-fill');
    actions_playlist.classList.remove('clicked'); // ลบ class 'clicked' เมื่อถูกคลิกอีกครั้ง
  }
}
function ResetBtn_Allactions(actions_playlist) {
  const Allactions_playlist = document.querySelectorAll('.actions');
  const actions_icon = actions_playlist.querySelector('i');
  actions_icon.classList.remove('ri-play-fill');
  actions_icon.classList.remove('ri-pause-mini-line');
  actions_icon.classList.add('ri-pause-mini-line');
  actions_playlist.classList.add('clicked');
  Allactions_playlist.forEach(item => {
    if (item !== actions_playlist) {
      item.classList.remove('clicked');
      const icon = item.querySelector('i');
      if (icon.classList.contains('ri-pause-mini-line')) {
        icon.classList.remove('ri-pause-mini-line');
        icon.classList.add('ri-play-fill');
      }
    }
  });
}
function resetActions() {
  const allActions = document.querySelectorAll('.actions');
  allActions.forEach(item => {
    item.classList.remove('clicked');
    const icon = item.querySelector('i');
    if (icon.classList.contains('ri-pause-mini-line')) {
      icon.classList.remove('ri-pause-mini-line');
      icon.classList.add('ri-play-fill');
    }
  });
}

// -----------------------------
// play or music button event
// ------------------------------
let ClassListofButtonplaylist = [];
playPauseBtn.addEventListener("click", () => { // playPauseBtn มาจากตัวแปรข้างบน เป็นปุ่มที่ใช้กด play-pause
  const isMusicPaused = music_box.classList.contains("paused");
  if (isSpecialCondition && localStorage.getItem('AtercurrentArtist') === localStorage.getItem('currentArtist')) {
    Btn_insite(); //function นี้จะทำงานก็ต่อเมื่อ เพลงที่เรากดเล่นในplaylist และ เราจะต้องอยู่ในอยู่page playList ของคนนั้นด้วย
  } else if (isPlaylistCondition && !isPrivatePlaylistCondition) {// isPrivatePlaylistConditionเป็นเงื่อนไขที่ใช้แยก playlist ระหว่าง Admin และ User
    if (playlist_id_onGlobal === NowPlayingListSong) {
      Btn_insite();
    }
    ToggleBtn_Allactions(ClassListofButtonplaylist);
  } else if (isPlaylistCondition && isPrivatePlaylistCondition) {// isPrivatePlaylistConditionเป็นเงื่อนไขที่ใช้แยก playlist ระหว่าง Admin และ User
    if (playlist_id_onGlobal === NowPlayingListSong) {
      Btn_insite();
    }
  }
  togglePlayStop(); //swap icon 
  // if isMusicPaused is true then call pauseMusic else call playMusic
  isMusicPaused ? MusicPlayer.pauseMusic() : MusicPlayer.playMusic();
  playingNow();
});

// ---------------------
// next music btn event
// ---------------------
nextBtn.addEventListener("click", () => {
  if (isSpecialCondition) {
    MusicPlayer.nextMusicForArtist();
  } else if (isPlaylistCondition) {
    MusicPlayer.nextMusicForPlaylist();// ใช้งานของ playlist
  } else {
    MusicPlayer.nextMusic(); // ใช้งานตามปกติ
  }
});

// ---------------------
// prev music btn event
// ---------------------

prevBtn.addEventListener("click", () => {
  if (isSpecialCondition) {
    MusicPlayer.prevMusicForArtist();
  } else if (isPlaylistCondition) {
    MusicPlayer.prevMusicForPlaylist();  // ใช้งานของ playlist
  } else {
    MusicPlayer.prevMusic(); // ใช้งานตามปกติ
  }
});


// ------------------------------------------------------
// update progress bar width according to music current time ส่วนของการบอก ขนาด เวลาของเพลง
// -------------------------------------------------------
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime; //getting current time song
  const duration = e.target.duration; //getting total duration of song
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`; // ตรงนี้ ส่วนของ หลอด progress bar

  let musicCurrentTime = music_box.querySelector(".current"),
    musicDuration = music_box.querySelector(".duration");
  mainAudio.addEventListener("loadeddata", () => {
    // update song total duration
    let audioDuration = mainAudio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if (totalSec < 10) { // adding 0 if sec is less than 10
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });
  // update playing song cuurent time
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) { // adding 0 if sec is less than 10
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});



// -----------------------------------------------------------------------------------------------------
// let's update playing song cuurent time on according to the progress bar width  ส่วนของ progress bar เด้อ
// -----------------------------------------------------------------------------------------------------
progressArea.addEventListener("click", (e) => {
  let progressWidthval = progressArea.clientWidth; //getting width of progress bar
  let clickedOffSetX = e.offsetX; // getting offset x value
  let songDuration = mainAudio.duration; //getting song total duration

  mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
  // console.log(mainAudio.currentTime);
  // console.log("progressWidthval",progressWidthval);
  // console.log("clickedOffSetX",clickedOffSetX);        ใว้ดูเฉยๆไม่มีไร
  // console.log("songDuration",songDuration);
  resetBtn();
  MusicPlayer.playMusic();
});

const repeatBtn = music_box.querySelector("#repeat");
repeatBtn.addEventListener("click", () => {
  const icon = repeatBtn.querySelector("i");
  // first we get the innerText of the icon then we'll  change accordingly
  // เงื่อนไขด้านล่างคือ swap icon และ set title ของ icon แต่ละตัว
  if (icon.classList.contains("ri-repeat-2-line")) {
    icon.classList.remove("ri-repeat-2-line");
    icon.classList.add("ri-repeat-one-line");
    icon.setAttribute("title", "Song looped");
  }
  else if (icon.classList.contains("ri-repeat-one-line")) {
    icon.classList.remove("ri-repeat-one-line");
    icon.classList.add("ri-shuffle-line");
    icon.setAttribute("title", "Playback shuffle");
  }
  else {
    icon.classList.remove("ri-shuffle-line");
    icon.classList.add("ri-repeat-2-line");
    icon.setAttribute("title", "Playlist looped");
  }
});



// -----------------------------------------------------------------------------------------------------
// above we just changed the icon , now  let's work on what to do 
// after the song ended
// -----------------------------------------------------------------------------------------------------

mainAudio.addEventListener("ended", () => {
  // we'll do according to the icon mean if user has set icon to loop song then we'll repeat
  // the current song and will do further accordingly
  const icon = repeatBtn.querySelector("i");
  if (icon.classList.contains("ri-repeat-2-line")) { // ถ้าเป็น repeat 2 จะเล่นเพลงถัดไป
    if (isSpecialCondition) {
      MusicPlayer.nextMusicForArtist();
    } else if (isPlaylistCondition) {
      MusicPlayer.nextMusicForPlaylist();
    } else {
      MusicPlayer.nextMusic();
    }
  }
  else if (icon.classList.contains("ri-repeat-one-line")) { // ถ้าเป็น repeat 1 จะวนลูปเพลงเดิม
    mainAudio.currentTime = 0;
    MusicPlayer.playMusic();
  }
  else {
    if (isSpecialCondition) {
      const filteredArtistList = filterArtist(localStorage.getItem('currentArtist'));
      if (filteredArtistList.length > 1) {
        do {
          randInArtist = Math.floor(Math.random() * filteredArtistList.length + 1);
        } while (musicIndex === randInArtist);
        musicIndex = randInArtist;
        loadMusicByArtist(musicIndex, localStorage.getItem('currentArtist'));
        MusicPlayer.playMusic();
        playingNow();
        updateImageQueue(filteredArtistList);
      } else if (filteredArtistList.length === 1) {
        mainAudio.currentTime = 0;
        MusicPlayer.playMusic();
      }
    } else if (isPlaylistCondition) {
      if (OnplaylistSong.length > 1) {
        console.log(OnplaylistSong.length);
        do {
          randInArtist = Math.floor(Math.random() * OnplaylistSong.length + 1);
        } while (musicIndex === randInArtist);
        musicIndex = randInArtist;
        loadMusicOnplaylist(musicIndex, OnplaylistSong)// ส่งตำแหน่งของเพลงออกไป
        MusicPlayer.playMusic();
        playingNow();
        updateImageQueue(OnplaylistSong);
        playingStateList(); //update ด้านใน
      } else if (OnplaylistSong.length === 1) {
        mainAudio.currentTime = 0;
        MusicPlayer.playMusic();
      }
    }
    else {
      if (allMusic.length > 1) {
        do {
          randIndex = Math.floor(Math.random() * allMusic.length + 1);
        } while (musicIndex === randIndex);
        musicIndex = randIndex;
        loadMusic(musicIndex);
        MusicPlayer.playMusic();
        playingNow();
        updateImageQueue(allMusic);
      } else if (allMusic.length === 1) {
        mainAudio.currentTime = 0;
        MusicPlayer.playMusic();
      }
    }
  }
});


// ----------------------------------------------------
// อันนี้จะทำของส่วนของการ Show queue ทั้งหมด (ฝั่งขวานั่นแหละ)
// -----------------------------------------------------

const site_queue = document.querySelector(".site-queue"),
  Taglist = site_queue.querySelector(".wrap-queue-list");
for (let i = 0; i < allMusic.length; i++) {    // ใส่ box-index="${i}" เพื่อนำไปใช้ในฟังชั่นข้างล่าง
  let boxlist = `<div class="box-list" box-index="${i + 1}" box-artist-index="${i + 1}" artist_name="${allMusic[i].artist}">  
                  <a href="#" class="for-select"></a>
                  <audio class="${allMusic[i].src}" id="${allMusic[i].src}" src="../music/${allMusic[i].src}"></audio>
                  <div class="playing">
                  </div>
                  <div class="dot-image">               
                      <img src="../img_song/${allMusic[i].img}" alt="">
                  </div>
                  <div class="detail">
                      <label for="">${allMusic[i].name}</label>
                      <span>${allMusic[i].artist}</span>
                  </div>
                </div>`;
  Taglist.insertAdjacentHTML("beforeend", boxlist);
};

function updateImageQueue(filteredMusic) {
  const title_queue_image = site_queue.querySelector(".title-info > .wrap");
  const queue_image = document.querySelector(".queue-image");

  let imageQueue = `<a href="#">
                    <img src="../img_song/${filteredMusic[musicIndex - 1].img}" alt="">
                    </a>`;
  queue_image.innerHTML = '';
  queue_image.insertAdjacentHTML("beforeend", imageQueue);

  let TitleInfoQueue = `<a href="#">${filteredMusic[musicIndex - 1].name}</a>
                        <div class="artish">
                            <label for="">${filteredMusic[musicIndex - 1].artist}</label>
                        </div>`;
  title_queue_image.innerHTML = '';
  title_queue_image.insertAdjacentHTML("beforeend", TitleInfoQueue);
}




// -----------------------------------------------------------------------------------------------------
function playingNow() {   // สร้าง funtion เพื่อนำไปใช้กับ loadMusic ด้วย ไม่งั้นเพลงไม่เล่นเด้อ\
  //  ตรงนี้จะเป็นส่วนของการกดเล่นเพลงใน menu - open-playlist
  const goPlaying = Taglist.querySelectorAll(".playing"); //เข้าถึงคลาส playing ทุกคลาสก่อนเพราะวางโครงสร้างใว้แล้ว จากด้านบน
  // console.log(goPlaying);
  const allboxlist = Taglist.querySelectorAll(".box-list"); //เข้าถึงคลาส box-list ทุกคลาสก่อนเพราะวางโครงสร้างใว้แล้ว จากด้านบน
  // console.log(allboxlist);  // เรียก play-list ทั้งหมด
  for (let j = 0; j < allboxlist.length; j++) {    // วนลูปตามจำนวนของ box-list ที่สร้างมา
    let playingContent = '';                                   // สร้างตัวแปรรอใว้ เพื่อนำไป เขียนลง html อันนี้นั่งโง่โครตนานกว่าจะได้ จำใส่หัวด้วย
    if (allboxlist[j].getAttribute("box-index") == musicIndex) {  // วนลูปตามปกติ เมื่อเจอ  box-index == musicIndex ก็ทำซะ
      playingContent = `<div class="greenline line-1"></div>
                        <div class="greenline line-2"></div>
                        <div class="greenline line-3"></div>
                        <div class="greenline line-4"></div>
                        <div class="greenline line-5"></div>`;
    }  // เก็บคำสั่งพวกนี้ใว้ในตัวแปรซะ
    else {
      playingContent = `<i class="ri-play-fill"></i>`;
    }
    // Clear the content before adding new elements   ถ้าทำแบบนี้มันจะก็เครียร์ content หลังจาก add elements เข้าไป , กุก็นั่ง งงตั้งนาน
    goPlaying[j].innerHTML = playingContent;

    // adding onclick attribute in all boxlist 
    allboxlist[j].setAttribute("onclick", "clicked(this)");
  }

}

function Btn_follow_Midia() {
  const icon = playPauseBtn.querySelector("i");
  const Pnav_left = document.querySelector(".Pnav-left"),
    Btn_green = Pnav_left.querySelector("i");
  if (icon.classList.contains("ri-play-circle-fill")) {
    Btn_green.classList.remove("ri-pause-circle-fill");
    Btn_green.classList.add("ri-play-circle-fill");
  } else {
    Btn_green.classList.remove("ri-play-circle-fill");
    Btn_green.classList.add("ri-pause-circle-fill");
  }
}
function playingStateList() {
  const goPlaying_playlist = all_music_list.querySelectorAll(".playing"); //เข้าถึงคลาส playing ทุกคลาสก่อนเพราะวางโครงสร้างใว้แล้ว จากด้านบน
  const box_music_list_btn = all_music_list.querySelectorAll('.box-music-list-btn'); // all_music_list เคยประกาศใว้แล้วที่ script line 759

  const index_of_song = all_music_list.querySelectorAll('.index');
  for (let j = 0; j < box_music_list_btn.length; j++) {
    let StateOfPlaylist = '';
    if (box_music_list_btn[j].getAttribute("box-index") == musicIndex) {
      StateOfPlaylist = `<div class="greenline line-1"></div>
                        <div class="greenline line-2"></div>
                        <div class="greenline line-3"></div>
                        <div class="greenline line-4"></div>
                        <div class="greenline line-5"></div>`;

      goPlaying_playlist[j].classList.add("showState");
      index_of_song[j].style.opacity = '0';
      goPlaying_playlist[j].style.opacity = '1';
    } else {

      StateOfPlaylist = `<i class="ri-play-fill"></i>`;
      goPlaying_playlist[j].classList.remove("showState");
      goPlaying_playlist[j].style.opacity = '0';
      index_of_song[j].style.opacity = '1';
    }
    goPlaying_playlist[j].innerHTML = StateOfPlaylist;
  }
}
// ----------------------------
// function clicked(element)  ฟังชั่นนี้จะคู่กับ ฟังชั่น playingNow ด้านบนเมื่อคลิกที่ Attribute("box-index") ตัวไหน ก็จะเล่นเพลงนั้นๆ
// ----------------------------
function clicked(element) {
  let getBox_index = element.getAttribute("box-index");
  console.log(getBox_index);
  musicIndex = getBox_index;
  if (isSpecialCondition) {
    loadMusicByArtist(musicIndex, localStorage.getItem('currentArtist'));
    updateImageQueue(filterArtist(localStorage.getItem('currentArtist')));
    resetBtn_insite();
  } else if (isPlaylistCondition) {
    if (!isPrivatePlaylistCondition) {// isPrivatePlaylistConditionเป็นเงื่อนไขที่ใช้แยก playlist ระหว่าง Admin และ User
      loadMusicOnplaylist(musicIndex, OnplaylistSong);
      updateImageQueue(OnplaylistSong);
      ResetBtn_Allactions(ClassListofButtonplaylist)

      if (playlist_id_onGlobal === NowPlayingListSong) {
        playingStateList();
        const Pnav_left = document.querySelector(".Pnav-left"),
          Btn_green = Pnav_left.querySelector("i");
        Btn_green.classList.remove("ri-play-circle-fill");
        Btn_green.classList.remove("ri-pause-circle-fill");
        Btn_green.classList.add("ri-pause-circle-fill");
      }
    } else {
      loadMusicOnplaylist(musicIndex, OnplaylistSong);
      updateImageQueue(OnplaylistSong);
      if (playlist_id_onGlobal === NowPlayingListSong) {
        playingStateList();
        const Pnav_left = document.querySelector(".Pnav-left"),
          Btn_green = Pnav_left.querySelector("i");
        Btn_green.classList.remove("ri-play-circle-fill");
        Btn_green.classList.remove("ri-pause-circle-fill");
        Btn_green.classList.add("ri-pause-circle-fill");
      }
    }
  } else {
    loadMusic(musicIndex);
    updateImageQueue(allMusic);
  }

  resetBtn();
  MusicPlayer.playMusic();
  playingNow();
}


// ----------------------------
// อันนี้ส่วนของ volume 
// ----------------------------
// ดึง Audio Element และ Input Element
const audio = document.getElementById('main-audio');
const volumeControl = document.getElementById('volumeControl');
const mute = document.querySelector(".in-volume i");

// เพิ่ม Event Listener ที่ Input Element เพื่อปรับระดับเสียง
volumeControl.addEventListener('input', function () {
  if (!mute.classList.contains("ri-volume-mute-fill")) {
    audio.volume = this.value; //เหมือนกับ  audio.volume = volumeControl.value; นั้นแหละ ให้อัพเดทค่า
  }
});

mute.addEventListener('click', () => {
  if (mute.classList.contains("ri-volume-up-fill")) {
    mute.classList.remove("ri-volume-up-fill");
    mute.classList.add("ri-volume-mute-fill");
    audio.volume = 0;
  } else {
    mute.classList.remove("ri-volume-mute-fill");
    mute.classList.add("ri-volume-up-fill");
    audio.volume = volumeControl.value;
  }
});





function RemoveMusicState() {
  localStorage.removeItem('currentMusicIndex');
  localStorage.removeItem('currentArtist');
}


function AftersaveMusicState() {
  localStorage.setItem('AtercurrentArtist', ArtistMusic[artistIndexGlobal - 1].artist_name);
}
function removeAftersaveMusicState() {
  localStorage.removeItem('AtercurrentArtist');
}

function saveMusicState() {
  localStorage.setItem('currentMusicIndex', musicIndex);
  localStorage.setItem('currentArtist', ArtistMusic[artistIndexGlobal - 1].artist_name);
}

function loadMusicState() {
  if (localStorage.getItem('AtercurrentArtist') === localStorage.getItem('currentArtist')) {
    const icon = playPauseBtn.querySelector("i");
    if (icon.classList.contains("ri-pause-circle-fill")) {
      Btn_green.classList.remove("ri-pause-circle-fill");
      Btn_green.classList.remove("ri-play-circle-fill");
      Btn_green.classList.add("ri-pause-circle-fill");
    }
    else {
      Btn_green.classList.remove("ri-pause-circle-fill");
      Btn_green.classList.remove("ri-play-circle-fill");
      Btn_green.classList.add("ri-play-circle-fill");
    }
  }
}

// ส่วนของหน้า all artist----------------------------------------------------------
// insite_upload_page  มาจาก หน้า active js นะ เพราะเคยสร้างใว้แล้วเลยดึงมาได้เลย บรรทัดที่ 68
// ------------------------------------------------------------------------------------
console.log(ArtistMusic);
console.log(allMusic);

// ส่วนของการ Search ข้อมูล มาใช้กับ Artist
const ArtistOfSort = [...new Set(ArtistMusic.map((item, index) => ({ ...item, index })))];
const SearchOfArtist = document.getElementById('Search_artist');
const upload_content = insite_upload_page.querySelector(".upload-container");
const upload_Artist_wrapper = document.querySelector('.upload-Artist_wrapper')
SearchOfArtist.addEventListener('keyup', (e) => {
  const searchArtist = e.target.value.toLowerCase();
  const filterDataArtist = ArtistOfSort.filter((item) => {
    return (
      (item.artist_name && item.artist_name.toLowerCase().includes(searchArtist))
    )
  })
  displayArtistItem(filterDataArtist);
});
const displayArtistItem = (itemOfSearch) => {
  upload_Artist_wrapper.innerHTML = itemOfSearch.map((item, i) => {
    var { img_file, artist_name, artist_id ,index} = item;
    return (
      `<div class="upload-content">
            <a href="#" class="for-upload-content"  artist-index="${index + 1}"></a>
            <div class="upload-detail">
                <span class="artist-index">${index + 1}</span>
                <img src="../img/${img_file}" alt="">
                <div class="info-artist">
                    <span>${artist_name}</span>
                </div>
            </div>
            <div class="Date-add-on">
                <span>5 day ago</span>
            </div>
            <div class="upload-manage">
                <button class="upload-button" name-upload-button="${artist_name}"  index-id-artist="${artist_id}"  trigger-button data-target="Add-song-popup">Upload</button>
                <button class="edit-button" name-edit-button="${artist_name}" edit-id-artist="${artist_id}" edit-img-artist="${img_file}" trigger-button data-target="Edit-artist-popup">Edit</button>
                <button class="dlt-button" name-delete-button="${artist_name}" delete-id-artist="${artist_id}" delete-img-artist="${img_file}" trigger-button data-target="Delete-artist-popup">Delete</button>
            </div>
          </div>`)
  }).join('')
  // -----------------------------
  // แยกส่วนของแต่ละ delete-song
  // ---------------------------
  const Delete_artist_popup = document.getElementById('Delete-artist-popup');
  const Update_Delete_Name_artist = Delete_artist_popup.querySelector('.header-delete span');
  const Delete_artist_button = document.querySelectorAll('.dlt-button');
  const Delete_confirm_artist = Delete_artist_popup.querySelector('.Delete-confirm');
  Delete_artist_button.forEach(Delete_artist => {
    Delete_artist.addEventListener('click', () => {

      Delete_confirm_artist.innerHTML =  // Clear ข้อมูลก่อน
      `<div class="alert-Delete">
      </div>
      <div class="form">
          <input class="Input-delete-artist-img" hidden name="Delete-artist-img">
          <input class="Delete-artist-input" hidden name="Delete-artist-input">
          <a href="#" class="cancel-confirm" close-button >Cancle</a>
          <button class ="Delete-Artist-from-upload">Confirm</button>
      </div>`;

      const Input_delete_artist_img = Delete_artist_popup.querySelector('.Input-delete-artist-img');
      const Delete_artist_input = document.querySelector('.Delete-artist-input');
      const Delete_Artist_from_upload = document.querySelector('.Delete-Artist-from-upload');
      const alert_Delete = document.querySelector('.alert-Delete');
       
      let Delete_artist_name = Delete_artist.getAttribute("name-delete-button");
      let Delete_artist_id = Delete_artist.getAttribute("delete-id-artist");
      let Delete_artist_img = Delete_artist.getAttribute("delete-img-artist");

      Update_Delete_Name_artist.innerHTML = `${Delete_artist_name}`;
      Input_delete_artist_img.setAttribute("value", `${Delete_artist_img}`);
      Delete_artist_input.setAttribute("value", `${Delete_artist_id}`);
      

      Delete_Artist_from_upload.addEventListener('click', () =>{
        let formdata = new FormData();
        formdata.append("Delete-artist-img",Delete_artist_img)
        formdata.append("Delete-artist-input",Delete_artist_id)
        fetch("../web/delete_form.php",{
          method: "POST",
          body : formdata
        })
        .then(Response =>{
          if(!Response.ok){
            throw new Error("response was not ok in Delete_artist_button")
          }else if(Response.ok){
            location.reload();
          }
        })
        .catch(error =>{
          alert_Delete.innerHTML = "<p>Can not delete !!, <br>Because there are still songs from this artist.</p>"
          console.error("Error",error)
        })
      })
    });
  });

  // -----------------------------
  // แยกส่วนของแต่ละ upload-button
  // ---------------------------
  const Add_song_header = document.querySelector("#Add-song-header"),
    required_title = Add_song_header.querySelector('p');

  const title_of_addsong = Add_song_header.querySelector('h1');

  const backgourd_song_popup = document.querySelector('.backgourd-song-popup');

  const upload_manage = document.querySelector('.upload-manage'),
    upload_button_on_admin = document.querySelectorAll('.upload-button');
  let uploadIndex = '';
  let id_artist = '';
  upload_button_on_admin.forEach((upload_song, i) => {
    let backgourd_song = '';
    upload_song.addEventListener('click', () => {
      uploadIndex = upload_song.getAttribute("name-upload-button");

      title_of_addsong.innerText = uploadIndex;

      id_artist = upload_song.getAttribute("index-id-artist");
      console.log(id_artist);

      backgourd_song = `
      <div class="backgourd-song-popup">
            <img src="../img/${itemOfSearch[i].img_file}" alt="">
      </div>`;
      backgourd_song_popup.innerHTML = backgourd_song;
    });
  });

  // -----------------------------
  // แยกส่วนของแต่ละ edit-button
  // ---------------------------
  const Edit_artist_popup = document.querySelector("#Edit-artist-popup");
  const edit_button_on_admin = document.querySelectorAll('.edit-button');
  const headerOfEdit = Edit_artist_popup.querySelector('.Edit-header');
  const Editcustum_file_upload2 = document.getElementById('custum-edit-file-upload');

  let editIndex = '';
  edit_button_on_admin.forEach((Edit_artist, i) => {
    Edit_artist.addEventListener('click', () => {
      const image_on_edit = Edit_artist_popup.querySelector('img');
      const inputElement = Edit_artist_popup.querySelector(".input-name-artist");
      const artist_id_on_edit = Edit_artist_popup.querySelector(".artist-id-on-edit");
      const old_name_img = Edit_artist_popup.querySelector(".old-name-img");
      if (image_on_edit) {
        image_on_edit.remove();
      }
      const EditImg = document.createElement('img');

      editIndex = Edit_artist.getAttribute("name-edit-button");
      const editImg = Edit_artist.getAttribute("edit-img-artist");
      const id_edit = Edit_artist.getAttribute("edit-id-artist");

      Editcustum_file_upload2.appendChild(EditImg);
      EditImg.setAttribute('src', `../img/${editImg}`);
      headerOfEdit.innerHTML = `<span>EDIT</span> | ${editIndex}`;

      inputElement.setAttribute("value", `${editIndex}`);
      artist_id_on_edit.setAttribute("value", `${id_edit}`);
      old_name_img.setAttribute("value", `${editImg}`);
    });
  });



  // -----------------------------------------------------------------
  // ส่วนนี้จะเป็นการที่เรากดปุ่ม input แล้วนำข้อมูลของform ส่งไปที่ upload_song.php
  // -----------------------------------------------------------------

  var submitBtn = document.querySelector('.wrapper-submit button');

  submitBtn.addEventListener('click', function (event) {
    event.preventDefault();

    var requiredFields = document.querySelectorAll('.inp-group [required]');
    var isValid = true;

    // เพิ่มตัวแปรเพื่อเก็บข้อมูลศิลปิน
    requiredFields.forEach(function (field) {
      if (!field.value || !isValidateName) {
        isValid = false;
        required_title.innerHTML = "* Please fill out all information completely.";
        // แสดงข้อความเตือนหรือการแสดงสถานะที่นี่ (ตัวอย่างเช่น console.log())
        console.log(field.name + " is required");
      }
    });

    if (isValid) {
      required_title.innerHTML = "";
      var formData = new FormData(document.querySelector('.inp-group'));
      console.log(id_artist);
      formData.append('id_artist', id_artist);
      var xhr = new XMLHttpRequest();
      xhr.open('POST', './upload_song.php', true);
      xhr.onload = function () {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
          // ทำสิ่งที่ต้องการหลังจากบันทึกข้อมูลลงในฐานข้อมูลเสร็จสมบูรณ์
          location.reload();
        } else {
          console.error('เกิดข้อผิดพลาดในการส่งข้อมูล');
        }
      };
      xhr.send(formData);
    }
  });


  // ----------------------------------------------------------------------
  // สามารถใช้  Goto_page_list ได้เลยเนื่องจากประกาศ class ใว้แล้วที่ active.js // 64
  // ----------------------------------------------------------------------
  // function ทั้งหมดในข้างล่างทั้งหมดนี้ จะเป็นส่วนของ หน้าตาของการจำแนกเพลงแต่ละศิลปิน เมื่อเราคลิกเข้าไป
  const header_on_playlist = Goto_page_list.querySelector('.wrapper-playlist'),
    playlist_image = header_on_playlist.querySelector('.playlist-image'),
    playlist_title = header_on_playlist.querySelector('.playlist-title'),
    playlist_nav = document.querySelector('.playlist-nav');

  const all_music_list = document.querySelector('.all-music-list');
  // console.log(all_music_list);

  const for_upload_content = document.querySelectorAll('.for-upload-content');
  const uploadContents = document.querySelectorAll('.upload-content');
  // console.log(uploadContents);
  // ข้างล่างต่อไปนี้เหนื่อยมาก ขอพักก่อน เดี๋ยวมา commentต่อ ซึ่งมันผิดหลักการด้วยแต่จะไม่แก้โครงสร้างตรงนี้แล้ว ถือว่าเสียเวลากับตรงนี้ไป แล้วไปเริ่มอันใหม่เลย(ไม่แน่เลย~ น่าจะคิดมาให้ดีกว่านี้) 
  for_upload_content.forEach((content, index) => {
    content.addEventListener('click', () => {

      //ในส่วนนี้ไม่มีอะไร แค่เข้าถึง CSS ในการแก้ใขในเรื่อง permission ของ Admin ที่จะมองเห็น
      const nav_title_element = document.querySelector(".nav-title > .duration-time span");
      const nav_title_element2 = document.querySelector(".nav-title > .duration-time");
      nav_title_element2.style.width = "140px";
      nav_title_element.style.display = "block";
      // ---------------------------------------------------------------------------

      const artistIndex = content.getAttribute("artist-index");
      console.log(artistIndex);
      // เมื่อผู้ใช้คลิกที่ศิลปินนั้นๆ
      artistIndexGlobal = artistIndex;
      removeAftersaveMusicState();
      AftersaveMusicState();
      let playlist_nav_var = `<div class="Pnav-left">
                              <i class="ri-play-circle-fill" Pnav-index="${index}"></i>
                              <label class="container-music">
                                  <input type="checkbox">
                                  <div class="checkmark">
                                      <svg viewBox="0 0 256 256">
                                          <rect fill="none" height="256" width="256"></rect>
                                          <path d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z" stroke-width="20px" stroke="#FFF" fill="none"></path>
                                      </svg>
                                  </div>
                              </label>
                              <div class="select_delete" title = "Delete"  trigger-button data-target="Delete-select-popup">
                                <a href="#"><i class="ri-delete-bin-3-line"></i></a>
                              </div>
                          </div>
                          <div class="Pnav-right">
                              <a href="#">list <i class="ri-list-check"></i></a>
                          </div>`


      playlist_nav.innerHTML = playlist_nav_var;

      let follow_green = true;
      if (localStorage.getItem('AtercurrentArtist') === localStorage.getItem('currentArtist')) {
        follow_green = true;
      }
      else {
        follow_green = false;
      }

      // artist-in butoon
      const Pnav_left = document.querySelector(".Pnav-left"),
        Btn_green = Pnav_left.querySelector("i");
      const artistName = ArtistMusic[artistIndexGlobal - 1].artist_name;

      function checkIfAllMatch() {
        const elementsInTaglist = Array.from(site_queue.querySelectorAll(".wrap-queue-list [artist_name]"));
        const allMatch = elementsInTaglist.every(element => {
          const elementArtistName = element.getAttribute("artist_name");
          return elementArtistName === artistName;
        });
        console.log(allMatch);
        return allMatch;
      }

      checkIfAllMatch();
      loadMusicState();
      Btn_green.addEventListener('click', () => {
        musicIndex = 1;
        RemoveMusicState();
        saveMusicState();
        // ให้เคลียร์ข้อมูลใน Queue ก่อนทุกครั้งที่มีการคลิก     /// เมื่อกี้กลับมาไล่โค้ดตัวเอง งงเลยตัวเองเขียนไรวะ ดีนะเม้นใว้
        if (!checkIfAllMatch() || (Taglist.innerHTML === '')) {
          Taglist.innerHTML = '';

          isPlaylistCondition = false;// เปิดการใช้งานในเงื่อนไขของ Playlist
          isSpecialCondition = true;
          // วนลูปเพื่อเพิ่มเพลงของศิลปินที่ถูกเลือกเข้าไปใน Queue
          let countSong = 1;
          allMusic.forEach((music, i) => {
            if (music.artist === ArtistMusic[artistIndex - 1].artist_name) {
              let boxlist = `<div class="box-list" box-index="${countSong}" box-artist-index="${i + 1}" artist_name="${ArtistMusic[artistIndex - 1].artist_name}"> 
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
            }
          });
          if (!(Taglist.innerHTML === '')) {
            playingNow();
            updateImageQueue(filterArtist(artistName));
            loadMusicByArtist(musicIndex, artistName);
          }
          else {
            RemoveMusicState();
          }
        }
        isMusicPaused = music_box.classList.contains("paused");

        if (!(Taglist.innerHTML === '')) {
          if (!follow_green) {
            updateImageQueue(filterArtist(artistName));
            follow_green = true;
            MusicPlayer.playMusic();
            togglePlayStop();
            Btn_green.classList.remove("ri-pause-circle-fill");
            Btn_green.classList.remove("ri-play-circle-fill");
            Btn_green.classList.add("ri-pause-circle-fill");

            const icon = playPauseBtn.querySelector("i");
            icon.classList.remove("ri-pause-circle-fill");
            icon.classList.remove("ri-play-circle-fill");
            icon.classList.add("ri-pause-circle-fill");
          } else {
            isMusicPaused ? MusicPlayer.pauseMusic() : MusicPlayer.playMusic();
            togglePlayStop();
            Btn_insite();
          }
        }
        else {
          RemoveMusicState();
        }
      });



      // ตรงนีเป็นส่วนของการ เปลี่นนรูปเวลาที่มีการคลิกแต่ละเพลง
      let someListImage = `<img src="../img/${ArtistMusic[artistIndex-1].img_file}">`;
      let somePlaylist_title = `<p>playlist</p>
                                  <h1 class="artist">${ArtistMusic[artistIndex-1].artist_name}</h1>
                                  <p class="associate-artist">${ArtistMusic[artistIndex-1].artist_name} , Musketeers ,follow and more</p>
                                  <div class="detail">
                                      <i class="ri-music-fill"></i>Spotify
                                      <span>•</span>
                                      <p class="amout-of-song">50song,</p>
                                  </div>`;

      // ลบข้อมูลเก่าที่อาจมีอยู่ใน all_music_list ก่อนเสมอ
      all_music_list.innerHTML = '';
      // สร้าง HTML สำหรับแสดงรายการเพลงทีละเพลง
      let Song_serial_number = 1;
      allMusic.forEach((music, i) => {
        // console.log(music.artist);
        // console.log(ArtistMusic[artistIndex-1].artist_name);
        if (music.artist === ArtistMusic[artistIndex - 1].artist_name) {
          const Personal_artist_list = `<div class="box-music-list" id="box-music-list${music.song_id}">
                                            <div class="title-of-song">
                                                <label class="cl-checkbox" id="cl-checkbox${music.song_id}">
                                                  <input type="checkbox" id="cl-on-check" checkboxID="${music.song_id}" checkboxImg= "${music.img}" checkboxMusic="${music.src}">
                                                  <span></span>
                                                </label>
                                                <span class="index">${Song_serial_number}</span>
                                                <img src="../img_song/${music.img}" alt="">
                                                <div class="name-song">
                                                    <span>${music.name}</span>
                                                    <span class="artist">${music.artist}</span>
                                                </div>
                                            </div>
                                            <div class="Date-add-on-list">
                                              <span>5 day ago</span>
                                            </div>
                                            <div class="duration-of-song">
                                                <label class="container-music" id="heart_list${music.song_id}">
                                                    <input type="checkbox" id="heart_on_check">
                                                    <div class="checkmark">
                                                        <svg viewBox="0 0 256 256">
                                                            <rect fill="none" height="256" width="256"></rect>
                                                            <path d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z" stroke-width="20px" stroke="#FFF" fill="none"></path>
                                                        </svg>
                                                    </div>
                                                </label>
                                                <span id="SONG${music.song_id}" class="duration"></span>
                                                <audio class="SONG${music.song_id}" src="../music/${music.src}"></audio>
                                                <div class="manage-song">
                                                  <div class="edit-song">
                                                    <a href="#" class="edit-song-button" title = "Edit" edit-song-index="${music.song_id}" edit-song-name="${music.name}" edit-img-song="${music.img}" edit-file-song="${music.src}" trigger-button data-target="Edit-song-popup"><i class="ri-edit-box-fill"></i></a>
                                                  </div>
                                                  <div class="delete-song">
                                                    <a href="#" class="Delete-song-button" title = "Delete" delete-song-index="${music.song_id}" delete-song-name="${music.name}" delete-img-song="${music.img}" delete-file-song="${music.src}" trigger-button data-target="Delete-song-popup"><i class="ri-close-circle-fill"></i></a>
                                                  </div>
                                                </div>
                                            </div>
                                        </div>`;

          Song_serial_number += 1;
          // เพิ่ม HTML สำหรับแต่ละเพลงลงใน all_music_list
          all_music_list.insertAdjacentHTML("beforeend", Personal_artist_list);


          let liAudioTag = all_music_list.querySelector(`.SONG${music.song_id}`);
          let liAudioDuration = all_music_list.querySelector(`#SONG${music.song_id}`);
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


          const cl_checkbox = document.getElementById(`cl-checkbox${music.song_id}`);
          const inside_cl_checkbox = cl_checkbox.querySelector('#cl-on-check');
          const heart_list = document.getElementById(`heart_list${music.song_id}`);
          const inside_heart_list = heart_list.querySelector('#heart_on_check');
          heart_list.style.opacity = '0';            // เมื่อเริ่มต้นทำงานกำหนดให้ heart_list เป็น"none"ก่อแ จนกว่าจะมีการ  hover จึงจะมีการแสดงผล
          inside_cl_checkbox.opacity = '0';

          inside_heart_list.addEventListener('change', function () {
            if (this.checked) {
              heart_list.style.opacity = '1';
            } else {
              heart_list.style.opacity = '0';
            }
          });
          inside_cl_checkbox.addEventListener('change', function () {
            if (this.checked) {
              cl_checkbox.style.opacity = '1';
            } else {
              cl_checkbox.style.opacity = '0';
            }
          });
          const boxMusicList = document.querySelector(`#box-music-list${music.song_id}`);
          boxMusicList.addEventListener('mouseover', function () { // เมื่อนำเมาส์ไป hover ที่ boxMusicList
            const insideHeartList = heart_list.querySelector('#heart_on_check');
            const InsideClcheckbox = cl_checkbox.querySelector('#cl-on-check');
            if (!insideHeartList.checked) {
              heart_list.style.opacity = '1';
            }
            if (!InsideClcheckbox.checked) {
              cl_checkbox.style.opacity = '1';
            }
          });
          boxMusicList.addEventListener('mouseout', function () {  // เมื่อนำเมาส์ออกไป ที่ boxMusicList
            const insideHeartList = heart_list.querySelector('#heart_on_check');
            const InsideClcheckbox = cl_checkbox.querySelector('#cl-on-check');
            if (!insideHeartList.checked) {
              heart_list.style.opacity = '0';
            }
            if (!InsideClcheckbox.checked) {
              cl_checkbox.style.opacity = '0';
            }
          });



          // ------------------------------------------------------------------
          // ตรงนี้เป็นส่วนในการทำ pop-up ต่างๆ เอามาใว้ข้างในเพราะ มันมองไม่เห็น class manage-song
          // ----------------------------------------------------------------

          triggerOpen();
        }
      });
      // ---------------------------------------------
      // โค้ดส่วนนี้เป็นส่วนของการเลือก list ในการลบเลือกเพื่อลบ
      // ---------------------------------------------
      let SelectID = [];
      let SelectIMG = [];
      let SelectMUSIC = [];
      const select_delete = document.querySelector('.select_delete');
      const checkboxId = document.querySelectorAll('#cl-on-check');
      const Delete_id_select = document.querySelector('.Delete-id-select');
      const Delete_img_select = document.querySelector('.Delete-img-select');
      const Delete_music_select = document.querySelector('.Delete-music-select');
      select_delete.addEventListener('click', () => {
        SelectID = [];
        SelectIMG = [];
        SelectMUSIC = [];
        checkboxId.forEach(content => {
          let CHK_ID = content.getAttribute('checkboxID');
          let CHK_IMG = content.getAttribute('checkboxImg');
          let CHK_MUSIC = content.getAttribute('checkboxMusic');
          if (content.checked) {
            SelectID.push(CHK_ID);
            SelectIMG.push(CHK_IMG);
            SelectMUSIC.push(CHK_MUSIC);
          };
        });
        Delete_id_select.setAttribute("value", SelectID);
        Delete_img_select.setAttribute("value", SelectIMG);
        Delete_music_select.setAttribute("value", SelectMUSIC);
      });
      // -----------------------------
      // แยกส่วนของแต่ละ edit-song
      // ---------------------------
      const Edit_song_popup = document.querySelector("#Edit-song-popup");
      const edit_song_button = document.querySelectorAll(".edit-song-button");
      const custum_Edit_song_upload = document.getElementById('custum-Edit-song-upload');
      const Edit_song_header = Edit_song_popup.querySelector('.Edit-song-header');
      console.log(Edit_song_header);
      edit_song_button.forEach(Edit_song => {
        Edit_song.addEventListener('click', () => {
          const image_edit_song = Edit_song_popup.querySelector('img');
          const inputEditNamesong = Edit_song_popup.querySelector('.inputEditNamesong');
          const song_id_on_edit = Edit_song_popup.querySelector('.song-id-on-edit');
          const old_img_song = Edit_song_popup.querySelector('.old-img-song');
          const old_file_song = Edit_song_popup.querySelector('.old_file_song');

          if (image_edit_song) {
            image_edit_song.remove();
          }
          const EditImgSong = document.createElement('img');

          const EditSongIndex = Edit_song.getAttribute("edit-song-index");
          const edit_song_name = Edit_song.getAttribute("edit-song-name");
          const edit_img_song = Edit_song.getAttribute("edit-img-song");
          const file_song = Edit_song.getAttribute("edit-file-song");

          Edit_song_header.innerHTML = `<h2><span>Edit</span> | ${edit_song_name}</h2>`

          custum_Edit_song_upload.appendChild(EditImgSong);
          inputEditNamesong.setAttribute("value", `${edit_song_name}`);
          song_id_on_edit.setAttribute("value", `${EditSongIndex}`);
          old_img_song.setAttribute("value", `${edit_img_song}`);
          old_file_song.setAttribute("value", `${file_song}`);
          EditImgSong.setAttribute('src', `../img_song/${edit_img_song}`);

        });
      });
      // -----------------------------
      // แยกส่วนของแต่ละ delete-song
      // ---------------------------
      const Delete_song_popup = document.getElementById('Delete-song-popup');
      const Update_Delete_Name = Delete_song_popup.querySelector('.header-delete span');
      const Delete_song_button = document.querySelectorAll('.Delete-song-button');
      const Delete_confirm_input = Delete_song_popup.querySelector('.Delete-confirm-input');
      const Delete_img_song_input = Delete_song_popup.querySelector('.Delete-img-song-input');
      const Delete_src_song_input = Delete_song_popup.querySelector('.Delete-src-song-input');
      Delete_song_button.forEach(Delete_song => {
        Delete_song.addEventListener('click', () => {
          let Delete_index = Delete_song.getAttribute("delete-song-index");
          let Delete_name = Delete_song.getAttribute("delete-song-name");
          let Delete_img = Delete_song.getAttribute("delete-img-song");
          let Delete_music_file = Delete_song.getAttribute("delete-file-song");

          Update_Delete_Name.innerHTML = `${Delete_name}`;
          Delete_confirm_input.setAttribute("value", `${Delete_index}`);
          Delete_img_song_input.setAttribute("value", `${Delete_img}`);
          Delete_src_song_input.setAttribute("value", `${Delete_music_file}`);
        });
      });


      // -------------------------------------------------
      // ส่วนของการทำวันที่ ในตอนที่add-song หรือ เพลงเข้ามา
      // --------------------------------------------------
      const dateAddonElement = document.querySelectorAll(".Date-add-on-list");
      for (i = 0; i < filterArtist(artistName).length; i++) {
        // หาว่าเพลงถูกเพิ่มลงไปแล้วกี่วัน
        const artistDate = new Date(filterArtist(artistName)[i].DateAdded);
        const diffTime = Math.abs(songAddedDate - artistDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // แสดงผลลัพธ์ในส่วนของ "Date-add-on"
        dateAddonElement[i].innerHTML = `<span>${diffDays} day${diffDays !== 1 ? 's' : ''} ago</span>`;
      }



      playlist_image.innerHTML = someListImage;
      playlist_title.innerHTML = somePlaylist_title;

      Goto_page_list.classList.add('active');
      container_top.classList.add("active");
      Goto_search_page.classList.remove('active');
      insite_upload_page.classList.remove('active');
    });
  });


  // -------------------------------------------------
  // ส่วนของการทำวันที่ ในตอนที่add-artist หรือ เพลงเข้ามา
  // --------------------------------------------------

  const dateAddonElement = document.querySelectorAll(".Date-add-on");
  for (i = 0; i < itemOfSearch.length; i++) {
    // หาว่าเพลงถูกเพิ่มลงไปแล้วกี่วัน
    const artistDate = new Date(itemOfSearch[i].Artist_date);

    const diffTime = Math.abs(songAddedDate - artistDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // แสดงผลลัพธ์ในส่วนของ "Date-add-on"
    dateAddonElement[i].innerHTML = `<span>${diffDays} day${diffDays !== 1 ? 's' : ''} ago</span>`;
  }


  // ----------------------------------------------------------------------
  // function ที่ใช้ในการเปลี่ยนหน้า 1,2,3,..~
  // pagination ของ upload content  
  // ----------------------------------------------------------------------

  let thisPage = 1;
  let limit = 8;
  function loadItem() {
    let beginGet = limit * (thisPage - 1);
    let endGet = limit * thisPage - 1;
    uploadContents.forEach((item, key) => {
      if (key >= beginGet && key <= endGet) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    })
    listPage();
  }
  loadItem();

  function listPage() {
    let count = Math.ceil(uploadContents.length / limit);
    document.querySelector('.pagination-container').innerHTML = '';

    if (thisPage != 1) {
      let prev = document.createElement('li');
      prev.innerText = 'PREV';
      prev.addEventListener('click', function () {
        changePage(thisPage - 1);
      });
      document.querySelector('.pagination-container').appendChild(prev);
    }

    for (let i = 1; i <= count; i++) {
      let newPage = document.createElement('li');
      newPage.innerText = i;
      if (i === thisPage) {
        newPage.classList.add('active');
      }
      newPage.addEventListener('click', function () {
        changePage(i);
      });
      document.querySelector('.pagination-container').appendChild(newPage);
    }

    if (thisPage != count) {
      let next = document.createElement('li');
      next.innerText = 'NEXT';
      next.addEventListener('click', function () {
        changePage(thisPage + 1);
      });
      document.querySelector('.pagination-container').appendChild(next);
    }

    const paginationItems = document.querySelectorAll('.pagination-container li');
    paginationItems.forEach(item => {
      item.addEventListener('click', function () {
        paginationItems.forEach(element => {
          element.classList.remove('active');
        });
        this.classList.add('active');
      });
    });
  }

  function changePage(i) {
    thisPage = i;
    loadItem();
  }

  triggerOpen();
};
displayArtistItem(ArtistOfSort);





// ------------------------------------------------------------------
// ตรงนี้เป็นส่วนในการทำ pop-up ต่างๆ
// ----------------------------------------------------------------
function triggerOpen() {
  const triggerOpen = document.querySelectorAll('[trigger-button]');
  const triggerClose = document.querySelectorAll('[close-button]');
  const overlay = document.querySelector('[data-overlay]');
  for (let i = 0; i < triggerOpen.length; i++) {
    let currentId = triggerOpen[i].dataset.target,
      targetEl = document.querySelector(`#${currentId}`)

    const openData = function () {
      targetEl.classList.remove('active');
      overlay.classList.remove('active');
    };
    triggerOpen[i].addEventListener('click', function () {
      targetEl.classList.add('active');
      overlay.classList.add('active');
    });

    targetEl.querySelector('[close-button]').addEventListener('click', openData);
    overlay.addEventListener('click', openData);
  };
}
triggerOpen();


