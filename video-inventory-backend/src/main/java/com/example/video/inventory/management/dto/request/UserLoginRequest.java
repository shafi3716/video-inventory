package com.example.video.inventory.management.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class UserLoginRequest {

    @NotBlank
    private String username;
    @NotBlank
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;
}
