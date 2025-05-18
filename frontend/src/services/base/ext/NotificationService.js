import BaseService from "../BaseService";

class NotificationService extends BaseService {
    constructor() {
        super("/notifications");
    }

    getMyNotifications(page, size) {
        return this.get("", {
            params: {page, size}
        });
    }
}

export default new NotificationService();
