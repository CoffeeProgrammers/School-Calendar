package com.calendar.backend.dto;

import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.dto.wrapper.StringRequest;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class WrapperDtoTests {

    @Test
    void testPaginationListResponse() {
        PaginationListResponse<String> response1 = new PaginationListResponse<>();
        response1.setTotalPages(5);
        response1.setContent(List.of("Item1", "Item2"));

        PaginationListResponse<String> response2 = new PaginationListResponse<>();
        response2.setTotalPages(response1.getTotalPages());
        response2.setContent(response1.getContent());

        assertEquals(response1, response2);
        assertEquals(response1.toString(), response2.toString());
        assertEquals(response1.hashCode(), response2.hashCode());
    }

    @Test
    void testStringRequest() {
        StringRequest request1 = new StringRequest();
        request1.setText("Sample text");

        StringRequest request2 = new StringRequest();
        request2.setText(request1.getText());

        assertEquals(request1, request2);
        assertEquals(request1.toString(), request2.toString());
        assertEquals(request1.hashCode(), request2.hashCode());
    }
}
