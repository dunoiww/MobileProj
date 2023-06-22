import { API_URL } from "./const.js";
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

var productAPI = API_URL + 'product/';

export function getAllProduct() {
    return axios.get(productAPI)
        .then((data) => {
            console.log("Get all product successful");
            return data;
        }).catch((err) => {
            console.error(err);
        })
}

export function getProduct(id) {
    axios.get(productAPI + id)
    .then((data) => {
        console.log("Get product successful");
        return data;
    }).catch((err) => {
        console.error(err);
    })
}

export function createProduct(data) {
    return axios.post(productAPI, data)
    .then(() => {
        console.log("Create product successful");
        return true;
    }).catch((err) => {
        console.error(err);
        return false;
    })
}

export function deleteProduct(id) {
    axios.delete(productAPI + id)
    .then((data) => {
        console.log("Delete product successful");
    }).catch((err) => {
        console.error(err);
    })
}
