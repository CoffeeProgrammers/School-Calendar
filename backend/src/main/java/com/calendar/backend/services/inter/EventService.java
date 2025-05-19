package com.calendar.backend.services.inter;

import com.calendar.backend.dto.event.*;
import com.calendar.backend.dto.wrapper.LongResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.models.Event;
import org.springframework.security.core.Authentication;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface EventService {
    EventFullResponse create (EventCreateRequest eventCreateRequest, Authentication authentication);
    EventFullResponse update (EventUpdateRequest eventUpdateRequest, long eventId);
    void delete (Long id);
    void deleteUserById(long id, long userId);
    EventFullResponse findById (Long id);
    PaginationListResponse<EventListResponse> findAllByUserId
            (long userId, String search, String startDate, String endDate, String typeOfEvent, int page, int size);
    PaginationListResponse<EventListResponse> findAllByCreatorId
            (Authentication authentication, String search, String startDate, String endDate, String typeOfEvent, int page, int size);
    Map<String, List<EventCalenderResponse>> findAllByUserIdForCalendar
            (long userId, LocalDateTime start, LocalDateTime end, int gap);
    List<String> findForInvitationCheck(long userId, LocalDateTime start, LocalDateTime end);
    LongResponse countAllEventsByUserAndPast(long userId);
    void unsignUserAndCreatorFromAll(long userId);
    Event findByIdForServices(long id);
}