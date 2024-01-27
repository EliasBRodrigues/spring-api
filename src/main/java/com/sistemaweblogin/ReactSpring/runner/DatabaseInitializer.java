package com.sistemaweblogin.ReactSpring.runner;

import com.sistemaweblogin.ReactSpring.model.User;
import com.sistemaweblogin.ReactSpring.security.WebSecurityConfig;
import com.sistemaweblogin.ReactSpring.service.UserServiceImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final UserServiceImpl userService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userService.getUsers().isEmpty()) {
            return;
        }
        USERS.forEach(user -> {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userService.saveUser(user);
        });
        log.info("Database initialized");
    }

    private static final List<User> USERS = Arrays.asList(
            new User("admin", "admin", "admin@mycompany.com", "12345678901",WebSecurityConfig.ADMIN),
            new User("user", "user", "user@mycompany.com", "96385274111",WebSecurityConfig.USER)

    );
}
