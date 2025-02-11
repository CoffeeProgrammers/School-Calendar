package com.calendar.backend.app.dto.notification;

import lombok.Data;

@Data
public class NotificationResponse {
    private Long id;
    private String content;
    private String time;
}
