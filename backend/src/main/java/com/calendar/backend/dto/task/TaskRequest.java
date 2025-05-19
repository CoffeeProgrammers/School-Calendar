package com.calendar.backend.dto.task;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TaskRequest {
    @Size(min = 1, max = 255, message = "Name place must be between 1 and 255 characters")
    @NotBlank(message = "Name must be provided")
    private String name;
    @Size(max = 999, message = "Content must be less than 1000 characters")
    @NotBlank(message = "Content must be provided")
    private String content;
    @NotBlank(message = "Deadline must be provided")
    private String deadline;
}
