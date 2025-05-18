// src/services/InvitationService.js
import BaseService from "../BaseService";

class InvitationService extends BaseService {
    constructor() {
        super("/invitations");
    }

    createInvitation(eventId, receiverId, data) {
        return this.post(`/create/events/${eventId}/receivers/${receiverId}`, data);
    }

    updateInvitation(invitationId, data) {
        return this.put(`/update/${invitationId}`, data);
    }

    deleteInvitation(invitationId) {
        return this.delete(`/delete/${invitationId}`);
    }

    getInvitations(page, size) {
        return this.get("", {
            params: {page, size}
        });
    }

    getMySentInvitations(page, size) {
        return this.get("/getMySent", {
            params: {page, size}
        });
    }

    acceptInvitation(invitationId) {
        return this.post(`/accept/${invitationId}`);
    }

    rejectInvitation(invitationId) {
        return this.post(`/reject/${invitationId}`);
    }
}

export default new InvitationService();
