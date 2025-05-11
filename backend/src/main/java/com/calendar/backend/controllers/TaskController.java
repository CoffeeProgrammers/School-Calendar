package com.calendar.backend.controllers;

import com.calendar.backend.dto.task.TaskFullResponse;
import com.calendar.backend.dto.task.TaskListResponse;
import com.calendar.backend.dto.task.TaskRequest;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.services.inter.TaskAssignmentService;
import com.calendar.backend.services.inter.TaskService;
import com.calendar.backend.services.inter.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
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
        TaskFullResponse task = taskService.create(request, auth, event_id);
        taskAssignmentService.create(task.getId(), userService.findUserByAuth(auth).getId());
        return task;
    }

    @PreAuthorize("hasRole('TEACHER') or @userSecurity.checkCreatorOfTask(#auth, #id)")
    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public TaskFullResponse updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskRequest request,
            Authentication auth) {
        TaskFullResponse taskFullResponse =  taskService.update(request, id);
        taskFullResponse.setDone(taskAssignmentService.isDone(id, auth));
        return taskFullResponse;
    }

    @PreAuthorize("hasRole('TEACHER') or @userSecurity.checkCreatorOfTask(#auth, #id)")
    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTask(@PathVariable Long id, Authentication auth) {
        taskAssignmentService.unsignAllFromTask(id);
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
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String deadline,
            @RequestParam(required = false) String isDone,
            @RequestParam(required = false) String isPast,
            Authentication auth) {
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
            @PathVariable Long event_id,
            @RequestParam int page,
            @RequestParam int size,
            Authentication auth) {
        PaginationListResponse<TaskListResponse> taskListResponse =
                taskService.findAllByEventId(event_id, page, size);
        return taskAssignmentService.setAllDoneByTasksAndAuth(taskListResponse, auth);
    }

    @GetMapping("/getMyWithoutEvent")
    @ResponseStatus(HttpStatus.OK)
    public PaginationListResponse<TaskListResponse> getMyTasks(
            @RequestParam int page,
            @RequestParam int size,
            Authentication auth) {
        PaginationListResponse<TaskListResponse> taskListResponse =
                taskService.findAllByCreatorIdAndEventEmpty(
                auth,
                page,
                size
        );
        return taskAssignmentService.setAllDoneByTasksAndAuth(taskListResponse, auth);
    }

    @PutMapping("/toggle/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void toggleTaskDone(
            @PathVariable Long id,
            Authentication auth) {
        taskAssignmentService.toggleDone(id, auth);
    }

    @PutMapping("/assign/{id}/to/{event_id}")
    @ResponseStatus(HttpStatus.OK)
    public void assignTaskToEvent(@PathVariable Long id, @PathVariable Long event_id) {
        taskService.assignTaskToEvent(event_id, id);
        taskAssignmentService.assignTasksToEventUsers(event_id, id);
    }

    @PutMapping("/unssign/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void unsignTaskFromEvent(@PathVariable Long id) {
        taskService.unassignTaskFromEvent(id);
    }
}