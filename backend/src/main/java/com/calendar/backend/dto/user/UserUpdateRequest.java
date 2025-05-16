package com.calendar.backend.dto.user;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserUpdateRequest {
    private String role;
    @Size(min = 3, max = 255, message = "First name must be between 3 and 255 characters")
    @Pattern(regexp = "[A-Z][a-z]+",
            message = "First name must start with a capital letter " +
                    "followed by one or more lowercase letters")
    private String firstName;
    @Size(min = 3, max = 255, message = "Last name must be between 3 and 255 characters")
    @Pattern(regexp = "[A-Z][a-z]+",
            message = "Last name must start with a capital letter " +
                    "followed by one or more lowercase letters")
    private String lastName;
    private String birthday;
    @Size(max = 999, message = "Description must be less than 1000 characters")
    private String description;
}
