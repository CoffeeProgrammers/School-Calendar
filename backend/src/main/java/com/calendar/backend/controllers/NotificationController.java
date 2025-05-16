package com.calendar.backend.controllers;

import com.calendar.backend.dto.notification.NotificationResponse;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.services.inter.NotificationService;
import com.calendar.backend.services.inter.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Slf4j
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
        log.info("Controller: Get all notifications for user with id: {}", userService.findUserByAuth(auth).getId());
        return notificationService.findAllByUserId(userService.findUserByAuth(auth).getId(), page, size);
    }

}
