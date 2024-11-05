package com.example.video.inventory.management.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ActivityRequest {
    @NotBlank
    private String action;
    @NotBlank
    private String userId;
    @NotBlank
    private String videoId;

    private LocalDateTime timestamp;
}
