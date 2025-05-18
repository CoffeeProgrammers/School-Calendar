package com.calendar.backend.services.impl;

import com.calendar.backend.dto.user.UserCreateRequest;
import com.calendar.backend.dto.user.UserFullResponse;
import com.calendar.backend.dto.user.UserListResponse;
import com.calendar.backend.dto.user.UserUpdateRequest;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.dto.wrapper.PasswordRequest;
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
import java.time.ZoneId;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserMapper userMapper;


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
    public UserFullResponse updateUser(UserUpdateRequest userUpdateRequest, long userId) {
        log.info("Service: Updating user with id {}", userId);

        User userToUpdate = findByIdForServices(userId);
        checkForDeletedUser(userToUpdate);

        userToUpdate.setFirstName(userUpdateRequest.getFirstName());
        userToUpdate.setLastName(userUpdateRequest.getLastName());
        userToUpdate.setDescription(userUpdateRequest.getDescription());
        userToUpdate.setBirthday(LocalDateTime.parse(userUpdateRequest.getBirthday()));

        return userMapper.fromUserToUserResponse(userRepository.save(userToUpdate));
    }

    @Override
    public boolean updatePassword(PasswordRequest passwordRequest, Authentication authentication) {
        log.info("Service: Updating password for user with email {}", authentication.getName());

        User user = findUserByAuth(authentication);
        if (!passwordEncoder.matches(passwordRequest.getOldPassword(), user.getPassword())) {
            return false;
        }
        user.setPassword(passwordEncoder.encode(passwordRequest.getNewPassword()));
        userRepository.save(user);

        return true;
    }

    @Override
    public void delete(long id) {
        log.info("Service: Deleting user with id {}", id);

        checkForDeletedUser(findByIdForServices(id));

        userRepository.deleteById(id);
    }

    @Override
    public UserFullResponse findById(long id) {
        log.info("Service: Finding user with id {}", id);

        return userMapper.fromUserToUserResponse(findByIdForServices(id));
    }

    @Override
    public PaginationListResponse<UserListResponse> findAll(
            String email, String firstName, String lastName, String role, int page, int size, Authentication auth) {

        Map<String, Object> filters = createFilters(email, firstName, lastName, role);
        User user = findUserByAuth(auth);

        log.info("Service: Finding all users with filters {}", filters);

        Page<User> users = userRepository.findAll(
                UserSpecification.filterUsers(filters).and(UserSpecification.notUser(user.getId())),
                PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "lastName", "firstName")));

        return createResponse(users);
    }

    @Override
    public PaginationListResponse<UserListResponse> findAllByEventId(
            String email, String firstName, String lastName, String role,
            long eventId, int page, int size, Authentication auth) {

        User user = findUserByAuth(auth);
        Map<String, Object> filters = createFilters(email, firstName, lastName, role);

        log.info("Service: Finding all users disincluding me with filters {} and event id {}", filters, eventId);

        Page<User> users = userRepository.findAll(UserSpecification.hasEvent(eventId)
                        .and(UserSpecification.notUser(user.getId())).and(UserSpecification.filterUsers(filters)),
                PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "lastName", "firstName")));

        return createResponse(users);
    }

    @Override
    public PaginationListResponse<UserListResponse> findAllByEventsNotContains(
            String email, String firstName, String lastName, String role, long eventId, int page, int size) {

        Map<String, Object> filters = createFilters(email, firstName, lastName, role);
        log.info("Service: Finding all users with events not contains event with id {}", eventId);

        Page<User> users = userRepository.findAll(UserSpecification.doesNotHaveEvent(eventId)
                        .and(UserSpecification.filterUsers(filters)),
                PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "lastName", "firstName")));

        return createResponse(users);
    }

    @Override
    public List<UserListResponse> findTop5UsersByUpcomingEvents() {
        log.info("Service: Finding top 5 users with upcoming events");

        LocalDateTime now = LocalDateTime.now(ZoneId.of("Europe/Kiev"));
        List<User> users = userRepository.findTop5UsersByUpcomingEvents(now);

        return users.stream().map(userMapper::fromUserToUserListResponse).toList();
    }

    @Override
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
    public User findByEmailForServices(String email) {
        log.info("Service: Finding user with email {}", email);

        return userRepository.findByEmail(email).orElseThrow(
                () -> new EntityNotFoundException("User not found")
        );
    }

    @Override
    public List<User> findAllByEventIdForServices(long eventId){
        log.info("Service: Finding all users for event with id {}", eventId);

        return userRepository.findAllByEventId(eventId);
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


    private Map<String, Object> createFilters(String email, String firstName, String lastName, String role) {
        log.info("Service: Creating filters for user with email {}, first name {}, last name {} and role {}",
                email, firstName, lastName, role);

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

    private void checkForDeletedUser(User user){
        log.info("Service: Checking for deleted user with id {}", user.getId());

        if (user.getEmail().equals("!deleted-user!@deleted.com")) {
            log.info("Service: User with id {} is deleted", user.getId());
            throw new EntityExistsException("Can`t do anything with deleted user");
        }
    }

    private PaginationListResponse<UserListResponse> createResponse(Page<User> users) {
        log.info("Service: Creating response for users");

        PaginationListResponse<UserListResponse> response = new PaginationListResponse<>();
        response.setTotalPages(users.getTotalPages());
        response.setContent(users.getContent().stream().map(userMapper::fromUserToUserListResponse).toList());
        return response;
    }
}

