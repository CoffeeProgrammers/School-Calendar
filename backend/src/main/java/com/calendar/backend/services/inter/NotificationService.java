package com.calendar.backend.services.inter;

import com.calendar.backend.dto.notification.NotificationResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.models.User;

import java.util.List;

public interface NotificationService {
    void create(List<User> users, String message);
    NotificationResponse findById(Long id);
    PaginationListResponse<NotificationResponse> findAllByUserId(long userId, int page, int size);
    void delete(long notificationId);
    void deleteAllLinksToUser(long userId);
}