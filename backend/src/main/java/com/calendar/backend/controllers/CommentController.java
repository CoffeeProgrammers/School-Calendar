package com.calendar.backend.controllers;

import com.calendar.backend.dto.comment.CommentRequest;
import com.calendar.backend.dto.comment.CommentResponse;
import com.calendar.backend.dto.wrapper.LongResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.services.inter.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/events/{event_id}/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PreAuthorize("@userSecurity.checkUserOfEvent(#auth, #eventId)")
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public CommentResponse createComment(
            @PathVariable(value = "event_id") Long eventId,
            @Valid @RequestBody CommentRequest request,
            Authentication auth) {
        log.info("Controller: Create comment for event with id: {} with body: {}", eventId, request);
        return commentService.create(request, auth, eventId);
    }

    @PreAuthorize("hasRole('CHIEF_TEACHER') or @userSecurity.checkCreatorOfComment(#auth, #id)")
    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CommentResponse updateComment(
            @PathVariable Long id,
            @Valid @RequestBody CommentRequest request,
            Authentication auth) {
        log.info("Controller: Update comment with id: {} with body: {}", id, request);
        return commentService.update(request, id);
    }

    @PreAuthorize("hasRole('CHIEF_TEACHER') or @userSecurity.checkCreatorOfComment(#auth, #id)")
    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@PathVariable Long id) {
        log.info("Controller: Delete comment with id: {}", id);
        commentService.delete(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public PaginationListResponse<CommentResponse> getAllComments(
            @PathVariable(value = "event_id") Long eventId,
            @RequestParam int page,
            @RequestParam int size) {
        log.info("Controller: Get all comments for event with id: {}", eventId);
        return commentService.findAllByEventId(eventId, page, size);
    }

    @GetMapping("/getMyCount")
    @ResponseStatus(HttpStatus.OK)
    public LongResponse getMyCommentsCount(Authentication auth) {
        log.info("Controller: Get my comments count");
        return commentService.countAllCommentsByCreatorId(auth);
    }
}

