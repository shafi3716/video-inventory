package com.example.video.inventory.management.dto.request;

import lombok.Data;
import lombok.Getter;

@Getter
public class UserRegistrationRequest {
    private String username;
    private String password;
    private String role;
}
