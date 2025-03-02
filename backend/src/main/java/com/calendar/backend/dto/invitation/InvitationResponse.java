package com.calendar.backend.dto.invitation;

import com.calendar.backend.dto.event.EventListResponse;
import com.calendar.backend.dto.user.UserListResponse;
import lombok.Data;

@Data
public class InvitationResponse {
    private Long id;
    private UserListResponse sender;
    private UserListResponse receiver;
    private EventListResponse event;
    private String description;
    private String warning;
    private String time;
}
