package com.calendar.backend.dto.task;

import com.calendar.backend.dto.user.UserListResponse;
import lombok.Data;

@Data
public class TaskListResponse {
    private Long id;
    private UserListResponse creator;
    private String name;
    private String deadline;
    private boolean isDone;
}
