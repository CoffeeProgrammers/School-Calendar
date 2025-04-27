package com.calendar.backend.mappers;

import com.calendar.backend.TestUtil;
import com.calendar.backend.dto.notification.NotificationResponse;
import com.calendar.backend.models.Notification;
import com.calendar.backend.models.User;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.time.format.DateTimeFormatter;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class NotificationMapperTest {

    private final NotificationMapper notificationMapper = Mappers.getMapper(NotificationMapper.class);

    @Test
    void fromNotificationToNotificationResponse_validNotification() {
        // given
        User user = TestUtil.createUser("TEACHER");
        Notification notification = new Notification(List.of(user), "Test Content");
        notification.setId(1L);

        // when
        NotificationResponse notificationResponse = notificationMapper.fromNotificationToNotificationResponse(notification);

        // then
        assertThat(notificationResponse).isNotNull();
        assertThat(notificationResponse.getId()).isEqualTo(notification.getId());
        assertThat(notificationResponse.getContent()).isEqualTo(notification.getContent());
        assertThat(notificationResponse.getTime()).isEqualTo(DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(notification.getTime()));
    }

    @Test
    void fromNotificationToNotificationResponse_nullNotification() {
        // given
        Notification notification = null;

        // when
        NotificationResponse notificationResponse = notificationMapper.fromNotificationToNotificationResponse(notification);

        // then
        assertThat(notificationResponse).isNull();
    }
}