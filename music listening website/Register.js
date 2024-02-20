let isDuplicateEmail = false;
let isDuplicateUsername = false;
fetch("./API_user.php")
    .then((Response) => {
        if (!Response.ok) {
            throw new Error("Network response was not ok ")
        }
        return Response.json()
    })
    .then((data_user) => {
        // ---------------------------------------
        // ส่วนในการกรองEmail ว่าเป็นค่าซ้ำกับที่มีอยู่หรือไม่
        // -----------------------------------------
        const UserEmail = document.getElementById('UserEmail');
        const notice_email = document.getElementById('notice_email');
        UserEmail.addEventListener('keyup', (e) => {
            const email = e.target.value;
            if (!validateEmail(email)) {
                notice_email.style.color = "red";
                notice_email.innerHTML = "Incorrect";
            }
            if (validateEmail(email)) {
                notice_email.style.color = "green";
                notice_email.innerHTML = "correct";
                isDuplicateEmail = true;
            }
            const isDuplicate = data_user.some(user => user.email === email);
            if (isDuplicate) {
                notice_email.style.color = "red";
                notice_email.innerHTML = "This email is already taken";
                isDuplicateEmail=false;
            }
        });

        // ---------------------------------------
        // ส่วนในการกรองUsername ว่าเป็นค่าซ้ำกับที่มีอยู่หรือไม่
        // -----------------------------------------

        const Username = document.getElementById('Username');
        const notice_Uname = document.getElementById('notice_Uname');
        Username.addEventListener('keyup', (e) => {
            const Uname = e.target.value;
            if (!validateUsername(Uname)) {
                notice_Uname.style.color = "red";
                notice_Uname.innerHTML = "Incorrect";
            }
            if (validateUsername(Uname)) {
                notice_Uname.style.color = "green";
                notice_Uname.innerHTML = "correct";
                isDuplicateUsername = true
            }
            const isDuplicate = data_user.some(user => user.username === Uname);
            if (isDuplicate) {
                notice_Uname.style.color = "red";
                notice_Uname.innerHTML = "This Username is already taken";
                isDuplicateUsername=false;
            }
        });

    })
    .catch(error => {
        console.error("Error", error);
    })

const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('Cpassword');
const noticePassword = document.getElementById('notice_Password');
const notice_CPassword = document.getElementById('notice_CPassword');
passwordInput.addEventListener('keydown', function (e) {
    if (e.key === " ") {
        e.preventDefault();
    }
});

passwordInput.addEventListener('input', function (e) {
    const password = e.target.value.trim();
    if (!validatePassword(password)) {
        noticePassword.style.color = "red";
        noticePassword.innerHTML = "Incorrect";
    } else {
        noticePassword.style.color = "green";
        noticePassword.innerHTML = "Correct";
    }
});

confirmInput.addEventListener('input', function (e) {
    const confirmPassword = e.target.value.trim();
    const password = passwordInput.value.trim();

    if (confirmPassword === password) {
        notice_CPassword.style.color = "green";
        notice_CPassword.innerHTML = "Passwords match";
    } else {
        notice_CPassword.style.color = "red";
        notice_CPassword.innerHTML = "Passwords do not match";
    }
});
function validateEmail(email) {
    var re = /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}
function validateUsername(username) {
    var re = /^[a-zA-Z0-9_]{6,}$/;
    return re.test(username);
}

function validatePassword(password) {
    var re = /^[a-zA-Z0-9]{8,}$/;
    return re.test(password);
}




const SendData = document.getElementById('SendData');
SendData.addEventListener('click', function (event) {
    // ตรวจสอบว่าข้อมูลทั้งหมดถูกต้องหรือไม่
    const isEmailCorrect = validateEmail(UserEmail.value.trim());
    const isUsernameCorrect = validateUsername(Username.value.trim());
    const isPasswordCorrect = validatePassword(passwordInput.value.trim());
    const isConfirmPasswordMatch = confirmInput.value.trim() === passwordInput.value.trim();

    // ถ้าข้อมูลไม่ถูกต้อง หรือยังไม่ได้ตรวจสอบ
    if (!isEmailCorrect || !isUsernameCorrect || !isPasswordCorrect || !isConfirmPasswordMatch ||!isDuplicateEmail ||!isDuplicateUsername) {
        event.preventDefault(); // ยกเลิกการทำงานปกติของปุ่ม
        // แสดงข้อความเตือนให้ผู้ใช้ทราบว่ามีข้อมูลที่ไม่ถูกต้อง
        alert("กรอกข้อมูลให้ทุกตัวเป็น Currect ก่อน.");
    }
});
