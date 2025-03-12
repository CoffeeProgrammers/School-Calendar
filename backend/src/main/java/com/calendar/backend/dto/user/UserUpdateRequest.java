package com.calendar.backend.dto.user;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UserUpdateRequest {
    @Pattern(regexp = "^[A-Za-z0-9\\s]+$",
            message = "Description can contain only letters, numbers and spaces")
    private String description;
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{6,}$",
            message =
                    "Password must be minimum 6 characters long, " +
                            "containing at least one digit, " +
                            "one uppercase letter, " +
                            "and one lowercase letter")
    private String password;
    @NotNull
    private String role;
    @Pattern(regexp = "[A-Z][a-z]+",
            message = "First name must start with a capital letter " +
                    "followed by one or more lowercase letters")
    private String firstName;
    @Pattern(regexp = "[A-Z][a-z]+",
            message = "Last name must start with a capital letter " +
                    "followed by one or more lowercase letters")
    private String lastName;
    @NotNull
    private String birthday;
}
