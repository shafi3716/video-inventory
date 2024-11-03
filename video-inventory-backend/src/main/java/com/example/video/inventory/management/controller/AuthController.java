package com.example.video.inventory.management.controller;

import com.example.video.inventory.management.dto.request.UserLoginRequest;
import com.example.video.inventory.management.dto.request.UserRegistrationRequest;
import com.example.video.inventory.management.dto.response.AuthResponse;
import com.example.video.inventory.management.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegistrationRequest request) {
        String token = userService.saveUser(request);
        AuthResponse response = AuthResponse.builder()
                .message("User registered successfully.")
                .token(token)
                .build();
        return ResponseEntity.ok(response);

    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody UserLoginRequest request) {
        String token = userService.login(request);
        AuthResponse response = AuthResponse.builder()
                .message("User login successfully.")
                .token(token)
                .build();
        return ResponseEntity.ok(response);
    }
}
