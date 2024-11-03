package com.example.video.inventory.management.service;

import com.example.video.inventory.management.config.FileUploadConfig;
import com.example.video.inventory.management.dto.request.UploadVideoRequest;
import com.example.video.inventory.management.entity.UserEntity;
import com.example.video.inventory.management.entity.VideoEntity;
import com.example.video.inventory.management.exception.ResourceNotFoundException;
import com.example.video.inventory.management.repository.UserRepository;
import com.example.video.inventory.management.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class VideoServiceImpl implements VideoService {
    @Autowired
    private FileUploadConfig fileUploadConfig;

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void uploadVideo(MultipartFile videoFile, UploadVideoRequest request) throws IOException {

        String videoUrl = saveVideo(videoFile);

        UserEntity user = userRepository.findById(Long.valueOf(request.getAssignedToUserId()))
                .orElseThrow(() -> new ResourceNotFoundException("User with ID " + request.getAssignedToUserId() + " not found"));

        VideoEntity videoEntity = VideoEntity.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .assignedToUser(user)
                .videoUrl(videoUrl)
                .build();

        videoRepository.save(videoEntity);
    }

    private String saveVideo(MultipartFile videoFile) throws IOException {
        Path uploadDir = fileUploadConfig.getUploadDir();

        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        String originalFileName = videoFile.getOriginalFilename();
        String timestamp = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
        String fileExtension = Objects.requireNonNull(originalFileName).substring(originalFileName.lastIndexOf("."));
        String fileName = originalFileName.replace(fileExtension, "") + "_" + timestamp + fileExtension;

        Path filePath = uploadDir.resolve(fileName);
        Files.copy(videoFile.getInputStream(), filePath);
        return "/uploads/" + fileName;
    }

    @Override
    public List<VideoEntity> getAllVideos(Long userId) {
        List<VideoEntity> videos = null;
        String role = getLoginRole();
        if (role.equalsIgnoreCase("ROLE_ADMIN")) {
            videos = videoRepository.findAll();
        } else if (role.equalsIgnoreCase("ROLE_USER")) {
            UserEntity user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User with ID " + userId + " not found"));
            videos = videoRepository.findAllByAssignedToUser(user);
        }
        return videos;
    }

    @Override
    public void updateVideo(Long videoId, MultipartFile videoFile, UploadVideoRequest request) throws IOException {

        VideoEntity existingVideo = videoRepository.findById(videoId)
                .orElseThrow(() -> new ResourceNotFoundException("Video not found with id: " + videoId));

        // unlink a file
        Path videoFilePath = fileUploadConfig.getUploadDir().resolve(existingVideo.getVideoUrl().substring(1));
        Files.deleteIfExists(videoFilePath);
        String videoUrl = saveVideo(videoFile);

        existingVideo.setTitle(request.getTitle());
        existingVideo.setDescription(request.getDescription());
        existingVideo.setVideoUrl(videoUrl);

        videoRepository.save(existingVideo);
    }

    @Override
    public void unlinkVideo(Long videoId) throws IOException {
        VideoEntity videoEntity = videoRepository.findById(videoId)
                .orElseThrow(() -> new ResourceNotFoundException("Video with ID " + videoId + " not found"));

        Path videoFilePath = fileUploadConfig.getUploadDir().resolve(videoEntity.getVideoUrl().substring(1));
        Files.deleteIfExists(videoFilePath);
        videoRepository.delete(videoEntity);
    }

    @Override
    public void assignVideoToUser(Long videoId, String assignedToUserId) {
        VideoEntity videoEntity = videoRepository.findById(videoId)
                .orElseThrow(() -> new ResourceNotFoundException("Video with ID " + videoId + " not found"));

        UserEntity userEntity = userRepository.findById(Long.valueOf(assignedToUserId))
                .orElseThrow(() -> new ResourceNotFoundException("User with ID " + assignedToUserId + " not found"));

        videoEntity.setAssignedToUser(userEntity);

        videoRepository.save(videoEntity);
    }

    private String getLoginRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        for (GrantedAuthority authority : authorities) {
            System.out.println("User Role: " + authority.getAuthority());
            return authority.getAuthority();
        }
        return "ROLE_ADMIN";
    }
}
