package com.calendar.backend.dto.comment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CommentRequest {
    @Size(min = 1, max = 999, message = "Text must be between 1 and 1000 characters")
    @NotBlank(message = "Text must be provided")
    private String text;
}
