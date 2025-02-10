package com.calendar.backend.main.dto.auth;

import lombok.Data;

@Data
public class LogInRequest {
    private String email;
    private String password;
}
