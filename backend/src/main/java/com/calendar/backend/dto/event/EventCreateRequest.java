package com.calendar.backend.dto.event;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class EventCreateRequest {
    @Size(min = 1, max = 255, message = "Name must be between 1 and 255 characters")
    @NotBlank(message = "Name must be provided")
    private String name;
    @NotBlank(message = "Type of meeting must be provided")
    private String type;
    @NotBlank(message = "Start date must be provided")
    private String startDate;
    @NotBlank(message = "End date must be provided")
    private String endDate;
    @Size(min = 1, max = 999, message = "Content must be between 1 and 1000 characters")
    @NotBlank(message = "Content must be provided")
    private String content;
    private boolean isContentAvailableAnytime;
    @NotBlank(message = "Offline or online meeting must be provided")
    private String meetingType;
    @Size(min = 1, max = 255, message = "Meeting place must be between 1 and 255 characters")
    @NotBlank(message = "Place must be provided")
    private String place;
}
