package com.example.video.inventory.management.controller;

import com.example.video.inventory.management.dto.request.UploadVideoRequest;
import com.example.video.inventory.management.entity.UserEntity;
import com.example.video.inventory.management.entity.VideoEntity;
import com.example.video.inventory.management.service.UserService;
import com.example.video.inventory.management.service.VideoService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @Autowired
    private UserService userService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("")
    public ResponseEntity<?> uploadVideo(@Valid @RequestParam("title") String title,
                                         @RequestParam(value = "description", required = false) String description,
                                         @RequestParam("videoFile") MultipartFile videoFile,
                                         @RequestParam("assignedToUserId") String assignedToUserId) throws IOException {

        UploadVideoRequest request = UploadVideoRequest.builder()
                .title(title)
                .description(description)
                .assignedToUserId(assignedToUserId)
                .build();

        videoService.uploadVideo(videoFile, request);
        return ResponseEntity.ok("Video uploaded.");
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("")
    public ResponseEntity<List<VideoEntity>> getAllVideos() {
        List<VideoEntity> videos = videoService.getAllVideos();
        return ResponseEntity.ok(videos);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateVideo(@PathVariable Long id,
                                         @Valid @RequestParam("title") String title,
                                         @RequestParam(value = "description", required = false) String description,
                                         @RequestParam(value = "videoFile", required = false) MultipartFile videoFile,
                                         @RequestParam("assignedToUserId") String assignedToUserId) throws IOException {

        UploadVideoRequest request = UploadVideoRequest.builder()
                .title(title)
                .description(description)
                .assignedToUserId(assignedToUserId)
                .build();

        videoService.updateVideo(id, videoFile, request);
        return ResponseEntity.ok("Video updated.");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVideo(@PathVariable Long id) throws IOException {
        videoService.unlinkVideo(id);
        return ResponseEntity.ok("Video deleted successfully.");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{id}/assign")
    public ResponseEntity<?> assignVideo(@PathVariable Long id,
                                         @NotBlank @RequestParam("assignedToUserId") String assignedToUserId) {
        videoService.assignVideoToUser(id, assignedToUserId);
        return ResponseEntity.ok("Video assigned successfully.");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/get-users")
    public ResponseEntity<List<UserEntity>> getUserList() {
        List<UserEntity> userList = userService.getUserList();
        return ResponseEntity.ok(userList);
    }
}
