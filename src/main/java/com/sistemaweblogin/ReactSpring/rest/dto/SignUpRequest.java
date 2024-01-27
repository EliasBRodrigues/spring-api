package com.sistemaweblogin.ReactSpring.rest.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignUpRequest {

    @Schema(example = "user3")
    @NotBlank
    @Size(min = 3, max = 20, message = "O nome de usuário deve ter entre 3 e 20 caracteres.")
    private String username;

    @Schema(example = "user3")
    @NotBlank
    @Size(min = 6, max = 20, message = "A senha deve ter entre 6 e 20 caracteres.")
    private String password;

    @Schema(example = "user3@mycompany.com")
    @Email(message = "O formato do email é inválido.")
    @Size(max = 50, message = "O email deve ter no máximo 50 caracteres.")
    private String email;

    @Schema(example = "12345678901")
    @NotBlank
    @NotBlank(message = "O CPF não pode estar em branco.")
    @Pattern(regexp = "^[0-9]{11}$", message = "O CPF deve ter exatamente 11 números.")
    private String cpf;

}
