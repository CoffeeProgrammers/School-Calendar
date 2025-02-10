package com.calendar.backend.main.dto.event;

import lombok.Data;

@Data
public class EventCreateRequest {
    private String name;
    private String type;
    private String start_date;
    private String end_date;
    private String content;
    private boolean is_content_available_anytime;
    private String meeting_type;
    private String place;
}
