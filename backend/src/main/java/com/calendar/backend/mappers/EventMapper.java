package com.calendar.backend.mappers;

import com.calendar.backend.dto.event.EventCreateRequest;
import com.calendar.backend.dto.event.EventFullResponse;
import com.calendar.backend.dto.event.EventListResponse;
import com.calendar.backend.models.Event;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EventMapper {
    EventFullResponse fromEventToEventResponse(Event event);

    EventListResponse fromEventToEventListResponse(Event event);

    Event fromEventRequestToEvent(EventCreateRequest eventCreateRequest);
}
