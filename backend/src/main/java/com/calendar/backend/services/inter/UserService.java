package com.calendar.backend.services.inter;

import com.calendar.backend.dto.user.UserCreateRequest;
import com.calendar.backend.dto.user.UserFullResponse;
import com.calendar.backend.dto.user.UserListResponse;
import com.calendar.backend.dto.user.UserUpdateRequest;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.dto.wrapper.PasswordRequest;
import com.calendar.backend.models.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    UserFullResponse create(UserCreateRequest userCreateRequest);
    UserFullResponse updateUser(UserUpdateRequest userUpdateRequest, long userId);
    boolean updatePassword(PasswordRequest passwordRequest, Authentication authentication);
    void delete(long id);
    UserFullResponse findById(long id);
    PaginationListResponse<UserListResponse> findAll(
            String email, String firstName, String lastName, String role, int page, int size);
    PaginationListResponse<UserListResponse> findAllByEventId(
            String email, String firstName, String lastName, String role, long eventId, int page, int size);
    PaginationListResponse<UserListResponse> findAllByEventsNotContains(
            String email, String firstName, String lastName, String role, long eventId, int page, int size);
    User findByEmail(String email);
    User findUserByAuth(Authentication authentication);
    User findByIdForServices(long id);
    List<User> findAllByEventIdForServices(long eventId);
}
