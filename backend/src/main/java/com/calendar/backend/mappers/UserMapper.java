package com.calendar.backend.mappers;

import com.calendar.backend.dto.user.UserCreateRequest;
import com.calendar.backend.dto.user.UserFullResponse;
import com.calendar.backend.dto.user.UserListResponse;
import com.calendar.backend.models.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserFullResponse fromUserToUserResponse(User user);

    UserListResponse fromUserToUserListResponse(User user);

    User fromUserRequestToUser(UserCreateRequest userCreateRequest);
}
