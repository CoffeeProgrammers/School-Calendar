package com.calendar.backend.dto;

import com.calendar.backend.dto.user.UserCreateRequest;
import com.calendar.backend.dto.user.UserFullResponse;
import com.calendar.backend.dto.user.UserListResponse;
import com.calendar.backend.dto.user.UserUpdateRequest;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class UserDtoTests {

    @Test
    void testUserCreateRequest() {
        UserCreateRequest request1 = new UserCreateRequest();
        request1.setEmail("test@example.com");
        request1.setPassword("Password1");
        request1.setRole("USER");
        request1.setFirstName("John");
        request1.setLastName("Doe");
        request1.setBirthday("2000-01-01T10:00:00");

        UserCreateRequest request2 = new UserCreateRequest();
        request2.setEmail(request1.getEmail());
        request2.setPassword(request1.getPassword());
        request2.setRole(request1.getRole());
        request2.setFirstName(request1.getFirstName());
        request2.setLastName(request1.getLastName());
        request2.setBirthday(request1.getBirthday());

        assertEquals(request1, request2);
        assertEquals(request1.toString(), request2.toString());
        assertEquals(request1.hashCode(), request2.hashCode());
    }

    @Test
    void testUserFullResponse() {
        UserFullResponse response1 = new UserFullResponse();
        response1.setId(1L);
        response1.setEmail("test@example.com");
        response1.setRole("USER");
        response1.setFirstName("John");
        response1.setLastName("Doe");
        response1.setDescription("Description");
        response1.setBirthday("2000-01-01T10:00:00");

        UserFullResponse response2 = new UserFullResponse();
        response2.setId(response1.getId());
        response2.setEmail(response1.getEmail());
        response2.setRole(response1.getRole());
        response2.setFirstName(response1.getFirstName());
        response2.setLastName(response1.getLastName());
        response2.setDescription(response1.getDescription());
        response2.setBirthday(response1.getBirthday());

        assertEquals(response1, response2);
        assertEquals(response1.toString(), response2.toString());
        assertEquals(response1.hashCode(), response2.hashCode());
    }

    @Test
    void testUserListResponse() {
        UserListResponse response1 = new UserListResponse();
        response1.setId(1L);
        response1.setEmail("test@example.com");
        response1.setRole("USER");
        response1.setFirstName("John");
        response1.setLastName("Doe");

        UserListResponse response2 = new UserListResponse();
        response2.setId(response1.getId());
        response2.setEmail(response1.getEmail());
        response2.setRole(response1.getRole());
        response2.setFirstName(response1.getFirstName());
        response2.setLastName(response1.getLastName());

        assertEquals(response1, response2);
        assertEquals(response1.toString(), response2.toString());
        assertEquals(response1.hashCode(), response2.hashCode());
    }

    @Test
    void testUserUpdateRequest() {
        UserUpdateRequest request1 = new UserUpdateRequest();
        request1.setPassword("Password1");
        request1.setRole("USER");
        request1.setFirstName("John");
        request1.setLastName("Doe");
        request1.setBirthday("2000-01-01T10:00:00");
        request1.setDescription("Description");

        UserUpdateRequest request2 = new UserUpdateRequest();
        request2.setPassword(request1.getPassword());
        request2.setRole(request1.getRole());
        request2.setFirstName(request1.getFirstName());
        request2.setLastName(request1.getLastName());
        request2.setBirthday(request1.getBirthday());
        request2.setDescription(request1.getDescription());

        assertEquals(request1, request2);
        assertEquals(request1.toString(), request2.toString());
        assertEquals(request1.hashCode(), request2.hashCode());
    }
}
