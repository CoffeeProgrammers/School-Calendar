import BaseService from "../BaseService";

class CommentService extends BaseService {
    constructor() {
        super("/comments"); // змінив з "/events" на "/comments"
    }

    createComment(eventId, data) {
        return this.post(`/events/${eventId}/create`, data);
    }

    updateComment(commentId, data) {
        return this.put(`/update/${commentId}`, data);
    }

    deleteComment(commentId) {
        return this.delete(`/delete/${commentId}`);
    }

    getComments(eventId, page, size) {
        return this.get(`/events/${eventId}`, {
            params: { page, size }
        });
    }

    getUserCommentsCount(userId) {
        return this.get(`/getCount/${userId}`);
    }
}

export default new CommentService();
