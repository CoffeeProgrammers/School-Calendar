import axios from "axios";

const API_URL = 'http://localhost:5000/events';

class EventService {

    async getEventList({ searchQuery, eventType }) {
        try {
            const response = await axios.get(`${API_URL}`, {
                params: {
                    name: searchQuery,
                    type: eventType,
                    _sort: 'start_date',
                    _order: 'asc',
                    _limit: 10
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error getting subjects by student ID:', error);
            throw error;
        }
    }

}

export default new EventService();