import axios from "axios";

const api = axios.create({
    baseURL:'https://ecommerce-backend-lc6w.onrender.com/api',
});

export default api;