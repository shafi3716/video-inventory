package com.example.video.inventory.management.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Builder
public class UploadVideoRequest {
    @NotBlank
    private String title;
    private String description;
    @NotBlank
    private MultipartFile videoFile;
    @NotBlank
    private String assignedToUserId;
}
