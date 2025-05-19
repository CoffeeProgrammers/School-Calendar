package com.calendar.backend.services.impl;

import com.calendar.backend.dto.comment.CommentRequest;
import com.calendar.backend.dto.comment.CommentResponse;
import com.calendar.backend.dto.wrapper.LongResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.mappers.CommentMapper;
import com.calendar.backend.models.Comment;
import com.calendar.backend.models.Event;
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
import java.time.ZoneId;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final NotificationService notificationService;
    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;
    private final EventService eventService;
    private final UserService userService;


    @Override
    public CommentResponse create(CommentRequest commentRequest, Authentication authentication,
                                  long eventId) {
        log.info("Service: Saving new comment {}", commentRequest);

        Comment comment = commentMapper.fromCommentRequestToComment(commentRequest);
        User user = userService.findUserByAuth(authentication);
        Event event = eventService.findByIdForServices(eventId);

        comment.setDate(LocalDateTime.now(ZoneId.of("Europe/Kiev")));
        comment.setCreator(user);
        comment.setEvent(event);
        comment.setDate(LocalDateTime.now());

        notificationService.create(List.of(event.getCreator()), "New comment to event " + event.getName());

        return commentMapper.fromCommentToCommentResponse(commentRepository.save(comment));
    }

    @Override
    public CommentResponse update(CommentRequest commentRequest, long id) {
        log.info("Service: Updating comment with id {}", id);

        Comment comment = commentRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Comment not found"));
        comment.setText(commentRequest.getText());

        return commentMapper.fromCommentToCommentResponse(commentRepository.save(comment));
    }

    @Override
    public void delete(long id) {
        log.info("Service: Deleting comment with id {}", id);

        Comment comment = commentRepository.findById(id).orElseThrow();
        Event event = comment.getEvent();
        event.getComments().remove(comment);
        commentRepository.deleteById(id);
    }

    @Override
    public PaginationListResponse<CommentResponse> findAllByEventId(long eventId, int page, int size) {
        log.info("Service: Finding all comments for event with id {}", eventId);

        Page<Comment> comments = commentRepository.findAllByEvent_Id(eventId, PageRequest.of(page, size,
                Sort.by(Sort.Direction.DESC, "date")));

        PaginationListResponse<CommentResponse> response = new PaginationListResponse<>();
        response.setTotalPages(comments.getTotalPages());
        response.setContent(comments.getContent().stream().map(
                commentMapper::fromCommentToCommentResponse).toList());

        return response;
    }

    @Override
    public LongResponse countAllCommentsByCreatorId(long userId) {
        log.info("Service: Counting all comments for creator with id {}", userId);

        LongResponse longResponse = new LongResponse();
        longResponse.setCount(commentRepository.countAllByCreator_Id(userId));

        return longResponse;
    }

    @Override
    public void changeCreatorToDeletedUser(long userId) {
        log.info("Service: Changing creator to deleted user with id {}", userId);

        List<Comment> commentsFromDeletedUser = commentRepository.findAllByCreator_Id(userId);
        User deleted = userService.findByEmailForServices("!deleted-user!@deleted.com");
        for(Comment comment : commentsFromDeletedUser) {
            comment.setCreator(deleted);
        }

        commentRepository.saveAll(commentsFromDeletedUser);
    }

    @Override
    public Comment findByIdForServices(long id) {
        log.info("Service: Finding comment for service with id {}", id);

        return commentRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Comment not found"));
    }
}
