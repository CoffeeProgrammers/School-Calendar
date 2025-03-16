package com.calendar.backend.dto.event;

import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class EventUpdateRequest {
    @Pattern(regexp = "[A-Z][a-z]+",
            message = "Name must start with a capital letter " +
                    "followed by one or more lowercase letters")
    private String name;
    private String content;
    private boolean isContentAvailableAnytime;
    private String meetingType;
    @Pattern(regexp = "[A-Z][a-z]+",
            message = "Place must start with a capital letter " +
                    "followed by one or more lowercase letters")
    private String place;
}
