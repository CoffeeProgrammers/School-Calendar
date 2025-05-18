package com.calendar.backend.services.impl;

import com.calendar.backend.dto.event.EventCreateRequest;
import com.calendar.backend.dto.event.EventFullResponse;
import com.calendar.backend.dto.event.EventListResponse;
import com.calendar.backend.dto.event.EventUpdateRequest;
import com.calendar.backend.dto.wrapper.LongResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.mappers.EventMapper;
import com.calendar.backend.models.Event;
import com.calendar.backend.models.User;
import com.calendar.backend.models.enums.MeetingType;
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
import java.time.ZoneId;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final NotificationServiceImpl notificationServices;
    private final EventRepository eventRepository;
    private final EventMapper eventMapper;
    private final UserService userService;


    @Override
    public EventFullResponse create(EventCreateRequest eventCreateRequest, Authentication authentication) {
        log.info("Service: Saving new event {}", eventCreateRequest);

        Event event = eventMapper.fromEventRequestToEvent(eventCreateRequest);
        User user = userService.findUserByAuth(authentication);
        event.addUser(user);
        event.setCreator(user);

        return eventMapper.fromEventToEventResponse(eventRepository.save(event));
    }

    @Override
    public EventFullResponse update(EventUpdateRequest eventUpdateRequest, long eventId) {
        log.info("Service: Updating event with id{}", eventId);

        Event event = eventRepository.findById(eventId).orElseThrow(
                () -> new EntityNotFoundException("Event not found"));

        event.setName(eventUpdateRequest.getName());
        event.setContent(eventUpdateRequest.getContent());
        event.setContentAvailableAnytime(eventUpdateRequest.isContentAvailableAnytime());
        event.setMeetingType(MeetingType.valueOf(eventUpdateRequest.getMeetingType()));
        event.setPlace(eventUpdateRequest.getPlace());

        notificationServices.create(event.getUsers(), "Event " + event.getName() + " was updated");

        return eventMapper.fromEventToEventResponse(event);
    }

    @Override
    public void delete(Long id) {
        log.info("Service: Deleting event with id {}", id);

        Event event = findByIdForServices(id);
        notificationServices.create(event.getUsers(), "Event " + event.getName() + " was deleted");

        eventRepository.deleteById(id);
    }

    @Override
    public void deleteUserById(long id, long userId) {
        log.info("Service: Deleting user with id {} from event with id {}", userId, id);

        Event event = findByIdForServices(id);
        User user = userService.findByIdForServices(userId);

        notificationServices.create(List.of(user), "User " + user.getFirstName() + " " + user.getLastName()
                + " was deleted from event.");

        event.deleteUser(user);
        eventRepository.save(event);
    }

    @Override
    public EventFullResponse findById(Long id) {
        log.info("Service: Finding event with id {}", id);

        return eventMapper.fromEventToEventResponse(findByIdForServices(id));
    }

    @Override
    public PaginationListResponse<EventListResponse> findAllByUserId(
            long userId, String search, String startDate, String endDate, String typeOfEvent, int page, int size) {
        Map<String, Object> filters = createFilter(search, startDate, endDate, typeOfEvent);

        log.info("Service: Finding all events for user with id {} and filters {}", userId, filters);

        Page<Event> events = eventRepository.findAll(EventSpecification.hasUser(userId).and(EventSpecification.filterEvents(filters)), PageRequest.of(page, size,
                        Sort.by(Sort.Direction.ASC, "startDate")));

        PaginationListResponse<EventListResponse> response = new PaginationListResponse<>();
        response.setTotalPages(events.getTotalPages());
        response.setContent(events.getContent().stream().map(
                eventMapper::fromEventToEventListResponse).toList());

        return response;
    }

    @Override
    public List<EventListResponse> findAllByUserIdForCalendar(
            long userId, LocalDateTime start, LocalDateTime end) {
        log.info("Service: Finding all events for user with id {} and date range {} - {}", userId, start, end);

        List<Event> events = eventRepository.findAllByUserIdAndDateRange(userId,
                start, end, Sort.by(Sort.Direction.ASC, "start_date"));

        return events.stream().map(eventMapper::fromEventToEventListResponse).toList();
    }

    @Override
    public LongResponse countAllEventsByUserAndPast(long userId) {
        log.info("Service: Counting all events by user id {} and past", userId);

        LongResponse longResponse = new LongResponse();
        longResponse.setCount(eventRepository.countAllByUserAndPast(userId,
                LocalDateTime.now(ZoneId.of("Europe/Kiev"))));

        return longResponse;
    }

    @Override
    public List<String> findForInvitationCheck(long userId, LocalDateTime start, LocalDateTime end) {
        log.info("Service: Finding for invitation check events by user id {} and date range {} - {}",
                userId, start, end);
        return eventRepository.existWarningInvitation(userId, start, end);
    }

    @Override
    public void unsignUserAndCreatorFromAll(long userId) {
        log.info("Service: Unsigning all events for user with id {}", userId);

        List<Event> events = findAllByUserIdForServices(userId);
        for(Event event : events) {
            event.deleteUser(userService.findByIdForServices(userId));
        }

        log.info("Service: Unsigning creator for user with id {}", userId);

        List<Event> eventsCreator = findAllByCreatorIdForServices(userId);
        User deleted = userService.findByEmailForServices("!deleted-user!@deleted.com");
        for(Event event : eventsCreator) {
            event.setCreator(deleted);
        }

        eventRepository.saveAll(events);
        eventRepository.saveAll(eventsCreator);
    }

    @Override
    public Event findByIdForServices(long id) {
        log.info("Service: Finding event for service with id {}", id);

        return eventRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Event not found"));
    }

    private List<Event> findAllByUserIdForServices(long userId){
        log.info("Service: Finding all events for services by user with id {}", userId);
        return eventRepository.findAll(EventSpecification.hasUser(userId));
    }

    private List<Event> findAllByCreatorIdForServices(long creatorId){
        log.info("Service: Finding all events for services by creator with id {}", creatorId);
        return eventRepository.findAll(EventSpecification.hasCreator(creatorId));
    }

    private Map<String, Object> createFilter(String search, String startDate, String endDate, String typeOfEvent){
        log.info("Service: Creating filters for search {}, startDate {}, endDate {}, typeOfEvent {}",
                search, startDate, endDate, typeOfEvent);

        Map<String, Object> filters = new HashMap<>();
        if(search != null && !search.isBlank() && !search.equals("null")) {
            filters.put("search", search);
        }
        if(startDate != null && !startDate.isBlank() && !startDate.equals("null")) {
            filters.put("startDate", startDate);
        }
        if(endDate != null && !endDate.isBlank() && !endDate.equals("null")) {
            filters.put("endDate", endDate);
        }
        if(typeOfEvent != null && !typeOfEvent.isBlank() && !typeOfEvent.equals("null")) {
            filters.put("typeOfEvent", typeOfEvent);
        }

        return filters;
    }
}