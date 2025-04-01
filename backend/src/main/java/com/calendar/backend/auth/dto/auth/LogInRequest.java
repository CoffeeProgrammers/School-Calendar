package com.calendar.backend.auth.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LogInRequest {

    @NotBlank(message = "Email must be provided")
    @Email(message = "Invalid email")
    private String username;

    @NotBlank(message = "Password must be provided")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{6,}$",
            message =
                    "Password must be minimum 6 characters long, " +
                    "containing at least one digit, " +
                    "one uppercase letter, " +
                    "and one lowercase letter")
    private String password;
}
