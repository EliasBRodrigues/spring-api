package com.sistemaweblogin.ReactSpring.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDTO {
    private Long id;
    private String username;
    private String password;
}