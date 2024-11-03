package com.example.video.inventory.management.dto.request;

import com.example.video.inventory.management.enums.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class UserRegistrationRequest {

    @NotBlank
    private String username;
    @NotBlank
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;
    @NotNull(message = "Role must be provided")
    private Role role;
}
