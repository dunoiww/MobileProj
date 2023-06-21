import { API_URL } from "./const.js";
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

var userAPI = API_URL + "user/";

console.log(userAPI);

function getall() {
    axios.get(userAPI)
        .then(({ data }) => {
            console.log((data));

           return data;
        }).then(users => {
            console.log((users));
        })
        .catch((err) => {
            console.error(err);
        })
}

function getone(id) {
    axios.get(userAPI + id)
        .then(({ data }) => {
           return data;
        }).then(users => {
            console.log((users));
        })
        .catch((err) => {
            console.error(err);
        })
}

var formData = {
    name: "Huỳnh Mai Cao Nhân",
    username: "nhan",
    password: "3",
    email: "nhan@gmail.com"
}

function create(data) {
    axios.post(userAPI, data)
        .then(({ res }) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        })
}

function update(id, data) {
    axios.patch(userAPI + id, data)  
    .then(() => {
        console.log("update thanh cong");
    }).catch((err) => {
        console.error(err);
    })
}

function deleteone(id) {
    axios.delete(userAPI + id)  
    .then(() => {
        console.log("xoa thanh cong");
    }).catch((err) => {
        console.error(err);
    })
}

$(document).ready(function() {
 $('#get').click( function() {
         getall();
    });

    $('#getid').click( function() {
        getone("6492a94d9942cd1c84e6663d");
   });
   $('#post').click( function() {
    create(formData);
    });
    $('#update').click( function() {
        update("64935b554ee0137771ce48e1", formData);
    });
    $('#delete').click( function() {
        deleteone("64935b9d4ee0137771ce48e4");
    });
});


