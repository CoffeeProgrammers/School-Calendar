package com.calendar.backend.app.dto.user;

import lombok.Data;

@Data
public class UserCreateRequest {
    private String email;
    private String password;
    private String role;
    private String firstName;
    private String lastName;
    private String birthday_date;
}
