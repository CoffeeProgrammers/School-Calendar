package com.calendar.backend.repositories;

import com.calendar.backend.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    @Query(value = "SELECT n.* FROM notification n " +
                    "JOIN users_notifications un ON n.id = un.notification_id " +
                    "WHERE un.user_id = :userId",
            nativeQuery = true)
    List<Notification> findAllNotificationsByUserId(Long userId);

}
