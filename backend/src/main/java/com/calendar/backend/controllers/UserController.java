package com.calendar.backend.controllers;

import com.calendar.backend.dto.user.UserCreateRequest;
import com.calendar.backend.dto.user.UserFullResponse;
import com.calendar.backend.dto.user.UserListResponse;
import com.calendar.backend.dto.user.UserUpdateRequest;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.dto.wrapper.PasswordRequest;
import com.calendar.backend.mappers.UserMapper;
import com.calendar.backend.services.inter.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final TaskAssignmentService taskAssignmentService;
    private final NotificationService notificationService;
    private final InvitationService invitationService;
    private final CommentService commentService;
    private final EventService eventService;
    private final UserService userService;
    private final TaskService taskService;
    private final UserMapper userMapper;


    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public UserFullResponse createUser(@Valid @RequestBody UserCreateRequest request) {
        log.info("Controller: Create user with body: {}", request);
        return userService.create(request);
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UserFullResponse updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserUpdateRequest request) {
        log.info("Controller: Update user with id: {} with body: {}", id, request);
        return userService.updateUser(request, id);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public UserFullResponse updateMyUser(
            @RequestBody UserUpdateRequest request,
            Authentication auth) {
        log.info("Controller: Update my user with body: {}", request);
        return userService.updateUser(
                request,
                userService.findUserByAuth(auth).getId()
        );
    }

    @PutMapping("/update/password")
    @ResponseStatus(HttpStatus.OK)
    public boolean updateMyPassword(
            @RequestBody PasswordRequest password,
            Authentication auth) {
        log.info("Controller: Update my password");
        return userService.updatePassword(password, auth);
    }

    @PreAuthorize("hasRole('TEACHER')")
    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) {
        log.info("Controller: Delete user with id: {}", id);

        taskAssignmentService.unassignTasksFromUser(id);
        eventService.unsignUserAndCreatorFromAll(id);

        notificationService.deleteAllLinksToUser(id);

        invitationService.changeCreatorToDeletedUser(id);
        commentService.changeCreatorToDeletedUser(id);
        taskService.changeCreatorToDeletedUser(id);

        userService.delete(id);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UserFullResponse getUser(@PathVariable Long id) {
        log.info("Controller: Get user with id: {}", id);
        return userService.findById(id);
    }


    @GetMapping("/my")
    @ResponseStatus(HttpStatus.OK)
    public UserFullResponse getMyUser(Authentication auth) {
        log.info("Controller: Get my user");
        return userMapper.fromUserToUserResponse(userService.findUserByAuth(auth));
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public PaginationListResponse<UserListResponse> getAllUsers(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String role,
            Authentication auth
    ) {
        log.info("Controller: Get all users");
        return userService.findAll(email, firstName, lastName, role, page, size, auth);
    }

    @PreAuthorize("@userSecurity.checkUserOfEvent(#auth, #eventId)")
    @GetMapping("/events/{event_id}")
    @ResponseStatus(HttpStatus.OK)
    public PaginationListResponse<UserListResponse> getUsersByEvent(
            @PathVariable(value = "event_id") Long eventId,
            @RequestParam Integer page,
            @RequestParam Integer size,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String role,
            Authentication auth) {
        log.info("Controller: Get all users for event with id: {}", eventId);
        return userService.findAllByEventId(email, firstName, lastName, role, eventId, page, size, auth);
    }

    @PreAuthorize("@userSecurity.checkUserOfEvent(#auth, #eventId)")
    @GetMapping("/not_events/{event_id}")
    @ResponseStatus(HttpStatus.OK)
    public PaginationListResponse<UserListResponse> getUsersByNotEvent(
            @PathVariable(value = "event_id") Long eventId,
            @RequestParam Integer page,
            @RequestParam Integer size,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String role,
            Authentication auth) {
        log.info("Controller: Get all users for not event with id: {}", eventId);
        return userService.findAllByEventsNotContains(email, firstName, lastName, role, eventId, page, size);
    }


    @GetMapping("/countTop5")
    @ResponseStatus(HttpStatus.OK)
    public List<UserListResponse> getTopFiveUsersCount() {
        log.info("Controller: Get top five users count");
        return userService.findTop5UsersByUpcomingEvents();
    }
}