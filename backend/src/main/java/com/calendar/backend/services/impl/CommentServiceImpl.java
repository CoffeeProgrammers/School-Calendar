package com.calendar.backend.services.impl;

import com.calendar.backend.dto.comment.CommentRequest;
import com.calendar.backend.dto.comment.CommentResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.mappers.CommentMapper;
import com.calendar.backend.models.Comment;
import com.calendar.backend.models.Event;
import com.calendar.backend.models.Notification;
import com.calendar.backend.models.User;
import com.calendar.backend.repositories.CommentRepository;
import com.calendar.backend.services.inter.CommentService;
import com.calendar.backend.services.inter.EventService;
import com.calendar.backend.services.inter.NotificationService;
import com.calendar.backend.services.inter.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final EventService eventService;
    private final UserService userService;
    private final NotificationService notificationService;
    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;

    @Override
    public CommentResponse create(CommentRequest commentRequest, Authentication authentication,
                                  long eventId) {
        log.info("Saving new comment {}", commentRequest);
        Comment comment = commentMapper.fromCommentRequestToComment(commentRequest);
        User user = userService.findByEmail(authentication.getName());
        Event event = eventService.findByIdForServices(eventId);
        comment.setDate(LocalDateTime.now());
        comment.setCreator(user);
        comment.setEvent(event);
        comment.setDate(LocalDateTime.now());
        notificationService.create(new Notification(List.of(event.getCreator()),
                "New comment to event with id " + eventId));
        return commentMapper.fromCommentToCommentResponse(commentRepository.save(comment));
    }

    @Override
    public CommentResponse update(CommentRequest commentRequest, long id) {
        log.info("Updating comment with id {}", id);
        Comment comment = commentRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Comment not found"));
        comment.setText(commentRequest.getText());
        return commentMapper.fromCommentToCommentResponse(commentRepository.save(comment));
    }

    @Override
    public void delete(long id) {
        log.info("Deleting comment with id {}", id);
        commentRepository.deleteById(id);
    }

    @Override
    public PaginationListResponse<CommentResponse> findAllByEventId(long eventId, int page, int size) {
        log.info("Finding all comments for event with id {}", eventId);
        Page<Comment> comments = commentRepository.findAllByEvent_Id(eventId, PageRequest.of(page, size,
                Sort.by(Sort.Direction.ASC, "date")));
        PaginationListResponse<CommentResponse> response = new PaginationListResponse<>();
        response.setTotalPages(comments.getTotalPages());
        response.setContent(comments.getContent().stream().map(
                commentMapper::fromCommentToCommentResponse).toList());
        return response;
    }

    @Override
    public Comment findByIdForServices(long id) {
        return commentRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Comment not found"));
    }
}
