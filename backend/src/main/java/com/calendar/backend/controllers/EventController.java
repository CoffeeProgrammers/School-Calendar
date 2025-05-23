package com.calendar.backend.controllers;

import com.calendar.backend.dto.event.*;
import com.calendar.backend.dto.wrapper.LongResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.services.inter.EventService;
import com.calendar.backend.services.inter.TaskAssignmentService;
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
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;
    private final UserService userService;
    private final TaskService taskService;
    private final TaskAssignmentService taskAssignmentService;


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
    public void deleteUserById(@PathVariable Long id, @PathVariable(value = "user_id") Long userId, Authentication auth) {
        log.info("Controller: Delete user with id: {} from event with id: {}", userId, id);
        eventService.deleteUserById(id, userId);
        taskAssignmentService.unassignTasksFromUserByEventId(id, userId);
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
                search, startDate, endDate, typeOfEvent,
                page, size
        );
    }

    @GetMapping("/getCreatorIsMe")
    @ResponseStatus(HttpStatus.OK)
    public PaginationListResponse<EventListResponse> getMyCreatorEvents(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(required = false) String typeOfEvent,
            Authentication auth) {
        log.info("Controller: Get my(creator) events with search: {} startDate: {} endDate: {} typeOfEvent: {}",
                search, startDate, endDate, typeOfEvent);
        return eventService.findAllByCreatorId(
                auth,
                search, startDate, endDate, typeOfEvent,
                page, size
        );
    }

    @GetMapping("/users/{user_id}/between")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, List<EventCalenderResponse>> getUserEventsBetween(
            @PathVariable(value = "user_id") Long userId,
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam(required = false) Integer gap) {
        log.info("Controller: Get user events with id: {} between dates: {} and {}",
                userId, startDate, endDate);
        return eventService.findAllByUserIdForCalendar(userId,
                LocalDateTime.parse(startDate),
                LocalDateTime.parse(endDate),
                gap
        );
    }

    @GetMapping("/between")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, List<EventCalenderResponse>> getMyEventsBetween(
            @RequestParam String startDate,
            @RequestParam String endDate,
            Authentication auth,
            @RequestParam(required = false) Integer gap) {
        log.info("Controller: Get my events between dates: {} and {}", startDate, endDate);
        return eventService.findAllByUserIdForCalendar(
                userService.findUserByAuth(auth).getId(),
                LocalDateTime.parse(startDate),
                LocalDateTime.parse(endDate),
                gap
        );
    }

    @GetMapping("/count/user/{user_id}")
    @ResponseStatus(HttpStatus.OK)
    public LongResponse getCountOfEventsByUserAndPast(
            @PathVariable(value = "user_id") Long userId) {
        log.info("Controller: Get events count by user id: {}", userId);
        return eventService.countAllEventsByUserAndPast(userId);
    }
}