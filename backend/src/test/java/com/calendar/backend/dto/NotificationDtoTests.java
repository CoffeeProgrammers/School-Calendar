package com.calendar.backend.dto;

import com.calendar.backend.dto.notification.NotificationResponse;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class NotificationDtoTests {

    @Test
    void testNotificationResponse() {
        NotificationResponse response1 = new NotificationResponse();
        response1.setId(1L);
        response1.setContent("New notification");
        response1.setTime("2024-01-01T10:00:00");

        NotificationResponse response2 = new NotificationResponse();
        response2.setId(response1.getId());
        response2.setContent(response1.getContent());
        response2.setTime(response1.getTime());

        assertEquals(response1, response2);
        assertEquals(response1.toString(), response2.toString());
        assertEquals(response1.hashCode(), response2.hashCode());
    }
}