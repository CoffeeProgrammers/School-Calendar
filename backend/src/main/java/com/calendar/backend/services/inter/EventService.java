package com.calendar.backend.services.inter;

import com.calendar.backend.dto.event.EventCreateRequest;
import com.calendar.backend.dto.event.EventFullResponse;
import com.calendar.backend.dto.event.EventListResponse;
import com.calendar.backend.dto.event.EventUpdateRequest;
import com.calendar.backend.dto.wrapper.LongResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.models.Event;
import org.springframework.security.core.Authentication;

import java.time.LocalDateTime;
import java.util.List;

public interface EventService {
    EventFullResponse create (EventCreateRequest eventCreateRequest, Authentication authentication);
    EventFullResponse update (EventUpdateRequest eventUpdateRequest, long eventId);
    void delete (Long id);
    EventFullResponse findById (Long id);
    PaginationListResponse<EventListResponse> findAllByUserId
            (long userId, String search, String startDate, String endDate,
             String typeOfEvent, int page, int size);
    List<EventListResponse> findAllByUserIdForCalendar
            (long userId, LocalDateTime start, LocalDateTime end);
    Event findByIdForServices(long id);
    void deleteUserById(long id, long userId);
    LongResponse countAllEventsByUserAndPast(long userId);
}