import BaseService from "../BaseService";

class CommentService extends BaseService {
    constructor() {
        super("/events");
    }

    createComment(eventId, data) {
        return this.post(`/${eventId}/comments/create`, data);
    }

    updateComment(eventId, commentId, data) {
        return this.put(`/${eventId}/comments/update/${commentId}`, data);
    }

    deleteComment(eventId, commentId) {
        return this.delete(`/${eventId}/comments/delete/${commentId}`);
    }

    getComments(eventId, page, size) {
        return this.get(`/${eventId}/comments`, {
            params: { page, size }
        });
    }
}

export default new CommentService();
