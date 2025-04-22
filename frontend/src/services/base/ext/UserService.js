import BaseService from "../BaseService";

const API_URL = 'http://localhost:8081/api/';

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
        const params = {
            page,
            size,
        };

        if (searchQuery) {
            params.name = searchQuery;
        }
        if (role) {
            params.role = role;
        }

        return await this.handleRequest(() =>
            this.apiClient.get('users', { params })
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
