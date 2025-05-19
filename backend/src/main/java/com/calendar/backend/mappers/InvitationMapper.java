package com.calendar.backend.mappers;

import com.calendar.backend.dto.invitation.InvitationRequest;
import com.calendar.backend.dto.invitation.InvitationResponse;
import com.calendar.backend.models.Invitation;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface InvitationMapper {
    InvitationResponse fromInvitationToInvitationResponse(Invitation invitation);

    Invitation fromInvitationRequestToInvitation(InvitationRequest invitationRequest);
}
