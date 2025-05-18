package com.calendar.backend.services.impl;

import com.calendar.backend.TestUtil;
import com.calendar.backend.dto.comment.CommentRequest;
import com.calendar.backend.dto.comment.CommentResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.mappers.CommentMapper;
import com.calendar.backend.models.Comment;
import com.calendar.backend.models.Event;
import com.calendar.backend.models.Notification;
import com.calendar.backend.models.User;
import com.calendar.backend.repositories.CommentRepository;
import com.calendar.backend.services.inter.EventService;
import com.calendar.backend.services.inter.NotificationService;
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
import org.springframework.security.core.Authentication;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CommentServiceImplTest {

    @Mock
    private EventService eventService;
    @Mock
    private UserService userService;
    @Mock
    private NotificationService notificationService;
    @Mock
    private CommentRepository commentRepository;
    @Mock
    private CommentMapper commentMapper;

    @InjectMocks
    private CommentServiceImpl commentService;

    private User user;
    private Event event;
    private Comment comment;

    @BeforeEach
    void setUp() {
        user = TestUtil.createUser("TEACHER");
        event = TestUtil.createEvent("Test Event", user);
        event.setCreator(TestUtil.createUser("STUDENT"));
        comment = TestUtil.createComment("Test comment", LocalDateTime.now(), user, event);
    }

    @Test
    void create_success() {
        CommentRequest request = new CommentRequest();
        request.setText("New comment");
        Authentication auth = mock(Authentication.class);

        when(auth.getName()).thenReturn(user.getEmail());
        when(userService.findByEmailForServices(user.getEmail())).thenReturn(user);
        when(eventService.findByIdForServices(event.getId())).thenReturn(event);
        when(commentMapper.fromCommentRequestToComment(request)).thenReturn(comment);
        when(commentRepository.save(any(Comment.class))).thenReturn(comment);
        when(commentMapper.fromCommentToCommentResponse(comment)).thenReturn(new CommentResponse());

        CommentResponse result = commentService.create(request, auth, event.getId());

        assertNotNull(result);
        verify(commentRepository).save(any(Comment.class));
        verify(notificationService).create(any(Notification.class));
    }

    @Test
    void update_success() {
        CommentRequest request = new CommentRequest();
        request.setText("Updated comment");

        when(commentRepository.findById(1L)).thenReturn(Optional.of(comment));
        when(commentRepository.save(comment)).thenReturn(comment);
        when(commentMapper.fromCommentToCommentResponse(comment)).thenReturn(new CommentResponse());

        CommentResponse result = commentService.update(request, 1L);

        assertEquals("Updated comment", comment.getText());
        assertNotNull(result);
    }

    @Test
    void update_notFound() {
        when(commentRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class,
                () -> commentService.update(new CommentRequest(), 1L));
    }

    @Test
    void delete_success() {
        doNothing().when(commentRepository).deleteById(1L);
        when(commentRepository.findById(1L)).thenReturn(Optional.of(comment));
        commentService.delete(1L);
        verify(commentRepository).deleteById(1L);
    }

    @Test
    void findAllByEventId_success() {
        CommentResponse response = new CommentResponse();
        Page<Comment> page = new PageImpl<>(List.of(comment));

        when(commentRepository.findAllByEvent_Id(eq(1L), any())).thenReturn(page);
        when(commentMapper.fromCommentToCommentResponse(comment)).thenReturn(response);

        PaginationListResponse<CommentResponse> result = commentService.findAllByEventId(1L, 0, 10);

        assertEquals(1, result.getContent().size());
        assertEquals(1, result.getTotalPages());
    }

    @Test
    void findByIdForServices_success() {
        when(commentRepository.findById(1L)).thenReturn(Optional.of(comment));

        Comment result = commentService.findByIdForServices(1L);

        assertEquals(comment, result);
    }

    @Test
    void findByIdForServices_notFound() {
        when(commentRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> commentService.findByIdForServices(1L));
    }
}
