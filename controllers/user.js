import { API_URL } from "./const.js";
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

var userAPI = API_URL + 'user/';

function getAllUser() {
    axios.get(userAPI)
    .then((data) => {
        console.log("Get all user successful");
        return data;
    }).catch((err) => {
        console.error(err);
    })
}

function getUser(id) {
    axios.get(userAPI + id)
    .then((data) => {
        console.log("Get user successful");
        return data;
    }).catch((err) => {
        console.error(err);
    })
}

function createUser(data) {
    axios.post(userAPI, data)
    .then(() => {
        console.log("Create user successful");
    }).catch((err) => {
        console.error(err);
    })
}

function deleteUser(id) {
    axios.delete(userAPI + id)
    .then((data) => {
        console.log("Delete user successful");
    }).catch((err) => {
        console.error(err);
    })
}
