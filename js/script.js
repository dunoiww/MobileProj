import { getAllUser, getUser, createUser, deleteUser} from "./../controllers/user.js"

let currentCustomer = null; // customer


const originUrl = window.location.origin; // origin link


let searchForm = document.querySelector('.header-page .search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.header-page .navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
}

window.onscroll = () =>{
    searchForm.classList.remove('active');
    navbar.classList.remove('active');
}



const imgPosition = document.querySelectorAll('.aspect-ratio-169 img');
const imgContainer = document.querySelector('.aspect-ratio-169');
const dotItem = document.querySelectorAll('.dot');
let slides = document.querySelectorAll('.home .slide');
let index = 0;

imgPosition.forEach(function(image, index) {
    image.style.left = index * 100 +"%"
    dotItem[index].addEventListener('click', function() {
        slider(index);
    })
})

function imgSlide () {
    index++;
    if (index >= imgPosition.length) {index = 0}
    slider(index)
}

function slider(index) {
    imgContainer.style.left = "-" +index*100 +"%"
    const dotActive = document.querySelector('.dotActive')
    dotActive.classList.remove('dotActive');
    dotItem[index].classList.add("dotActive");
}

setInterval(imgSlide, 4000)

function next(){
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prev(){
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}

let btntotop = document.getElementById("btnToTop");

window.onscroll = function() {scrollFunction()}

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btntotop.style.display = "block";
    } else {
        btntotop.style.display = "none";
    }
}

$("#btnToTop").on("click", function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

// login
$("form").on("submit", function() {
    event.preventDefault();

    var buttonId = $(document.activeElement).attr("id");

    if (buttonId === "btnLogin") {
        const arrayForm = $(this).serializeArray();

        const currentUserLogin = arrayForm[0].value;
        const currentPassword = arrayForm[1].value;

        getAllUser().then((res) => {
            return res.data
        }).then((users) => {    
            let isLogin = false;

            users.forEach(user => {
                if (user['username'] === currentUserLogin || user['email'] === currentUserLogin) {
                    if (user['password'] === currentPassword) {
                        if (user['isAdmin']) {
                            console.log('admin');
                        }
                        else {
                            currentCustomer = user;
                            console.log(currentCustomer);
                        }

                        isLogin = true;
                    }
                    
                    return;
                }
            });

            if (!isLogin) {
                Swal.fire({
                    title: "Lỗi",
                    text: "Tài khoản hoặc mật khẩu không chính xác",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        })
    }
})

// register
$("form").on("submit", function(event) {
    event.preventDefault();

    var buttonId = $(document.activeElement).attr("id");
    
    if (buttonId === "btnRegister") {
        const arrayForm = $(this).serializeArray();
        
        const currentName = arrayForm[0].value;
        const currentUsername = arrayForm[1].value; 
        const currentEmail = arrayForm[2].value; 
        const currentPassword = arrayForm[3].value; 
        const currentRePassword = arrayForm[4].value; 


        if (currentPassword !== currentRePassword) {
            Swal.fire({
                title: "Lỗi",
                text: "Mật khẩu xác nhận không đúng",
                icon: "error",
                confirmButtonText: "OK"
            });

            return;
        }
        
        getAllUser().then((res) => {
            return res.data
        }).then((users) => {
            let isCreate = true;

            users.forEach(user => {
                if (user['username'] === currentUsername) {
                    Swal.fire({
                        title: "Lỗi",
                        text: "Tài khoản đã tồn tại",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                    
                    isCreate = false;

                    return;
                }

                if (user['email'] === currentEmail) {
                    Swal.fire({
                        title: "Lỗi",
                        text: "Email đã tồn tại",
                        icon: "error",
                        confirmButtonText: "OK"
                    });

                    isCreate = false;

                    return;
                }
            });

            if (!isCreate) {
                return;
            }

            var data = {
                name: currentName,
                username: currentUsername,
                email: currentEmail,
                password: currentPassword
            }

            createUser(data);
        })
    }
});