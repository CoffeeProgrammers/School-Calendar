package com.calendar.backend.repositories;

import com.calendar.backend.models.Event;
import com.calendar.backend.models.Task;
import com.calendar.backend.models.TaskAssignment;
import com.calendar.backend.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

import static com.calendar.backend.TestUtil.*;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class TaskRepositoryTest {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private TaskAssignmentRepository taskAssignmentRepository;

    private User user1;
    private User user2;
    private Event event1;
    private Event event2;
    private Task task1;
    private Task task2;
    private TaskAssignment taskAssignment1;
    private TaskAssignment taskAssignment2;

    @BeforeEach
    public void beforeEach() {
        user1 = userRepository.save(createUser("TEACHER"));
        user2 = userRepository.save(createUser("STUDENT"));

        event1 = eventRepository.save(createEvent("Test Event 1"));
        event2 = eventRepository.save(createEvent("Test Event 2"));

        task1 = taskRepository.save(createTask("Task 1", event1));
        task2 = taskRepository.save(createTask("Task 2", event2));

        taskAssignment1 = taskAssignmentRepository.save(assignTaskToUser(task1, user1));
        taskAssignment2 = taskAssignmentRepository.save(assignTaskToUser(task2, user2));
    }

    @Test
    public void findAllByEventId_success_case1() {
        // given
        Long eventId = event1.getId();

        // when
        List<Task> tasks = taskRepository.findAllByEvent_Id(eventId);

        // then
        assertThat(tasks).hasSize(1);
        assertThat(tasks.get(0).getEvent().getId()).isEqualTo(eventId);
    }

    @Test
    public void findAllByEventId_success_case2() {
        // given
        Long eventId = event2.getId();

        // when
        List<Task> tasks = taskRepository.findAllByEvent_Id(eventId);

        // then
        assertThat(tasks).hasSize(1);
        assertThat(tasks.get(0).getEvent().getId()).isEqualTo(eventId);
    }

    @Test
    public void findAllByEventId_notFound() {
        // given
        Long nonExistingEventId = -1L;

        // when
        List<Task> tasks = taskRepository.findAllByEvent_Id(nonExistingEventId);

        // then
        assertThat(tasks).isEmpty();
    }

    @Test
    public void findAllByUserId_success_case1() {
        // given
        Long userId = user1.getId();
        PageRequest pageRequest = PageRequest.of(0, 10);

        // when
        Page<Task> tasks = taskRepository.findAllByUserId(userId, Specification.where(null), pageRequest);

        // then
        assertThat(tasks).hasSize(1);
        assertThat(tasks.getContent().get(0).getId()).isEqualTo(task1.getId());
    }

    @Test
    public void findAllByUserId_success_case2() {
        // given
        Long userId = user2.getId();
        PageRequest pageRequest = PageRequest.of(0, 10);

        // when
        Page<Task> tasks = taskRepository.findAllByUserId(userId, Specification.where(null), pageRequest);

        // then
        assertThat(tasks).hasSize(1);
        assertThat(tasks.getContent().get(0).getId()).isEqualTo(task2.getId());
    }

    @Test
    public void findAllByUserId_notFound() {
        // given
        Long nonExistingUserId = -1L;
        PageRequest pageRequest = PageRequest.of(0, 10);

        // when
        Page<Task> tasks = taskRepository.findAllByUserId(nonExistingUserId, Specification.where(null), pageRequest);

        // then
        assertThat(tasks).isEmpty();
    }
}
