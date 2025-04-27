package com.calendar.backend.mappers;

import com.calendar.backend.TestUtil;
import com.calendar.backend.dto.invitation.InvitationRequest;
import com.calendar.backend.dto.invitation.InvitationResponse;
import com.calendar.backend.models.Invitation;
import com.calendar.backend.models.User;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.time.format.DateTimeFormatter;

import static org.assertj.core.api.Assertions.assertThat;

class InvitationMapperTest {

    private final InvitationMapper invitationMapper = Mappers.getMapper(InvitationMapper.class);

    @Test
    void fromInvitationToInvitationResponse_validInvitation() {
        // given
        User sender = TestUtil.createUser("TEACHER");
        User receiver = TestUtil.createUser("STUDENT");
        Invitation invitation = new Invitation(sender, receiver, TestUtil.createEvent("Test Event"), "Test Description", "No Warning");
        invitation.setId(1L);

        // when
        InvitationResponse invitationResponse = invitationMapper.fromInvitationToInvitationResponse(invitation);

        // then
        assertThat(invitationResponse).isNotNull();
        assertThat(invitationResponse.getId()).isEqualTo(invitation.getId());
        assertThat(invitationResponse.getSender().getId()).isEqualTo(sender.getId());
        assertThat(invitationResponse.getReceiver().getId()).isEqualTo(receiver.getId());
        assertThat(invitationResponse.getDescription()).isEqualTo(invitation.getDescription());
        assertThat(invitationResponse.getWarning()).isEqualTo(invitation.getWarning());
        assertThat(invitationResponse.getTime()).isEqualTo(DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(invitation.getTime()));
    }

    @Test
    void fromInvitationToInvitationResponse_nullInvitation() {
        // given
        Invitation invitation = null;

        // when
        InvitationResponse invitationResponse = invitationMapper.fromInvitationToInvitationResponse(invitation);

        // then
        assertThat(invitationResponse).isNull();
    }

    @Test
    void fromInvitationRequestToInvitation_validRequest() {
        // given
        InvitationRequest invitationRequest = new InvitationRequest();
        invitationRequest.setDescription("Test Description");

        // when
        Invitation invitation = invitationMapper.fromInvitationRequestToInvitation(invitationRequest);

        // then
        assertThat(invitation).isNotNull();
        assertThat(invitation.getDescription()).isEqualTo(invitationRequest.getDescription());
    }

    @Test
    void fromInvitationRequestToInvitation_nullRequest() {
        // given
        InvitationRequest invitationRequest = null;

        // when
        Invitation invitation = invitationMapper.fromInvitationRequestToInvitation(invitationRequest);

        // then
        assertThat(invitation).isNull();
    }
}
