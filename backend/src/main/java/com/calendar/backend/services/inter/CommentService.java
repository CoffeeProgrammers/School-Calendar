package com.calendar.backend.services.inter;

import com.calendar.backend.dto.comment.CommentRequest;
import com.calendar.backend.dto.comment.CommentResponse;
import com.calendar.backend.dto.wrapper.LongResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.models.Comment;
import org.springframework.security.core.Authentication;

public interface CommentService {
    CommentResponse create(CommentRequest commentRequest, Authentication authentication,
                           long eventId);
    CommentResponse update (CommentRequest commentRequest, long id);
    void delete (long id);
    PaginationListResponse<CommentResponse> findAllByEventId(long eventId, int page, int size);
    Comment findByIdForServices(long id);
    LongResponse countAllCommentsByCreatorId(Authentication authentication);
}
