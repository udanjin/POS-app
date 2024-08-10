import axios from "axios";

// const axiosInstance = axios.create({
//     baseURL: 'https://pos-app-api-five.vercel.app/api',
// });

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api',
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;