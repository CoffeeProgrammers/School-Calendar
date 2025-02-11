package com.calendar.backend.DTOs.user;

import com.calendar.backend.models.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserFullResponse {
    private long id;
    private String email;
    private String firstName;
    private String lastName;
    private Role role;
    private String description;
    private LocalDateTime birthday;
}
