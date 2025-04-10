package com.calendar.backend.services.inter;

import com.calendar.backend.dto.task.TaskFullResponse;
import com.calendar.backend.dto.task.TaskListResponse;
import com.calendar.backend.dto.task.TaskRequest;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.models.Task;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Map;

public interface TaskService {
    TaskFullResponse create(TaskRequest taskRequest, Authentication authentication, long eventId);
    TaskFullResponse update(TaskRequest taskRequest, long id);
    void delete(long id);
    TaskFullResponse findById(long id);
    PaginationListResponse<TaskListResponse> findAllByUserId(
            Map<String, Object> filters, long userId, int page, int size);
    PaginationListResponse<TaskListResponse> findAllByEventId(
            long eventId, int page, int size);
    List<Task> findAllByEventId(long eventId);
    Task findByIdForServices(long id);
    void assignTaskToEvent(long eventId, long id);
    PaginationListResponse<TaskListResponse> findAllByCreatorIdAndEventEmpty(Authentication authentication,
                                                                             int page, int size);
}
