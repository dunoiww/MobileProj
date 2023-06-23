import { currentCustomer, setCustomer, conventVND } from "./const.js";

import { getAllUser, getUser, createUser, deleteUser} from "./../controllers/user.js"
import { getSomeProduct } from "./../controllers/product.js"

let mainCustomer = currentCustomer; // customer
console.log(mainCustomer);

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

$(document).ready(function() {
    let currentURL
    if (window.cordova) {
        currentURL = navigator.splashscreen.getCurrentPageUrl();
    } else {
        currentURL = window.location.href;
    }

    let mainHTML = currentURL.split('/').pop().replace('.html', '');
    console.log(mainHTML);
    switch(mainHTML) {
        case 'home':
            // loadNewProductInHome();
            loadSpecialProductInHome();
            break;
    }

})

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
                            mainCustomer = user;
                            console.log(mainCustomer);
                            setCustomer(mainCustomer);
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


// Home
function loadNewProductInHome() {
    getSomeProduct(10).then((res) => {
        return res.data;
    }).then((products) => {
        let divNewProductContent = $('#newProductContent');
        
        products.forEach(product => {
            let priceVND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product['price']);
            
            let divProduct = `
            <div class="item">
                            <a href="#">
                                <img src="images/pro-1.png" alt="Điện thoại nổi bật">
                            </a>
                            <a href="#" class="item-des text-decoration-none">
                                <div class="item-des-content">
                                    <h4>iPhone 13(128gb) chính hãng VN/A</h4>
                                </div>
                                <div class="item-des-price">
                                    <span>19.000.000 đ</span>
                                </div>
                            </a>
                        </div>
            `

            divNewProductContent.append(divProduct)

            // divHTML += '<div class="item">'
            // divHTML += '<a href="#">'
            // divHTML += '<img src="images/pro-1.png" alt="Điện thoại nổi bật">'
            // divHTML += '</a>'
            // divHTML += '<a href="#" class="item-des text-decoration-none">'
            // divHTML += '<div class="item-des-content">'
            // divHTML += '<h4>' + product['name'] + '</h4>'
            // divHTML += '</div>'
            // divHTML += '<div class="item-des-price">'
            // divHTML += '<span>' + priceVND + '</span>'
            // divHTML += '</div>'
            // divHTML += '</a>'
            // divHTML += '</div>'
        });

        
    })
}

function loadSpecialProductInHome() {
    getSomeProduct(20).then((res) => {
        return res.data;
    }).then((products) => {
        let divSpecialProductContent = $('#specialProductContent');
        
        products.forEach(product => {
            const priceVND = conventVND(product['price']);
            
            let divProduct = `
            <div class="col-lg-3 col-sm-6 col-6">
                <div class="item p-3">
                    <div class="item-img">
                        <a href="#"><img src=${product['images'][0]} style="width: 150px; height: 170px"
                            title="${product['name']}" alt=""></a>
                    </div>
                                
                    <div class="info">
                        <a class="text-decoration-none info-text" href="#"> ${product['name']}</a>
                        <span class="info-price">
                            <strong>${priceVND}</strong>
                        </span>
                    </div>
                    

                </div>
            </div>
            `

            divSpecialProductContent.append(divProduct)
        });
    })
} 