package com.sistemaweblogin.ReactSpring.rest;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sistemaweblogin.ReactSpring.service.UserService;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = { "https://spring-api-one.vercel.app" })
@RequestMapping("/public")
public class PublicController {

    private final UserService userService;

    @GetMapping("/numberOfUsers")
    public Integer getNumberOfUsers() {
        return userService.getUsers().size();
    }
}
