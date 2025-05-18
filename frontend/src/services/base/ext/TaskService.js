import BaseService from "../BaseService";

class TaskService extends BaseService {
    constructor() {
        super("/tasks");
    }

    createTask(eventId, data) {
        return this.post(`/create?eventId=${eventId}`, data);
    }

    updateTask(id, data) {
        return this.put(`/update/${id}`, data);
    }

    deleteTask(id) {
        return this.delete(`/delete/${id}`);
    }

    getTask(id) {
        return this.get(`/${id}`);
    }

    getMyTasks(page, size, name, deadline, isDone, isPast) {
        return this.get("", {
            params: { page, size, name, deadline, isDone, isPast }
        });
    }

    getMyTasksWithoutEvent(page, size) {
        return this.get(`/getMyWithoutEvent`, {
            params: { page, size }
        });
    }

    getTasksByEvent(eventId, page, size) {
        return this.get(`/events/${eventId}`, {
            params: { page, size }
        });
    }

    toggleTaskDone(id) {
        return this.put(`/toggle/${id}`);
    }

    assignTaskToEvent(taskId, eventId) {
        return this.put(`/assign/${taskId}/to/${eventId}`);
    }

    unassignTaskFromEvent(taskId) {
        return this.put(`/unassign/${taskId}`);
    }

    countAllUserTasks(userId) {
        return this.get(`/countAllMy/user/${userId}`);
    }
}

export default new TaskService();
