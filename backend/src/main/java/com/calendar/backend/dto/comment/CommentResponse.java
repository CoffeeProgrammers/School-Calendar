package com.calendar.backend.dto.comment;

import com.calendar.backend.dto.user.UserListResponse;
import lombok.Data;

@Data
public class CommentResponse {
    private Long id;
    private UserListResponse creator;
    private String text;
    private String date;
}
