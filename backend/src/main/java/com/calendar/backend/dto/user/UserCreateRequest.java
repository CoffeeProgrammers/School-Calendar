package com.calendar.backend.dto.user;

import lombok.Data;

@Data
public class UserCreateRequest {
    private String email;
    private String password;
    private String role;
    private String firstName;
    private String lastName;
    private String birthday;
}
