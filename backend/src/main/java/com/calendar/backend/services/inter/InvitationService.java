package com.calendar.backend.services.inter;

import com.calendar.backend.dto.invitation.InvitationRequest;
import com.calendar.backend.dto.invitation.InvitationResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import org.springframework.security.core.Authentication;

public interface InvitationService {
    InvitationResponse create(
            InvitationRequest invitationRequest, Authentication authentication, long eventId, long recieverId);
    InvitationResponse update(long invitationId, InvitationRequest invitationRequest);
    void delete(Long id);
    InvitationResponse findById(Long id);
    PaginationListResponse<InvitationResponse> findAllByRecieverId(Authentication authentication, int page, int size);
    PaginationListResponse<InvitationResponse> findAllBySenderId(Authentication authentication, int page, int size);
    void acceptInvitation(Long id);
    void rejectInvitation(Long id);
}

