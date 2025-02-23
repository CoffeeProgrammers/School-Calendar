package com.calendar.backend.services.inter;

public interface TaskAssignmentService {
    void create(Long taskId, Long userId);
    void toggleDone(Long taskId, Long userId, boolean isDone);
    void assignTasksForNewUserFromEvent(Long eventId, Long userId);

}
