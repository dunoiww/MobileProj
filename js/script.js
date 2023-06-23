import { currentCustomer, setCustomer, conventVND } from "./const.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import { getAllUser, getUser, createUser, deleteUser} from "./../controllers/user.js"
import { getAllProduct, getSomeProduct, getProductBrand, getProductSortByPrice, getProduct } from "./../controllers/product.js"

let mainCustomer = currentCustomer; // customer
console.log(mainCustomer);

let searchForm = document.querySelector('.search-form');

// document.querySelector('#search-btn').onclick = () =>{
//     searchForm.classList.toggle('active');
//     navbar.classList.remove('active');
// }

let navbar = document.querySelector('.header-page .navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    // searchForm.classList.remove('active');
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

// support
function getCurrentURL() {
    let currentURL
    if (window.cordova) {
        currentURL = navigator.splashscreen.getCurrentPageUrl();
    } else {
        currentURL = window.location.href;
    }

    return currentURL.split('/').pop().split('.')[0];
}

function loadProduct(idDiv, products) {
    let divContent = $(`#${idDiv}`);
    
    let divHTML="";
        products.forEach(product => {
        const priceVND = conventVND(product['price']);
            
        let divProduct = `<div class="col-lg-3 col-sm-6 col-6">
                <div class="item p-3">
                    <div class="item-img">
                        <a href="detailProduct.html?${product['_id']}"><img src=${product['images'][0]} style="width: 150px; height: 170px"
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

            divHTML += divProduct
        });
    
    divContent.html(divHTML)
}

function getIdProduct() {
    let currentURL
    if (window.cordova) {
        currentURL = navigator.splashscreen.getCurrentPageUrl();
    } else {
        currentURL = window.location.href;
    }

    return currentURL.split('?')[1];
}

// load
$(document).ready(function() {
    let mainHTML = getCurrentURL();
    
    console.log(mainHTML);
    
    switch(mainHTML) {
        case 'home':
            // loadNewProductInHome();
            loadSpecialProductInHome();
            break;
        case 'products':
            loadProductInPageProducts();
            break;
        case 'detailProduct':
            loadDetailProduct(getIdProduct());
            // console.log(getIdProduct());
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

            else {
                Swal.fire ({
                    title: "Thành công",
                    text: "Đăng nhập thành công!",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then((result) => {
                    window.location.href = "home.html";
                })
            }
        }).catch((err) => {
            console.error(err);
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
        }).catch((err) => {
            console.error(err);
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
        loadProduct("specialProductContent", products);
    }).catch((err) => {
        console.error(err);
    })
}

// Products
function loadProductInPageProducts() {
    getAllProduct().then((res) => {
        return res.data;
    }).then((products) => {
        loadProduct("listProductContent", products);
    }).catch((err) => {
        console.error(err);
    })
}

$(document).on('click', '.filterProduct', function() {
    const href = $(this).attr("href");
    const currentBrand = href.substr(1);
    getProductBrand(currentBrand).then((res) => {
        return res.data
    }).then((products) => {
        loadProduct("listProductContent", products)
    }).catch((err) => {
        console.error(err)
    })
})

$(document).on('click', '.sortProduct', function() {
    const href = $(this).attr("href");
    const currentSort = href.substr(1);
    console.log(currentSort);
    getProductSortByPrice(currentSort).then((res) => {
        return res.data
    }).then((products) => {
        loadProduct("listProductContent", products)
    }).catch((err) => {
        console.error(err)
    })
})

// Detail product
function loadDetailProduct(id) {
    // getProduct(id).then((res) => {
    //     return res.data
    // }).then((product) => {
    //     $("#nameProduct").text(product['name']);

    //     // images
    //     let divImageHTML="";
        
        

    //     // $("#slideImages").html(divImageHTML);
    // }).catch((err) => {
    //     console.error(err);
    // })
}


//gửi email khi quên mật khẩu
const nodemailer = require("nodemailer");

const email = document.querySelector("#email_forgetpass");
console.log(email);

// Tạo transporter (địa chỉ email và mật khẩu của tài khoản Gmail gửi email)
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "helpercustomerasp@gmail.com",
    pass: "@N123456",
  },
});

// Tạo nội dung email (HTML)
let mailOptions = {
  from: "helpercustomerasp@gmail.com",
  to: "recipient-email@example.com",
  subject: "Mã xác nhận",
  html: "<p>Mã xác nhận của bạn là: 123456</p>",
};

// Gửi email
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});