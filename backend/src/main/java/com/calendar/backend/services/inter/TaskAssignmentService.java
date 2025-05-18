package com.calendar.backend.services.inter;

import com.calendar.backend.dto.task.TaskFullResponse;
import com.calendar.backend.dto.task.TaskListResponse;
import com.calendar.backend.dto.task.TaskListSmallResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import org.springframework.security.core.Authentication;

public interface TaskAssignmentService {
    void create(Long taskId, Long userId);
    void createWithNewTask(Authentication authentication, Long taskId);
    boolean isDone(Long taskId, Authentication authentication);
    TaskFullResponse findById(long id, Authentication auth);
    PaginationListResponse<TaskListResponse> findAllByUserId(
            String name, String deadline, String is_done, String is_past, long userId, int page, int size);
    PaginationListResponse<TaskListResponse> findAllByEventId(long eventId, int page, int size, Authentication auth);
    PaginationListResponse<TaskListResponse> findAllByCreatorIdAndEventEmpty(Authentication authentication, int page, int size);
    PaginationListResponse<TaskListSmallResponse> findAllByDeadlineToday(Authentication authentication, int page, int size);
    void toggleDone(Long taskId, Authentication authentication);
    void assignTasksForNewUserFromEvent(Long eventId, Long userId);
    void assignTasksToEventUsers(Long eventId, Long taskId);
    void unassignTasksFromEventUsers(Long id);
    void unassignTasksFromUser(Long userId);
    void unsignAllFromTask(Long taskId);
}
