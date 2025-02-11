package com.calendar.backend.dto.task;

import lombok.Data;

@Data
public class TaskRequest {
    private String name;
    private String content;
    private String deadline;
}
