import axios from "axios";


const instance = axios.create({
    baseURL:'https://us-central1-clone-cf06a.cloudfunctions.net/api'
        //'http://localhost:5001/clone-cf06a/us-central1/api'
});

export default instance;