package com.example.video.inventory.management.service;

import com.example.video.inventory.management.dto.request.UserLoginRequest;
import com.example.video.inventory.management.dto.request.UserRegistrationRequest;
import com.example.video.inventory.management.entity.UserEntity;

import java.util.List;

public interface UserService {
    String saveUser(UserRegistrationRequest user);

    String login(UserLoginRequest request);

    List<UserEntity> getUserList();
}
