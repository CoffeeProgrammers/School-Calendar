package com.calendar.backend.mappers;

import com.calendar.backend.DTOs.user.UserFullResponse;
import com.calendar.backend.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(source = "firstName", target = "firstName")
    UserFullResponse fromUserToUserResponse(User user);
}
