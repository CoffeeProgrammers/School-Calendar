package com.calendar.backend.app.mappers;

import com.calendar.backend.app.DTOs.user.UserFullResponse;
import com.calendar.backend.app.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(source = "firstName", target = "firstName")
    UserFullResponse fromUserToUserResponse(User user);
}
