package com.calendar.backend.dto.wrapper;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class PasswordRequest {
    @NotBlank(message = "Password must be provided")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{6,}$",
            message =
                    "Password must be minimum 6 characters long, " +
                            "containing at least one digit, " +
                            "one uppercase letter, " +
                            "and one lowercase letter")
    private String oldPassword;
    @NotBlank(message = "Password must be provided")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{6,}$",
            message =
                    "Password must be minimum 6 characters long, " +
                            "containing at least one digit, " +
                            "one uppercase letter, " +
                            "and one lowercase letter")
    private String newPassword;
}
