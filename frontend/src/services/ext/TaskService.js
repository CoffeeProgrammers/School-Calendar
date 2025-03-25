import BaseService from "../BaseService";

const API_URL = 'http://localhost:5000/tasks';

//TODO: adapt to json-server
class TaskService extends BaseService {
    constructor() {
        super(API_URL);
    }

    async createTask(eventId, taskData) {
        return await this.handleRequest(
            () => this.apiClient.post(`/create`, { ...taskData, event_id: eventId })
        );
    }

    async updateTask(taskId, taskData) {
        return await this.handleRequest(
            () => this.apiClient.put(`/update/${taskId}`, taskData)
        );
    }

    async deleteTask(taskId) {
        return await this.handleRequest(
            () => this.apiClient.delete(`/delete/${taskId}`)
        );
    }

    async getTaskById(taskId) {
        return await this.handleRequest(
            () => this.apiClient.get(`/${taskId}`)
        );
    }

    //TODO
    async getMyTasks({page, size, searchQuery , deadline, isDone}) {
        return await this.handleRequest(
            () => this.apiClient.get('', {
                params: {
                    _page: page,
                    name: searchQuery,
                    isDone: isDone,
                    deadline: deadline,
                    _sort: 'start_date',
                    _order: 'asc'
                    // size, //TODO: pagination when backend will be done
                }
            })
        );
    }

    async toggleTaskDone(taskId) {
        return await this.handleRequest(
            () => this.apiClient.post(`/toggle/${taskId}`)
        );
    }

    //TODO
    async getTasksByEvent(eventId, page, size) {
        return await this.handleRequest(
            () => this.apiClient.get(`/events/${eventId}`, {
                params: { page, size }
            })
        );
    }
}

export default new TaskService();