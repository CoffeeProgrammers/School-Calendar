package com.calendar.backend.services.inter;

import com.calendar.backend.dto.task.TaskFullResponse;
import com.calendar.backend.dto.task.TaskListResponse;
import com.calendar.backend.dto.task.TaskRequest;
import com.calendar.backend.dto.wrapper.CountAllTaskAndCompleted;
import com.calendar.backend.models.Task;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface TaskService {
    TaskFullResponse create(TaskRequest taskRequest, Authentication authentication, long eventId);
    TaskFullResponse update(TaskRequest taskRequest, long id);
    void delete(long id);
    TaskFullResponse findById(long id);
    CountAllTaskAndCompleted countAllTaskAndCompleted(long userId);
    void changeCreatorToDeletedUser(long userId);
    TaskListResponse assignTaskToEvent(long eventId, long id);
    void unassignTaskFromEvent(long taskId);
    void unsignAllFromEvent(long eventId);
    Task findByIdForServices(long id);
    List<Task> findAllByUserIdForServices(long userId);
    List<Task> findAllByEventIdForServices(long eventId);
}
