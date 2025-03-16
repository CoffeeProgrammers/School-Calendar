package com.calendar.backend.dto.comment;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CommentRequest {
    @NotBlank(message = "Text must be provided")
    private String text;
}
