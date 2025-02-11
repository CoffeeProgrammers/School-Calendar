package com.calendar.backend.app.dto.task;

import lombok.Data;

@Data
public class TaskRequest {
    private String name;
    private String content;
    private String deadline;
}
