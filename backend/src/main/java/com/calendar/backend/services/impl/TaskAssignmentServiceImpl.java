package com.calendar.backend.services.impl;

import com.calendar.backend.dto.task.TaskListResponse;
import com.calendar.backend.dto.task.TaskListSmallResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.mappers.TaskMapper;
import com.calendar.backend.models.Task;
import com.calendar.backend.models.TaskAssignment;
import com.calendar.backend.models.User;
import com.calendar.backend.repositories.TaskAssignmentRepository;
import com.calendar.backend.repositories.specification.TaskAssignmentsSpecification;
import com.calendar.backend.services.inter.TaskAssignmentService;
import com.calendar.backend.services.inter.TaskService;
import com.calendar.backend.services.inter.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class TaskAssignmentServiceImpl implements TaskAssignmentService {

    private final TaskAssignmentRepository taskAssignmentRepository;
    private final TaskService taskService;
    private final UserService userService;
    private final TaskMapper taskMapper;


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
                userService.findUserByAuth(authentication).getId()).orElseThrow(() ->
                new EntityNotFoundException("Cant find such task assigment")).isDone();
    }

//    @Override
//    public PaginationListResponse<TaskListResponse> setAllDoneByTasksAndAuth
//            (PaginationListResponse<TaskListResponse> tasks, Authentication authentication) {
//
//        log.info("Service: Setting all task assignments done for all tasks and auth user");
//
//        tasks.setContent(tasks.getContent().stream().map(
//                task -> {task.setDone(this.isDone(task.getId(), authentication));
//                    return task;}).toList());
//
//        return tasks;
//    }

    @Override
    public PaginationListResponse<TaskListSmallResponse> setAllDoneByTasksSmallAndAuth(PaginationListResponse<TaskListSmallResponse> tasks, Authentication authentication) {

        log.info("Service: Setting all small task assignments done for all tasks and auth user");

        tasks.setContent(tasks.getContent().stream().map(
                task -> {task.setDone(this.isDone(task.getId(), authentication));
                    return task;}).toList());

        return tasks;
    }

    @Override
    public PaginationListResponse<TaskListResponse> findAllByUserId(
            String name, String deadline, String isDone, String isPast, long userId, int page, int size) {
        log.info("Service: Finding all task assignments for user with id {} and filters {} {} {} {} {} {}",
                userId, name, deadline, isDone, isPast, page, size);

        Map<String, Object> filters = createFilters(name, deadline, isDone, isPast, userId);

        Page<TaskAssignment> taskAssignments = taskAssignmentRepository.findAll(
                TaskAssignmentsSpecification.assignedToUser(userId)
                        .and(TaskAssignmentsSpecification.filterTaskAssignments(filters)),
                PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "isDone", "task.deadline")));

        return createResponse(taskAssignments);
    }

    @Override
    public PaginationListResponse<TaskListResponse> findAllByEventId(
            long eventId, int page, int size, Authentication auth) {
        log.info("Service: Finding all task assignments for event with id {} and page {} and size {}",
                eventId, page, size);

        User user = userService.findUserByAuth(auth);

        Page<TaskAssignment> taskAssignments = taskAssignmentRepository.findAll(
                TaskAssignmentsSpecification.assignedToUser(user.getId())
                        .and(TaskAssignmentsSpecification.hasEvent(eventId)),
                PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "isDone", "task.deadline")));

        return createResponse(taskAssignments);
    }

    @Override
    public PaginationListResponse<TaskListResponse> findAllByCreatorIdAndEventEmpty(Authentication authentication, int page, int size) {
        log.info("Service: Finding all task assignments for auth user with no events");

        User user = userService.findUserByAuth(authentication);

        Page<TaskAssignment> taskAssignments = taskAssignmentRepository.findAll(
                TaskAssignmentsSpecification.hasNullEventAndMeIsCreator(user.getId()),
                PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "isDone", "task.deadline")));

        return createResponse(taskAssignments);
    }

    @Override
    public PaginationListResponse<TaskListSmallResponse> findAllByDeadlineToday(Authentication authentication, int page, int size) {
        log.info("Service: Finding all task assignments for deadline today");

        User user = userService.findUserByAuth(authentication);

        Page<TaskAssignment> taskAssignments = taskAssignmentRepository.findAll(
                TaskAssignmentsSpecification.assignedToUser(user.getId()).and(TaskAssignmentsSpecification.DeadlineToday()),
                PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "isDone", "task.deadline"))
        );

        return createSmallResponse(taskAssignments);
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

        List<Task> tasksFromEvent = taskService.findAllByEventIdForServices(eventId);

        for(Task task : tasksFromEvent) {
            create(task.getId(), userId);
        }
    }

    @Override
    public void assignTasksToEventUsers(Long eventId, Long taskId) {
        log.info("Service: Assigning tasks for users from event with id {}", eventId);

        List<User> users = userService.findAllByEventIdForServices(eventId);
        Long creatorId = taskService.findByIdForServices(taskId).getCreator().getId();

        for(User user : users) {
            if(user.getId() == creatorId) continue;
            create(taskId, user.getId());
        }
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

    @Transactional
    @Override
    public void unassignTasksFromUser(Long userId) {
        log.info("Service: Unsigning all task assignments for user with id {}", userId);

        taskAssignmentRepository.deleteAllByUser_Id(userId);
    }


    @Transactional
    @Override
    public void unsignAllFromTask(Long taskId) {
        log.info("Service: Unsigning all task assignments for task with id {}", taskId);

        taskAssignmentRepository.deleteAllByTask_Id(taskId);
    }

    private Map<String, Object> createFilters(String name, String deadline, String isDone, String isPast, long userId) {
        Map<String, Object> filters = new HashMap<>();

        if(name != null && !name.isBlank() && !name.equals("null")) {
            filters.put("name", name);
        }
        if(deadline != null && !deadline.isBlank() && !deadline.equals("null")) {
            filters.put("deadline", deadline);
        }
        if(isPast != null && !isPast.isBlank() && !isPast.equals("null")) {
            filters.put("is_past", isPast);
        }
        if(isDone != null && !isDone.isBlank() && !isDone.equals("null")) {
            filters.put("is_done", isDone);
        }
        if(userId != 0) {
            filters.put("user_id", userId);
        }
        return filters;
    }

    private PaginationListResponse<TaskListResponse> createResponse(Page<TaskAssignment> tasks){
        List<TaskListResponse> taskListResponses = new ArrayList<>();
        TaskListResponse taskListResponse;
        for(TaskAssignment taskAssignment : tasks.getContent()) {
            taskListResponse = taskMapper.fromTaskToTaskListResponse(taskAssignment.getTask());
            taskListResponse.setDone(taskAssignment.isDone());
            taskListResponses.add(taskListResponse);
        }
        PaginationListResponse<TaskListResponse> response = new PaginationListResponse<>();
        response.setTotalPages(tasks.getTotalPages());
        response.setContent(taskListResponses);
        return response;
    }

    private PaginationListResponse<TaskListSmallResponse> createSmallResponse(Page<TaskAssignment> tasks){
        List<TaskListSmallResponse> taskListResponses = new ArrayList<>();
        TaskListSmallResponse taskListResponse;
        for(TaskAssignment taskAssignment : tasks.getContent()) {
            taskListResponse = taskMapper.fromTaskToTaskListResponseSmall(taskAssignment.getTask());
            taskListResponse.setDone(taskAssignment.isDone());
            taskListResponses.add(taskListResponse);
        }
        PaginationListResponse<TaskListSmallResponse> response = new PaginationListResponse<>();
        response.setTotalPages(tasks.getTotalPages());
        response.setContent(taskListResponses);
        return response;
    }
}