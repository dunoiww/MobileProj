import { API_URL } from "./const.js";
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

var orderAPI = API_URL + 'order/';

function getAllOrder() {
    axios.get(orderAPI)
    .then((data) => {
        console.log("Get all order successful");
        return data;
    }).catch((err) => {
        console.error(err);
    })
}

function getOrder(id) {
    axios.get(orderAPI + id)
    .then((data) => {
        console.log("Get order successful");
        return data;
    }).catch((err) => {
        console.error(err);
    })
}

function createOrder(data) {
    axios.post(orderAPI, data)
    .then(() => {
        console.log("Create order successful");
    }).catch((err) => {
        console.error(err);
    })
}

function deleteOrder(id) {
    axios.delete(orderAPI + id)
    .then((data) => {
        console.log("Delete order successful");
    }).catch((err) => {
        console.error(err);
    })
}
