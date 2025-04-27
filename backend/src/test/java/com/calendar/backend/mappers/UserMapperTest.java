package com.calendar.backend.mappers;

import com.calendar.backend.dto.user.UserCreateRequest;
import com.calendar.backend.dto.user.UserFullResponse;
import com.calendar.backend.dto.user.UserListResponse;
import com.calendar.backend.models.User;
import org.instancio.Instancio;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.assertj.core.api.Assertions.assertThat;

class UserMapperTest {

    private final UserMapper userMapper = Mappers.getMapper(UserMapper.class);

    @Test
    void fromUserToUserFullResponse_validUser() {
        // given
        User user = new User("user@example.com", "Password123", "John", "Doe", "TEACHER", LocalDateTime.now());
        user.setId(1L);
        user.setDescription("Test description");

        // when
        UserFullResponse userFullResponse = userMapper.fromUserToUserResponse(user);

        // then
        assertThat(userFullResponse).isNotNull();
        assertThat(userFullResponse.getId()).isEqualTo(user.getId());
        assertThat(userFullResponse.getEmail()).isEqualTo(user.getEmail());
        assertThat(userFullResponse.getRole()).isEqualTo(user.getRole().name());
        assertThat(userFullResponse.getFirstName()).isEqualTo(user.getFirstName());
        assertThat(userFullResponse.getLastName()).isEqualTo(user.getLastName());
        assertThat(userFullResponse.getDescription()).isEqualTo(user.getDescription());
        assertThat(userFullResponse.getBirthday()).isEqualTo(DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(user.getBirthday()));
    }

    @Test
    void fromUserToUserListResponse_validUser() {
        // given
        User user = new User("user@example.com", "Password123", "John", "Doe", "STUDENT", LocalDateTime.now());
        user.setId(2L);

        // when
        UserListResponse userListResponse = userMapper.fromUserToUserListResponse(user);

        // then
        assertThat(userListResponse).isNotNull();
        assertThat(userListResponse.getId()).isEqualTo(user.getId());
        assertThat(userListResponse.getEmail()).isEqualTo(user.getEmail());
        assertThat(userListResponse.getRole()).isEqualTo(user.getRole().name());
        assertThat(userListResponse.getFirstName()).isEqualTo(user.getFirstName());
        assertThat(userListResponse.getLastName()).isEqualTo(user.getLastName());
    }

    @Test
    void fromUserRequestToUser_validUserRequest() {
        // given
        UserCreateRequest userCreateRequest = Instancio.create(UserCreateRequest.class);
        userCreateRequest.setRole("STUDENT");
        userCreateRequest.setBirthday(DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(LocalDateTime.now()));

        // when
        User user = userMapper.fromUserRequestToUser(userCreateRequest);

        // then
        assertThat(user).isNotNull();
        assertThat(user.getEmail()).isEqualTo(userCreateRequest.getEmail());
        assertThat(user.getPassword()).isEqualTo(userCreateRequest.getPassword());
        assertThat(user.getRole().name()).isEqualTo(userCreateRequest.getRole());
        assertThat(user.getFirstName()).isEqualTo(userCreateRequest.getFirstName());
        assertThat(user.getLastName()).isEqualTo(userCreateRequest.getLastName());
        assertThat(DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(user.getBirthday())).isEqualTo(userCreateRequest.getBirthday());
    }

    @Test
    void fromUserRequestToUser_nullUserRequest() {
        // given
        UserCreateRequest userCreateRequest = null;

        // when
        User user = userMapper.fromUserRequestToUser(userCreateRequest);

        // then
        assertThat(user).isNull();
    }
}
