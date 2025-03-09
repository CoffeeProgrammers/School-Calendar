package com.calendar.backend.controllers;

import com.calendar.backend.dto.notification.NotificationResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.services.inter.NotificationService;
import com.calendar.backend.services.inter.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final UserService userService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public PaginationListResponse<NotificationResponse> getAllMyNotifications(
            @RequestParam int page,
            @RequestParam int size,
            Authentication auth) {
        return notificationService.findAllByUserId(userService.findUserByAuth(auth).getId(), page, size);
    }

}
