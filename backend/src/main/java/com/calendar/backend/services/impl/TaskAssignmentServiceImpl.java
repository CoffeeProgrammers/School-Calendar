package com.calendar.backend.services.impl;

import com.calendar.backend.models.Task;
import com.calendar.backend.models.TaskAssignment;
import com.calendar.backend.repositories.TaskAssignmentRepository;
import com.calendar.backend.services.inter.TaskAssignmentService;
import com.calendar.backend.services.inter.TaskService;
import com.calendar.backend.services.inter.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TaskAssignmentServiceImpl implements TaskAssignmentService {
    private final TaskService taskService;
    private final UserService userService;
    private final TaskAssignmentRepository taskAssignmentRepository;

    @Override
    public void create(Long taskId, Long userId) {
        log.info("Saving new task assignment for task with id {} and user with id {}", taskId, userId);
        taskAssignmentRepository.save(new TaskAssignment(taskService.findByIdForServices(taskId),
                userService.findByIdForServices(userId)));
    }

    @Override
    public boolean isDone(Long taskId, Authentication authentication) {
        log.info("Try to determine if task assignment is done for {}", taskId);
        return taskAssignmentRepository.findByTask_IdAndUser_Id(taskId,
                userService.findUserByAuth(authentication).getId()).get().isDone();
    }

    @Override
    public void toggleDone(Long taskId, Authentication authentication) {
        log.info("Toggling done status for task assignment with task id {} and auth user", taskId);
        TaskAssignment taskAssignment = taskAssignmentRepository.findByTask_IdAndUser_Id(taskId,
                        userService.findUserByAuth(authentication).getId())
                .orElseThrow(() -> new EntityNotFoundException("Task assignment not found"));
        taskAssignment.setDone(!taskAssignment.isDone());
        taskAssignmentRepository.save(taskAssignment);
    }

    @Override
    public void assignTasksForNewUserFromEvent(Long eventId, Long userId) {
        log.info("Assigning tasks for new user with id {} from event with id {}", userId, eventId);
        List<Task> tasksFromEvent = taskService.findAllByEventId(eventId);
        for(Task task : tasksFromEvent) {
            create(task.getId(), userId);
        }
    }


}