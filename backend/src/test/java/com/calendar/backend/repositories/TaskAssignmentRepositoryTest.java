package com.calendar.backend.repositories;

import com.calendar.backend.models.Task;
import com.calendar.backend.models.TaskAssignment;
import com.calendar.backend.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static com.calendar.backend.TestUtil.*;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class TaskAssignmentRepositoryTest {

    @Autowired
    private TaskAssignmentRepository taskAssignmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    private User user;
    private Task task;
    private TaskAssignment taskAssignment;

    @BeforeEach
    public void beforeEach() {
        user = userRepository.save(createUser("TEACHER"));

        task = taskRepository.save(createTask("Task 1"));

        taskAssignment = taskAssignmentRepository.save(assignTaskToUser(task, user));
    }

    @Test
    public void findByTaskIdAndUserId_success() {
        // given
        Long taskId = task.getId();
        Long userId = user.getId();

        // when
        Optional<TaskAssignment> result = taskAssignmentRepository.findByTask_IdAndUser_Id(taskId, userId);

        // then
        assertThat(result).isPresent();
        assertThat(result.get().getTask().getId()).isEqualTo(taskId);
        assertThat(result.get().getUser().getId()).isEqualTo(userId);
    }

    @Test
    public void findByTaskIdAndUserId_notFound() {
        // given
        Long nonExistingTaskId = -1L;
        Long nonExistingUserId = -1L;

        // when
        Optional<TaskAssignment> result = taskAssignmentRepository.findByTask_IdAndUser_Id(nonExistingTaskId, nonExistingUserId);

        // then
        assertThat(result).isEmpty();
    }
}
