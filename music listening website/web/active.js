

// -----------------------------------------------------------------
//  ปุ่มกดไปด้านข้าง (เพื่อให้ .site-left ยืดไปทางขวา) ใน ส่วนของ  My Library
// -----------------------------------------------------------------

const resizeButton = document.getElementById('resizeButton');
const leftPanel = document.getElementById('leftPanel');
let isToggled = false;

resizeButton.addEventListener('click', () => {
    leftPanel.classList.toggle('active');
    isToggled = !isToggled;
});


            
            

// ------------------------------------------------------
//  ปุ่มกดไปด้านข้าง (เพื่อให้ลูกศรหมุน) ใน ส่วนของ  My Library
// -------------------------------------------------------

let menu = document.querySelector('#resizeButton');
let close = document.querySelector('#close');
let RightPanel = document.querySelector('#RightPanel');

menu.onclick = () => {
    menu.classList.toggle('active');
};

let in_queue = document.querySelector('#open');
in_queue.onclick = () => {
  RightPanel.classList.toggle('active');
  in_queue.classList.toggle('active');
};

close.onclick = () => {
  RightPanel.classList.remove('active');
  in_queue.classList.toggle('active');
};


// -----------------------------------------
//  active ปุ่ม search ใน ส่วนของ  My Library
// -----------------------------------------

let search = document.querySelector('#search-library');
let input_library = document.querySelector('#search-item');
search.onclick = () => {
    input_library.classList.toggle('active');
};



// -----------------------------------------
//  active ปุ่ม ของฝั่ง site-left, Home กับ seach
// -----------------------------------------

// 
const menuButtons = document.querySelectorAll('.header-left .wrap a');
const Home_page =document.getElementById('home');
const Search_page =document.getElementById('Search');
const container_button = document.querySelector('.container-button'),
Goto_page_list = container_button.querySelector('.insite_the_playlist'),
Goto_home_page = container_button.querySelector('.main_site-right'),
Goto_search_page = container_button.querySelector('.insite_search_page');

const insite_upload_page = document.querySelector(".insite_upload_page");

// ฟังก์ชันที่เพิ่มคลาส 'active' และลบคลาส 'active' จาก elements
function handleButtonClick(event) {
    // ลบคลาส 'active' จากทุกปุ่มในเมนู
    menuButtons.forEach(button => button.classList.remove('active'));

    // เพิ่มคลาส 'active' ให้กับปุ่มที่ถูกคลิก
    const clickedButton = event.currentTarget;
    clickedButton.classList.add('active');


    if(Home_page.classList.contains("active")){
      Goto_home_page.classList.add('active');
      Goto_page_list.classList.remove('active');
      Goto_search_page.classList.remove('active');
      insite_upload_page.classList.remove('active');
     
      fetch("../API/Data_playlist.php")
      .then(Response =>{
        if(!Response.ok){
          throw new Error("fetch is error on active Homepage for update")
        }
        return Response.json();
      })
      .then(update =>{
        updateThumbnail(update);
        updateDotTitle(update);
      })
      .catch(error=>{
        console.error("Error",error)
      });
    }
    if(Search_page.classList.contains("active")){
      Goto_search_page.classList.add('active')
      Goto_home_page.classList.remove('active');
      Goto_page_list.classList.remove('active');
      insite_upload_page.classList.remove('active');
    }

    container_top.classList.add("active");
    iconhome();
    iconSearch();
}

// วนลูปผ่านทุกปุ่มและเพิ่ม event listener เมื่อคลิก
menuButtons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});


// change icon home

function iconhome(){
  const icon_Home_page =document.querySelector('.home i');
  if(Home_page.classList.contains("active")){
    icon_Home_page.classList.remove("ri-home-smile-line");
    icon_Home_page.classList.add("ri-home-smile-2-fill");
  }
  else{
    icon_Home_page.classList.remove("ri-home-smile-2-fill");
    icon_Home_page.classList.add("ri-home-smile-line");
  }
} 
// change icon search
function iconSearch(){
  const icon_Search_page = document.querySelector('.Search i');
  if(Search_page.classList.contains("active")){
    icon_Search_page.classList.remove("ri-search-line");
    icon_Search_page.classList.add("ri-search-fill");
  }
  else{
    icon_Search_page.classList.remove("ri-search-fill");
    icon_Search_page.classList.add("ri-search-line");
  }
} 


// --------------------------------
//  list albums ของฝั่ง site-left
// --------------------------------
function listItems_btn(){
// ดึง Element ทั้งหมดที่มีคลาส 'listitem'
const listItems = document.querySelectorAll('.listitem');

// สร้างฟังก์ชันที่ใช้เปลี่ยนคลาส 'active'
function toggleActiveClass(event) {
  // ลบคลาส 'active' ออกจากทั้งหมด
  listItems.forEach(item => {
    item.classList.remove('active');
  });

  // เพิ่มคลาส 'active' ให้กับ <li> ที่ถูกคลิก
  event.currentTarget.classList.add('active');
}

// วนลูปทุก <li> เพื่อใส่การทำงานเมื่อคลิกเกิดขึ้น
listItems.forEach(item => {
  item.addEventListener('click', toggleActiveClass);
});
}
listItems_btn();





// --------------------------------
//      Carousel
// --------------------------------

let carousel;
function initSwiper() {
  // Calculate breakpoint values based on the size
    carousel = new Swiper('.carouselbox', {
    spaceBetween: 30,
    slidesPerView: 'auto',
    centeredSlides: false,
    // If we need pagination
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpointsBase: '.carouselbox',
    breakpoints: {
      0: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        centeredSlides: false,
      },
      500: {
        slidesPerView: 3,
        slidesPerGroup: 2,
        centeredSlides: false,
      },
      600: {
        slidesPerView: 4,
        slidesPerGroup: 3,
        centeredSlides: false,
      },
      700: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        centeredSlides: false,
      },
      800: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        centeredSlides: false,
      },
      900: {
        slidesPerView: 5,
        slidesPerGroup: 4,
        centeredSlides: false,
      },
      1000: {
        slidesPerView: 6,
        slidesPerGroup: 4,
        centeredSlides: false,
      },
      1100: {
        slidesPerView: 7,
        slidesPerGroup: 4,
        centeredSlides: false,
      },
    }
  });
}
initSwiper();

// --------------------------------

// ส่วนของการทำFade พื้นหลัง ใน container-top

// --------------------------------

let siteRight = document.querySelector('.site-right');
let container_top = document.querySelector('.container-top');
siteRight.addEventListener('scroll', function() {
    let value = siteRight.scrollTop; // เปลี่ยนจาก window.scrollY เป็น siteRight.scrollTop
    siteRight.style.left = value * 0.25 + 'px';

    if (value > 100) { // ตั้งค่าตามต้องการ เมื่อ scroll ถึงจุดที่ต้องการให้เปลี่ยนสี
      container_top.classList.add('darken');
      container_top.classList.remove('lighten');
      
    } else {
      container_top.classList.remove('darken');
      container_top.classList.add('lighten');
    }
});


document.addEventListener('DOMContentLoaded', function () {
  // เลือก element ที่มีคลาส custom-scrollbar และเรียกใช้ SimpleBar()
  let simpleBar = new SimpleBar(document.querySelector('.custom-scrollbar'));

  // รับอีเวนต์ scroll จาก SimpleBar
  simpleBar.getScrollElement().addEventListener('scroll', function () {
      let value = simpleBar.getScrollElement().scrollTop;
      
      // เช็คเงื่อนไขและปรับแต่งคลาสของ container_top
      if (value > 100) {
          container_top.classList.remove('lighten');
          container_top.classList.add('darken');
      } else {
          container_top.classList.remove('darken');
          container_top.classList.add('lighten');
      }
  });
});




// -------------------
// overlayscroll0จ้าาาา
// --------------------
// เมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', function () {
  // เลือก element ที่มีคลาส custom-scrollbar และเรียกใช้ SimpleBar()
  new SimpleBar(document.querySelector('.custom-scrollbar'));
  new SimpleBar(document.querySelector('.custom-scrollbar2'));
  new SimpleBar(document.querySelector('.custom-scrollbar3'));
  new SimpleBar(document.querySelector('.custom-scrollbar4'));
  new SimpleBar(document.querySelector('.custom-scrollbar5'));
});



// container-top
const upload_button = document.getElementById('upload');
upload_button.addEventListener('click', () => {
  insite_upload_page.classList.add("active");
  Goto_home_page.classList.remove('active');
  Goto_page_list.classList.remove('active');
  Goto_search_page.classList.remove('active');
  container_top.classList.remove("active");
});
container_top.classList.add("active");





// -------------------------------------------
// ตรงนี้เป็นส่วนของของแอดรูปเข้าไปใน ช่อง input file
// -------------------------------------------

const inputFile = document.querySelector("#file-img-artist");
const custum_file_upload = document.querySelector('.custum-file-upload');

inputFile.addEventListener('change', function () {
  const image = this.files[0];
  const reader = new FileReader();
  
  reader.onload = () => {
    const imgUrl = reader.result;
    const img = document.createElement('img');
    img.src = imgUrl;
    // Remove existing image (if any) before appending a new one
    const existingImage = custum_file_upload.querySelector('img');
    if (existingImage) {
      existingImage.remove();
    }

    custum_file_upload.appendChild(img);
  };

  reader.readAsDataURL(image);
});

// -------------------------------------------
// ตรงนี้เป็นส่วนของของแอดรูปเข้าไปใน ช่อง input file genre
// -------------------------------------------
function upload_img_custum_detail(){
  const inputPlaylistFile = document.querySelector("#file-detail-playlist");
  const custum_playlist_upload = document.querySelector('#custum-detail-playlist-upload');
  
  inputPlaylistFile.addEventListener('change', function () {
    const image = this.files[0];
    const reader = new FileReader();
    
    reader.onload = () => {
      const imgUrl = reader.result;
      const img = document.createElement('img');
      img.classList.add('img-forShow');
      img.src = imgUrl;
      // Remove existing image (if any) before appending a new one
      const existingImage = custum_playlist_upload.querySelector('img');
      if (existingImage) {
        existingImage.remove();
      }
  
      custum_playlist_upload.appendChild(img);
    };
  
    reader.readAsDataURL(image);
  });
}


// ------------------------------------------------------------------
// ตรงนี้เป็นส่วนของของแอดรูปเข้าไปใน ช่อง input file ในคลาส Add-song-popup
// ----------------------------------------------------------------

const InputImgSong = document.querySelector("#file-img-song-1");
const custum_file_song_upload = document.querySelector('#custum-file-song-upload-1');

InputImgSong.addEventListener('change', function () {
  const image = this.files[0];
  const reader = new FileReader();
  
  reader.onload = () => {
    const imgUrl = reader.result;
    const img = document.createElement('img');
    img.src = imgUrl;
    // Remove existing image (if any) before appending a new one
    const existingImage = custum_file_song_upload.querySelector('img');
    if (existingImage) {
      existingImage.remove();
    }

    custum_file_song_upload.appendChild(img);
  };

  reader.readAsDataURL(image);
});


// -------------------------------------------
// ตรงนี้เป็นส่วนของของแอดรูปเข้าไปใน ช่อง input file
// -------------------------------------------

const EditinputFile = document.querySelector("#Edit-file-img-artist");
const Editcustum_file_upload = document.querySelector('#custum-edit-file-upload');
// console.log(Editcustum_file_upload);
EditinputFile.addEventListener('change', function () {
  const image = this.files[0];
  const reader = new FileReader();
  
  reader.onload = () => {
    const imgUrl = reader.result;
    const img = document.createElement('img');
    img.src = imgUrl;
    // Remove existing image (if any) before appending a new one
    const existingImage = Editcustum_file_upload.querySelector('img');
    if (existingImage) {
      existingImage.remove();
    }

    Editcustum_file_upload.appendChild(img);
  };

  reader.readAsDataURL(image);
});
// -------------------------------------------
// ตรงนี้เป็นส่วนของของแอดรูปเข้าไปใน ช่อง input file
// -------------------------------------------

const Edit_file_img_song = document.querySelector("#Edit-file-img-song");
const custum_Edit_song_upload = document.querySelector('#custum-Edit-song-upload');
// console.log(Editcustum_file_upload);
Edit_file_img_song.addEventListener('change', function () {
  const image = this.files[0];
  const reader = new FileReader();
  
  reader.onload = () => {
    const imgUrl = reader.result;
    const img = document.createElement('img');
    img.src = imgUrl;
    // Remove existing image (if any) before appending a new one
    const existingImage = custum_Edit_song_upload.querySelector('img');
    if (existingImage) {
      existingImage.remove();
    }

    custum_Edit_song_upload.appendChild(img);
  };

  reader.readAsDataURL(image);
});





// ------------------------------------------------------------------
// ตรงนี้เป็นส่วนในการทำ dynamic content ต่างๆ 
// ----------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
  
  const addButton = document.querySelector('.add-song');
  const form = document.querySelector('.inp-group');
  let songCount = 1; // นับจำนวนเพลงที่เพิ่มเข้ามา เพื่อเป็นตัวแปรใว้สร้างชื่อ"id"แต่ละตัว ในการจำแนกแต่ละcontent
  addButton.addEventListener('click', function(e) {
      e.preventDefault();

      songCount++;

      const wrapper = document.createElement('div'); // สร้างตัวแปรชื่อ wrapper และให้มันสร้าง divition ขึ้นมาในhtml
      wrapper.classList.add('wrapper');// จากนั้นก็ตั้งชื่อ"class"แต่ละ divition นั้นขึ้นมา โดยชื่อ class= "wrapper" แล้วจะนำไปใช้ในส่วนต่อไป

      // ด้านล่างนี้สร้างตัวแปร songField แล้วเก็บ DOM ของคำสั่งHTMLเราใว้ 
      const songField = `  
          <div class="wrap-custum-file-upload" id="content-song-file-upload-${songCount}">
              <label for="file-img-song-${songCount}" class="custum-file-upload" id="custum-file-song-upload-${songCount}">
                  <div class="icon">
                      <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path> </g></svg>
                  </div>
                  <input id="file-img-song-${songCount}" type="file" name="file-img-songs[]" required>
              </label>
              <div> 
                  <span>Name</span>
                  <input type="text" placeholder="Music name" name="songs-name[]" required>
                  <span>File mp3 </span>
                  <div class="mp3-only">
                      <input type="file" class="song-file" id="for-file-song-name-${songCount}" name="file-song-name[]" required> 
                      <label for="for-file-song-name-${songCount}" class="for-edit-file-input" >
                          Select
                      </label>
                  </div>
              </div>
              <div class="delete-content-song" id="delete-content-song-${songCount}">
                <i class="ri-close-circle-fill"></i> 
              </div>  
          </div>   
      `;

      wrapper.innerHTML = songField; // ตรงนี้ก็เอา code จาก songField ใส่เข้าไปในตัวแปร wrapper แค่นั้นแหละ
      form.appendChild(wrapper); //สร้างChild ลงไปใน form || ก็คือเอาโค้ดลงไปใน form นั้นแหละ
      
      
      // ตรงนี้เป็นส่วนของจำแนก Input file รูปแต่ละรูป 
      const NewInputImgSong = document.querySelector("#file-img-song-" + songCount);
      const Newcustum_file_song_upload = document.querySelector('#custum-file-song-upload-'+ songCount);
    
      NewInputImgSong.addEventListener('change', function () {
        const image = this.files[0];
        const reader = new FileReader();
        
        reader.onload = () => {
          const imgUrl = reader.result;
          const img = document.createElement('img');
          img.src = imgUrl;
          // Remove existing image (if any) before appending a new one
          const existingImage = Newcustum_file_song_upload.querySelector('img');
          if (existingImage) {
            existingImage.remove();
          }
    
          Newcustum_file_song_upload.appendChild(img);
        };
    
        reader.readAsDataURL(image);
      });


      
      // ตรงนี้เป็นส่วนของการลบคลาส wrapper
      const deleteContentSong = document.getElementById('delete-content-song-' + songCount);
      deleteContentSong.addEventListener('click', (e) => {
        e.preventDefault();
        const wrapperToDelete = e.target.closest('.wrapper');
        if (wrapperToDelete) {
          wrapperToDelete.remove();
        }
      });
  });
});


function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const for_over_background = document.querySelector(".for-over-background");
const randomColor = getRandomColor();

for_over_background.style.background = `linear-gradient(0deg, rgba(18,18,18,1) 5%, ${randomColor} 100%)`;





// --------------------------------------------
// เกี่ยว กับ permission ของแต่ละ USER และ ADMIN
// ---------------------------------------------
const UserProfile = document.querySelector('.UserProfile');
UserProfile.insertAdjacentHTML("beforeend",Username);

const header_right_site_right = document.querySelector('.header-right_site-right');
const upload_BTN = header_right_site_right.querySelector('.upload') // ปุ่ม upload
const add_new_tab = header_right_site_right.querySelector('.add-new-tab'); // ปุ่ม add category
const Add_music_artist = document.querySelector('.Add-music-artist');

if(UserID != 1){ // เพราะว่า 1 คือ Admin
  upload_BTN.style.display = "none";
  add_new_tab.style.display = "none";
  Add_music_artist.style.display = "none";
}