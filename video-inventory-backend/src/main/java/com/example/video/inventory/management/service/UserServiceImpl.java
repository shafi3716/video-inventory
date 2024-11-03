package com.example.video.inventory.management.service;

import com.example.video.inventory.management.dto.request.UserLoginRequest;
import com.example.video.inventory.management.dto.request.UserRegistrationRequest;
import com.example.video.inventory.management.entity.UserEntity;
import com.example.video.inventory.management.repository.UserRepository;
import com.example.video.inventory.management.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String saveUser(UserRegistrationRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username is already taken.");
        }

        UserEntity user = UserEntity.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        userRepository.save(user);
        return jwtUtil.generateToken(user.getUsername(), user.getRole());
    }

    @Override
    public String login(UserLoginRequest request) {
        UserEntity user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid username or password.");
        }

        return jwtUtil.generateToken(user.getUsername(), user.getRole());
    }
}
