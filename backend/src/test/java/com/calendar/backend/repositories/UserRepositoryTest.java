package com.calendar.backend.repositories;

import com.calendar.backend.models.Event;
import com.calendar.backend.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

import static com.calendar.backend.TestUtil.createEvent;
import static com.calendar.backend.TestUtil.createUser;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    private User user1;
    private User user2;
    private Event event;

    @BeforeEach
    public void beforeEach() {
        user1 = userRepository.save(createUser("STUDENT"));
        user2 = userRepository.save(createUser("STUDENT"));

        event = eventRepository.save(createEvent("Test Event", user1, user2));
    }

    @Test
    public void findByEmail_success() {
        // given
        String email = user1.getEmail();

        // when
        var foundUser = userRepository.findByEmail(email);

        // then
        assertThat(foundUser).isPresent();
        assertThat(foundUser.get().getEmail()).isEqualTo(email);
    }

    @Test
    public void findByEmail_notFound() {
        // given
        String nonExistingEmail = "notfound@test.com";

        // when
        Optional<User> foundUser = userRepository.findByEmail(nonExistingEmail);

        // then
        assertThat(foundUser).isEmpty();
    }

    @Test
    public void existsByEmail_success() {
        // given
        String email = user2.getEmail();

        // when
        boolean exists = userRepository.existsByEmail(email);

        // then
        assertThat(exists).isTrue();
    }

    @Test
    public void existsByEmail_notFound() {
        // given
        String nonExistingEmail = "notfound@test.com";

        // when
        boolean exists = userRepository.existsByEmail(nonExistingEmail);

        // then
        assertThat(exists).isFalse();
    }

    @Test
    public void findAllByEventId_success() {
        // given
        Long eventId = event.getId();
        PageRequest pageRequest = PageRequest.of(0, 10);

        // when
        Page<User> users = userRepository.findAllByEventId(eventId, Specification.where(null), pageRequest);

        // then
        assertThat(users).hasSize(2);
        assertThat(users.getContent()).extracting(User::getId).contains(user1.getId(), user2.getId());
    }

    @Test
    public void findAllByEventId_notFound() {
        // given
        Long nonExistingEventId = -1L;
        PageRequest pageRequest = PageRequest.of(0, 10);

        // when
        Page<User> users = userRepository.findAllByEventId(nonExistingEventId, Specification.where(null), pageRequest);

        // then
        assertThat(users).isEmpty();
    }
}
