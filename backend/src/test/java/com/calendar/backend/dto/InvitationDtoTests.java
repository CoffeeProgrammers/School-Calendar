package com.calendar.backend.dto;

import com.calendar.backend.dto.event.EventListResponse;
import com.calendar.backend.dto.invitation.InvitationRequest;
import com.calendar.backend.dto.invitation.InvitationResponse;
import com.calendar.backend.dto.user.UserListResponse;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class InvitationDtoTests {

    @Test
    void testInvitationRequest() {
        InvitationRequest request1 = new InvitationRequest();
        request1.setDescription("Meeting invitation");

        InvitationRequest request2 = new InvitationRequest();
        request2.setDescription(request1.getDescription());

        assertEquals(request1, request2);
        assertEquals(request1.toString(), request2.toString());
        assertEquals(request1.hashCode(), request2.hashCode());
    }

    @Test
    void testInvitationResponse() {
        InvitationResponse response1 = new InvitationResponse();
        UserListResponse sender = new UserListResponse();
        UserListResponse receiver = new UserListResponse();
        EventListResponse event = new EventListResponse();
        response1.setId(1L);
        response1.setSender(sender);
        response1.setReceiver(receiver);
        response1.setEvent(event);
        response1.setDescription("Meeting");
        response1.setWarning("Important");
        response1.setTime("2024-01-01T10:00:00");

        InvitationResponse response2 = new InvitationResponse();
        response2.setId(response1.getId());
        response2.setSender(response1.getSender());
        response2.setReceiver(response1.getReceiver());
        response2.setEvent(response1.getEvent());
        response2.setDescription(response1.getDescription());
        response2.setWarning(response1.getWarning());
        response2.setTime(response1.getTime());

        assertEquals(response1, response2);
        assertEquals(response1.toString(), response2.toString());
        assertEquals(response1.hashCode(), response2.hashCode());
    }
}
