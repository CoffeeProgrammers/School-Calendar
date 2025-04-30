package com.calendar.backend.services.inter;

import com.calendar.backend.dto.user.UserCreateRequest;
import com.calendar.backend.dto.user.UserFullResponse;
import com.calendar.backend.dto.user.UserListResponse;
import com.calendar.backend.dto.user.UserUpdateRequest;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.models.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Map;

public interface UserService extends UserDetailsService {
    UserFullResponse create(UserCreateRequest userCreateRequest);
    UserFullResponse updateUser(UserUpdateRequest userUpdateRequest, long userId);

    void delete(long id);
    UserFullResponse findById(long id);
    PaginationListResponse<UserListResponse> findAll(String firstName, String lastName, String role, int page, int size);
    PaginationListResponse<UserListResponse> findAllByEventId(Map<String, Object> filters,
                                                              long eventId, int page, int size);
    User findByEmail(String email);
    User findUserByAuth(Authentication authentication);
    User findByIdForServices(long id);
    List<User> findAllByEventIdForServices(long eventId);
}
