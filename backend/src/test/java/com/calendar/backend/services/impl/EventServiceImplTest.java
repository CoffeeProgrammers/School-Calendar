package com.calendar.backend.services.impl;

import com.calendar.backend.TestUtil;
import com.calendar.backend.dto.event.EventCreateRequest;
import com.calendar.backend.dto.event.EventFullResponse;
import com.calendar.backend.dto.event.EventListResponse;
import com.calendar.backend.dto.event.EventUpdateRequest;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.mappers.EventMapper;
import com.calendar.backend.models.Event;
import com.calendar.backend.models.Notification;
import com.calendar.backend.models.User;
import com.calendar.backend.repositories.EventRepository;
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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EventServiceImplTest {

    @Mock
    private EventRepository eventRepository;
    @Mock
    private EventMapper eventMapper;
    @Mock
    private UserService userService;
    @Mock
    private NotificationServiceImpl notificationService;

    @InjectMocks
    private EventServiceImpl eventService;

    private User user;
    private Event event;

    @BeforeEach
    void setUp() {
        user = TestUtil.createUser("TEACHER");
        event = TestUtil.createEvent("Sample Event");
    }

    @Test
    void create_success() {
        EventCreateRequest eventCreateRequest = new EventCreateRequest();
        eventCreateRequest.setName("New Event");
        eventCreateRequest.setContent("Event Content");
        eventCreateRequest.setPlace("Event Place");
        eventCreateRequest.setMeetingType("ONLINE");
        eventCreateRequest.setContentAvailableAnytime(true);

        when(userService.findUserByAuth(any())).thenReturn(user);
        when(eventMapper.fromEventRequestToEvent(any(EventCreateRequest.class))).thenReturn(event);
        when(eventRepository.save(any(Event.class))).thenReturn(event);
        when(eventMapper.fromEventToEventResponse(any(Event.class))).thenReturn(new EventFullResponse());

        EventFullResponse result = eventService.create(eventCreateRequest, mock(Authentication.class));

        assertNotNull(result);
        verify(eventRepository).save(any(Event.class));
    }

    @Test
    void update_success() {
        EventUpdateRequest eventUpdateRequest = new EventUpdateRequest();
        eventUpdateRequest.setName("Updated Event");
        eventUpdateRequest.setContent("Updated Content");
        eventUpdateRequest.setPlace("Updated Place");
        eventUpdateRequest.setMeetingType("ONLINE");
        eventUpdateRequest.setContentAvailableAnytime(false);

        when(eventRepository.findById(anyLong())).thenReturn(Optional.of(event));
        when(eventMapper.fromEventToEventResponse(any(Event.class))).thenReturn(new EventFullResponse());

        EventFullResponse result = eventService.update(eventUpdateRequest, 1L);

        assertEquals("Updated Event", event.getName());
        assertNotNull(result);
    }

    @Test
    void update_notFound() {
        EventUpdateRequest eventUpdateRequest = new EventUpdateRequest();
        eventUpdateRequest.setName("Updated Event");

        when(eventRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> eventService.update(eventUpdateRequest, 1L));
    }

    @Test
    void delete_success() {
        when(eventRepository.findById(anyLong())).thenReturn(Optional.of(event));

        eventService.delete(1L);

        verify(notificationService).create(any(Notification.class));
        verify(eventRepository).deleteById(1L);
    }

    @Test
    void delete_notFound() {
        when(eventRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> eventService.delete(1L));
    }

    @Test
    void findById_success() {
        when(eventRepository.findById(anyLong())).thenReturn(Optional.of(event));
        when(eventMapper.fromEventToEventResponse(any(Event.class))).thenReturn(new EventFullResponse());

        EventFullResponse result = eventService.findById(1L);

        assertNotNull(result);
    }

    @Test
    void findById_notFound() {
        when(eventRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> eventService.findById(1L));
    }

    @Test
    void findAllByUserId_success() {
        long userId = 1L;
        Page<Event> page = new PageImpl<>(List.of(event));

        when(eventRepository.findAll(any(Specification.class), any(PageRequest.class))).thenReturn(page);
        when(eventMapper.fromEventToEventListResponse(any(Event.class))).thenReturn(new EventListResponse());

        PaginationListResponse<EventListResponse> result = eventService.findAllByUserId(userId, "", "", "", "","", 0, 10);

        assertEquals(1, result.getContent().size());
        assertEquals(1, result.getTotalPages());
    }

    @Test
    void findAllByUserIdForCalendar_success() {
        long userId = 1L;
        LocalDateTime start = LocalDateTime.now().minusDays(1);
        LocalDateTime end = LocalDateTime.now().plusDays(1);
        List<Event> events = List.of(event);

        when(eventRepository.findAllByUserIdAndDateRange(eq(userId), eq(start), eq(end), any(Sort.class)))
                .thenReturn(events);
        when(eventMapper.fromEventToEventListResponse(any(Event.class))).thenReturn(new EventListResponse());

        List<EventListResponse> result = eventService.findAllByUserIdForCalendar(userId, start, end);

        assertEquals(1, result.size());
    }
}
