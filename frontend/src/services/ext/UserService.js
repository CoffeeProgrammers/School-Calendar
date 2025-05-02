import BaseService from "../BaseService";

const API_URL = 'http://localhost:5000/users';

class UserService extends BaseService {
    constructor() {
        super(API_URL);
    }

    async createUser(userData) {
        return await this.handleRequest(
            () => this.apiClient.post(`/create`, userData)
        );
    }

    async updateUser(userId, userData) {
        return await this.handleRequest(
            () => this.apiClient.put(`/update/${userId}`, userData)
        );
    }

    async getUserById(userId) {
        return await this.handleRequest(
            () => this.apiClient.get(`/${userId}`)
        );
    }

    async getAllUsers({page, size, searchQuery, role} = {}) {
        return await this.handleRequest(
            () => this.apiClient.get(`/`,
                {
                    params: {
                        _page: page,
                        // first_name: searchQuery, //TODO
                        // last_name: searchQuery,
                        email: searchQuery,
                        role: role,
                        _sort: 'start_date',
                        _order: 'asc',
                        // size, //TODO: pagination when backend will be done
                    }
                })
        );
    }

    async getUsersByEvent(eventId, {page, size} = {}) {
        return await this.handleRequest(
            () => this.apiClient.get(`/events/${eventId}`, {params: {page, size}})
        );
    }

    async getMyUser() {
        return await this.handleRequest(
            () => this.apiClient.get(`/my`)
        );
    }

    async deleteUser(userId) {
        return await this.handleRequest(
            () => this.apiClient.delete(`/delete/${userId}`)
        );
    }

    async updateMyUser(userData) {
        return await this.handleRequest(
            () => this.apiClient.put(`/update`, userData)
        );
    }
}

export default new UserService();
