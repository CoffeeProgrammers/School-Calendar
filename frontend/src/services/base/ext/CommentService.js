import BaseService from "../BaseService";

class CommentService extends BaseService {
    constructor() {
        super("http://localhost:8081/api/events");
    }

    createComment(eventId, data) {
        return this.handleRequest(() =>
            this.apiClient.post(`/${eventId}/comments/create`, data)
        );
    }

    updateComment(eventId, commentId, data) {
        return this.handleRequest(() =>
            this.apiClient.put(`/${eventId}/comments/update/${commentId}`, data)
        );
    }

    deleteComment(eventId, commentId) {
        return this.handleRequest(() =>
            this.apiClient.delete(`/${eventId}/comments/delete/${commentId}`)
        );
    }

    getComments(eventId, page, size) {
        return this.handleRequest(() =>
            this.apiClient.get(`/${eventId}/comments`, {
                params: { page, size }
            })
        );
    }
}

export default new CommentService();
