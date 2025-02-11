package com.calendar.backend.main.mappers;

import com.calendar.backend.main.DTOs.user.UserFullResponse;
import com.calendar.backend.main.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(source = "firstName", target = "firstName")
    UserFullResponse fromUserToUserResponse(User user);
}
