// src/api/client.js
import axios from "axios";
import Cookies from "js-cookie";
import {history} from "./history";

export const client = axios.create({
    baseURL: "http://localhost:8081/api",
    withCredentials: true,
});

client.interceptors.request.use(
    config => {
        const token = Cookies.get("accessToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

client.interceptors.response.use(
    response => response,
    async error => {
        const { response, config } = error;
        console.log(
            "Intercepted error",
            error,
            response,
            config,
            config._retried)
        if (response && response.status === 498 && !config._retried) {
            config._retried = true;
            return client(config);
        }

        if (response && response.status === 401) {
            Cookies.remove("accessToken");
            if (history.navigate) {
                history.navigate("/login");
            }
        }
        return Promise.reject(error);
    }
);
