package com.calendar.backend.dto.task;

import lombok.Data;

@Data
public class TaskListSmallResponse {
    private Long id;
    private String name;
    private boolean isDone;
}
