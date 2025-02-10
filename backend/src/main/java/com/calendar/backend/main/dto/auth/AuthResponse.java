package com.calendar.backend.main.dto.auth;

import lombok.Data;

@Data
public class AuthResponse {
    private Long id;
    private String email;
    private String access_token;
}
