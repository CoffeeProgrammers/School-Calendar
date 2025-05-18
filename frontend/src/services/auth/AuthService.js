import axios from "axios";
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8081/api/'

const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

class AuthService {
    static async handleRequest(request) {
        try {
            const response = await request();
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    static async login(email, password) {
        try {
            const
                response = await axios.post(`${API_URL}auth/login`, {
                    username: email,
                    password,
                }, {
                    withCredentials: true
                });

            const accessToken = response.data.accessToken;
            const role = response.data.role;
            const userId = response.data.id;

            Cookies.set('accessToken', accessToken)
            Cookies.set('role', role)
            Cookies.set('userId', userId)

            console.log(response.data)
        } catch (error) {
            throw error;
        }
    }

    static async logout() {
        try {
            await apiClient.post("auth/logout");

            Cookies.remove('accessToken');
            Cookies.remove('role');
            Cookies.remove('userId');
        } catch (error) {
            console.error("Logout failed:", error);
            throw error;
        }
    }
}

export default AuthService;
