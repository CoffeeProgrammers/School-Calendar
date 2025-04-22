import BaseService from "../BaseService";

const API_URL = 'http://localhost:8081/api/';

class EventService extends BaseService {
    constructor() {
        super(API_URL);
    }

    async createEvent(
        { eventCreateRequest:{
            name,
            type,
            start_date,
            end_date,
            content,
            is_content_available_anytime,
            meeting_type,
            place
        }}
    ) {
        return await this.handleRequest(
            () => this.apiClient.post('/',
                { eventCreateRequest:{
                        name,
                        type,
                        start_date,
                        end_date,
                        content,
                        is_content_available_anytime,
                        meeting_type,
                        place
                }}
            ));
    }

    async updateEvent(eventId, {
        eventUpdateRequest: {
            name,
            content,
            is_content_available_anytime,
            meeting_type,
            place
        }
    }) {
        return await this.handleRequest(
            () => this.apiClient.put(`/${eventId}`, {
                eventUpdateRequest: {
                    name,
                    content,
                    is_content_available_anytime,
                    meeting_type,
                    place
                }
            }));
    }

    async deleteEvent(eventId) {
        return await this.handleRequest(
            () => this.apiClient.delete(`/${eventId}`));
    }

    async getEventById(eventId) {
        return await this.handleRequest(
            () => this.apiClient.get(`events/${eventId}`));
    }

    async getAllMyEvents({
                             page = 0,
                             size = 10,
                             search = '',       // Додаємо окремі параметри для фільтрів
                             startDate = '',
                             endDate = '',
                             isPast = null
                         }) {
        // Формуємо параметри для запиту
        const params = {
            page,
            size,
        };

        // Додаємо фільтри тільки якщо вони існують
        if (search) params.search = search;
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;
        if (isPast !== null) params.isPast = isPast;

        // Відправляємо запит з параметрами
        return await this.handleRequest(() =>
            this.apiClient.get('/events', { params })
        );
    }

    //TODO
    async getOtherUsersEventsBetweenDates(userId, startDate, endDate, gap) {
        return await this.handleRequest(() =>
            this.apiClient.get(`/users/${userId}/between`, {
                params: {
                    start_date_gte: startDate,
                    start_date_lte: endDate,
                    //TODO: gap
                },
            })
        );
    }

    //TODO
    async getMyEventsBetweenDates(startDate, endDate, gap) {
        return await this.handleRequest(() =>
            this.apiClient.get('/between', {
                params: {
                    start_date_gte: startDate,
                    start_date_lte: endDate,
                    //TODO: gap
                },
            })
        );
    }


}

export default new EventService();