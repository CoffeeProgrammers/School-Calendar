package com.calendar.backend.dto;

import com.calendar.backend.dto.wrapper.*;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class WrapperDtoTests {

    @Test
    void testPaginationListResponse() {
        PaginationListResponse<String> dto1 = new PaginationListResponse<>();
        dto1.setTotalPages(5);
        dto1.setContent(List.of("Item1", "Item2"));

        PaginationListResponse<String> dto2 = new PaginationListResponse<>();
        dto2.setTotalPages(dto1.getTotalPages());
        dto2.setContent(dto1.getContent());

        assertEquals(dto1, dto2);
        assertEquals(dto1.toString(), dto2.toString());
        assertEquals(dto1.hashCode(), dto2.hashCode());
    }

    @Test
    void testStringRequest() {
        StringRequest dto1 = new StringRequest();
        dto1.setText("Sample text");

        StringRequest dto2 = new StringRequest();
        dto2.setText(dto1.getText());

        assertEquals(dto1, dto2);
        assertEquals(dto1.toString(), dto2.toString());
        assertEquals(dto1.hashCode(), dto2.hashCode());
    }

    @Test
    void testCountAllTaskAndCompleted() {
        CountAllTaskAndCompleted dto1 = new CountAllTaskAndCompleted();
        dto1.setCountAll(10L);
        dto1.setCountCompleted(7L);

        CountAllTaskAndCompleted dto2 = new CountAllTaskAndCompleted();
        dto2.setCountAll(dto1.getCountAll());
        dto2.setCountCompleted(dto1.getCountCompleted());

        assertEquals(dto1, dto2);
        assertEquals(dto1.toString(), dto2.toString());
        assertEquals(dto1.hashCode(), dto2.hashCode());
    }

    @Test
    void testLongResponse() {
        LongResponse dto1 = new LongResponse();
        dto1.setCount(42L);

        LongResponse dto2 = new LongResponse();
        dto2.setCount(dto1.getCount());

        assertEquals(dto1, dto2);
        assertEquals(dto1.toString(), dto2.toString());
        assertEquals(dto1.hashCode(), dto2.hashCode());
    }

    @Test
    void testPasswordRequest() {
        PasswordRequest dto1 = new PasswordRequest();
        dto1.setOldPassword("OldPass123");
        dto1.setNewPassword("NewPass123");

        PasswordRequest dto2 = new PasswordRequest();
        dto2.setOldPassword(dto1.getOldPassword());
        dto2.setNewPassword(dto1.getNewPassword());

        assertEquals(dto1, dto2);
        assertEquals(dto1.toString(), dto2.toString());
        assertEquals(dto1.hashCode(), dto2.hashCode());
    }
}
