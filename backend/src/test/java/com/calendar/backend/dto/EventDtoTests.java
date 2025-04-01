package com.calendar.backend.dto;

import com.calendar.backend.dto.event.EventCreateRequest;
import com.calendar.backend.dto.event.EventFullResponse;
import com.calendar.backend.dto.event.EventListResponse;
import com.calendar.backend.dto.event.EventUpdateRequest;
import com.calendar.backend.dto.user.UserListResponse;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class EventDtoTests {

    @Test
    void testEventCreateRequest() {
        EventCreateRequest request1 = new EventCreateRequest();
        request1.setName("Sample Event");
        request1.setType("Meeting");
        request1.setStartDate("2024-01-01T10:00:00");
        request1.setEndDate("2024-01-01T12:00:00");
        request1.setContent("Event Content");
        request1.setContentAvailableAnytime(true);
        request1.setMeetingType("OFFLINE_REAL");
        request1.setPlace("Conference Room");

        EventCreateRequest request2 = new EventCreateRequest();
        request2.setName(request1.getName());
        request2.setType(request1.getType());
        request2.setStartDate(request1.getStartDate());
        request2.setEndDate(request1.getEndDate());
        request2.setContent(request1.getContent());
        request2.setContentAvailableAnytime(request1.isContentAvailableAnytime());
        request2.setMeetingType(request1.getMeetingType());
        request2.setPlace(request1.getPlace());

        assertEquals(request1, request2);
        assertEquals(request1.toString(), request2.toString());
        assertEquals(request1.hashCode(), request2.hashCode());
    }

    @Test
    void testEventFullResponse() {
        EventFullResponse response1 = new EventFullResponse();
        response1.setId(1L);
        response1.setName("Sample Event");
        response1.setType("Meeting");
        response1.setCreator(new UserListResponse());
        response1.setStartDate("2024-01-01T10:00:00");
        response1.setEndDate("2024-01-01T12:00:00");
        response1.setContent("Event Content");
        response1.setContentAvailableAnytime(true);
        response1.setMeetingType("OFFLINE_REAL");
        response1.setPlace("Conference Room");

        EventFullResponse response2 = new EventFullResponse();
        response2.setId(response1.getId());
        response2.setName(response1.getName());
        response2.setType(response1.getType());
        response2.setCreator(response1.getCreator());
        response2.setStartDate(response1.getStartDate());
        response2.setEndDate(response1.getEndDate());
        response2.setContent(response1.getContent());
        response2.setContentAvailableAnytime(response1.isContentAvailableAnytime());
        response2.setMeetingType(response1.getMeetingType());
        response2.setPlace(response1.getPlace());

        assertEquals(response1, response2);
        assertEquals(response1.toString(), response2.toString());
        assertEquals(response1.hashCode(), response2.hashCode());
    }

    @Test
    void testEventListResponse() {
        EventListResponse response1 = new EventListResponse();
        response1.setId(1L);
        response1.setName("Sample Event");
        response1.setType("Meeting");
        response1.setCreator(new UserListResponse());
        response1.setStartDate("2024-01-01T10:00:00");
        response1.setEndDate("2024-01-01T12:00:00");
        response1.setMeetingType("OFFLINE_REAL");
        response1.setPlace("Conference Room");

        EventListResponse response2 = new EventListResponse();
        response2.setId(response1.getId());
        response2.setName(response1.getName());
        response2.setType(response1.getType());
        response2.setCreator(response1.getCreator());
        response2.setStartDate(response1.getStartDate());
        response2.setEndDate(response1.getEndDate());
        response2.setMeetingType(response1.getMeetingType());
        response2.setPlace(response1.getPlace());

        assertEquals(response1, response2);
        assertEquals(response1.toString(), response2.toString());
        assertEquals(response1.hashCode(), response2.hashCode());
    }

    @Test
    void testEventUpdateRequest() {
        EventUpdateRequest request1 = new EventUpdateRequest();
        request1.setName("Updated Event");
        request1.setContent("Updated Content");
        request1.setContentAvailableAnytime(false);
        request1.setMeetingType("ONLINE");
        request1.setPlace("Online Platform");

        EventUpdateRequest request2 = new EventUpdateRequest();
        request2.setName(request1.getName());
        request2.setContent(request1.getContent());
        request2.setContentAvailableAnytime(request1.isContentAvailableAnytime());
        request2.setMeetingType(request1.getMeetingType());
        request2.setPlace(request1.getPlace());

        assertEquals(request1, request2);
        assertEquals(request1.toString(), request2.toString());
        assertEquals(request1.hashCode(), request2.hashCode());
    }
}
