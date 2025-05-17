import BaseService from "../BaseService";

class TaskService extends BaseService {
    constructor() {
        super("http://localhost:8081/api/tasks");
    }

    createTask(eventId, data) {
        return this.handleRequest(() =>
            this.apiClient.post(`/create?eventId=${eventId}`, data)
        );
    }

    updateTask(id, data) {
        return this.handleRequest(() =>
            this.apiClient.put(`/update/${id}`, data)
        );
    }

    deleteTask(id) {
        return this.handleRequest(() =>
            this.apiClient.delete(`/delete/${id}`)
        );
    }

    getTask(id) {
        return this.handleRequest(() =>
            this.apiClient.get(`/${id}`)
        );
    }

    getMyTasks(page, size, name, deadline, isDone, isPast) {
        return this.handleRequest(() =>
            this.apiClient.get("", {
                params: { page, size, name, deadline, isDone, isPast }
            })
        );
    }

    getMyTasksWithoutEvent(page, size) {
        return this.handleRequest(() =>
            this.apiClient.get(`/getMyWithoutEvent`, {
                params: { page, size }
            })
        );
    }

    getTasksByEvent(eventId, page, size) {
        return this.handleRequest(() =>
            this.apiClient.get(`/events/${eventId}`, {
                params: { page, size }
            })
        );
    }

    toggleTaskDone(id) {
        return this.handleRequest(() =>
            this.apiClient.put(`/toggle/${id}`)
        );
    }

    assignTaskToEvent(taskId, eventId) {
        return this.handleRequest(() =>
            this.apiClient.put(`/assign/${taskId}/to/${eventId}`)
        );
    }

    unassignTaskFromEvent(taskId) {
        return this.handleRequest(() =>
            this.apiClient.put(`/unassign/${taskId}`)
        );
    }

    countAllUserTasks(userId) {
        return this.handleRequest(() =>
            this.apiClient.get(`/countAllMy/user/${userId}`)
        );
    }
}

export default new TaskService();
