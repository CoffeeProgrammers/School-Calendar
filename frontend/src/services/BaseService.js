import axios from "axios";

class BaseService {
    constructor(baseURL) {
        this.apiClient = axios.create({
            baseURL,
            // withCredentials: true,
        });

        //TODO: Security

        // this.apiClient.interceptors.request.use(
        //     (config) => {
        //         const token = Cookies.get("token");
        //         if (token) {
        //             config.headers["Authorization"] = `Bearer ${token}`;
        //         }
        //         return config;
        //     },
        //     (error) => Promise.reject(error)
        // );
    }

    async handleRequest(request) {
        try {
            const response = await request();
            return response.data;
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);
            throw error;
        }
    }
}

export default BaseService;
