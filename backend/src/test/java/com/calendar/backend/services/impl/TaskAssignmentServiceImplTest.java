package com.calendar.backend.services.impl;

import com.calendar.backend.TestUtil;
import com.calendar.backend.models.Task;
import com.calendar.backend.models.TaskAssignment;
import com.calendar.backend.models.User;
import com.calendar.backend.repositories.TaskAssignmentRepository;
import com.calendar.backend.services.inter.TaskService;
import com.calendar.backend.services.inter.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskAssignmentServiceImplTest {

    @Mock
    private TaskService taskService;
    @Mock
    private UserService userService;
    @Mock
    private TaskAssignmentRepository taskAssignmentRepository;
    @InjectMocks
    private TaskAssignmentServiceImpl taskAssignmentService;

    private Task task;
    private User user;
    private TaskAssignment taskAssignment;
    private Authentication authentication;

    @BeforeEach
    void setUp() {
        task = TestUtil.createTask("Test Task");
        user = TestUtil.createUser("TEACHER");
        taskAssignment = TestUtil.assignTaskToUser(task, user);
        taskAssignment.setDone(false);

        authentication = mock(Authentication.class);
    }

    @Test
    void create_success() {
        when(taskService.findByIdForServices(anyLong())).thenReturn(task);
        when(userService.findByIdForServices(anyLong())).thenReturn(user);

        taskAssignmentService.create(1L, 1L);

        verify(taskAssignmentRepository).save(any(TaskAssignment.class));
    }

    @Test
    void isDone_success() {
        when(userService.findUserByAuth(authentication)).thenReturn(user);
        when(taskAssignmentRepository.findByTask_IdAndUser_Id(anyLong(), anyLong()))
                .thenReturn(Optional.of(taskAssignment));

        boolean result = taskAssignmentService.isDone(1L, authentication);

        assertFalse(result);
    }

    @Test
    void toggleDone_success() {
        when(userService.findUserByAuth(authentication)).thenReturn(user);
        when(taskAssignmentRepository.findByTask_IdAndUser_Id(anyLong(), anyLong()))
                .thenReturn(Optional.of(taskAssignment));

        taskAssignmentService.toggleDone(1L, authentication);

        assertTrue(taskAssignment.isDone());
        verify(taskAssignmentRepository).save(taskAssignment);
    }

    @Test
    void toggleDone_notFound() {
        when(userService.findUserByAuth(authentication)).thenReturn(user);
        when(taskAssignmentRepository.findByTask_IdAndUser_Id(anyLong(), anyLong()))
                .thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> taskAssignmentService.toggleDone(1L, authentication));
    }

    @Test
    void assignTasksForNewUserFromEvent_success() {
        when(taskService.findAllByEventIdForServices(anyLong())).thenReturn(List.of(task));
        when(userService.findByIdForServices(anyLong())).thenReturn(user);

        taskAssignmentService.assignTasksForNewUserFromEvent(1L, 1L);

        verify(taskAssignmentRepository, times(1)).save(any(TaskAssignment.class));
    }

//    @Test
//    void assignTasksToEventUsers_success() {
//        when(userService.findAllByEventIdForServices(anyLong())).thenReturn(List.of(user));
//        when(taskService.findByIdForServices(anyLong())).thenReturn(task);
//
//        taskAssignmentService.assignTasksToEventUsers(1L, 1L);
//
//        verify(taskAssignmentRepository, times(1)).save(any(TaskAssignment.class));
//    }
}
