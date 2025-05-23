package com.calendar.backend.services.impl;

import com.calendar.backend.TestUtil;
import com.calendar.backend.dto.task.TaskFullResponse;
import com.calendar.backend.dto.task.TaskListResponse;
import com.calendar.backend.dto.task.TaskListSmallResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.mappers.TaskMapper;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;

import java.time.LocalDateTime;
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
    @Mock
    private TaskMapper taskMapper;
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
        task.setCreator(user);
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
    void isDone_notFound() {
        when(userService.findUserByAuth(authentication)).thenReturn(user);
        when(taskAssignmentRepository.findByTask_IdAndUser_Id(anyLong(), anyLong()))
                .thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> taskAssignmentService.isDone(1L, authentication));
    }

    @Test
    void toggleDone_successTrue() {
        when(userService.findUserByAuth(authentication)).thenReturn(user);
        when(taskAssignmentRepository.findByTask_IdAndUser_Id(anyLong(), anyLong()))
                .thenReturn(Optional.of(taskAssignment));

        taskAssignmentService.toggleDone(1L, authentication);

        assertTrue(taskAssignment.isDone());
        verify(taskAssignmentRepository).save(taskAssignment);
    }

    @Test
    void toggleDone_successFalse() {
        when(userService.findUserByAuth(authentication)).thenReturn(user);
        when(taskAssignmentRepository.findByTask_IdAndUser_Id(anyLong(), anyLong()))
                .thenReturn(Optional.of(taskAssignment));
        taskAssignment.setDone(true);

        taskAssignmentService.toggleDone(1L, authentication);

        assertFalse(taskAssignment.isDone());
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

    @Test
    void assignTasksToEventUsers_creatorSkip() {
        when(userService.findAllByEventIdForServices(anyLong())).thenReturn(List.of(user));
        when(taskService.findByIdForServices(anyLong())).thenReturn(task);

        taskAssignmentService.assignTasksToEventUsers(1L, 1L);

        verify(taskAssignmentRepository, times(0)).save(any(TaskAssignment.class));
    }

    @Test
    void assignTasksToEventUsers_success() {
        when(userService.findAllByEventIdForServices(anyLong())).thenReturn(List.of(user));
        when(taskService.findByIdForServices(anyLong())).thenReturn(task);
        User user1 = TestUtil.createUser("STUDENT");
        user1.setId(-1L);
        task.setCreator(user1);
        taskAssignmentService.assignTasksToEventUsers(1L, 1L);

        verify(taskAssignmentRepository, times(1)).save(any(TaskAssignment.class));
    }

    @Test
    void unassignTasksFromEventUsers_success() {
        User eventUser = TestUtil.createUser("STUDENT");
        eventUser.setId(2L);

        task.setEvent(TestUtil.createEvent("Event"));
        task.getEvent().setUsers(List.of(user, eventUser));

        when(taskService.findByIdForServices(task.getId())).thenReturn(task);

        taskAssignmentService.unassignTasksFromEventUsers(task.getId());

        verify(taskAssignmentRepository).deleteByTask_IdAndUser_Id(task.getId(), eventUser.getId());
        verify(taskAssignmentRepository, never()).deleteByTask_IdAndUser_Id(task.getId(), user.getId()); // creator is skipped
    }

    @Test
    void unassignTasksFromUser_success() {
        long userId = 123L;

        taskAssignmentService.unassignTasksFromUser(userId);

        verify(taskAssignmentRepository).deleteAllByUser_Id(userId);
    }

    @Test
    void unsignAllFromTask_success() {
        long taskId = 456L;

        taskAssignmentService.unsignAllFromTask(taskId);

        verify(taskAssignmentRepository).deleteAllByTask_Id(taskId);
    }

//    @Test
//    void setAllDoneByTasksAndAuth_success() {
//        TaskListResponse task1 = new TaskListResponse();
//        task1.setId(1L);
//        TaskListResponse task2 = new TaskListResponse();
//        task2.setId(2L);
//
//        PaginationListResponse<TaskListResponse> input = new PaginationListResponse<>();
//        input.setContent(List.of(task1, task2));
//
//        when(userService.findUserByAuth(authentication)).thenReturn(user);
//        when(taskAssignmentRepository.findByTask_IdAndUser_Id(eq(1L), eq(user.getId())))
//                .thenReturn(Optional.of(taskAssignment));
//        when(taskAssignmentRepository.findByTask_IdAndUser_Id(eq(2L), eq(user.getId())))
//                .thenReturn(Optional.of(TestUtil.assignTaskToUser(TestUtil.createTask("X"), user)));
//
//        // When
//        PaginationListResponse<TaskListResponse> result =
//                taskAssignmentService.setAllDoneByTasksAndAuth(input, authentication);
//
//        // Then
//        assertEquals(2, result.getContent().size());
//        verify(taskAssignmentRepository, times(2)).findByTask_IdAndUser_Id(anyLong(), anyLong());
//    }
    @Test
    void createWithNewTask_success() {
        when(userService.findUserByAuth(authentication)).thenReturn(user);
        when(taskService.findByIdForServices(1L)).thenReturn(task);
        when(userService.findByIdForServices(user.getId())).thenReturn(user);

        taskAssignmentService.createWithNewTask(authentication, 1L);

        verify(taskAssignmentRepository).save(any(TaskAssignment.class));
    }
    @Test
    void findById_existingTaskAssignment_success() {
        when(userService.findUserByAuth(authentication)).thenReturn(user);

        TaskAssignment assignment = TestUtil.assignTaskToUser(task, user);
        assignment.setDone(true);

        when(taskAssignmentRepository.findByTask_IdAndUser_Id(task.getId(), user.getId()))
                .thenReturn(Optional.of(assignment));

        TaskFullResponse expected = new TaskFullResponse();
        expected.setDone(true);
        when(taskMapper.fromTaskToTaskResponse(task)).thenReturn(expected);

        TaskFullResponse result = taskAssignmentService.findById(task.getId(), authentication);

        assertTrue(result.isDone());
    }

    @Test
    void findById_notFound_throwsException() {
        when(userService.findUserByAuth(authentication)).thenReturn(user);
        when(taskAssignmentRepository.findByTask_IdAndUser_Id(task.getId(), user.getId()))
                .thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class,
                () -> taskAssignmentService.findById(task.getId(), authentication));
    }
    @Test
    void findAllByUserId_success() {
        TaskAssignment assignment = TestUtil.assignTaskToUser(task, user);
        Page<TaskAssignment> mockPage = new PageImpl<>(List.of(assignment));
        when(taskAssignmentRepository.findAll(any(Specification.class), any(PageRequest.class))).thenReturn(mockPage);

        TaskListResponse response = new TaskListResponse();
        response.setDone(true);
        when(taskMapper.fromTaskToTaskListResponse(task)).thenReturn(response);
        task.setDeadline(LocalDateTime.now().plusDays(2));
        user.setId(1L);
        task.setName("Name");
        PaginationListResponse<TaskListResponse> result = taskAssignmentService.findAllByUserId(
                task.getName(), task.getDeadline().toString(), "true", "false", user.getId(), 0, 10);

        assertEquals(1, result.getContent().size());
        assertFalse(result.getContent().get(0).isDone());
    }
    @Test
    void testFiltersNull() {
        TaskAssignment assignment = TestUtil.assignTaskToUser(task, user);
        Page<TaskAssignment> mockPage = new PageImpl<>(List.of(assignment));
        when(taskAssignmentRepository.findAll(any(Specification.class), any(PageRequest.class))).thenReturn(mockPage);

        TaskListResponse response = new TaskListResponse();
        response.setDone(true);
        when(taskMapper.fromTaskToTaskListResponse(task)).thenReturn(response);

        PaginationListResponse<TaskListResponse> result = taskAssignmentService.findAllByUserId(
                null, null, null, null, 0, 0, 10);

        assertEquals(1, result.getContent().size());
        assertFalse(result.getContent().get(0).isDone());
    }

    @Test
    void testFiltersNullString() {
        TaskAssignment assignment = TestUtil.assignTaskToUser(task, user);
        Page<TaskAssignment> mockPage = new PageImpl<>(List.of(assignment));
        when(taskAssignmentRepository.findAll(any(Specification.class), any(PageRequest.class))).thenReturn(mockPage);

        TaskListResponse response = new TaskListResponse();
        response.setDone(true);
        when(taskMapper.fromTaskToTaskListResponse(task)).thenReturn(response);

        PaginationListResponse<TaskListResponse> result = taskAssignmentService.findAllByUserId(
                "null", "null", "null", "null", 0, 0, 10);

        assertEquals(1, result.getContent().size());
        assertFalse(result.getContent().get(0).isDone());
    }

    @Test
    void testFiltersBlank() {
        TaskAssignment assignment = TestUtil.assignTaskToUser(task, user);
        Page<TaskAssignment> mockPage = new PageImpl<>(List.of(assignment));
        when(taskAssignmentRepository.findAll(any(Specification.class), any(PageRequest.class))).thenReturn(mockPage);

        TaskListResponse response = new TaskListResponse();
        response.setDone(true);
        when(taskMapper.fromTaskToTaskListResponse(task)).thenReturn(response);

        PaginationListResponse<TaskListResponse> result = taskAssignmentService.findAllByUserId(
                "", "", "", "", 0, 0, 10);

        assertEquals(1, result.getContent().size());
        assertFalse(result.getContent().get(0).isDone());
    }

    @Test
    void findAllByEventId_success() {
        when(userService.findUserByAuth(authentication)).thenReturn(user);

        TaskAssignment assignment = TestUtil.assignTaskToUser(task, user);
        Page<TaskAssignment> mockPage = new PageImpl<>(List.of(assignment));
        when(taskAssignmentRepository.findAll(any(Specification.class), any(PageRequest.class))).thenReturn(mockPage);

        TaskListResponse response = new TaskListResponse();
        response.setDone(true);
        when(taskMapper.fromTaskToTaskListResponse(task)).thenReturn(response);

        PaginationListResponse<TaskListResponse> result = taskAssignmentService.findAllByEventId(
                100L, 0, 10, authentication);

        assertEquals(1, result.getContent().size());
        assertFalse(result.getContent().get(0).isDone());
    }

    @Test
    void findAllByCreatorIdAndEventEmpty_success() {
        when(userService.findUserByAuth(authentication)).thenReturn(user);

        TaskAssignment assignment = TestUtil.assignTaskToUser(task, user);
        Page<TaskAssignment> mockPage = new PageImpl<>(List.of(assignment));
        when(taskAssignmentRepository.findAll(any(Specification.class), any(PageRequest.class))).thenReturn(mockPage);

        TaskListResponse response = new TaskListResponse();
        response.setDone(true);
        when(taskMapper.fromTaskToTaskListResponse(task)).thenReturn(response);

        PaginationListResponse<TaskListResponse> result =
                taskAssignmentService.findAllByCreatorIdAndEventEmpty(authentication, 0, 10);

        assertEquals(1, result.getContent().size());
        assertFalse(result.getContent().get(0).isDone());
    }

    @Test
    void findAllByDeadlineToday_success() {
        when(userService.findUserByAuth(authentication)).thenReturn(user);

        TaskAssignment assignment = TestUtil.assignTaskToUser(task, user);
        Page<TaskAssignment> mockPage = new PageImpl<>(List.of(assignment));
        when(taskAssignmentRepository.findAll(any(Specification.class), any(PageRequest.class))).thenReturn(mockPage);

        TaskListSmallResponse response = new TaskListSmallResponse();
        response.setDone(true);
        when(taskMapper.fromTaskToTaskListResponseSmall(task)).thenReturn(response);

        PaginationListResponse<TaskListSmallResponse> result =
                taskAssignmentService.findAllByDeadlineToday(authentication, 0, 10);

        assertEquals(1, result.getContent().size());
        assertFalse(result.getContent().get(0).isDone());
    }
}
