package com.sistemaweblogin.ReactSpring.service;


import java.util.List;
import java.util.Optional;

import com.sistemaweblogin.ReactSpring.model.User;
import com.sistemaweblogin.ReactSpring.rest.dto.RegisterDTO;

public interface UserService {

    List<User> getUsers();

    Optional<User> getUserByUsername(String username);

    boolean hasUserWithUsername(String username);

    boolean hasUserWithEmail(String email);

    User validateAndGetUserByUsername(String username);

    User saveUser(User user);

    RegisterDTO updatePasswordUser(RegisterDTO password, String username);

    void deleteUser(User user);
}
