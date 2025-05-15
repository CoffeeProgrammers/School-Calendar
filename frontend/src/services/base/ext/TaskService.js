import BaseService from "../BaseService";

class TaskService extends BaseService {
    constructor() {
        super("http://localhost:8081/api/tasks");
    }

    createTask(eventId, data) {
        return this.handleRequest(() =>
            this.apiClient.post(`/create?event_id=${eventId}`, data)
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

    //TODO: isDone
    getMyTasks(page, size, name, deadline, isDone, isPast) {
        return this.handleRequest(() =>
            this.apiClient.get("", {
                params: {page, size, name, deadline, isDone, isPast}
            })
        );
    }

    toggleTaskDone(id) {
        return this.handleRequest(() =>
            this.apiClient.put(`/toggle/${id}`)
        );
    }

    getTasksByEvent(eventId, page, size) {
        return this.handleRequest(() =>
            this.apiClient.get(`/events/${eventId}`, {
                params: {page, size}
            })
        );
    }

    assignTaskToEvent(taskId, eventId) {
        return this.handleRequest(() =>
            this.apiClient.put(`/assign/${taskId}/to/${eventId}`)
        );
    }

    getMyTasksWithoutEvent(page, size) {
        return this.handleRequest(() =>
            this.apiClient.get(`/getMyWithoutEvent`, {
                params: {page, size}
            })
        );
    }
}

export default new TaskService();
