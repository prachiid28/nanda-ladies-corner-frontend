import axios from "axios";

const api = axios.create({
    baseURL: "https://nanda-ladies-corner-backend.onrender.com/api"
});

export default api;