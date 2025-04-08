import BaseService from "../BaseService";

const API_URL = 'http://localhost:5000/api/notifications';

//TODO: adapt to json-server
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