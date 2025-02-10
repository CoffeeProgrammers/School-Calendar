package com.calendar.backend.main.dto.task;

import com.calendar.backend.main.dto.event.EventListResponse;
import com.calendar.backend.main.dto.user.UserListResponse;
import lombok.Data;

@Data
public class TaskFullResponse {
    private Long id;
    private UserListResponse creator;
    private EventListResponse event;
    private String name;
    private String content;
    private String deadline;
}
