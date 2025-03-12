package com.calendar.backend.dto.comment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class CommentRequest {
    @NotBlank(message = "Text must be provided")
    @Pattern(regexp = "^[A-Za-z0-9\\s]+$",
            message = "Text can contain only letters, numbers and spaces")
    private String text;
}
