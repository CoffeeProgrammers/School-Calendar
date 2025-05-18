package com.calendar.backend.controllers;

import com.calendar.backend.dto.event.EventCreateRequest;
import com.calendar.backend.dto.event.EventFullResponse;
import com.calendar.backend.dto.event.EventListResponse;
import com.calendar.backend.dto.event.EventUpdateRequest;
import com.calendar.backend.dto.wrapper.LongResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.services.inter.EventService;
import com.calendar.backend.services.inter.TaskService;
import com.calendar.backend.services.inter.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;
    private final UserService userService;
    private final TaskService taskService;


    @PreAuthorize("hasAnyRole('TEACHER', 'STUDENT')")
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public EventFullResponse createEvent(
            @Valid @RequestBody EventCreateRequest request,
            Authentication auth) {
        log.info("Controller: Create event with body: {}", request);
        return eventService.create(request, auth);
    }

    @PreAuthorize("hasRole('TEACHER') or @userSecurity.checkCreatorOfEvent(#auth, #id)")
    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public EventFullResponse updateEvent(
            @PathVariable Long id,
            @Valid @RequestBody EventUpdateRequest request,
            Authentication auth) {
        log.info("Controller: Update event with id: {} with body: {}", id, request);
        return eventService.update(request, id);
    }

    @PreAuthorize("hasRole('TEACHER') or @userSecurity.checkCreatorOfEvent(#auth, #id)")
    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEvent(@PathVariable Long id, Authentication auth) {
        log.info("Controller: Delete event with id: {}", id);
        taskService.unsignAllFromEvent(id);
        eventService.delete(id);
    }

    @PreAuthorize("hasRole('TEACHER') or @userSecurity.checkCreatorOfEvent(#auth, #id)")
    @PutMapping("/delete/{id}/user/{user_id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUserById(@PathVariable Long id, @PathVariable Long user_id, Authentication auth) {
        log.info("Controller: Delete user with id: {} from event with id: {}", user_id, id);
        eventService.deleteUserById(id, user_id);
    }


    @PreAuthorize("hasRole('TEACHER') or @userSecurity.checkUserOfEvent(#auth, #id)")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public EventFullResponse getEvent(@PathVariable Long id, Authentication auth) {
        log.info("Controller: Get event with id: {}", id);
        return eventService.findById(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public PaginationListResponse<EventListResponse> getMyEvents(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(required = false) String typeOfEvent,
            Authentication auth) {
        log.info("Controller: Get my events with search: {} startDate: {} endDate: {} typeOfEvent: {}",
                search, startDate, endDate, typeOfEvent);
        return eventService.findAllByUserId(
                userService.findUserByAuth(auth).getId(),
                search,
                startDate,
                endDate,
                typeOfEvent,
                page,
                size
        );
    }

    @GetMapping("/users/{user_id}/between")
    @ResponseStatus(HttpStatus.OK)
    public List<EventListResponse> getUserEventsBetween(
            @PathVariable(value = "user_id") Long userId,
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam(required = false) Integer gap) {
        log.info("Controller: Get user events with id: {} between dates: {} and {}",
                userId, startDate, endDate);
        return eventService.findAllByUserIdForCalendar(userId,
                LocalDateTime.parse(startDate).minusDays(gap),
                LocalDateTime.parse(endDate).plusDays(gap)
        );
    }

    @GetMapping("/between")
    @ResponseStatus(HttpStatus.OK)
    public List<EventListResponse> getMyEventsBetween(
            @RequestParam String startDate,
            @RequestParam String endDate,
            Authentication auth,
            @RequestParam(required = false) Integer gap) {
        log.info("Controller: Get my events between dates: {} and {}", startDate, endDate);
        return eventService.findAllByUserIdForCalendar(
                userService.findUserByAuth(auth).getId(),
                LocalDateTime.parse(startDate).minusDays(gap),
                LocalDateTime.parse(endDate).plusDays(gap)
        );
    }

    @GetMapping("/count/user/{user_id}")
    @ResponseStatus(HttpStatus.OK)
    public LongResponse getEventsByUserAndPast(
            @PathVariable(value = "user_id") Long userId) {
        log.info("Controller: Get events count by user id: {}", userId);
        return eventService.countAllEventsByUserAndPast(userId);
    }
}