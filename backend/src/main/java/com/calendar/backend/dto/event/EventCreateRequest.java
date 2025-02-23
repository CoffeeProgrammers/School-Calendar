package com.calendar.backend.dto.event;

import lombok.Data;

@Data
public class EventCreateRequest {
    private String name;
    private String type;
    private String startDate;
    private String endDate;
    private String content;
    private boolean isContentAvailableAnytime;
    private String meeting_type;
    private String place;
}
