import BaseService from "../BaseService";

const API_URL = 'http://localhost:5000/api/notifications';

class NotificationService extends BaseService {
    constructor() {
        super(API_URL);
    }

    async getMyNotifications() {
        return await this.handleRequest(
            () => this.apiClient.get(`/`)
        );
    }
}

export default new NotificationService();