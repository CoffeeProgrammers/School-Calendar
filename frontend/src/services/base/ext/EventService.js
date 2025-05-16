import BaseService from "../BaseService";

class EventService extends BaseService {
    constructor() {
        super("http://localhost:8081/api/events");
    }

    createEvent(data) {
        return this.handleRequest(() =>
            this.apiClient.post("/create", data)
        );
    }

    updateEvent(id, data) {
        return this.handleRequest(() =>
            this.apiClient.put(`/update/${id}`,data)
        );
    }

    deleteEvent(id) {
        return this.handleRequest(() =>
            this.apiClient.delete(`/delete/${id}`)
        );
    }

    deleteUserFromEvent(eventId, userId) {
        return this.handleRequest(() =>
            this.apiClient.put(`/delete/${eventId}/user/${userId}`)
        );
    }

    getEvent(id) {
        return this.handleRequest(() =>
            this.apiClient.get(`/${id}`)
        );
    }

    getMyEvents(
        page,
        size,
        search = null,
        startDate = null,
        endDate = null,
        typeOfEvent = null
    ) {
        const params = {
            page,
            size,
            ...(search && {search}),
            ...(startDate && {startDate}),
            ...(endDate && {endDate}),
            ...(typeOfEvent && {typeOfEvent}),
        };

        return this.handleRequest(() =>
            this.apiClient.get("", {params})
        );
    }

    getUserEventsBetween(userId, startDate, endDate, gap = 0) {
        return this.handleRequest(() =>
            this.apiClient.get(`/users/${userId}/between`, {
                params: {
                    start_date: startDate,
                    end_date: endDate,
                    gap
                }
            })
        );
    }

    getMyEventsBetween(startDate, endDate) {
        return this.handleRequest(() =>
            this.apiClient.get("/between", {
                params: {
                    start_date: startDate,
                    end_date: endDate
                }
            })
        );
    }
}

export default new EventService();
