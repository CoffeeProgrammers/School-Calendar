package com.calendar.backend.dto.user;

import lombok.Data;

@Data
public class UserListResponse {
    private Long id;
    private String email;
    private String role;
    private String firstName;
    private String lastName;
}
