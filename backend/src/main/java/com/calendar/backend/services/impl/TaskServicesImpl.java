package com.calendar.backend.services.impl;

import com.calendar.backend.dto.task.TaskFullResponse;
import com.calendar.backend.dto.task.TaskListResponse;
import com.calendar.backend.dto.task.TaskRequest;
import com.calendar.backend.dto.wrapper.CountAllTaskAndCompleted;
import com.calendar.backend.mappers.TaskMapper;
import com.calendar.backend.models.Task;
import com.calendar.backend.models.User;
import com.calendar.backend.repositories.TaskRepository;
import com.calendar.backend.repositories.specification.TaskSpecification;
import com.calendar.backend.services.inter.EventService;
import com.calendar.backend.services.inter.TaskService;
import com.calendar.backend.services.inter.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TaskServicesImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final EventService eventService;
    private final UserService userService;
    private final TaskMapper taskMapper;


    @Override
    public TaskFullResponse create(TaskRequest taskRequest, Authentication authentication, long eventId) {
        log.info("Service: Saving new task {}", taskRequest);

        Task task = taskMapper.fromTaskRequestToTask(taskRequest);
        task.setCreator(userService.findUserByAuth(authentication));
        task.setEvent(eventId != 0 ? eventService.findByIdForServices(eventId) : null);

        return taskMapper.fromTaskToTaskResponse(taskRepository.save(task));
    }

    @Override
    public TaskFullResponse update(TaskRequest taskRequest, long id) {
        log.info("Service: Updating task with id {}", id);

        Task task = findByIdForServices(id);
        task.setName(taskRequest.getName());
        task.setContent(taskRequest.getContent());
        task.setDeadline(LocalDateTime.parse(taskRequest.getDeadline()));

        return taskMapper.fromTaskToTaskResponse(taskRepository.save(task));
    }

    @Transactional
    @Override
    public void delete(long id) {
        log.info("Service: Deleting task with id {}", id);

        taskRepository.deleteById(id);
    }

    @Override
    public CountAllTaskAndCompleted countAllTaskAndCompleted(long userId) {
        log.info("Service: Counting all tasks by user id {} and completed", userId);

        CountAllTaskAndCompleted countAllTaskAndCompleted = new CountAllTaskAndCompleted();
        countAllTaskAndCompleted.setCountCompleted(taskRepository.countAllByUserIdAndDone(userId));
        countAllTaskAndCompleted.setCountAll(taskRepository.countAllByUserId(userId));

        return countAllTaskAndCompleted;
    }

    @Override
    public void changeCreatorToDeletedUser(long userId) {
        log.info("Service: Changing creator to deleted user with id {}", userId);

        List<Task> taskFromDeletedUser = taskRepository.findAll(TaskSpecification.hasCreator(userId));
        User deleted = userService.findByEmailForServices("!deleted-user!@deleted.com");
        for(Task task : taskFromDeletedUser) {
            task.setCreator(deleted);
        }

        taskRepository.saveAll(taskFromDeletedUser);
    }

    @Override
    public TaskListResponse assignTaskToEvent(long eventId, long id) {
        log.info("Service: Assigning task with id {} to event with id {}", id, eventId);

        Task task = findByIdForServices(id);
        task.setEvent(eventService.findByIdForServices(eventId));

        return taskMapper.fromTaskToTaskListResponse(taskRepository.save(task));
    }

    @Override
    public void unassignTaskFromEvent(long taskId){
        log.info("Service: Unassigning task with id {} from event", taskId);

        Task task = this.findByIdForServices(taskId);
        task.setEvent(null);

        taskRepository.save(task);
    }

    @Override
    public void unsignAllFromEvent(long eventId) {
        log.info("Service: Unassigning all tasks from event with id {}", eventId);

        List<Task> tasks = findAllByEventIdForServices(eventId).stream()
                .map(task -> {task.setEvent(null); return task;}).toList();

        taskRepository.saveAll(tasks);
    }

    @Override
    public Task findByIdForServices(long id) {
        log.info("Service: Finding task for services with id {}", id);

        return taskRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Task not found"));
    }

    @Override
    public List<Task> findAllByEventIdForServices(long eventId) {
        log.info("Service: Finding all tasks in list for event with id {}", eventId);

        return taskRepository.findAllByEvent_Id(eventId);
    }


    @Override
    public List<Task> findAllByUserIdForServices(long userId) {
        log.info("Service: Finding all tasks for user with id {}", userId);

        return taskRepository.findAll(TaskSpecification.assignedToUser(userId));
    }
}