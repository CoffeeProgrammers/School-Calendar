package com.calendar.backend.dto.event;

import lombok.Data;

@Data
public class EventUpdateRequest {
    private String name;
    private String content;
    private boolean isContentAvailableAnytime;
    private String meetingType;
    private String place;
}
