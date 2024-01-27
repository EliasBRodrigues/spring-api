package com.sistemaweblogin.ReactSpring.mapper;

import org.springframework.stereotype.Service;

import com.sistemaweblogin.ReactSpring.model.User;
import com.sistemaweblogin.ReactSpring.rest.dto.UserDto;

@Service
public class UserMapperImpl implements UserMapper{

    @Override
    public UserDto toUserDto(User user) {
        if (user == null) {
            return null;
        }
        return new UserDto(user.getId(), user.getUsername(),  user.getEmail(), user.getCpf(), user.getRole());
    }
}
