package com.calendar.backend.services.impl;

import com.calendar.backend.dto.notification.NotificationResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.mappers.NotificationMapper;
import com.calendar.backend.models.Notification;
import com.calendar.backend.repositories.NotificationRepository;
import com.calendar.backend.services.inter.NotificationService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;

    @Override
    public void create(Notification notification) {
        log.info("Service: Saving new notification {}", notification);
        notificationRepository.save(notification);
    }

    @Override
    public NotificationResponse findById(Long id) {
        log.info("Service: Finding notification with id {}", id);
        return notificationMapper.fromNotificationToNotificationResponse(
                notificationRepository.findById(id).orElseThrow(
                        () -> new EntityNotFoundException("Notification not found")));
    }

    @Override
    public PaginationListResponse<NotificationResponse> findAllByUserId(long userId, int page, int size) {
        log.info("Service: Finding all notifications for user with id {}", userId);
        Page<Notification> notifications = notificationRepository.findAllNotificationsByUserId(userId,
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "time")));
        PaginationListResponse<NotificationResponse> response = new PaginationListResponse<>();
        response.setTotalPages(notifications.getTotalPages());
        response.setContent(notifications.getContent().stream()
                .map(notificationMapper::fromNotificationToNotificationResponse).toList());
        return response;
    }

    @Override
    public void delete(long notificationId) {
        log.info("Service: Deleting notification with id {}", notificationId);
        notificationRepository.deleteById(notificationId);
    }
}
