package com.calendar.backend.mappers;

import com.calendar.backend.dto.notification.NotificationResponse;
import com.calendar.backend.models.Notification;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NotificationMapper {
    NotificationResponse fromNotificationToNotificationResponse(Notification notification);
}
