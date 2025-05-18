package com.calendar.backend.services.inter;

import com.calendar.backend.dto.task.TaskListResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import org.springframework.security.core.Authentication;

public interface TaskAssignmentService {
    void create(Long taskId, Long userId);
    void createWithNewTask(Authentication authentication, Long taskId);
    boolean isDone(Long taskId, Authentication authentication);
    PaginationListResponse<TaskListResponse> setAllDoneByTasksAndAuth(
            PaginationListResponse<TaskListResponse> tasks, Authentication authentication);
    void toggleDone(Long taskId, Authentication authentication);
    void assignTasksForNewUserFromEvent(Long eventId, Long userId);
    void assignTasksToEventUsers(Long eventId, Long taskId);
    void unassignTasksFromEventUsers(Long id);
    void unassignTasksFromUser(Long userId);
    void unsignAllFromTask(Long taskId);
}
