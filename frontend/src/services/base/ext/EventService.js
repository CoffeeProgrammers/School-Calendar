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
                             search = '',
                             startDate = '',
                             endDate = '',
                             isPast = '',
                             type = ''
                         }) {

        const params = {
            page,
            size,
        };

        if (search) params.search = search;
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;
        if (isPast !== null) params.isPast = isPast;
        if (type) params.typeOfEvent = type;

        return await this.handleRequest(() =>
            this.apiClient.get('/events', { params })
        );
    }

    async getOtherUsersEventsBetweenDates(userId, startDate, endDate, gap) {
        return await this.handleRequest(() =>
            this.apiClient.get(`/users/${userId}/between`, {
                params: {
                    start_date_gte: startDate,
                    start_date_lte: endDate,
                },
            })
        );
    }

    async getMyEventsBetweenDates(startDate, endDate, gap) {
        return await this.handleRequest(() =>
            this.apiClient.get('/between', {
                params: {
                    start_date_gte: startDate,
                    start_date_lte: endDate,
                },
            })
        );
    }


}

export default new EventService();