import BaseService from "../BaseService";

const API_URL = 'http://localhost:8081/api/';

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

    //TODO
    async getMyTasks({ page, size, searchQuery, deadline, isDone }) {
        const params = {
            page,
            size,
        };

        if (searchQuery) {
            params.name = searchQuery;
        }
        if (typeof isDone === 'boolean') {
            params.isDone = isDone;
        }
        if (deadline) {
            params.deadline = deadline;
        }

        return await this.handleRequest(() =>
            this.apiClient.get('tasks', { params })
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