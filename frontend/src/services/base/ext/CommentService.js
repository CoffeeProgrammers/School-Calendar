import BaseService from "../BaseService";

const API_URL = 'http://localhost:5000';

class CommentService extends BaseService {
    constructor() {
        super(API_URL);
    }

    async createComment(eventId, {commentRequest: {text}}) {
        return await this.handleRequest(
            () => this.apiClient.post(`/comments`, {
                eventId,
                commentRequest: {text}
            })
        );
    }

    async updateComment(commentId, {commentRequest: {text}}) {
        return await this.handleRequest(
            () => this.apiClient.put(`/comments/${commentId}`,
                {commentRequest: {text}})
        );
    }

    async deleteComment(commentId) {
        return await this.handleRequest(
            () => this.apiClient.delete(`/comments/${commentId}`)
        );
    }

    //TODO: adapt to json-server
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
