package com.calendar.backend.controllers;

import com.calendar.backend.TestUtil;
import com.calendar.backend.auth.config.JwtUtils;
import com.calendar.backend.auth.services.impl.RefreshTokenServiceImpl;
import com.calendar.backend.dto.event.EventCreateRequest;
import com.calendar.backend.dto.event.EventFullResponse;
import com.calendar.backend.dto.event.EventListResponse;
import com.calendar.backend.dto.event.EventUpdateRequest;
import com.calendar.backend.dto.user.UserListResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.models.EventType;
import com.calendar.backend.models.MeetingType;
import com.calendar.backend.models.User;
import com.calendar.backend.services.impl.EventServiceImpl;
import com.calendar.backend.services.impl.TaskServicesImpl;
import com.calendar.backend.services.impl.UserServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(EventController.class)
class EventControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private EventServiceImpl eventService;

    @MockBean
    private UserServiceImpl userService;

    @MockBean
    private JwtUtils jwtUtils;

    @MockBean
    private TaskServicesImpl taskService;

    @MockBean
    private RefreshTokenServiceImpl refreshTokenService;

    private EventCreateRequest eventCreateRequest;
    private EventFullResponse eventFullResponse;
    private EventUpdateRequest eventUpdateRequest;
    private User creator;
    private UserListResponse userListResponse;
    private EventListResponse eventListResponse;

    @BeforeEach
    void setUp() {
        eventCreateRequest = new EventCreateRequest();
        eventCreateRequest.setName("Testevent");
        eventCreateRequest.setContent("Content of the event");
        eventCreateRequest.setStartDate(DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(LocalDateTime.now()));
        eventCreateRequest.setEndDate(DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(LocalDateTime.now().plusDays(1)));
        eventCreateRequest.setMeetingType(MeetingType.OFFLINE_REAL.name());
        eventCreateRequest.setType(EventType.TEACHERS_MEETING.toString());
        eventCreateRequest.setPlace("Place");
        creator = TestUtil.createUser("TEACHER");
        userListResponse = new UserListResponse();
        userListResponse.setFirstName(creator.getFirstName());
        userListResponse.setRole(creator.getRole().toString());
        userListResponse.setId(creator.getId());
        userListResponse.setEmail(creator.getEmail());
        userListResponse.setLastName(creator.getLastName());
        eventFullResponse = new EventFullResponse();
        eventFullResponse.setId(1L);
        eventFullResponse.setName("Test Event");
        eventFullResponse.setContent("Content of the event");
        eventFullResponse.setCreator(userListResponse);
        eventUpdateRequest = new EventUpdateRequest();
        eventUpdateRequest.setName("Updated Event");
        eventUpdateRequest.setContent("Updated Content");
        eventListResponse = new EventListResponse();
        eventListResponse.setName(eventFullResponse.getName());
        eventListResponse.setPlace(eventFullResponse.getPlace());
        eventListResponse.setId(eventFullResponse.getId());
        eventListResponse.setType(eventFullResponse.getType());
        eventListResponse.setCreator(eventFullResponse.getCreator());
        eventListResponse.setEndDate(eventFullResponse.getEndDate());
        eventListResponse.setStartDate(eventFullResponse.getStartDate());
        eventListResponse.setMeetingType(eventFullResponse.getMeetingType());
    }

    @Test
    @WithMockUser("TEACHER")
    public void createEvent() throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();
        String eventJson = objectMapper.writeValueAsString(eventCreateRequest);

        when(userService.findUserByAuth(any())).thenReturn(creator);

        mvc.perform(post("/api/events/create")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(eventJson))
                .andDo(print())
                .andExpect(status().isCreated());
    }


    @Test
    @WithMockUser("TEACHER")
    void updateEvent() throws Exception {
        when(eventService.update(any(), anyLong())).thenReturn(eventFullResponse);

        MvcResult mvcResult = mvc.perform(put("/api/events/update/1")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\": \"Updated Event\", \"description\": \"Updated Description\"}"))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        String actualResponseBody = mvcResult.getResponse().getContentAsString();
        String expectedResponseBody = new ObjectMapper().writeValueAsString(eventFullResponse);

        assertThat(actualResponseBody).isEqualToIgnoringWhitespace(expectedResponseBody);
    }

    @Test
    @WithMockUser("TEACHER")
    void deleteEvent() throws Exception {
        doNothing().when(eventService).delete(anyLong());

        mvc.perform(delete("/api/events/delete/1")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isNoContent());
    }

    @Test
    @WithMockUser("TEACHER")
    void getEvent() throws Exception {
        when(eventService.findById(anyLong())).thenReturn(eventFullResponse);

        MvcResult mvcResult = mvc.perform(get("/api/events/1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        String actualResponseBody = mvcResult.getResponse().getContentAsString();
        String expectedResponseBody = new ObjectMapper().writeValueAsString(eventFullResponse);

        assertThat(actualResponseBody).isEqualToIgnoringWhitespace(expectedResponseBody);
    }

    @Test
    @WithMockUser("TEACHER")
    void getMyEvents() throws Exception {
        PaginationListResponse<EventListResponse> response = new PaginationListResponse<>();
        response.setTotalPages(1);
        response.setContent(Collections.singletonList(eventListResponse));

        Mockito.when(eventService.findAllByUserId(
                        Mockito.anyLong(), anyString(), anyString(), anyString(), anyString(), anyString(), Mockito.anyInt(), Mockito.anyInt()))
                .thenReturn(response);
        when(userService.findUserByAuth(any())).thenReturn(creator);

        mvc.perform(get("/api/events")
                        .param("page", "0")
                        .param("size", "10"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser("TEACHER")
    void getUserEventsBetween() throws Exception {
        when(eventService.findAllByUserIdForCalendar(anyLong(), any(), any())).thenReturn(List.of(new EventListResponse()));

        MvcResult mvcResult = mvc.perform(get("/api/events/users/1/between?start_date=2025-01-01T00:00:00&end_date=2025-01-31T23:59:59&gap=2"))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        String actualResponseBody = mvcResult.getResponse().getContentAsString();
        String expectedResponseBody = new ObjectMapper().writeValueAsString(List.of(new EventListResponse()));

        assertThat(actualResponseBody).isEqualToIgnoringWhitespace(expectedResponseBody);
    }

    @Test
    @WithMockUser("TEACHER")
    void getMyEventsBetween() throws Exception {
        when(eventService.findAllByUserIdForCalendar(anyLong(), any(), any())).thenReturn(List.of(new EventListResponse()));
        when(userService.findUserByAuth(any(Authentication.class)))
                .thenReturn(creator);

        MvcResult mvcResult = mvc.perform(get("/api/events/between?start_date=2025-01-01T00:00:00&end_date=2025-01-31T23:59:59"))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        String actualResponseBody = mvcResult.getResponse().getContentAsString();
        String expectedResponseBody = new ObjectMapper().writeValueAsString(List.of(new EventListResponse()));

        assertThat(actualResponseBody).isEqualToIgnoringWhitespace(expectedResponseBody);
    }
}