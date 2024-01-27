package com.sistemaweblogin.ReactSpring.mapper;

import com.sistemaweblogin.ReactSpring.model.User;
import com.sistemaweblogin.ReactSpring.rest.dto.UserDto;

public interface UserMapper {
    UserDto toUserDto(User user);
}
