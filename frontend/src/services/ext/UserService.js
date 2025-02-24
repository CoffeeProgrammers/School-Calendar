import BaseService from "../BaseService";

const API_URL = 'http://localhost:5000/api/users';

//TODO: adapt to json-server
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

    async getAllUsers({ page, size, email, lastName, firstName } = {}) {
        return await this.handleRequest(
            () => this.apiClient.get(`/`, { params: { page, size, email, lastName, firstName } })
        );
    }

    async getUsersByEvent(eventId, { page, size } = {}) {
        return await this.handleRequest(
            () => this.apiClient.get(`/events/${eventId}`, { params: { page, size } })
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
