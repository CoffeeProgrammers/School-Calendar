package com.calendar.backend.app.dto.invitation;

import com.calendar.backend.app.dto.event.EventListResponse;
import com.calendar.backend.app.dto.user.UserListResponse;
import lombok.Data;

@Data
public class InvitationResponse {
    private Long id;
    private UserListResponse from;
    private UserListResponse to;
    private EventListResponse event;
    private String description;
    private String warning;
    private String time;
}
