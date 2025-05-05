package com.calendar.backend.mappers;

import com.calendar.backend.TestUtil;
import com.calendar.backend.dto.comment.CommentRequest;
import com.calendar.backend.dto.comment.CommentResponse;
import com.calendar.backend.models.Comment;
import com.calendar.backend.models.Event;
import com.calendar.backend.models.User;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

class CommentMapperTest {

    private final CommentMapper commentMapper = Mappers.getMapper(CommentMapper.class);

    @Test
    void fromCommentToCommentResponse_validComment() {
        // given
        User user = TestUtil.createUser("TEACHER");
        Event event = TestUtil.createEvent("Test Event", user);
        Comment comment = TestUtil.createComment("Test comment", LocalDateTime.now(), user, event);

        // when
        CommentResponse response = commentMapper.fromCommentToCommentResponse(comment);

        // then
        assertThat(response).isNotNull();
        assertThat(response.getId()).isEqualTo(comment.getId());
        assertThat(response.getText()).isEqualTo(comment.getText());
        assertThat(response.getCreator()).isNotNull();
    }

    @Test
    void fromCommentToCommentResponse_nullComment() {
        // given
        Comment comment = null;

        // when
        CommentResponse response = commentMapper.fromCommentToCommentResponse(comment);

        // then
        assertThat(response).isNull();
    }

    @Test
    void fromCommentRequestToComment_validRequest() {
        // given
        CommentRequest request = new CommentRequest();
        request.setText("Sample comment text");

        // when
        Comment comment = commentMapper.fromCommentRequestToComment(request);

        // then
        assertThat(comment).isNotNull();
        assertThat(comment.getText()).isEqualTo(request.getText());
    }

    @Test
    void fromCommentRequestToComment_nullRequest() {
        // given
        CommentRequest request = null;

        // when
        Comment comment = commentMapper.fromCommentRequestToComment(request);

        // then
        assertThat(comment).isNull();
    }
}
