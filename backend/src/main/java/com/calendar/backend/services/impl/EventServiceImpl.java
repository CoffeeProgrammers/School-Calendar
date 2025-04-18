package com.calendar.backend.services.impl;

import com.calendar.backend.dto.event.EventCreateRequest;
import com.calendar.backend.dto.event.EventFullResponse;
import com.calendar.backend.dto.event.EventListResponse;
import com.calendar.backend.dto.event.EventUpdateRequest;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.mappers.EventMapper;
import com.calendar.backend.models.Event;
import com.calendar.backend.models.MeetingType;
import com.calendar.backend.models.Notification;
import com.calendar.backend.repositories.EventRepository;
import com.calendar.backend.repositories.specification.EventSpecification;
import com.calendar.backend.services.inter.EventService;
import com.calendar.backend.services.inter.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;
    private final EventMapper eventMapper;
    private final UserService userService;
    private final NotificationServiceImpl notificationServices;

    @Override
    public EventFullResponse create(EventCreateRequest eventCreateRequest, Authentication authentication) {
        log.info("Saving new event {}", eventCreateRequest);
        Event event = eventMapper.fromEventRequestToEvent(eventCreateRequest);
        event.setCreator(userService.findUserByAuth(authentication));
        return eventMapper.fromEventToEventResponse(eventRepository.save(event));
    }

    @Override
    public EventFullResponse update(EventUpdateRequest eventUpdateRequest, long eventId) {
        log.info("Updating event with id{}", eventId);
        Event event = eventRepository.findById(eventId).orElseThrow(
                () -> new EntityNotFoundException("Event not found"));
        event.setName(eventUpdateRequest.getName());
        event.setContent(eventUpdateRequest.getContent());
        event.setContentAvailableAnytime(eventUpdateRequest.isContentAvailableAnytime());
        event.setMeetingType(MeetingType.valueOf(eventUpdateRequest.getMeetingType()));
        event.setPlace(eventUpdateRequest.getPlace());
        notificationServices.create(new Notification(event.getUsers(),
                "Event " + event.getName() + " was updated"));
        return eventMapper.fromEventToEventResponse(event);
    }

    @Override
    public void delete(Long id) {
        log.info("Deleting event with id {}", id);
        notificationServices.create(new Notification(findByIdForServices(id).getUsers(),
                "Event " + findByIdForServices(id).getName() + " was updated"));
        eventRepository.deleteById(id);
    }

    @Override
    public EventFullResponse findById(Long id) {
        log.info("Finding event with id {}", id);
        return eventMapper.fromEventToEventResponse(findByIdForServices(id));
    }

    @Override
    public PaginationListResponse<EventListResponse> findAllByUserId(long userId,
                                                                     Map<String, Object> filters,
                                                                     int page, int size) {
        log.info("Finding all events for user with id {} and filters {}", userId, filters);
        Page<Event> events = eventRepository.findAllByUserId(userId,
                EventSpecification.filterEvents(filters), PageRequest.of(page, size,
                        Sort.by(Sort.Direction.ASC, "start_date")));
        PaginationListResponse<EventListResponse> response = new PaginationListResponse<>();
        response.setTotalPages(events.getTotalPages());
        response.setContent(events.getContent().stream().map(
                eventMapper::fromEventToEventListResponse).toList());
        return response;
    }

    @Override
    public List<EventListResponse> findAllByUserIdForCalendar(long userId,
                                                                                LocalDateTime start,
                                                                                LocalDateTime end) {
        log.info("Finding all events for user with id {} and date range {} - {}", userId, start, end);
        List<Event> events = eventRepository.findAllByUserIdAndDateRange(userId,
                start, end, Sort.by(Sort.Direction.ASC, "start_date"));
        return events.stream().map(eventMapper::fromEventToEventListResponse).toList();
    }

    @Override
    public Event findByIdForServices(long id) {
        return eventRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Event not found"));
    }
}