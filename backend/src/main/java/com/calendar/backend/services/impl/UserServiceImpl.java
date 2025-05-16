package com.calendar.backend.services.impl;

import com.calendar.backend.dto.user.UserCreateRequest;
import com.calendar.backend.dto.user.UserFullResponse;
import com.calendar.backend.dto.user.UserListResponse;
import com.calendar.backend.dto.user.UserUpdateRequest;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.mappers.UserMapper;
import com.calendar.backend.models.User;
import com.calendar.backend.models.enums.Role;
import com.calendar.backend.repositories.UserRepository;
import com.calendar.backend.repositories.specification.UserSpecification;
import com.calendar.backend.services.inter.UserService;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserFullResponse create(UserCreateRequest userCreateRequest) {
        log.info("Service: Saving new user {}", userCreateRequest);
        if (userRepository.findByEmail(userCreateRequest.getEmail()).isPresent()) {
            throw new EntityExistsException("User with email " +
                    userCreateRequest.getEmail() + " already exists");
        }
        User userToCreate = userMapper.fromUserRequestToUser(userCreateRequest);
        userToCreate.setPassword(passwordEncoder.encode(userToCreate.getPassword()));
        return userMapper.fromUserToUserResponse(userRepository.save(userToCreate));
    }

    @Override
    public void delete(long id) {
        log.info("Service: Deleting user with id {}", id);
        userRepository.deleteById(id);
    }

    @Override
    public UserFullResponse updateUser(UserUpdateRequest userUpdateRequest, long userId) {
        log.info("Service: Updating user with id {}", userId);
        User userToUpdate = userRepository.findById(userId).orElseThrow(() ->
                new EntityNotFoundException("User with id " + userId + " not found"));
        userToUpdate.setFirstName(userUpdateRequest.getFirstName());
        userToUpdate.setLastName(userUpdateRequest.getLastName());
        userToUpdate.setPassword(passwordEncoder.encode(userUpdateRequest.getPassword()));
        userToUpdate.setDescription(userUpdateRequest.getDescription());
        userToUpdate.setBirthday(LocalDateTime.parse(userUpdateRequest.getBirthday()));
        return userMapper.fromUserToUserResponse(userRepository.save(userToUpdate));
    }

    @Override
    public UserFullResponse findById(long id) {
        log.info("Service: Finding user with id {}", id);
        return userMapper.fromUserToUserResponse(findByIdForServices(id));
    }

    @Override
    public PaginationListResponse<UserListResponse> findAll(String email, String firstName, String lastName, String role,
                                                            int page, int size) {
        Map<String, Object> filters = createFilters(email, firstName, lastName, role);
        log.info("Service: Finding all users with filters {}", filters);
        Page<User> users = userRepository.findAll(UserSpecification.filterUsers(filters),
                PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "lastName", "firstName")));
        PaginationListResponse<UserListResponse> response = new PaginationListResponse<>();
        response.setTotalPages(users.getTotalPages());
        response.setContent(users.getContent().stream().map(userMapper::fromUserToUserListResponse).toList());
        return response;
    }

    @Override
    public User findByEmail(String email) {
        log.info("Service: Finding user with email {}", email);
        return userRepository.findByEmail(email).orElseThrow(
                () -> new EntityNotFoundException("User not found")
        );
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("Service: Finding user details with email by loading {}", username);
        Optional<User> user = userRepository.findByEmail(username);
        if (user.isEmpty()) {
            throw new EntityNotFoundException("User not found");
        }
        return user.get();
    }

    public User findUserByAuth(Authentication authentication) {
        log.info("Service: Finding user by authentication {}", authentication);
        return userRepository.findByEmail(authentication.getName()).orElseThrow(
                () -> new EntityNotFoundException("User not found")
        );
    }

    @Override
    public User findByIdForServices(long id) {
        log.info("Service: Finding user for service with id {}", id);
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User with id " + id + " not found"));
    }

    @Override
    public List<User> findAllByEventIdForServices(long eventId){
        log.info("Service: Finding all users for event with id {}", eventId);
        return userRepository.findAllByEventId(eventId);
    }

    @Override
    public PaginationListResponse<UserListResponse> findAllByEventsNotContains(String email, String firstName, String lastName, String role,
                                                                               long eventId, int page, int size) {
        Map<String, Object> filters = createFilters(email, firstName, lastName, role);
        log.info("Service: Finding all users with events not contains event with id {}", eventId);
        Page<User> users = userRepository.findAll(UserSpecification.doesNotHaveEvent(eventId).and(UserSpecification.filterUsers(filters)),
                PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "lastName", "firstName")));
        PaginationListResponse<UserListResponse> response = new PaginationListResponse<>();
        response.setTotalPages(users.getTotalPages());
        response.setContent(users.getContent().stream().map(userMapper::fromUserToUserListResponse).toList());
        return response;
    }

    @Override
    public PaginationListResponse<UserListResponse> findAllByEventId(String email, String firstName, String lastName, String role,
                                                                     long eventId, int page, int size) {
        Map<String, Object> filters = createFilters(email, firstName, lastName, role);
        log.info("Service: Finding all users with filters {} and event id {}", filters, eventId);
        Page<User> users = userRepository.findAll(UserSpecification.hasEvent(eventId).and(UserSpecification.filterUsers(filters)),
                PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "lastName", "firstName")));
        PaginationListResponse<UserListResponse> response = new PaginationListResponse<>();
        response.setTotalPages(users.getTotalPages());
        response.setContent(users.getContent().stream().map(userMapper::fromUserToUserListResponse).toList());
        return response;
    }

    private Map<String, Object> createFilters(String email, String firstName, String lastName, String role) {
        Map<String, Object> filters = new HashMap<>();
        if(email != null && !email.isBlank() && !email.equals("null")) {
            filters.put("email", email);
        }
        if(firstName != null && !firstName.isBlank() && !firstName.equals("null")) {
            filters.put("firstName", firstName);
        }
        if(lastName != null && !lastName.isBlank() && !lastName.equals("null")) {
            filters.put("lastName", lastName);
        }
        if(role != null && !role.isBlank() && !role.equals("null")) {
            filters.put("role", Role.valueOf(role.toUpperCase()).getLevel());
        }
        return filters;
    }
}

