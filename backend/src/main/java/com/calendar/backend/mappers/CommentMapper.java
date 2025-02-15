package com.calendar.backend.mappers;

import com.calendar.backend.dto.comment.CommentRequest;
import com.calendar.backend.dto.comment.CommentResponse;
import com.calendar.backend.models.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    CommentResponse fromCommentToCommentResponse(Comment comment);

    Comment fromCommentRequestToComment(CommentRequest commentRequest);
}
