package com.calendar.backend.main.dto.comment;

import com.calendar.backend.main.dto.event.EventListResponse;
import com.calendar.backend.main.dto.user.UserListResponse;
import lombok.Data;

@Data
public class CommentResponse {
    private Long id;
    private UserListResponse creator;
    private EventListResponse event;
    private String text;
    private String time;
}
