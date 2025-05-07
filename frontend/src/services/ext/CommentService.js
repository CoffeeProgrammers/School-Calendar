import BaseService from "../BaseService";

const API_URL = 'http://localhost:5000';

class CommentService extends BaseService {
    constructor() {
        super(API_URL);
    }

    async createComment(text) {
        return await this.handleRequest(
            () => this.apiClient.post(`/comments`, {
                eventId: 1,
                text: text,
                time: new Date().toISOString(),
                creator: {
                    id: 101,
                    email: "john.doe@example.com",
                    role: "consultant",
                    first_name: "John",
                    last_name: "Doe"
                }
            })
        );
    }

    async updateComment(commentId, newText) {
        return await this.handleRequest(() =>
            this.apiClient.patch(`/comments/${commentId}`, { text: newText})
        );
    }

    async deleteComment(commentId) {
        return await this.handleRequest(
            () => this.apiClient.delete(`/comments/${commentId}`)
        );
    }

    async getCommentsByEventId({eventId, page, size}){
        return await this.handleRequest(
            () => this.apiClient.get(`/comments`, {
                params: { 
                    _page: page,

                }
            })
        );
    }
}

export default new CommentService();
