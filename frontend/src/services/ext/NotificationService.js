import BaseService from "../BaseService";

const API_URL = 'http://localhost:5000/notifications';

class NotificationService extends BaseService {
    constructor() {
        super(API_URL);
    }

    async getMyNotifications() {
        return await this.handleRequest(
            () => this.apiClient.get(`/`, {
                params: {
                    _page: 1,
                }
            })
        );
    }
}

export default new NotificationService();