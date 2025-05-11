import BaseService from "../BaseService";

class InvitationService extends BaseService {
    constructor() {
        super("http://localhost:8081/api/events");
    }

    createInvitation(eventId, receiverId, data) {
        return this.handleRequest(() =>
            this.apiClient.post(`/${eventId}/invitations/create/receivers/${receiverId}`, data)
        );
    }

    updateInvitation(eventId, invitationId, data) {
        return this.handleRequest(() =>
            this.apiClient.put(`/${eventId}/invitations/update/${invitationId}`, data)
        );
    }

    deleteInvitation(eventId, invitationId) {
        return this.handleRequest(() =>
            this.apiClient.delete(`/${eventId}/invitations/delete/${invitationId}`)
        );
    }

    getInvitations(eventId, page, size) {
        return this.handleRequest(() =>
            this.apiClient.get(`/${eventId}/invitations`, {
                params: { page, size }
            })
        );
    }

    acceptInvitation(eventId, invitationId) {
        return this.handleRequest(() =>
            this.apiClient.post(`/${eventId}/invitations/accept/${invitationId}`)
        );
    }

    rejectInvitation(eventId, invitationId) {
        return this.handleRequest(() =>
            this.apiClient.post(`/${eventId}/invitations/reject/${invitationId}`)
        );
    }
}

export default new InvitationService();
