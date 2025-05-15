import BaseService from "../BaseService";

class InvitationService extends BaseService {
    constructor() {
        super("http://localhost:8081/api/invitations");
    }

    createInvitation(eventId, receiverId, data) {
        return this.handleRequest(() =>
            this.apiClient.post(`/create/events/${eventId}/receivers/${receiverId}`, data)
        );
    }

    updateInvitation(invitationId, data) {
        return this.handleRequest(() =>
            this.apiClient.put(`/update/${invitationId}`, data)
        );
    }

    deleteInvitation(invitationId) {
        return this.handleRequest(() =>
            this.apiClient.delete(`/delete/${invitationId}`)
        );
    }

    getInvitations(page, size) {
        return this.handleRequest(() =>
            this.apiClient.get("", {
                params: { page, size }
            })
        );
    }

    acceptInvitation(invitationId) {
        return this.handleRequest(() =>
            this.apiClient.post(`/accept/${invitationId}`)
        );
    }

    rejectInvitation(invitationId) {
        return this.handleRequest(() =>
            this.apiClient.post(`/reject/${invitationId}`)
        );
    }
}

export default new InvitationService();
