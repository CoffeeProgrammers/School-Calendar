package com.calendar.backend.main.dto.task;

import com.calendar.backend.main.dto.user.UserListResponse;
import lombok.Data;

@Data
public class TaskListResponse {
    private Long id;
    private UserListResponse creator;
    private String name;
    private String deadline;
}
