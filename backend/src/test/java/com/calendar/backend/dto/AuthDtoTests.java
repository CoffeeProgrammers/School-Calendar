package com.calendar.backend.dto;

import com.calendar.backend.auth.dto.AuthResponse;
import com.calendar.backend.auth.dto.LogInRequest;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class AuthDtoTests {

    @Test
    void testAuthResponse() {
        AuthResponse response1 = new AuthResponse();
        response1.setId(1L);
        response1.setUsername("user@example.com");
        response1.setAccessToken("token123");
        response1.setRole("USER");

        AuthResponse response2 = new AuthResponse();
        response2.setId(1L);
        response2.setUsername("user@example.com");
        response2.setAccessToken("token123");
        response2.setRole("USER");

        assertEquals(response1, response2);
        assertEquals(response1.toString(), response2.toString());
        assertEquals(response1.hashCode(), response2.hashCode());
    }

    @Test
    void testAuthResponseBuilder() {
        AuthResponse response = AuthResponse.builder()
                .id(2L)
                .username("builder@example.com")
                .accessToken("builderToken")
                .role("ADMIN")
                .build();

        assertEquals(2L, response.getId());
        assertEquals("builder@example.com", response.getUsername());
        assertEquals("builderToken", response.getAccessToken());
        assertEquals("ADMIN", response.getRole());
    }

    @Test
    void testLogInRequest() {
        LogInRequest request1 = new LogInRequest();
        request1.setUsername("login@example.com");
        request1.setPassword("Password1");

        LogInRequest request2 = new LogInRequest();
        request2.setUsername("login@example.com");
        request2.setPassword("Password1");

        assertEquals(request1, request2);
        assertEquals(request1.toString(), request2.toString());
        assertEquals(request1.hashCode(), request2.hashCode());
    }

    @Test
    void testLogInRequestBuilder() {
        LogInRequest request = LogInRequest.builder()
                .username("builderLogin@example.com")
                .password("Strong1")
                .build();

        assertEquals("builderLogin@example.com", request.getUsername());
        assertEquals("Strong1", request.getPassword());
    }
}
