package com.calendar.backend.controllers;

import com.calendar.backend.dto.user.UserCreateRequest;
import com.calendar.backend.dto.user.UserFullResponse;
import com.calendar.backend.dto.user.UserListResponse;
import com.calendar.backend.dto.user.UserUpdateRequest;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.mappers.UserMapper;
import com.calendar.backend.services.inter.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public UserFullResponse createUser(@Valid @RequestBody UserCreateRequest request) {
        return userService.create(request);
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UserFullResponse updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserUpdateRequest request) {
        return userService.updateUser(request, id);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UserFullResponse getUser(@PathVariable Long id) {
        return userService.findById(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public PaginationListResponse<UserListResponse> getAllUsers(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String role
    ) {
        return userService.findAll(firstName, lastName, role, page, size);
    }

    @GetMapping("/events/{event_id}")
    @ResponseStatus(HttpStatus.OK)
    public PaginationListResponse<UserListResponse> getUsersByEvent(
            @PathVariable Long event_id,
            @RequestParam Integer page,
            @RequestParam Integer size,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String role) {
        return userService.findAllByEventId(firstName, lastName, role, event_id, page, size);
    }

    @GetMapping("/my")
    @ResponseStatus(HttpStatus.OK)
    public UserFullResponse getMyUser(Authentication auth) {
        return userMapper.fromUserToUserResponse(userService.findUserByAuth(auth));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) {
        userService.delete(id);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public UserFullResponse updateMyUser(
            @RequestBody UserUpdateRequest request,
            Authentication auth) {
        return userService.updateUser(
                request,
                userService.findUserByAuth(auth).getId()
        );
    }

}