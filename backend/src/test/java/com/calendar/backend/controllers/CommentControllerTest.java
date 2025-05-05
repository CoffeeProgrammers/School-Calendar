package com.calendar.backend.controllers;

import com.calendar.backend.TestUtil;
import com.calendar.backend.auth.config.JwtUtils;
import com.calendar.backend.auth.services.impl.RefreshTokenServiceImpl;
import com.calendar.backend.dto.comment.CommentRequest;
import com.calendar.backend.dto.comment.CommentResponse;
import com.calendar.backend.dto.user.UserListResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.models.User;
import com.calendar.backend.services.impl.UserServiceImpl;
import com.calendar.backend.services.inter.CommentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CommentController.class)
class CommentControllerTest{

    @Autowired
    private MockMvc mvc;

    @MockBean
    private RefreshTokenServiceImpl refreshTokenService;

    @MockBean
    private CommentService commentService;
    @MockBean
    private JwtUtils jwtUtils;
    @MockBean
    private UserServiceImpl userService;

    private CommentRequest commentRequest;
    private CommentResponse commentResponse;
    private User creator;
    private UserListResponse creatorResponse;

    @BeforeEach
    void setUp() {
        commentRequest = new CommentRequest();
        commentRequest.setText("This is a comment");
        creator = TestUtil.createUser("TEACHER");
        creatorResponse = new UserListResponse();
        creatorResponse.setEmail(creator.getEmail());
        creatorResponse.setRole(creator.getRole().toString());
        creatorResponse.setId(creator.getId());
        creatorResponse.setLastName(creator.getLastName());
        creatorResponse.setFirstName(creator.getFirstName());
        commentResponse = new CommentResponse();
        commentResponse.setText("This is a comment");
        commentResponse.setId(1L);
        commentResponse.setCreator(creatorResponse);
    }

    @Test
    @WithMockUser("TEACHER")
    void createComment() throws Exception {
        when(commentService.create(any(), any(), anyLong())).thenReturn(commentResponse);

        MvcResult mvcResult = mvc.perform(post("/api/events/1/comments/create")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"text\": \"This is a comment\"}"))
                .andDo(print())
                .andExpect(status().isCreated())
                .andReturn();

        String actualResponseBody = mvcResult.getResponse().getContentAsString();
        String expectedResponseBody = new ObjectMapper().writeValueAsString(commentResponse);

        assertThat(actualResponseBody).isEqualToIgnoringWhitespace(expectedResponseBody);
    }

    @Test
    @WithMockUser("TEACHER")
    void updateComment() throws Exception {
        when(commentService.update(any(), anyLong())).thenReturn(commentResponse);

        MvcResult mvcResult = mvc.perform(put("/api/events/1/comments/update/1")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"text\": \"Updated comment\"}"))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        String actualResponseBody = mvcResult.getResponse().getContentAsString();
        String expectedResponseBody = new ObjectMapper().writeValueAsString(commentResponse);

        assertThat(actualResponseBody).isEqualToIgnoringWhitespace(expectedResponseBody);
    }

    @Test
    @WithMockUser("TEACHER")
    void deleteComment() throws Exception {
        doNothing().when(commentService).delete(anyLong());

        mvc.perform(delete("/api/events/1/comments/delete/1")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isNoContent());
    }

    @Test
    @WithMockUser("STUDENT")
    void getAllComments() throws Exception {
        PaginationListResponse<CommentResponse> paginationResponse = new PaginationListResponse<>();
        paginationResponse.setContent(List.of(commentResponse));
        paginationResponse.setTotalPages(1);

        when(commentService.findAllByEventId(anyLong(), anyInt(), anyInt())).thenReturn(paginationResponse);

        MvcResult mvcResult = mvc.perform(get("/api/events/1/comments?page=0&size=10"))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        String actualResponseBody = mvcResult.getResponse().getContentAsString();
        String expectedResponseBody = new ObjectMapper().writeValueAsString(paginationResponse);

        assertThat(actualResponseBody).isEqualToIgnoringWhitespace(expectedResponseBody);
    }
}
