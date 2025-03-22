import BaseService from "../BaseService";

const API_URL = 'http://localhost:5000/events';

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
            () => this.apiClient.get(`/${eventId}`));
    }

    //TODO: "MY" Events
    async getAllMyEvents(
        {
            page,
            searchQuery,
            type,
            date
        }
    ) {
        return await this.handleRequest(() =>
            this.apiClient.get('', {
                params: {
                    _page: page,
                    name: searchQuery,
                    type: type,
                    start_date: date,
                    _sort: 'start_date',
                    _order: 'asc'
                    // size, //TODO: pagination when backend will be done

                }
            })
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