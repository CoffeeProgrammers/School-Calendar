package com.calendar.backend.services.impl;

import com.calendar.backend.dto.task.TaskFullResponse;
import com.calendar.backend.dto.task.TaskListResponse;
import com.calendar.backend.dto.task.TaskRequest;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.mappers.TaskMapper;
import com.calendar.backend.models.Event;
import com.calendar.backend.models.Task;
import com.calendar.backend.models.User;
import com.calendar.backend.repositories.TaskRepository;
import com.calendar.backend.services.inter.EventService;
import com.calendar.backend.services.inter.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceImplTest {

    @Mock
    private EventService eventService;
    @Mock
    private UserService userService;
    @Mock
    private TaskRepository taskRepository;
    @Mock
    private TaskMapper taskMapper;
    @InjectMocks
    private TaskServicesImpl taskService;

    private Task task;
    private Task updatedTask;
    private TaskRequest taskRequest;
    private TaskFullResponse taskFullResponse;
    private Authentication authentication;

    @BeforeEach
    void setUp() {
        task = new Task();
        task.setId(1L);
        task.setName("Test Task");
        task.setContent("Content of task");
        task.setDeadline(LocalDateTime.now());
        task.setCreator(new User());
        task.setEvent(new Event());

        taskRequest = new TaskRequest();
        taskRequest.setName("Updated Task");
        taskRequest.setContent("Updated Content");
        taskRequest.setDeadline(LocalDateTime.now().toString());

        updatedTask = new Task();
        updatedTask.setId(1L);
        updatedTask.setName("Updated Task");
        updatedTask.setContent("Updated Content");
        updatedTask.setDeadline(LocalDateTime.now());

        taskFullResponse = new TaskFullResponse();
        taskFullResponse.setId(1L);
        taskFullResponse.setName("Updated Task");
        taskFullResponse.setContent("Updated Content");

        authentication = mock(Authentication.class);
    }

    @Test
    void createTask_success() {
        when(taskMapper.fromTaskRequestToTask(any(TaskRequest.class))).thenReturn(task);
        when(userService.findUserByAuth(authentication)).thenReturn(task.getCreator());
        when(taskRepository.save(any(Task.class))).thenReturn(task);
        when(taskMapper.fromTaskToTaskResponse(task)).thenReturn(taskFullResponse);

        TaskFullResponse response = taskService.create(taskRequest, authentication, 1L);

        verify(taskRepository, times(1)).save(task);
        assertEquals(taskFullResponse, response);
    }

    @Test
    void updateTask_success() {
        when(taskRepository.findById(anyLong())).thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenReturn(updatedTask);
        when(taskMapper.fromTaskToTaskResponse(updatedTask)).thenReturn(taskFullResponse);

        TaskFullResponse response = taskService.update(taskRequest, 1L);

        assertEquals(taskFullResponse, response);

        ArgumentCaptor<Task> captor = ArgumentCaptor.forClass(Task.class);
        verify(taskRepository, times(1)).save(captor.capture());

        Task savedTask = captor.getValue();
        assertEquals("Updated Task", savedTask.getName());
        assertEquals("Updated Content", savedTask.getContent());
        assertEquals(updatedTask.getDeadline(), savedTask.getDeadline());
    }


    @Test
    void updateTask_notFound() {
        when(taskRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> taskService.update(taskRequest, 1L));
    }

    @Test
    void deleteTask_success() {
        doNothing().when(taskRepository).deleteById(anyLong());

        taskService.delete(1L);

        verify(taskRepository, times(1)).deleteById(1L);
    }

    @Test
    void findTaskById_success() {
        when(taskRepository.findById(anyLong())).thenReturn(Optional.of(task));
        when(taskMapper.fromTaskToTaskResponse(task)).thenReturn(taskFullResponse);

        TaskFullResponse response = taskService.findById(1L);

        assertEquals(taskFullResponse, response);
    }

    @Test
    void findTaskById_notFound() {
        when(taskRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> taskService.findById(1L));
    }

    @Test
    void findAllByUserId_success() {
        Page<Task> taskPage = new PageImpl<>(List.of(task));
        when(taskRepository.findAll(any(Specification.class), any(PageRequest.class))).thenReturn(taskPage);
        when(taskMapper.fromTaskToTaskListResponse(task)).thenReturn(new TaskListResponse());

        PaginationListResponse<TaskListResponse> result = taskService.findAllByUserId(Map.of(), 1L, 0, 10);

        assertEquals(1, result.getContent().size());
        assertEquals(1, result.getTotalPages());
        verify(taskRepository).findAll(any(Specification.class), any(PageRequest.class));
    }

    @Test
    void assignTaskToEvent_success() {
        when(taskRepository.findById(anyLong())).thenReturn(Optional.of(task));
        when(eventService.findByIdForServices(anyLong())).thenReturn(task.getEvent());
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        taskService.assignTaskToEvent(1L, 1L);

        verify(taskRepository, times(1)).save(task);
        assertEquals(task.getEvent(), task.getEvent());
    }
    @Test
    void findAllByEventId_success_withPagination() {
        Page<Task> taskPage = new PageImpl<>(List.of(task));
        when(taskRepository.findAllByEvent_Id(eq(1L), any(PageRequest.class))).thenReturn(taskPage);
        when(taskMapper.fromTaskToTaskListResponse(task)).thenReturn(new TaskListResponse());

        PaginationListResponse<TaskListResponse> result = taskService.findAllByEventId(1L, 0, 10);

        assertEquals(1, result.getContent().size());
        assertEquals(1, result.getTotalPages());
        verify(taskRepository).findAllByEvent_Id(eq(1L), any(PageRequest.class));
    }

    @Test
    void findAllByEventId_success_withoutPagination() {
        when(taskRepository.findAllByEvent_Id(eq(1L))).thenReturn(List.of(task));

        List<Task> result = taskService.findAllByEventId(1L);

        assertEquals(1, result.size());
        verify(taskRepository).findAllByEvent_Id(eq(1L));
    }
}
