import BaseService from "../BaseService";

const API_URL = "http://localhost:5000/invitations";

class InvitationService extends BaseService {
    constructor() {
        super(API_URL);
    }

    async createInvitation(eventId, receiverId, invitationData) {
        return await this.handleRequest(() =>
            this.apiClient.post(`/create/receivers/${receiverId}`, invitationData, {
                params: { event_id: eventId },
            })
        );
    }

    async updateInvitation(invitationId, invitationData) {
        return await this.handleRequest(() =>
            this.apiClient.put(`/update/${invitationId}`, invitationData)
        );
    }

    async deleteInvitation(invitationId) {
        return await this.handleRequest(() =>
            this.apiClient.delete(`/delete/${invitationId}`)
        );
    }

    async getAllInvitations(page) {
        return await this.handleRequest(() =>
            this.apiClient.get("", {
                params: {
                    _page: page,

                }
            })
        );
    }

    async acceptInvitation(invitationId) {
        return await this.handleRequest(() =>
            this.apiClient.post(`/accept/${invitationId}`)
        );
    }

    async rejectInvitation(invitationId) {
        return await this.handleRequest(() =>
            this.apiClient.post(`/reject/${invitationId}`)
        );
    }
}

export default new InvitationService();
