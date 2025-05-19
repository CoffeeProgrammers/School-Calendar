package com.calendar.backend.dto.user;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UserCreateRequest {
    @NotBlank(message = "Email must be provided")
    @Email(message = "Must be a valid e-mail address")
    private String email;
    @NotBlank(message = "Password must be provided")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{6,}$",
            message =
                    "Password must be minimum 6 characters long, " +
                            "containing at least one digit, " +
                            "one uppercase letter, " +
                            "and one lowercase letter")
    private String password;
    @NotNull
    private String role;
    @Size(min = 3, max = 255, message = "First name must be between 3 and 255 characters")
    @NotBlank(message = "First name must be provided")
    @Pattern(regexp = "[A-Z][a-z]+",
            message = "First name must start with a capital letter " +
                    "followed by one or more lowercase letters")
    private String firstName;
    @Size(min = 3, max = 255, message = "Last name must be between 3 and 255 characters")
    @NotBlank(message = "Last name must be provided")
    @Pattern(regexp = "[A-Z][a-z]+",
            message = "Last name must start with a capital letter " +
                    "followed by one or more lowercase letters")
    private String lastName;
    @NotNull
    private String birthday;
}
