package com.calendar.backend.dto.invitation;

import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class InvitationRequest {
    @Pattern(regexp = "^[A-Za-z0-9\\s]+$",
            message = "Description can contain only letters, numbers and spaces")
    private String description;
}
