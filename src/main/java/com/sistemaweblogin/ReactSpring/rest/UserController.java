package com.sistemaweblogin.ReactSpring.rest;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sistemaweblogin.ReactSpring.mapper.UserMapper;
import com.sistemaweblogin.ReactSpring.model.User;
import com.sistemaweblogin.ReactSpring.rest.dto.RegisterDTO;
import com.sistemaweblogin.ReactSpring.rest.dto.UserDto;
import com.sistemaweblogin.ReactSpring.service.UserService;

import java.util.List;

import static com.sistemaweblogin.ReactSpring.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class UserController {
  
    private final UserService userService;
    private final UserMapper userMapper;

    // @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    // @GetMapping("/users/me")
    // public UserDto getCurrentUser(@AuthenticationPrincipal CustomUserDetails currentUser) {
    //     return userMapper.toUserDto(userService.validateAndGetUserByUsername(currentUser.getUsername()));
    // }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/{username}")
    public UserDto getUser(@PathVariable String username) {
        return userMapper.toUserDto(userService.validateAndGetUserByUsername(username));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PutMapping("/update/{username}")
    public ResponseEntity<RegisterDTO> updatePasswordUser(@Valid @RequestBody RegisterDTO registerDTO, @PathVariable("username") String username){
        RegisterDTO responseUpdate = userService.updatePasswordUser(registerDTO, username);
        return new ResponseEntity<>(responseUpdate, HttpStatus.OK);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/users/{username}")
    public UserDto deleteUser(@PathVariable String username) {
        User user = userService.validateAndGetUserByUsername(username);
        userService.deleteUser(user);
        return userMapper.toUserDto(user);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userService.getUsers();
        return ResponseEntity.ok(users);
    }
        
}
