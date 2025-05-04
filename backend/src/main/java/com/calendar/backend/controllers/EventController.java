package com.calendar.backend.controllers;

import com.calendar.backend.dto.event.EventCreateRequest;
import com.calendar.backend.dto.event.EventFullResponse;
import com.calendar.backend.dto.event.EventListResponse;
import com.calendar.backend.dto.event.EventUpdateRequest;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.services.inter.EventService;
import com.calendar.backend.services.inter.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;
    private final UserService userService;

    @PreAuthorize("hasAnyRole('TEACHER', 'STUDENT')")
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public EventFullResponse createEvent(
            @Valid @RequestBody EventCreateRequest request,
            Authentication auth) {
        return eventService.create(request, auth);
    }

    @PreAuthorize("hasRole('TEACHER') or @userSecurity.checkCreatorOfEvent(#auth, #id)")
    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public EventFullResponse updateEvent(
            @PathVariable Long id,
            @Valid @RequestBody EventUpdateRequest request,
            Authentication auth) {
        return eventService.update(request, id);
    }

    @PreAuthorize("hasRole('TEACHER') or @userSecurity.checkCreatorOfEvent(#auth, #id)")
    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEvent(@PathVariable Long id, Authentication auth) {
        eventService.delete(id);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public EventFullResponse getEvent(@PathVariable Long id) {
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
            @RequestParam(required = false) String isPast,
            @RequestParam(required = false) String typeOfEvent,
            Authentication auth) {
        return eventService.findAllByUserId(
                userService.findUserByAuth(auth).getId(),
                search,
                startDate,
                endDate,
                isPast,
                typeOfEvent,
                page,
                size
        );
    }

    @GetMapping("/users/{user_id}/between")
    @ResponseStatus(HttpStatus.OK)
    public List<EventListResponse> getUserEventsBetween(
            @PathVariable Long user_id,
            @RequestParam String start_date,
            @RequestParam String end_date,
            @RequestParam(required = false) Integer gap) {
        return eventService.findAllByUserIdForCalendar(user_id,
                LocalDateTime.parse(start_date).minusDays(gap),
                LocalDateTime.parse(end_date).plusDays(gap)
        );
    }

    @GetMapping("/between")
    @ResponseStatus(HttpStatus.OK)
    public List<EventListResponse> getMyEventsBetween(
            @RequestParam String start_date,
            @RequestParam String end_date,
            Authentication auth) {
        return eventService.findAllByUserIdForCalendar(
                userService.findUserByAuth(auth).getId(),
                LocalDateTime.parse(start_date),
                LocalDateTime.parse(end_date)
        );
    }

}
