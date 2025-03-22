package com.calendar.backend.services.inter;

import org.springframework.security.core.Authentication;

public interface TaskAssignmentService {
    void create(Long taskId, Long userId);
    boolean isDone(Long taskId, Authentication authentication);
    void toggleDone(Long taskId, Authentication authentication);
    void assignTasksForNewUserFromEvent(Long eventId, Long userId);

}
