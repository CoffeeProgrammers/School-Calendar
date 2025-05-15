import BaseService from "../BaseService";

class UserService extends BaseService {
    constructor() {
        super("http://localhost:8081/api/users");
    }

    createUser(data) {
        return this.handleRequest(() =>
            this.apiClient.post("/create", data)
        );
    }

    updateUser(id, data) {
        return this.handleRequest(() =>
            this.apiClient.put(`/update/${id}`, data)
        );
    }

    getUser(id) {
        return this.handleRequest(() =>
            this.apiClient.get(`/${id}`)
        );
    }

    getAllUsers(
        page,
        size,
        email = "",
        firstName = "",
        lastName = "",
        role = ""
    ) {
        return this.handleRequest(() =>
            this.apiClient.get("", {
                params: {page, size, email, firstName, lastName, role}
            })
        );
    }

    getUsersByEvent(
        eventId,
        page,
        size,
        firstName = "",
        lastName = "",
        email = "",
        role = ""
    ) {
        return this.handleRequest(() =>
            this.apiClient.get(`/events/${eventId}`, {
                params: {page, size, firstName, lastName, email, role}
            })
        );
    }

    getUsersByNotEvent(eventId, page, size, email = "", firstName = "", lastName = "", role = "") {
        return this.handleRequest(() =>
            this.apiClient.get(`/not_events/${eventId}`, {
                params: {page, size, email, firstName, lastName, role}
            })
        );
    }

    getMyUser() {
        return this.handleRequest(() =>
            this.apiClient.get("/my")
        );
    }

    deleteUser(id) {
        return this.handleRequest(() =>
            this.apiClient.delete(`/delete/${id}`)
        );
    }

    updateMyUser(data) {
        return this.handleRequest(() =>
            this.apiClient.put("/update", data)
        );
    }
}

export default new UserService();
