import BaseService from "../BaseService";

class EventService extends BaseService {
    constructor() {
        super("/events");
    }

    createEvent(data) {
        return this.post("/create", data);
    }

    updateEvent(id, data) {
        return this.put(`/update/${id}`, data);
    }

    deleteEvent(id) {
        return this.delete(`/delete/${id}`);
    }

    deleteUserFromEvent(eventId, userId) {
        return this.put(`/delete/${eventId}/user/${userId}`);
    }

    getEvent(id) {
        return this.get(`/${id}`);
    }

    getMyEvents(page, size, search = null, startDate = null, endDate = null, typeOfEvent = null) {
        const params = {
            page,
            size,
            ...(search && { search }),
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
            ...(typeOfEvent && { typeOfEvent }),
        };

        return this.get("", { params });
    }

    getUserEventsBetween(userId, startDate, endDate, gap = 0) {
        return this.get(`/users/${userId}/between`, {
            params: { startDate, endDate, gap }
        });
    }

    getMyEventsBetween(startDate, endDate, gap = 0) {
        return this.get("/between", {
            params: { startDate, endDate, gap }
        });
    }

    getMyCreatedEvents(page, size, search = null, startDate = null, endDate = null, typeOfEvent = null) {
        const params = {
            page,
            size,
            ...(search && { search }),
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
            ...(typeOfEvent && { typeOfEvent }),
        };

        return this.get("/getCreatorIsMe", { params });
    }

    getPastEventCountByUser(userId) {
        return this.get(`/count/user/${userId}`);
    }

}

export default new EventService();
