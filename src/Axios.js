import axios from "axios";


const instance = axios.create({
    baseURL:'...' // API URL
});

export default instance;