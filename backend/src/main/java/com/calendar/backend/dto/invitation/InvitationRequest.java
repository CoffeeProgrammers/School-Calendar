package com.calendar.backend.dto.invitation;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class InvitationRequest {
    @Size(max = 999, message = "Description must be less than 1000 characters")
    private String description;
}
