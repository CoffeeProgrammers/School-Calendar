package com.calendar.backend.main.dto.notification;

import lombok.Data;

@Data
public class NotificationResponse {
    private Long id;
    private String content;
    private String time;
}
