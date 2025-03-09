package com.calendar.backend.services.impl;

import com.calendar.backend.dto.user.UserCreateRequest;
import com.calendar.backend.dto.user.UserFullResponse;
import com.calendar.backend.dto.user.UserListResponse;
import com.calendar.backend.dto.user.UserUpdateRequest;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.mappers.UserMapper;
import com.calendar.backend.models.User;
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
        log.info("Saving new user {}", userCreateRequest);
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
        log.info("Deleting user with id {}", id);
        userRepository.deleteById(id);
    }

    @Override
    public UserFullResponse updateUser(UserUpdateRequest userUpdateRequest, long userId) {
        log.info("Updating user with id {}", userId);
        User userToUpdate = userRepository.findById(userId).orElseThrow(() ->
                new EntityNotFoundException("User with id " + userId + " not found"));
        userToUpdate.setFirstName(userUpdateRequest.getFirstName());
        userToUpdate.setLastName(userUpdateRequest.getLastName());
        userToUpdate.setPassword(passwordEncoder.encode(userUpdateRequest.getPassword()));
        userToUpdate.setDescription(userUpdateRequest.getDescription());
        userToUpdate.setBirthday(LocalDateTime.parse(userUpdateRequest.getBirthday()));
        return userMapper.fromUserToUserResponse(userToUpdate);
    }

    @Override
    public UserFullResponse findById(long id) {
        log.info("Finding user with id {}", id);
        return userMapper.fromUserToUserResponse(findByIdForServices(id));
    }

    @Override
    public PaginationListResponse<UserListResponse> findAll(Map<String, Object> filters,
                                                            int page, int size) {
        log.info("Finding all users with filters {}", filters);
        Page<User> users = userRepository.findAll(UserSpecification.filterUsers(filters),
                PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "lastName", "firstName")));
        PaginationListResponse<UserListResponse> response = new PaginationListResponse<>();
        response.setTotalPages(users.getTotalPages());
        response.setContent(users.getContent().stream().map(userMapper::fromUserToUserListResponse).toList());
        return response;
    }

    @Override
    public PaginationListResponse<UserListResponse> findAllByEventId(Map<String, Object> filters,
                                                                     long eventId, int page, int size) {
        log.info("Finding all users with filters {} and event id {}", filters, eventId);
        Page<User> users = userRepository.findAllByEventId(eventId, UserSpecification.filterUsers(filters),
                PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "lastName", "firstName")));
        PaginationListResponse<UserListResponse> response = new PaginationListResponse<>();
        response.setTotalPages(users.getTotalPages());
        response.setContent(users.getContent().stream().map(userMapper::fromUserToUserListResponse).toList());
        return response;
    }

    public User findByEmail(String email) {
        log.info("Finding user with email {}", email);
        return userRepository.findByEmail(email).orElseThrow(
                () -> new EntityNotFoundException("User not found")
        );
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("Finding user details with email by loading {}", username);
        Optional<User> user = userRepository.findByEmail(username);
        if (user.isEmpty()) {
            throw new EntityNotFoundException("User not found");
        }
        return user.get();
    }

    public User findUserByAuth(Authentication authentication) {
        log.info("Finding user by authentication {}", authentication);
        return userRepository.findByEmail(authentication.getName()).orElseThrow(
                () -> new EntityNotFoundException("User not found")
        );
    }

    @Override
    public User findByIdForServices(long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User with id " + id + " not found"));
    }
}

