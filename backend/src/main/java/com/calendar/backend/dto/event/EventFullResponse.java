package com.calendar.backend.dto.event;

import com.calendar.backend.dto.user.UserListResponse;
import lombok.Data;

@Data
public class EventFullResponse {
    private Long id;
    private String name;
    private String type;
    private UserListResponse creator;
    private String startDate;
    private String endDate;
    private String content;
    private boolean isContentAvailableAnytime;
    private String meetingType;
    private String place;
}
