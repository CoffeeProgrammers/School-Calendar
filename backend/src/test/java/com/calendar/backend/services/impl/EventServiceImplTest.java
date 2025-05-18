//package com.calendar.backend.services.impl;
//
//import com.calendar.backend.TestUtil;
//import com.calendar.backend.dto.event.EventCreateRequest;
//import com.calendar.backend.dto.event.EventFullResponse;
//import com.calendar.backend.dto.event.EventListResponse;
//import com.calendar.backend.dto.event.EventUpdateRequest;
//import com.calendar.backend.dto.wrapper.LongResponse;
//import com.calendar.backend.dto.wrapper.PaginationListResponse;
//import com.calendar.backend.mappers.EventMapper;
//import com.calendar.backend.models.Event;
//import com.calendar.backend.models.User;
//import com.calendar.backend.models.enums.EventType;
//import com.calendar.backend.repositories.EventRepository;
//import com.calendar.backend.services.inter.UserService;
//import jakarta.persistence.EntityNotFoundException;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageImpl;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Sort;
//import org.springframework.data.jpa.domain.Specification;
//import org.springframework.security.core.Authentication;
//
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.ArgumentMatchers.*;
//import static org.mockito.Mockito.*;
//
//@ExtendWith(MockitoExtension.class)
//class EventServiceImplTest {
//
//    @Mock
//    private EventRepository eventRepository;
//    @Mock
//    private EventMapper eventMapper;
//    @Mock
//    private UserService userService;
//    @Mock
//    private NotificationServiceImpl notificationService;
//
//    @InjectMocks
//    private EventServiceImpl eventService;
//
//    private User user;
//    private User student;
//    private Event event;
//
//    @BeforeEach
//    void setUp() {
//        user = TestUtil.createUser("TEACHER");
//
//        student = TestUtil.createUser("STUDENT");
//        event = TestUtil.createEvent("Sample Event", student);
//        user.setEvents(new ArrayList<>(List.of(
//                TestUtil.createEvent("Sample Event", student),
//                TestUtil.createEvent("Sample Event", student),
//                TestUtil.createEvent("Sample Event", student),
//                TestUtil.createEvent("Sample Event", student),
//                event)));
//    }
//
//    @Test
//    void create_success() {
//        EventCreateRequest eventCreateRequest = new EventCreateRequest();
//        eventCreateRequest.setName("New Event");
//        eventCreateRequest.setContent("Event Content");
//        eventCreateRequest.setPlace("Event Place");
//        eventCreateRequest.setMeetingType("ONLINE");
//        eventCreateRequest.setContentAvailableAnytime(true);
//
//        when(userService.findUserByAuth(any())).thenReturn(user);
//        when(eventMapper.fromEventRequestToEvent(any(EventCreateRequest.class))).thenReturn(event);
//        when(eventRepository.save(any(Event.class))).thenReturn(event);
//        when(eventMapper.fromEventToEventResponse(any(Event.class))).thenReturn(new EventFullResponse());
//
//        EventFullResponse result = eventService.create(eventCreateRequest, mock(Authentication.class));
//
//        assertNotNull(result);
//        verify(eventRepository).save(any(Event.class));
//    }
//
//    @Test
//    void update_success() {
//        EventUpdateRequest eventUpdateRequest = new EventUpdateRequest();
//        eventUpdateRequest.setName("Updated Event");
//        eventUpdateRequest.setContent("Updated Content");
//        eventUpdateRequest.setPlace("Updated Place");
//        eventUpdateRequest.setMeetingType("ONLINE");
//        eventUpdateRequest.setContentAvailableAnytime(false);
//
//        when(eventRepository.findById(anyLong())).thenReturn(Optional.of(event));
//        when(eventMapper.fromEventToEventResponse(any(Event.class))).thenReturn(new EventFullResponse());
//
//        EventFullResponse result = eventService.update(eventUpdateRequest, 1L);
//
//        assertEquals("Updated Event", event.getName());
//        assertNotNull(result);
//    }
//
//    @Test
//    void update_notFound() {
//        EventUpdateRequest eventUpdateRequest = new EventUpdateRequest();
//        eventUpdateRequest.setName("Updated Event");
//
//        when(eventRepository.findById(anyLong())).thenReturn(Optional.empty());
//
//        assertThrows(EntityNotFoundException.class, () -> eventService.update(eventUpdateRequest, 1L));
//    }
//
//    @Test
//    void delete_success() {
//        when(eventRepository.findById(anyLong())).thenReturn(Optional.of(event));
//
//        eventService.delete(event.getId());
//
//        verify(notificationService).create(any(), anyString());
//        verify(eventRepository).deleteById(event.getId());
//    }
//
//    @Test
//    void delete_notFound() {
//        when(eventRepository.findById(anyLong())).thenReturn(Optional.empty());
//
//        assertThrows(EntityNotFoundException.class, () -> eventService.delete(1L));
//    }
//
//    @Test
//    public void deleteUserById_success() {
//        when(eventRepository.findById(anyLong())).thenReturn(Optional.of(event));
//        when(userService.findByIdForServices(anyLong())).thenReturn(student);
//
//        eventService.deleteUserById(event.getId(), student.getId());
//
//        verify(notificationService).create(any(), anyString());
//        verify(eventRepository).findById(event.getId());
//        verify(userService).findByIdForServices(student.getId());
//    }
//
//    @Test
//    public void deleteUserById_notFoundEvent() {
//        when(eventRepository.findById(anyLong())).thenReturn(Optional.empty());
//
//        assertThrows(EntityNotFoundException.class, () -> eventService.deleteUserById(event.getId(), student.getId()));
//
//        verify(notificationService, times(0)).create(any(), anyString());
//        verify(userService, times(0)).findByIdForServices(student.getId());
//    }
//
//
//    @Test
//    void findById_success() {
//        when(eventRepository.findById(anyLong())).thenReturn(Optional.of(event));
//        when(eventMapper.fromEventToEventResponse(any(Event.class))).thenReturn(new EventFullResponse());
//
//        EventFullResponse result = eventService.findById(1L);
//
//        assertNotNull(result);
//    }
//
//    @Test
//    void findById_notFound() {
//        when(eventRepository.findById(anyLong())).thenReturn(Optional.empty());
//
//        assertThrows(EntityNotFoundException.class, () -> eventService.findById(1L));
//    }
//
//    @Test
//    void findAllByUserId_success() {
//        long userId = 1L;
//        Page<Event> page = new PageImpl<>(List.of(event));
//
//        when(eventRepository.findAll(any(Specification.class), any(PageRequest.class))).thenReturn(page);
//        when(eventMapper.fromEventToEventListResponse(any(Event.class))).thenReturn(new EventListResponse());
//
//        Event first = user.getEvents().get(0);
//        first.setStartDate(LocalDateTime.now().minusDays(1));
//        first.setEndDate(LocalDateTime.now().plusDays(1));
//        first.setType(EventType.TEST);
//        PaginationListResponse<EventListResponse> result = eventService.findAllByUserId(userId, first.getName(),first.getStartDate().toString(), first.getEndDate().toString(), first.getType().toString(), 0, 10);
//
//        assertEquals(1, result.getContent().size());
//        assertEquals(1, result.getTotalPages());
//    }
//
//    @Test
//    void findAllByUserId_successFiltersBlank() {
//        long userId = 1L;
//        Page<Event> page = new PageImpl<>(List.of(event));
//
//        when(eventRepository.findAll(any(Specification.class), any(PageRequest.class))).thenReturn(page);
//        when(eventMapper.fromEventToEventListResponse(any(Event.class))).thenReturn(new EventListResponse());
//
//        PaginationListResponse<EventListResponse> result = eventService.findAllByUserId(userId, "","","","", 0, 10);
//
//        assertEquals(1, result.getContent().size());
//        assertEquals(1, result.getTotalPages());
//    }
//
//    @Test
//    void filtersNullStringCheck() {
//        long userId = 1L;
//        Page<Event> page = new PageImpl<>(List.of(event));
//
//        when(eventRepository.findAll(any(Specification.class), any(PageRequest.class))).thenReturn(page);
//        when(eventMapper.fromEventToEventListResponse(any(Event.class))).thenReturn(new EventListResponse());
//
//        PaginationListResponse<EventListResponse> result = eventService.findAllByUserId(userId, "null", "null", "null", "null", 0, 10);
//
//        assertEquals(1, result.getContent().size());
//        assertEquals(1, result.getTotalPages());
//    }
//
//    @Test
//    void filtersNullCheck() {
//        long userId = 1L;
//        Page<Event> page = new PageImpl<>(List.of(event));
//
//        when(eventRepository.findAll(any(Specification.class), any(PageRequest.class))).thenReturn(page);
//        when(eventMapper.fromEventToEventListResponse(any(Event.class))).thenReturn(new EventListResponse());
//
//        PaginationListResponse<EventListResponse> result = eventService.findAllByUserId(userId, null, null, null, null, 0, 10);
//
//        assertEquals(1, result.getContent().size());
//        assertEquals(1, result.getTotalPages());
//    }
//
//    @Test
//    void findAllByUserIdForCalendar_success() {
//        long userId = 1L;
//        LocalDateTime start = LocalDateTime.now().minusDays(1);
//        LocalDateTime end = LocalDateTime.now().plusDays(1);
//        List<Event> events = List.of(event);
//
//        when(eventRepository.findAllByUserIdAndDateRange(eq(userId), eq(start), eq(end), any(Sort.class)))
//                .thenReturn(events);
//        when(eventMapper.fromEventToEventListResponse(any(Event.class))).thenReturn(new EventListResponse());
//
//        List<EventListResponse> result = eventService.findAllByUserIdForCalendar(userId, start, end);
//
//        assertEquals(1, result.size());
//    }
//
//    @Test
//    void countAllEventsByUserAndPast_success() {
//        long count = user.getEvents().stream().filter(e -> e.getEndDate().isBefore(LocalDateTime.now())).count();
//        when(eventRepository.countAllByUserAndPast(eq(user.getId()), any())).thenReturn(count);
//        System.out.println(user.getEvents());
//        System.out.println(count);
//        LongResponse longResponse = eventService.countAllEventsByUserAndPast(user.getId());
//
//        assertEquals(count, longResponse.getCount());
//        verify(eventRepository, times(1)).countAllByUserAndPast(eq(user.getId()), any());
//    }
//
//    @Test
//    void findForInvitationCheck_success() {
//        LocalDateTime start = LocalDateTime.now().minusDays(1);
//        LocalDateTime end = LocalDateTime.now().plusDays(1);
//        List<String> warnings = List.of("Warning1", "Warning2");
//
//        when(eventRepository.existWarningInvitation(user.getId(), start, end)).thenReturn(warnings);
//
//        List<String> result = eventService.findForInvitationCheck(user.getId(), start, end);
//
//        assertEquals(2, result.size());
//        assertEquals("Warning1", result.get(0));
//        verify(eventRepository).existWarningInvitation(user.getId(), start, end);
//    }
//
//    @Test
//    void unsignUserAndCreatorFromAll() {
//        when(eventRepository.findAll(any(Specification.class))).thenReturn(user.getEvents());
//        when(userService.findByEmailForServices("!deleted-user!@deleted.com")).thenReturn(new User());
//
//        eventService.unsignUserAndCreatorFromAll(user.getId());
//
//        verify(eventRepository, times(2)).saveAll(any());
//    }
//
//    @Test
//    void findAllByCreatorId_success() {
//        Authentication auth = mock(Authentication.class);
//        Page<Event> page = new PageImpl<>(List.of(event));
//
//        event.setStartDate(LocalDateTime.now().minusDays(3));
//        event.setEndDate(LocalDateTime.now().plusDays(3));
//        event.setType(EventType.TEST);
//        when(userService.findUserByAuth(auth)).thenReturn(user);
//        when(eventRepository.findAll(any(Specification.class), any(PageRequest.class))).thenReturn(page);
//        when(eventMapper.fromEventToEventListResponse(any(Event.class))).thenReturn(new EventListResponse());
//
//        PaginationListResponse<EventListResponse> result = eventService.findAllByCreatorId(
//                auth,
//                "Sample Event",
//                event.getStartDate().toString(),
//                event.getEndDate().toString(),
//                event.getType().toString(),
//                0,
//                10
//        );
//
//        assertEquals(1, result.getContent().size());
//        assertEquals(1, result.getTotalPages());
//        verify(userService).findUserByAuth(auth);
//        verify(eventRepository).findAll(any(Specification.class), any(PageRequest.class));
//    }
//
//}
