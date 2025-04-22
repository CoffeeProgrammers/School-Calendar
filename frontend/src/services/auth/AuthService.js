import axios from "axios";
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8081/api/'

const apiClient = axios.create({
    baseURL: API_URL,
});
// {
//     "id": 2,
//     "username": "john.doe@example.com",
//     "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJ0b2tlbiI6InNvbWV0b2tlbnZhbHVlMTIzIiwic3ViIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJpc3MiOiJjb20udG9kby5hcHAiLCJhdWQiOiJ0b2RvLXVzZXJzIiwiaWF0IjoxNzQ0MTM4ODc2LCJleHAiOjE3NDQxMzk3NzZ9.nixDlVKL0thRib8G6EORN-Z1HDT164QPyphJZOzrjws",
//     "role": "STUDENT"
// }

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
}

export default AuthService;
