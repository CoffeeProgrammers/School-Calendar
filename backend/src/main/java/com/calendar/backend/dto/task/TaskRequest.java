package com.calendar.backend.dto.task;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TaskRequest {
    @NotBlank(message = "Name must be provided")
    private String name;
    @NotBlank(message = "Content must be provided")
    private String content;
    @NotBlank(message = "Deadline must be provided")
    private String deadline;
}
