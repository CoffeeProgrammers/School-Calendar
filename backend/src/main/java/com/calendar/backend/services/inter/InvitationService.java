package com.calendar.backend.services.inter;

import com.calendar.backend.dto.invitation.InvitationRequest;
import com.calendar.backend.dto.invitation.InvitationResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.models.Invitation;
import org.springframework.security.core.Authentication;

public interface InvitationService {
    InvitationResponse create(
            InvitationRequest invitationRequest, Authentication authentication, long eventId, long recieverId);
    InvitationResponse update(long invitationId, InvitationRequest invitationRequest);
    void delete(Long id);
    InvitationResponse findById(Long id);
    PaginationListResponse<Invitation> findAllByUserId(long userId, int page, int size);
    void acceptInvitation(Long id);
    void rejectInvitation(Long id);
}

