import axios, { AxiosResponse } from 'axios';

const BASE_URL:string = "http://localhost:8080/api/v1";

const axiosServices = axios.create({
    baseURL: BASE_URL,
    timeout: 50000,
});

axiosServices.interceptors.request.use(
    function (config) {
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

axiosServices.interceptors.response.use(
    (res: AxiosResponse) => res,
    async (err) => {
        return Promise.reject(err);
    },
);

axiosServices.interceptors.request.use(
    function (config) {
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

const axiosUpload = axios.create({
    baseURL: BASE_URL,
    timeout: 50000,
});

axiosUpload.interceptors.request.use(
    function (config) {
        config.headers['Content-Type'] = 'multipart/form-data';
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            config.headers['Authorization'] = `Bearer ${access_token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export const axiosClientUpload = axiosUpload;

export default axiosServices;