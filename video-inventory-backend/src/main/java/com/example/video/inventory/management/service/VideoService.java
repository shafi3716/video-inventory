package com.example.video.inventory.management.service;

import com.example.video.inventory.management.dto.request.UploadVideoRequest;
import com.example.video.inventory.management.entity.VideoEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface VideoService {
    void uploadVideo(MultipartFile videoFile, UploadVideoRequest request) throws IOException;

    List<VideoEntity> getAllVideos(Long userId);

    void updateVideo(Long id, MultipartFile videoFile, UploadVideoRequest request) throws IOException;

    void unlinkVideo(Long id) throws IOException;

    void assignVideoToUser(Long id, String assignedToUserId);
}
