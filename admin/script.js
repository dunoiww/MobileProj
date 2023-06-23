import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

import { getAllUser, createUser, deleteUser } from './../controllers/user.js';
import { getAllProduct, createProduct, deleteProduct } from './../controllers/product.js';

$(document).ready(function() {
    openTab();

    loadCustomer();
    loadProduct();

    $(document).on('click', '.admin-content #sidebar ul li a', function() {
        $('.admin-content #sidebar ul li a').removeClass('active');
        $(this).addClass('active')
        openTab($(this).attr("href").substring(1));
    })

    $(document).on('click', '.btnDeleteCustomer', function() {
        if (confirm("Xác nhận xoá!!!")) {
            const row = $(this).closest("tr");
            deleteUser(row.attr('id')).then((result) => {
                if (result) {
                    row.remove();   
                } else {
                    alert('Xoá thất bại');
                }
            })
        }
    })

    // add customer
    $(document).on('submit', 'form', function(event) {
        event.preventDefault();

        var buttonId = $(document.activeElement).attr("id");
        if (buttonId === "btnFuncAddCustomer") {
            const arrayForm = $(this).serializeArray();
            
            const currentName = arrayForm[0].value;
            const currentUsername = arrayForm[1].value; 
            const currentEmail = arrayForm[2].value; 
            const currentPassword = arrayForm[3].value; 

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

                createUser(data).then((result) => {
                    if (result) {
                        console.log("Tạo thành công");
                        loadCustomer();
                    }
                    else alert.log("Tạo thất bại");
                });
            })
        }

    })

    $(document).on('submit', 'form', function(event) {
        event.preventDefault();

        var buttonId = $(document.activeElement).attr("id");
        if (buttonId === "btnFuncAddProduct") {
            const arrayForm = $(this).serializeArray();
            const files = $('#fileImagesProduct')[0].files;

            uploadImageClound(files).then((images) => {
                var data = {
                    images: images,
                    name: arrayForm[0].value,
                    price: parseInt(arrayForm[1].value),
                    quantity: parseInt(arrayForm[2].value),
                    brand: arrayForm[3].value,
                    describe: arrayForm[4].value,
                    screen: arrayForm[5].value,
                    operating_system: arrayForm[6].value,
                    rear_camera: arrayForm[7].value,
                    front_camera: arrayForm[8].value,
                    ram: arrayForm[9].value,
                    rom: arrayForm[10].value,
                    chip: arrayForm[11].value,
                    sim: arrayForm[12].value,
                    pin: arrayForm[13].value,
                    color: arrayForm[14].value,
                }
                
                createProduct(data).then((result) => {
                    if (result) {
                        loadProduct();
                    }
                })

            })
        };
            
    })
});

function openTab(nameTab) {
    const mainContent= document.getElementsByClassName('allContent-section')[0].children;
    
    for (let e of mainContent) {
        e.style.display="none";
    }
    
    switch (nameTab) {
        case 'home':
            $('#home').css('display', 'block');
            break;
        case 'customer':
            $('#customer').css('display', 'block');
            break;
        case 'product':
            $('#product').css('display', 'block');
            break;
        case 'order':
            $('#order').css('display', 'block');
            break;
    }
}

function uploadImageClound(files) {
    let images = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append("upload_preset", "v4cgeikf");

        const image = axios.post('https://api.cloudinary.com/v1_1/dclzpc4gd/image/upload', formData)
        .then((res) => {
            return res.data;
        }).then((data) => {
            return data.secure_url;
        }).catch(error => {
            // Xử lý lỗi nếu có
            console.error('Failed to upload image:', error);
        });

        images.push(image);
    }

    return Promise.all(images);
}
  
function loadCustomer() {
    getAllUser().then((res) => {
        return res.data;
    }).then((users) => {
        var tbody = $('#tableCustomer').find('tbody');
        
        let tableHtml = "";

        users.forEach(user => {
            if (!user['isAdmin']) {
                tableHtml += "<tr id=" + user['_id'] + ">";
                tableHtml += "<td>" + user['name'] + "</td>";
                tableHtml += "<td>" + user['username'] + "</td>";
                tableHtml += "<td>" + user['password'] + "</td>";
                tableHtml += "<td>" + user['email'] + "</td>";
                tableHtml += '<td><button class="btn btn-primary btnFixCustomer" style="height:40px">Sửa</button></td>';
                tableHtml += '<td><button class="btn btn-danger btnDeleteCustomer" style="height:40px">Xoá</button></td>';
                tableHtml += "</tr>";
            }
        });

        tbody.html(tableHtml);
    })
}

function loadProduct() {
    getAllProduct().then((res) => {
        return res.data;
    }).then((products) => {
        var tbody = $('#tableProduct').find('tbody');
        
        let tableHtml = "";

        products.forEach(products => {
            tableHtml += "<tr id=" + products['_id'] + ">";
            tableHtml += '<td><img src="' + products['images'][0] + '" alt="Ảnh" style="width: 50px; height: 50px;"></td>';
            tableHtml += "<td>" + products['name'] + "</td>";
            tableHtml += "<td>" + products['price'] + "</td>";
            tableHtml += "<td>" + products['quantity'] + "</td>";
            tableHtml += '<td><button class="btn btn-primary btnFixProduct" style="height:40px">Sửa</button></td>';
            tableHtml += '<td><button class="btn btn-danger btnDeleteProduct" style="height:40px">Xoá</button></td>';
            tableHtml += "</tr>";
        });

        tbody.html(tableHtml);
    })
}

