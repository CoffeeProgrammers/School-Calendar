package com.calendar.backend.services.impl;

import com.calendar.backend.dto.task.TaskListResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.models.Task;
import com.calendar.backend.models.TaskAssignment;
import com.calendar.backend.models.User;
import com.calendar.backend.repositories.TaskAssignmentRepository;
import com.calendar.backend.services.inter.TaskAssignmentService;
import com.calendar.backend.services.inter.TaskService;
import com.calendar.backend.services.inter.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
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
        log.info("Service: Saving new task assignment for task with id {} and user with id {}", taskId, userId);
        taskAssignmentRepository.save(new TaskAssignment(taskService.findByIdForServices(taskId),
                userService.findByIdForServices(userId)));
    }

    @Override
    public void createWithNewTask(Authentication authentication, Long taskId) {
        User user = userService.findUserByAuth(authentication);
        log.info("Service: Saving new task assignment for task with id {} and my user", taskId);
        taskAssignmentRepository.save(new TaskAssignment(taskService.findByIdForServices(taskId),
                userService.findByIdForServices(user.getId())));
    }

    @Override
    public boolean isDone(Long taskId, Authentication authentication) {
        log.info("Service: Try to determine if task assignment is done for {}", taskId);
        return taskAssignmentRepository.findByTask_IdAndUser_Id(taskId,
                userService.findUserByAuth(authentication).getId()).get().isDone();
    }

    @Override
    public void toggleDone(Long taskId, Authentication authentication) {
        log.info("Service: Toggling done status for task assignment with task id {} and auth user", taskId);
        TaskAssignment taskAssignment = taskAssignmentRepository.findByTask_IdAndUser_Id(taskId,
                        userService.findUserByAuth(authentication).getId())
                .orElseThrow(() -> new EntityNotFoundException("Task assignment not found"));
        taskAssignment.setDone(!taskAssignment.isDone());
        taskAssignmentRepository.save(taskAssignment);
    }

    @Override
    public void assignTasksForNewUserFromEvent(Long eventId, Long userId) {
        log.info("Service: Assigning tasks for new user with id {} from event with id {}", userId, eventId);
        List<Task> tasksFromEvent = taskService.findAllByEventId(eventId);
        for(Task task : tasksFromEvent) {
            create(task.getId(), userId);
        }
    }

    @Override
    public void assignTasksToEventUsers(Long eventId, Long taskId) {
        log.info("Service: Assigning tasks for users from event with id {}", eventId);
        List<User> users = userService.findAllByEventIdForServices(eventId);
        Long creatorId = taskService.findById(taskId).getCreator().getId();
        for(User user : users) {
            if(user.getId() == creatorId) continue;
            create(taskId, user.getId());
        }
    }

    @Transactional
    @Override
    public void unsignAllFromTask(Long taskId) {
        log.info("Service: Unsigning all task assignments for task with id {}", taskId);
        taskAssignmentRepository.deleteAllByTask_Id(taskId);
    }

    @Override
    public PaginationListResponse<TaskListResponse> setAllDoneByTasksAndAuth
            (PaginationListResponse<TaskListResponse> tasks, Authentication authentication) {
        log.info("Service: Setting all task assignments done for all tasks and auth user");
        tasks.setContent(tasks.getContent().stream().map(task -> {
            task.setDone(this.isDone(task.getId(), authentication));
            return task;}).sorted(Comparator.comparing(TaskListResponse::isDone)).toList());
        return tasks;
    }

    @Override
    @Transactional
    public void unassignTasksFromEventUsers(Long id) {
        log.info("Service: Unsigning all task assignments for event users for task with id {}", id);
        Task task = taskService.findByIdForServices(id);
        for(User user : task.getEvent().getUsers()) {
            if(user.getId() == task.getCreator().getId()) continue;
            taskAssignmentRepository.deleteByTask_IdAndUser_Id(task.getId(), user.getId());
        }
    }
}