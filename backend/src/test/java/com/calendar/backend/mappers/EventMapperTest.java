package com.calendar.backend.mappers;

import com.calendar.backend.TestUtil;
import com.calendar.backend.dto.event.EventCreateRequest;
import com.calendar.backend.dto.event.EventFullResponse;
import com.calendar.backend.dto.event.EventListResponse;
import com.calendar.backend.models.Event;
import com.calendar.backend.models.EventType;
import com.calendar.backend.models.MeetingType;
import com.calendar.backend.models.User;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.assertj.core.api.Assertions.assertThat;

class EventMapperTest {

    private final EventMapper eventMapper = Mappers.getMapper(EventMapper.class);

    @Test
    void fromEventToEventFullResponse_validEvent() {
        // given
        User user = TestUtil.createUser("TEACHER");
        Event event = TestUtil.createEvent("Test Event", LocalDateTime.now(), LocalDateTime.now().plusHours(1), EventType.TEACHERS_MEETING.toString(), MeetingType.ONLINE.toString(), user);

        // when
        EventFullResponse eventFullResponse = eventMapper.fromEventToEventResponse(event);

        // then
        assertThat(eventFullResponse).isNotNull();
        assertThat(eventFullResponse.getName()).isEqualTo(event.getName());
        assertThat(eventFullResponse.getStartDate()).isEqualTo(DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(event.getStartDate()));
        assertThat(eventFullResponse.getEndDate()).isEqualTo(DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(event.getEndDate()));
    }

    @Test
    void fromEventToEventFullResponse_nullEvent() {
        // given
        Event event = null;

        // when
        EventFullResponse eventFullResponse = eventMapper.fromEventToEventResponse(event);

        // then
        assertThat(eventFullResponse).isNull();
    }

    @Test
    void fromEventToEventListResponse_validEvent() {
        // given
        User user = TestUtil.createUser("TEACHER");
        Event event = TestUtil.createEvent("Test Event", LocalDateTime.now(), LocalDateTime.now().plusHours(1), EventType.TEACHERS_MEETING.toString(), MeetingType.ONLINE.toString(), user);

        // when
        EventListResponse eventListResponse = eventMapper.fromEventToEventListResponse(event);

        // then
        assertThat(eventListResponse).isNotNull();
        assertThat(eventListResponse.getName()).isEqualTo(event.getName());
        assertThat(eventListResponse.getStartDate()).isEqualTo(DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(event.getStartDate()));
    }

    @Test
    void fromEventToEventListResponse_nullEvent() {
        // given
        Event event = null;

        // when
        EventListResponse eventListResponse = eventMapper.fromEventToEventListResponse(event);

        // then
        assertThat(eventListResponse).isNull();
    }

    @Test
    void fromEventRequestToEvent_validRequest() {
        // given
        EventCreateRequest request = new EventCreateRequest();
        request.setName("New Event");
        request.setStartDate(DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(LocalDateTime.now()));
        request.setEndDate(DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(LocalDateTime.now().plusHours(1)));
        request.setType(EventType.TEACHERS_MEETING.toString());
        request.setMeetingType(MeetingType.ONLINE.toString());

        // when
        Event event = eventMapper.fromEventRequestToEvent(request);

        // then
        assertThat(event).isNotNull();
        assertThat(event.getName()).isEqualTo(request.getName());
        assertThat(event.getStartDate()).isEqualTo(request.getStartDate());
        assertThat(event.getEndDate()).isEqualTo(request.getEndDate());
        assertThat(event.getType().toString()).isEqualTo(request.getType());
        assertThat(event.getMeetingType().toString()).isEqualTo(request.getMeetingType());
    }

    @Test
    void fromEventRequestToEvent_nullRequest() {
        // given
        EventCreateRequest request = null;

        // when
        Event event = eventMapper.fromEventRequestToEvent(request);

        // then
        assertThat(event).isNull();
    }
}
