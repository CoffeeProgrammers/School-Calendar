package com.calendar.backend.services.impl;

import com.calendar.backend.TestUtil;
import com.calendar.backend.dto.notification.NotificationResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.mappers.NotificationMapper;
import com.calendar.backend.models.Notification;
import com.calendar.backend.models.User;
import com.calendar.backend.repositories.NotificationRepository;
import com.calendar.backend.services.inter.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class NotificationServiceImplTest {

    @Mock
    private NotificationRepository notificationRepository;
    @Mock
    private NotificationMapper notificationMapper;
    @Mock
    private UserService userService;
    @InjectMocks
    private NotificationServiceImpl notificationService;

    private Notification notification;
    private NotificationResponse notificationResponse;

    @BeforeEach
    void setUp() {
        notification = TestUtil.createNotification("Test Notification", TestUtil.createUser("TEACHER"));
        notificationResponse = new NotificationResponse();
        notificationResponse.setContent(notification.getContent());
    }

    @Test
    void create_success() {
        when(notificationRepository.save(any(Notification.class))).thenReturn(notification);

        User user = TestUtil.createUser("TEACHER");
        notificationService.create(List.of(user), "123456");

        verify(notificationRepository).save(any());
    }

    @Test
    void findById_success() {
        when(notificationRepository.findById(anyLong())).thenReturn(Optional.of(notification));
        when(notificationMapper.fromNotificationToNotificationResponse(notification)).thenReturn(notificationResponse);

        NotificationResponse result = notificationService.findById(1L);

        assertEquals(notificationResponse.getContent(), result.getContent());
    }

    @Test
    void findById_notFound() {
        when(notificationRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> notificationService.findById(1L));
    }

    @Test
    void findAllByUserId_success() {
        Page<Notification> notificationsPage = mock(Page.class);
        when(notificationRepository.findAllNotificationsByUserId(anyLong(), any(PageRequest.class)))
                .thenReturn(notificationsPage);
        when(notificationsPage.getTotalPages()).thenReturn(1);
        when(notificationsPage.getContent()).thenReturn(List.of(notification));
        when(notificationMapper.fromNotificationToNotificationResponse(notification)).thenReturn(notificationResponse);

        PaginationListResponse<NotificationResponse> result = notificationService.findAllByUserId(1L, 0, 10);

        assertEquals(1, result.getTotalPages());
        assertEquals(notificationResponse.getContent(), result.getContent().get(0).getContent());
    }

    @Test
    void delete_success() {
        notificationService.delete(1L);

        verify(notificationRepository).deleteById(1L);
    }

    @Test
    void deleteAllLinksToUser_success() {
        long userId = 1L;
        User user = TestUtil.createUser("TEACHER");
        Notification notification1 = new Notification();
        Notification notification2 = new Notification();
        notification1.setUsers(new ArrayList<>(List.of(user)));
        notification2.setUsers(new ArrayList<>(List.of(user)));
        List<Notification> notifications = List.of(notification1, notification2);

        when(userService.findByIdForServices(userId)).thenReturn(user);
        when(notificationRepository.findAllByUserId(userId)).thenReturn(notifications);

        notificationService.deleteAllLinksToUser(userId);

        assertTrue(notification1.getUsers().isEmpty());
        assertTrue(notification2.getUsers().isEmpty());
        verify(notificationRepository).saveAll(notifications);
    }

}

