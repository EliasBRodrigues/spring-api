package com.sistemaweblogin.ReactSpring.rest.dto;

public record UserDto(Long id, String username, String email, String cpf, String role) {
}