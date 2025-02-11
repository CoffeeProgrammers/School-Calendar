package com.calendar.backend.main.dto.event;

import lombok.Data;

@Data
public class EventUpdateRequest {
    private String name;
    private String content;
    private boolean is_content_available_anytime;
    private String meeting_type;
    private String place;
}
