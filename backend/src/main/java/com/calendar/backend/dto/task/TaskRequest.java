package com.calendar.backend.dto.task;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class TaskRequest {
    @NotBlank(message = "Name must be provided")
    @Pattern(regexp = "[A-Z][a-z]+",
            message = "Name must start with a capital letter " +
                    "followed by one or more lowercase letters")
    private String name;
    @NotBlank(message = "Content must be provided")
    private String content;
    @NotBlank(message = "Deadline must be provided")
    private String deadline;
}
