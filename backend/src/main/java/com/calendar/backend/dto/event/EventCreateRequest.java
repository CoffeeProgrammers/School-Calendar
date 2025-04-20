package com.calendar.backend.dto.event;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EventCreateRequest {
    @NotBlank(message = "Name must be provided")
    private String name;
    @NotBlank(message = "Type of meeting must be provided")
    private String type;
    @NotBlank(message = "Start date must be provided")
    private String startDate;
    @NotBlank(message = "End date must be provided")
    private String endDate;
    @NotBlank(message = "Content must be provided")
    private String content;
    private boolean isContentAvailableAnytime;
    @NotBlank(message = "Offline or online meeting must be provided")
    private String meetingType;
    @NotBlank(message = "Place must be provided")
    private String place;
}
