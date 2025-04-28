import axios from "axios";

const $api = axios.create({
    withCredentials:true,
    baseURL: process.env.REACT_APP_BACK_URL || "http://localhost:3004"
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization =`Bearer ${localStorage.getItem('token')}`
    return config;
})

export default $api