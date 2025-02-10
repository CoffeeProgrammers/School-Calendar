package com.calendar.backend.main.dto.user;

import lombok.Data;

@Data
public class UserUpdateRequest {
    private String password;
    private String firstName;
    private String lastName;
    private String description;
    private String birthday_date;
}
