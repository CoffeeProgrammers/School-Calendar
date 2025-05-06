import BaseService from "../BaseService";

const API_URL = 'http://localhost:5000/tasks';

class TaskService extends BaseService {
    constructor() {
        super(API_URL);
    }

    async createTask(eventId, taskData) {
        return await this.handleRequest(
            () => this.apiClient.post(`/create`, {...taskData, event_id: eventId})
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

    async getMyTasks({page, size, searchQuery, deadline, isDone}) {
        return await this.handleRequest(
            () => this.apiClient.get('', {
                params: {
                    _page: page,
                    name: searchQuery,
                    isDone: isDone,
                    deadline: deadline,
                    _sort: 'start_date',
                    _order: 'asc'
                }
            })
        );
    }

    async toggleTask({taskId, isDone}) {
        return await this.handleRequest(() =>
            this.apiClient.patch(`/${taskId}`, {
                isDone: !isDone,
            })
        );
    };

    async getTasksByEvent({eventId, page, size}) {
        return await this.handleRequest(() =>
            this.apiClient.get('', {
                params: {
                    _page: page,
                }
            })
        );
    }
}

export default new TaskService();