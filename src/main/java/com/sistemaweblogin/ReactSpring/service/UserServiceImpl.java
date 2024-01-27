package com.sistemaweblogin.ReactSpring.service;

import lombok.RequiredArgsConstructor;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sistemaweblogin.ReactSpring.exception.ResourceNotFoundException;
import com.sistemaweblogin.ReactSpring.exception.UserNotFoundException;
import com.sistemaweblogin.ReactSpring.model.User;
import com.sistemaweblogin.ReactSpring.repository.UserRepository;
import com.sistemaweblogin.ReactSpring.rest.dto.RegisterDTO;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private ModelMapper mapper;
    private final PasswordEncoder passwordEncoder;

    @Autowired

    public UserServiceImpl(UserRepository userRepository, ModelMapper mapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public boolean hasUserWithUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean hasUserWithEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User validateAndGetUserByUsername(String username) {
        return getUserByUsername(username)
                .orElseThrow(
                        () -> new UserNotFoundException(String.format("User with username %s not found", username)));
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    @Transactional
    public RegisterDTO updatePasswordUser(RegisterDTO userUpdateDTO, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User"));
        user.setUsername(userUpdateDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userUpdateDTO.getPassword()));
        User updateUser = userRepository.save(user);
        return mapDTO(updateUser);
    }

    private RegisterDTO mapDTO(User user) {
        RegisterDTO registerDTO = mapper.map(user, RegisterDTO.class);
        return registerDTO;
    }
}
