package com.calendar.backend.repositories;

import com.calendar.backend.models.Comment;
import com.calendar.backend.models.Event;
import com.calendar.backend.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

import static com.calendar.backend.TestUtil.*;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class CommentRepositoryTest {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    private Event event;
    private User user;


    @BeforeEach
    public void beforeEach() {
        user = userRepository.save(createUser("STUDENT"));
        event = eventRepository.save(createEvent("Event 1", user));
    }

    @Test
    public void findAllByEventId_success() {
        // given
        Comment comment1 = commentRepository.save(createComment("First comment", LocalDateTime.now(), user, event));
        Comment comment2 = commentRepository.save(createComment("Second comment", LocalDateTime.now(), user, event));

        Pageable pageable = PageRequest.of(0, 10);

        // when
        var result = commentRepository.findAllByEvent_Id(event.getId(), pageable);

        // then
        assertThat(result.getTotalElements()).isEqualTo(2);
        assertThat(result.getContent()).hasSize(2);
        assertThat(result.getContent().get(0).getText()).isEqualTo(comment1.getText());
        assertThat(result.getContent().get(1).getText()).isEqualTo(comment2.getText());
    }

    @Test
    public void findAllByEventId_notFound() {
        // given
        Pageable pageable = PageRequest.of(0, 10);

        // when
        var result = commentRepository.findAllByEvent_Id(event.getId(), pageable);

        // then
        assertThat(result.getTotalElements()).isEqualTo(0);
        assertThat(result.getContent()).isEmpty();
    }
}
