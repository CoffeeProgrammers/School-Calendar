package com.calendar.backend.controllers;

import com.calendar.backend.dto.comment.CommentRequest;
import com.calendar.backend.dto.comment.CommentResponse;
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

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public CommentResponse createComment(
            @PathVariable Long event_id,
            @Valid @RequestBody CommentRequest request,
            Authentication auth) {
        log.info("Controller: Create comment for event with id: {} with body: {}", event_id, request);
        return commentService.create(request, auth, event_id);
    }

    @PreAuthorize("hasRole('TEACHER') or @userSecurity.checkCreatorOfComment(#auth, #id)")
    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CommentResponse updateComment(
            @PathVariable Long id,
            @Valid @RequestBody CommentRequest request,
            Authentication auth) {
        log.info("Controller: Update comment with id: {} with body: {}", id, request);
        return commentService.update(request, id);
    }

    @PreAuthorize("hasRole('TEACHER') or @userSecurity.checkCreatorOfComment(#auth, #id)")
    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@PathVariable Long id) {
        log.info("Controller: Delete comment with id: {}", id);
        commentService.delete(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public PaginationListResponse<CommentResponse> getAllComments(
            @PathVariable Long event_id,
            @RequestParam int page,
            @RequestParam int size) {
        log.info("Controller: Get all comments for event with id: {}", event_id);
        return commentService.findAllByEventId(event_id, page, size);
    }

}

