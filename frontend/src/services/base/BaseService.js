import axios from "axios";
import Cookies from "js-cookie";

class BaseService {
    constructor(baseURL) {
        this.apiClient = axios.create({
            baseURL,
            withCredentials: true,
        });
        this.apiClient.interceptors.response.use(
          response => response,
          async error => {
            console.log("error");
            if (error.response && error.response.status === 498 && !error.config._retried) {
              error.config._retried = true;
              return this.apiClient(error.config);
            }
            if(error.response && error.response.status === 401) {
              console.log("401");
            }
            return Promise.reject(error);
          }
        );

        this.apiClient.interceptors.request.use(
            (config) => {
                const token = Cookies.get("accessToken");
                if (token) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
    }

    async handleRequest(request) {
        try {
            const response = await request();
            // console.log("RESPONSE")
            // Cookies.remove('accessToken')
            //
            // console.log(Cookies.get('accessToken'))
            return response.data;
        } catch (error) {
            throw error;

            // console.log("ERROR")
            // if (error.response.status === 498) {
            //     try {
            //         console.log("Refreshing token")
            //         Cookies.set('accessToken', error.response.data.jwt)
            //         const response = await request();
            //         return response.data;
            //     } catch (error) {
            //         console.log("ERROR 1")
            //         if (error.response.status === 401) {
            //             console.log("Unauthorized")
            //             Cookies.remove('accessToken')
            //             console.log(Cookies.get('accessToken'))
            //         } else {
            //             console.log("ERROR 4")
            //             throw error;
            //         }
            //     }
            // }
            // } else {
            //     if (error.response.status === 401) {
            //         console.log("Unauthorized")
            //         Cookies.remove('accessToken')
            //         console.log(Cookies.get('accessToken'))
            //     } else {
            //         console.log("ERROR 2")
            //         throw error;
            //     }
            // }

        }
    }
}

export default BaseService;
