package com.calendar.backend.services.inter;

import com.calendar.backend.dto.task.TaskFullResponse;
import com.calendar.backend.dto.task.TaskListResponse;
import com.calendar.backend.dto.task.TaskListSmallResponse;
import com.calendar.backend.dto.task.TaskRequest;
import com.calendar.backend.dto.wrapper.CountAllTaskAndCompleted;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.models.Task;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface TaskService {
    TaskFullResponse create(TaskRequest taskRequest, Authentication authentication, long eventId);
    TaskFullResponse update(TaskRequest taskRequest, long id);
    void delete(long id);
    TaskFullResponse findById(long id);
    PaginationListResponse<TaskListResponse> findAllByUserId(
            String name, String deadline, String is_done, String is_past, long userId, int page, int size);
    PaginationListResponse<TaskListResponse> findAllByEventId(long eventId, int page, int size);
    PaginationListResponse<TaskListResponse> findAllByCreatorIdAndEventEmpty
            (Authentication authentication, int page, int size);
    PaginationListResponse<TaskListSmallResponse> findAllByDeadlineToday
            (Authentication authentication, int page, int size);
    CountAllTaskAndCompleted countAllTaskAndCompleted(long userId);
    void changeCreatorToDeletedUser(long userId);
    TaskListResponse assignTaskToEvent(long eventId, long id);
    void unassignTaskFromEvent(long taskId);
    void unsignAllFromEvent(long eventId);
    Task findByIdForServices(long id);
    List<Task> findAllByUserIdForServices(long userId);
    List<Task> findAllByEventIdForServices(long eventId);
}
