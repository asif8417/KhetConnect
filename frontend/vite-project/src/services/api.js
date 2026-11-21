import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",   //baseURL is the common starting address of your backend API.
    headers: {
        "Content-Type": "application/json"
    }
});

export default API;