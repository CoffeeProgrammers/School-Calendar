package com.calendar.backend.mappers;

import com.calendar.backend.TestUtil;
import com.calendar.backend.dto.task.TaskFullResponse;
import com.calendar.backend.dto.task.TaskListResponse;
import com.calendar.backend.dto.task.TaskRequest;
import com.calendar.backend.models.Task;
import com.calendar.backend.models.User;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.assertj.core.api.Assertions.assertThat;

class TaskMapperTest {

    private final TaskMapper taskMapper = Mappers.getMapper(TaskMapper.class);

    @Test
    void fromTaskToTaskFullResponse_validTask() {
        // given
        User user = TestUtil.createUser("STUDENT");
        Task task = new Task(user, "Task Name", "Task Content", LocalDateTime.now());
        task.setId(1L);

        // when
        TaskFullResponse taskFullResponse = taskMapper.fromTaskToTaskResponse(task);

        // then
        assertThat(taskFullResponse).isNotNull();
        assertThat(taskFullResponse.getId()).isEqualTo(task.getId());
        assertThat(taskFullResponse.getName()).isEqualTo(task.getName());
        assertThat(taskFullResponse.getContent()).isEqualTo(task.getContent());
        assertThat(taskFullResponse.getDeadline()).isEqualTo(DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(task.getDeadline()));
    }

    @Test
    void fromTaskToTaskListResponse_validTask() {
        // given
        User user = TestUtil.createUser("STUDENT");
        Task task = new Task(user, "Task Name", "Task Content", LocalDateTime.now());
        task.setId(1L);

        // when
        TaskListResponse taskListResponse = taskMapper.fromTaskToTaskListResponse(task);

        // then
        assertThat(taskListResponse).isNotNull();
        assertThat(taskListResponse.getId()).isEqualTo(task.getId());
        assertThat(taskListResponse.getName()).isEqualTo(task.getName());
        assertThat(taskListResponse.getDeadline()).isEqualTo(DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(task.getDeadline()));
    }

    @Test
    void fromTaskRequestToTask_validTaskRequest() {
        // given
        TaskRequest taskRequest = new TaskRequest();
        taskRequest.setContent("Content");
        taskRequest.setName("Name");
        taskRequest.setDeadline(DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(LocalDateTime.now()));

        // when
        Task task = taskMapper.fromTaskRequestToTask(taskRequest);

        // then
        assertThat(task).isNotNull();
        assertThat(task.getName()).isEqualTo(taskRequest.getName());
        assertThat(task.getContent()).isEqualTo(taskRequest.getContent());
        assertThat(DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(task.getDeadline())).isEqualTo(taskRequest.getDeadline());
    }

    @Test
    void fromTaskRequestToTask_nullTaskRequest() {
        // given
        TaskRequest taskRequest = null;

        // when
        Task task = taskMapper.fromTaskRequestToTask(taskRequest);

        // then
        assertThat(task).isNull();
    }
}
