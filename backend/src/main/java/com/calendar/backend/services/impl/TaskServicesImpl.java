package com.calendar.backend.services.impl;

import com.calendar.backend.dto.task.TaskFullResponse;
import com.calendar.backend.dto.task.TaskListResponse;
import com.calendar.backend.dto.task.TaskRequest;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.mappers.TaskMapper;
import com.calendar.backend.models.Task;
import com.calendar.backend.repositories.TaskRepository;
import com.calendar.backend.repositories.specification.TaskSpecification;
import com.calendar.backend.services.inter.EventService;
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

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class TaskServicesImpl implements TaskService {
    private final EventService eventService;
    private final UserService userService;
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    @Override
    public TaskFullResponse create(TaskRequest taskRequest, Authentication authentication, long eventId) {
        log.info("Saving new task {}", taskRequest);
        Task task = taskMapper.fromTaskRequestToTask(taskRequest);
        task.setCreator(userService.findUserByAuth(authentication));
        task.setEvent(eventId != 0 ? eventService.findByIdForServices(eventId) : null);
        return taskMapper.fromTaskToTaskResponse(taskRepository.save(task));
    }

    @Override
    public TaskFullResponse update(TaskRequest taskRequest, long id) {
        log.info("Updating task with id {}", id);
        Task task = findByIdForServices(id);
        task.setName(taskRequest.getName());
        task.setContent(taskRequest.getContent());
        task.setDeadline(LocalDateTime.parse(taskRequest.getDeadline()));
        return taskMapper.fromTaskToTaskResponse(taskRepository.save(task));
    }

    @Transactional
    @Override
    public void delete(long id) {
        log.info("Deleting task with id {}", id);
        taskRepository.deleteById(id);
    }

    @Override
    public TaskFullResponse findById(long id) {
        log.info("Finding task with id {}", id);
        return taskMapper.fromTaskToTaskResponse(findByIdForServices(id));
    }

    @Override
    public PaginationListResponse<TaskListResponse> findAllByUserId(String name,
                                                                    String deadline, String isDone,
                                                                    String isPast, long userId,
                                                                    int page, int size) {
        Map<String, Object> filters = new HashMap<>();
        if(name != null && !name.isBlank() && !name.equals("null")) {
            filters.put("name", name);
        }
        if(deadline != null && !deadline.isBlank() && !deadline.equals("null")) {
            filters.put("deadline", deadline);
        }
        if(!isPast.isBlank() && !isPast.equals("null") && isPast.equals("true")) {
            filters.put("isPast", isPast);
        }
        if(isDone != null && !isDone.isBlank() && !isDone.equals("null")) {
            filters.put("is_done", isDone);
        }
        if(userId != 0) {
            filters.put("user_id", userId);
        }
        log.info("Finding all tasks for user with id {} and filters {}", userId, filters);
        Page<Task> tasks = taskRepository.findAll(TaskSpecification.assignedToUser(userId).and(TaskSpecification.filterTasks(filters)),
                PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "deadline")));
        PaginationListResponse<TaskListResponse> response = new PaginationListResponse<>();
        response.setTotalPages(tasks.getTotalPages());
        response.setContent(tasks.getContent().stream().map(
                taskMapper::fromTaskToTaskListResponse).toList());
        return response;
    }

    @Override
    public PaginationListResponse<TaskListResponse> findAllByEventId(
            long eventId, int page, int size) {
        log.info("Finding all tasks for event with id {}", eventId);
        Page<Task> tasks = taskRepository.findAllByEvent_Id(eventId,
                PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "deadline")));
        PaginationListResponse<TaskListResponse> response = new PaginationListResponse<>();
        response.setTotalPages(tasks.getTotalPages());
        response.setContent(tasks.getContent().stream().map(
                taskMapper::fromTaskToTaskListResponse).toList());
        return response;
    }

    @Override
    public List<Task> findAllByEventId(long eventId) {
        log.info("Finding all tasks in list for event with id {}", eventId);
        return taskRepository.findAllByEvent_Id(eventId);
    }


    public Task findByIdForServices(long id) {
        log.info("Finding task for services with id {}", id);
        return taskRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Task not found"));
    }

    @Override
    public void assignTaskToEvent(long eventId, long id) {
        Task task = findByIdForServices(id);
        task.setEvent(eventService.findByIdForServices(id));
        taskRepository.save(task);
    }

    @Override
    public void unassignTaskFromEvent(long taskId){
        Task task = this.findByIdForServices(taskId);
        task.setEvent(null);
        taskRepository.save(task);
    }

    @Override
    public void unsignAllFromEvent(long eventId) {
        List<Task> tasks = findAllByEventId(eventId).stream().map(task -> {task.setEvent(null); return task;}).toList();
        taskRepository.saveAll(tasks);
    }

    @Override
    public PaginationListResponse<TaskListResponse> findAllByCreatorIdAndEventEmpty(Authentication authentication,
                                                                                    int page, int size) {
        log.info("Finding all tasks for auth user with no events");
        PaginationListResponse<TaskListResponse> response = new PaginationListResponse<>();
        Page<Task> tasks = taskRepository.findAllByCreator_IdAndEventIsEmpty(
                userService.findUserByAuth(authentication).getId(),
                PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "deadline")));
        response.setTotalPages(tasks.getTotalPages());
        response.setContent(tasks.map(taskMapper::fromTaskToTaskListResponse).toList());
        return response;
    }
}
