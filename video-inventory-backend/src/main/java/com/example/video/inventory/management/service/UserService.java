package com.example.video.inventory.management.service;

import com.example.video.inventory.management.dto.request.UserLoginRequest;
import com.example.video.inventory.management.dto.request.UserRegistrationRequest;

public interface UserService {
    String saveUser(UserRegistrationRequest user);

    String login(UserLoginRequest request);
}
