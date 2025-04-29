package com.calendar.backend.services.impl;

import com.calendar.backend.TestUtil;
import com.calendar.backend.dto.user.UserCreateRequest;
import com.calendar.backend.dto.user.UserFullResponse;
import com.calendar.backend.dto.user.UserListResponse;
import com.calendar.backend.dto.user.UserUpdateRequest;
import com.calendar.backend.dto.wrapper.PaginationListResponse;
import com.calendar.backend.mappers.UserMapper;
import com.calendar.backend.models.User;
import com.calendar.backend.repositories.UserRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private UserMapper userMapper;
    @Mock
    private PasswordEncoder passwordEncoder;
    @InjectMocks
    private UserServiceImpl userService;

    private User user;
    private User updatedUser;
    private UserUpdateRequest userUpdateRequest;
    private UserCreateRequest userCreateRequest;
    private UserFullResponse userFullResponse;
    private UserFullResponse userFullResponseUpdate;

    @BeforeEach
    void setUp() {
        user = TestUtil.createUser("TEACHER");
        userCreateRequest = new UserCreateRequest();
        userCreateRequest.setEmail(user.getEmail());
        userCreateRequest.setPassword(user.getPassword());
        userCreateRequest.setFirstName(user.getFirstName());
        userCreateRequest.setLastName(user.getLastName());
        if (user.getRole() != null) {
            userCreateRequest.setRole(String.valueOf(user.getRole()));
        }

        updatedUser = new User(user.getEmail(), user.getPassword(), user.getFirstName() + "SD", user.getLastName(), String.valueOf(user.getRole()), user.getBirthday());
        updatedUser.setDescription(user.getDescription());
        userUpdateRequest = new UserUpdateRequest();
        userUpdateRequest.setDescription(user.getDescription());
        userUpdateRequest.setPassword(user.getPassword());
        userUpdateRequest.setFirstName(user.getFirstName() + "SD");
        userUpdateRequest.setLastName(user.getLastName());
        if (user.getBirthday() != null) {
            userUpdateRequest.setBirthday(DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(user.getBirthday()));
        }


        userFullResponse = new UserFullResponse();
        userFullResponse.setId(user.getId());
        userFullResponse.setEmail(user.getEmail());
        if (user.getRole() != null) {
            userFullResponse.setRole(user.getRole().name());
        }

        userFullResponse.setFirstName(user.getFirstName());
        userFullResponse.setLastName(user.getLastName());
        userFullResponse.setDescription(user.getDescription());
        if (user.getBirthday() != null) {
            userFullResponse.setBirthday(DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(user.getBirthday()));
        }

        userFullResponseUpdate = new UserFullResponse();
        userFullResponseUpdate.setId(updatedUser.getId());
        userFullResponseUpdate.setEmail(updatedUser.getEmail());
        if (user.getRole() != null) {
            userFullResponseUpdate.setRole(updatedUser.getRole().name());
        }

        userFullResponseUpdate.setFirstName(updatedUser.getFirstName());
        userFullResponseUpdate.setLastName(updatedUser.getLastName());
        userFullResponseUpdate.setDescription(updatedUser.getDescription());
        if (updatedUser.getBirthday() != null) {
            userFullResponseUpdate.setBirthday(DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(updatedUser.getBirthday()));
        }
    }

    @Test
    void create_success() {
        // when
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());
        when(userMapper.fromUserRequestToUser(userCreateRequest)).thenReturn(user);
        when(userRepository.save(user)).thenReturn(user);
        when(userMapper.fromUserToUserResponse(user)).thenReturn(userFullResponse);

        ArgumentCaptor<User> argumentCaptor = ArgumentCaptor.forClass(User.class);

        UserFullResponse captured = userService.create(userCreateRequest);

        // then
        verify(userRepository, times(1)).save(argumentCaptor.capture());
        verify(userRepository, times(1)).findByEmail(user.getEmail());

        verify(userMapper, times(1)).fromUserRequestToUser(userCreateRequest);
        verify(userMapper, times(1)).fromUserToUserResponse(user);

        assertEquals(captured, userFullResponse);
    }

    @Test
    void create_exists() {
        // when
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

        assertThrows(EntityExistsException.class, () -> userService.create(userCreateRequest), "User with email " + user.getEmail() + " already exists");

        // then
        verify(userRepository, times(0)).save(user);
        verify(userRepository, times(1)).findByEmail(user.getEmail());

        verify(userMapper, times(0)).fromUserRequestToUser(userCreateRequest);
        verify(userMapper, times(0)).fromUserToUserResponse(user);
    }


    @Test
    void updateUser_success() {
        // when
        when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenReturn(updatedUser);
        when(userMapper.fromUserToUserResponse(any(User.class))).thenReturn(userFullResponseUpdate);

        ArgumentCaptor<User> argumentCaptor = ArgumentCaptor.forClass(User.class);
        UserFullResponse captured = userService.updateUser(userUpdateRequest, user.getId());

        // then
        verify(userRepository, times(1)).save(argumentCaptor.capture());
        verify(userRepository, times(1)).findById(user.getId());

        verify(userMapper, times(1)).fromUserToUserResponse(updatedUser);

        assertEquals(captured, userFullResponseUpdate);
    }

    @Test
    void updateUser_notExists() {
        // when
        when(userRepository.findById(user.getId())).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class,
                () -> userService.updateUser(userUpdateRequest, user.getId()),
                "User with id " + user.getId() + " not found");

        // then
        verify(userRepository, times(0)).save(any(User.class));
        verify(userRepository, times(1)).findById(user.getId());

        verify(userMapper, times(0)).fromUserToUserResponse(updatedUser);
    }

    @Test
    void findById_success() {
        // when
        when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));
        when(userMapper.fromUserToUserResponse(user)).thenReturn(userFullResponse);

        UserFullResponse captured = userService.findById(user.getId());

        // then
        verify(userRepository, times(1)).findById(user.getId());

        verify(userMapper, times(1)).fromUserToUserResponse(user);

        assertEquals(captured, userFullResponse);
    }

    @Test
    void findById_notExists() {
        when(userRepository.findById(user.getId())).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class,
                () -> userService.findById(user.getId()),
                "User with id " + user.getId() + " not found");

        // then
        verify(userRepository, times(1)).findById(user.getId());

        verify(userMapper, times(0)).fromUserToUserResponse(updatedUser);
    }

    @Test
    void findAll_success() {
        Page<User> page = new PageImpl<>(List.of(user));
        when(userRepository.findAll(any(Specification.class), any(PageRequest.class))).thenReturn(page);
        when(userMapper.fromUserToUserListResponse(user)).thenReturn(new UserListResponse());

        PaginationListResponse<UserListResponse> result = userService.findAll("", "", "", 0, 10);

        assertEquals(1, result.getContent().size());
        assertEquals(1, result.getTotalPages());
        verify(userRepository).findAll(any(Specification.class), any(PageRequest.class));
    }

    @Test
    void findAllByEventId_success() {
        Page<User> page = new PageImpl<>(List.of(user));
        when(userRepository.findAll(any(Specification.class), any(PageRequest.class))).thenReturn(page);
        when(userMapper.fromUserToUserListResponse(user)).thenReturn(new UserListResponse());

        PaginationListResponse<UserListResponse> result = userService.findAllByEventId(Map.of(), 1L, 0, 10);

        assertEquals(1, result.getContent().size());
        assertEquals(1, result.getTotalPages());
        verify(userRepository).findAll(any(Specification.class), any(PageRequest.class));
    }

    @Test
    void delete_success() {
        userService.delete(user.getId());

        verify(userRepository).deleteById(user.getId());
    }

    @Test
    void findByEmail_success() {
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

        User result = userService.findByEmail(user.getEmail());

        assertEquals(user, result);
        verify(userRepository).findByEmail(user.getEmail());
    }

    @Test
    void findByEmail_notFound() {
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> userService.findByEmail(user.getEmail()));
    }

    @Test
    void loadUserByUsername_success() {
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

        UserDetails result = userService.loadUserByUsername(user.getEmail());

        assertEquals(user, result);
    }

    @Test
    void loadUserByUsername_notFound() {
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> userService.loadUserByUsername(user.getEmail()));
    }

    @Test
    void findUserByAuth_success() {
        Authentication auth = mock(Authentication.class);
        when(auth.getName()).thenReturn(user.getEmail());
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

        User result = userService.findUserByAuth(auth);

        assertEquals(user, result);
    }

    @Test
    void findUserByAuth_notFound() {
        Authentication auth = mock(Authentication.class);
        when(auth.getName()).thenReturn(user.getEmail());
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> userService.findUserByAuth(auth));
    }

    @Test
    void findByIdForServices_success() {
        when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));

        User result = userService.findByIdForServices(user.getId());

        assertEquals(user, result);
    }

    @Test
    void findByIdForServices_notFound() {
        when(userRepository.findById(user.getId())).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> userService.findByIdForServices(user.getId()));
    }

    @Test
    void findAllByEventIdForServices_success() {
        List<User> users = List.of(user);
        when(userRepository.findAllByEventId(1L)).thenReturn(users);

        List<User> result = userService.findAllByEventIdForServices(1L);

        assertEquals(users, result);
    }

}