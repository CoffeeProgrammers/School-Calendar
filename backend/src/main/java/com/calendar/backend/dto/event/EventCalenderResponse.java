package com.calendar.backend.dto.event;

import lombok.Data;

@Data
public class EventCalenderResponse {
    private Long id;
    private String name;
    private String startDate;
    private String endDate;
}
