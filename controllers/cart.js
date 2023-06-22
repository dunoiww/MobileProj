import { API_URL } from "./const.js";
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

var cartAPI = API_URL + 'cart/';

function getAllCart() {
    axios.get(cartAPI)
    .then((data) => {
        console.log("Get all cart successful");
        return data;
    }).catch((err) => {
        console.error(err);
    })
}

function getCart(id) {
    axios.get(cartAPI + id)
    .then((data) => {
        console.log("Get cart successful");
        return data;
    }).catch((err) => {
        console.error(err);
    })
}

function createCart(data) {
    axios.post(cartAPI, data)
    .then(() => {
        console.log("Create cart successful");
    }).catch((err) => {
        console.error(err);
    })
}

function deleteCart(id) {
    axios.delete(cartAPI + id)
    .then((data) => {
        console.log("Delete cart successful");
    }).catch((err) => {
        console.error(err);
    })
}
