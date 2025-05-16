import BaseService from "../BaseService";

class NotificationService extends BaseService {
    constructor() {
        super("http://localhost:8081/api/notifications");
    }

    getMyNotifications(page, size) {
        return this.handleRequest(() =>
            this.apiClient.get("", {
                params: { page, size }
            })
        );
    }
}

export default new NotificationService();
