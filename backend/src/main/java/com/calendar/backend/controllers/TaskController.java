package com.calendar.backend.controllers;

import com.calendar.backend.dto.task.TaskFullResponse;
import com.calendar.backend.dto.task.TaskListResponse;
import com.calendar.backend.dto.task.TaskRequest;
import com.calendar.backend.dto.wrapper.CountAllTaskAndCompleted;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.services.inter.TaskAssignmentService;
import com.calendar.backend.services.inter.TaskService;
import com.calendar.backend.services.inter.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final TaskAssignmentService taskAssignmentService;
    private final UserService userService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public TaskFullResponse createTask(
            @RequestParam(required = false) Long eventId,
            @Valid @RequestBody TaskRequest request,
            Authentication auth) {
        log.info("Controller: Create task with body: {}", request);
        TaskFullResponse task = taskService.create(request, auth, eventId != null ? eventId : 0);
        if(eventId != null) {
            taskAssignmentService.assignTasksToEventUsers(eventId, task.getId());
        }
        taskAssignmentService.create(task.getId(), task.getCreator().getId());
        return task;
    }

    @PreAuthorize("@userSecurity.checkCreatorOfTask(#auth, #id)")
    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public TaskFullResponse updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskRequest request,
            Authentication auth) {
        log.info("Controller: Update task with id: {} with body: {}", id, request);
        TaskFullResponse taskFullResponse =  taskService.update(request, id);
        taskFullResponse.setDone(taskAssignmentService.isDone(id, auth));
        return taskFullResponse;
    }

    @PreAuthorize("@userSecurity.checkCreatorOfTask(#auth, #id)")
    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTask(@PathVariable Long id, Authentication auth) {
        log.info("Controller: Delete task with id: {}", id);
        taskAssignmentService.unsignAllFromTask(id);
        taskService.delete(id);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public TaskFullResponse getTask(@PathVariable Long id, Authentication auth) {
        log.info("Controller: Get task with id: {}", id);
        TaskFullResponse taskFullResponse = taskService.findById(id);
        taskFullResponse.setDone(taskAssignmentService.isDone(id, auth));
        return taskFullResponse;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public PaginationListResponse<TaskListResponse> getMyTasks(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String deadline,
            @RequestParam(required = false) String isDone,
            @RequestParam(required = false) String isPast,
            Authentication auth) {
        log.info("Controller: Get all my tasks with name: {} deadline: {} isDone: {} isPast: {}",
                name, deadline, isDone, isPast);
        PaginationListResponse<TaskListResponse> taskListResponse = taskService.findAllByUserId(
                name,
                deadline,
                isDone,
                isPast,
                userService.findUserByAuth(auth).getId(),
                page,
                size
        );
        return taskAssignmentService.setAllDoneByTasksAndAuth(taskListResponse, auth);
    }

    @GetMapping("/events/{event_id}")
    @ResponseStatus(HttpStatus.OK)
    public PaginationListResponse<TaskListResponse> getTasksByEvent(
            @PathVariable(value = "event_id") Long eventId,
            @RequestParam int page,
            @RequestParam int size,
            Authentication auth) {
        log.info("Controller: Get all tasks for event with id: {}", eventId);
        PaginationListResponse<TaskListResponse> taskListResponse =
                taskService.findAllByEventId(eventId, page, size);
        return taskAssignmentService.setAllDoneByTasksAndAuth(taskListResponse, auth);
    }

    @GetMapping("/getMyWithoutEvent")
    @ResponseStatus(HttpStatus.OK)
    public PaginationListResponse<TaskListResponse> getMyTasks(
            @RequestParam int page,
            @RequestParam int size,
            Authentication auth) {
        log.info("Controller: Get all my tasks without event");
        PaginationListResponse<TaskListResponse> taskListResponse =
                taskService.findAllByCreatorIdAndEventEmpty(
                auth,
                page,
                size
        );
        return taskAssignmentService.setAllDoneByTasksAndAuth(taskListResponse, auth);
    }

    @PreAuthorize("@userSecurity.checkUserOfTask(#auth, #id)")
    @PutMapping("/toggle/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void toggleTaskDone(
            @PathVariable Long id,
            Authentication auth) {
        log.info("Controller: Toggle task with id: {} done", id);
        taskAssignmentService.toggleDone(id, auth);
    }

    @PreAuthorize("@userSecurity.checkCreatorOfTask(#auth, #id) " +
            "&& @userSecurity.checkCreatorOfEvent(#auth, #event_id)")
    @PutMapping("/assign/{id}/to/{event_id}")
    @ResponseStatus(HttpStatus.OK)
    public TaskListResponse assignTaskToEvent(@PathVariable Long id, @PathVariable Long event_id, Authentication auth) {
        log.info("Controller: Assign task with id: {} to event with id: {}", id, event_id);
        TaskListResponse taskListResponse = taskService.assignTaskToEvent(event_id, id);
        taskAssignmentService.assignTasksToEventUsers(event_id, id);
        return taskListResponse;
    }

    @PreAuthorize("@userSecurity.checkCreatorOfTask(#auth, #id)")
    @PutMapping("/unassign/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void unassignTaskFromEvent(@PathVariable Long id, Authentication auth) {
        log.info("Controller: Unassign task with id: {} from event", id);
        taskAssignmentService.unassignTasksFromEventUsers(id);
        taskService.unassignTaskFromEvent(id);
    }

    @GetMapping("/countAllMy/user/{user_id}")
    public CountAllTaskAndCompleted countAllUsersTask(@PathVariable(value = "user_id") Long userId) {
        log.info("Controller: Get count of all tasks and completed for user with id: {}", userId);
        return taskService.countAllTaskAndCompleted(userId);
    }
}