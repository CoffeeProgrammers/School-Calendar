package com.calendar.backend.main.dto.event;

import com.calendar.backend.main.dto.user.UserListResponse;
import lombok.Data;

@Data
public class EventFullResponse {
    private Long id;
    private String name;
    private String type;
    private UserListResponse creator;
    private String start_date;
    private String end_date;
    private String content;
    private boolean is_content_available_anytime;
    private String meeting_type;
    private String place;
}
