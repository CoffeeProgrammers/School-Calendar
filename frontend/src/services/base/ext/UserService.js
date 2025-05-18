import BaseService from "../BaseService";

class UserService extends BaseService {
    constructor() {
        super("/users");
    }

    createUser(data) {
        return this.post("/create", data);
    }

    updateUser(id, data) {
        return this.put(`/update/${id}`, data);
    }

    getUser(id) {
        return this.get(`/${id}`);
    }

    getAllUsers(page, size, email = "", firstName = "", lastName = "", role = "") {
        return this.get("", {
            params: { page, size, email, firstName, lastName, role }
        });
    }

    getUsersByEvent(eventId, page, size, firstName = "", lastName = "", email = "", role = "") {
        return this.get(`/events/${eventId}`, {
            params: { page, size, firstName, lastName, email, role }
        });
    }

    getUsersByNotEvent(eventId, page, size, email = "", firstName = "", lastName = "", role = "") {
        return this.get(`/not_events/${eventId}`, {
            params: { page, size, email, firstName, lastName, role }
        });
    }

    getMyUser() {
        return this.get("/my");
    }

    deleteUser(id) {
        return this.delete(`/delete/${id}`);
    }

    updateMyUser(data) {
        return this.put("/update", data);
    }

    updateMyPassword(password, newPassword) {
        return this.put("/update/password", {
            oldPassword: password,
            newPassword: newPassword,
        });
    }
}

export default new UserService();
