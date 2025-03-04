package com.calendar.backend.repositories;

import com.calendar.backend.models.Notification;
import com.calendar.backend.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import static com.calendar.backend.TestUtil.createNotification;
import static com.calendar.backend.TestUtil.createUser;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class NotificationRepositoryTest {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    private User user1;
    private User user2;
    private Notification notification1;
    private Notification notification2;

    @BeforeEach
    public void beforeEach() {
        user1 = userRepository.save(createUser("TEACHER"));
        user2 = userRepository.save(createUser("STUDENT"));

        notification1 = notificationRepository.save(createNotification("New notification1!", user2));
        notification2 = notificationRepository.save(createNotification("New notification2!", user1, user2));
    }

    @Test
    public void findAllNotificationsByUserId_success() {
        // given
        Long userId = user1.getId();
        Pageable pageable = PageRequest.of(0, 10);

        // when
        var result = notificationRepository.findAllNotificationsByUserId(userId, pageable);

        // then
        assertThat(result.getTotalElements()).isGreaterThan(0);
        assertThat(result.getContent()).hasSizeGreaterThanOrEqualTo(1);
    }

    @Test
    public void findAllNotificationsByUserId_notFound() {
        // given
        Long userId = -1L;
        Pageable pageable = PageRequest.of(0, 10);

        // when
        var result = notificationRepository.findAllNotificationsByUserId(userId, pageable);

        // then
        assertThat(result.getTotalElements()).isEqualTo(0);
        assertThat(result.getContent()).isEmpty();
    }
}
