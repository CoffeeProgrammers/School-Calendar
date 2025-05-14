package com.calendar.backend.repositories;

import com.calendar.backend.models.Event;
import com.calendar.backend.models.User;
import com.calendar.backend.repositories.specification.EventSpecification;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;
import java.util.List;

import static com.calendar.backend.TestUtil.createEvent;
import static com.calendar.backend.TestUtil.createUser;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class EventRepositoryTest {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    private Event event1;
    private Event event2;
    private User user;

    @BeforeEach
    public void beforeEach() {
        user = userRepository.save(createUser("TEACHER"));

        event1 = eventRepository.save(createEvent("Test Event1", LocalDateTime.now().minusDays(1), LocalDateTime.now().plusDays(1), "TEACHERS_MEETING", "ONLINE", user));
        event2 = eventRepository.save(createEvent("Test Event2", LocalDateTime.now().minusDays(1), LocalDateTime.now().plusDays(2), "TEACHERS_MEETING", "OFFLINE", user));
    }

    @Test
    public void findAllByUserId_success() {
        // given
        Long userId = user.getId();
        Pageable pageable = PageRequest.of(0, 10);

        // when
        var result = eventRepository.findAll(EventSpecification.hasUser(user.getId()), pageable);

        // then
        assertThat(result.getTotalElements()).isGreaterThan(0);
        assertThat(result.getContent()).hasSizeGreaterThanOrEqualTo(1);
    }

    @Test
    public void findAllByUserId_notFound() {
        // given
        Long userId = -1L;
        Pageable pageable = PageRequest.of(0, 10);

        // when
        var result = eventRepository.findAll(EventSpecification.hasUser(userId), pageable);

        // then
        assertThat(result.getTotalElements()).isEqualTo(0);
        assertThat(result.getContent()).isEmpty();
    }

    @Test
    public void findAllByUserIdAndDateRange_success() {
        // given
        Long userId = user.getId();
        LocalDateTime startDate = LocalDateTime.now().minusDays(2);
        LocalDateTime endDate = LocalDateTime.now().plusDays(2).plusSeconds(10);
        Sort sort = Sort.by(Sort.Order.asc("start_date"));

        // when
        List<Event> result = eventRepository.findAllByUserIdAndDateRange(userId, startDate, endDate, sort);

        // then
        assertThat(result).isNotEmpty();
        assertThat(result).contains(event1, event2);
    }

    @Test
    public void findAllByUserIdAndDateRange_notFound() {
        // given
        Long userId = user.getId();
        LocalDateTime startDate = LocalDateTime.now().plusDays(3);
        LocalDateTime endDate = LocalDateTime.now().plusDays(4);
        Sort sort = Sort.by(Sort.Order.asc("start_date"));

        // when
        List<Event> result = eventRepository.findAllByUserIdAndDateRange(userId, startDate, endDate, sort);

        // then
        assertThat(result).isEmpty();
    }
}
