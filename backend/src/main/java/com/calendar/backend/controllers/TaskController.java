package com.calendar.backend.controllers;

import com.calendar.backend.dto.task.TaskFullResponse;
import com.calendar.backend.dto.task.TaskListResponse;
import com.calendar.backend.dto.task.TaskRequest;
import com.calendar.backend.dto.wrapper.FilterRequest;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.services.inter.TaskAssignmentService;
import com.calendar.backend.services.inter.TaskService;
import com.calendar.backend.services.inter.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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
            @RequestParam Long event_id,
            @Valid @RequestBody TaskRequest request,
            Authentication auth) {
        return taskService.create(request, auth, event_id);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public TaskFullResponse updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskRequest request) {
        return taskService.update(request, id);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTask(@PathVariable Long id) {
        taskService.delete(id);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public TaskFullResponse getTask(@PathVariable Long id, Authentication auth) {
        TaskFullResponse taskFullResponse = taskService.findById(id);
        taskFullResponse.setDone(taskAssignmentService.isDone(id, auth));
        return taskFullResponse;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public PaginationListResponse<TaskListResponse> getMyTasks(
            @RequestParam int page,
            @RequestParam int size,
            @RequestBody(required = false) FilterRequest filter,
            Authentication auth) {
        return taskService.findAllByUserId(
                filter.getFilters(),
                userService.findUserByAuth(auth).getId(),
                page,
                size
        );
    }

    @PutMapping("/toggle/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void toggleTaskDone(
            @PathVariable Long id,
            Authentication auth) {
        taskAssignmentService.toggleDone(id, auth);
    }

    @GetMapping("/events/{event_id}")
    @ResponseStatus(HttpStatus.OK)
    public PaginationListResponse<TaskListResponse> getTasksByEvent(
            @PathVariable Long event_id,
            @RequestParam int page,
            @RequestParam int size) {
        return taskService.findAllByEventId(event_id, page, size);
    }

    @PutMapping("/assign/{id}/to/{event_id}")
    @ResponseStatus(HttpStatus.OK)
    public void assignTaskToEvent(@PathVariable Long id, @PathVariable Long event_id) {
        taskService.assignTaskForEvent(event_id, id);
        taskAssignmentService.assignTasksToEventUsers(event_id, id);
    }
}