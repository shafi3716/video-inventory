package com.example.video.inventory.management.service;

import com.example.video.inventory.management.dto.request.ActivityRequest;
import com.example.video.inventory.management.entity.ActivityLogEntity;
import com.example.video.inventory.management.entity.UserEntity;
import com.example.video.inventory.management.entity.VideoEntity;
import com.example.video.inventory.management.exception.ResourceNotFoundException;
import com.example.video.inventory.management.repository.ActivityLogRepository;
import com.example.video.inventory.management.repository.UserRepository;
import com.example.video.inventory.management.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ActivityLogServiceImpl implements ActivityLogService {

    @Autowired
    private ActivityLogRepository activityLogRepository;

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<ActivityLogEntity> getAllActivities() {
        return activityLogRepository.findAll();
    }

    @Override
    public void saveActivity(ActivityRequest request) {
        VideoEntity videoEntity = videoRepository.findById(Long.valueOf(request.getVideoId()))
                .orElseThrow(() -> new ResourceNotFoundException("Video with ID " + request.getVideoId() + " not found"));

        UserEntity userEntity = userRepository.findById(Long.valueOf(request.getUserId()))
                .orElseThrow(() -> new ResourceNotFoundException("User with ID " + request.getUserId() + " not found"));

        ActivityLogEntity log = ActivityLogEntity.builder()
                .action(request.getAction())
                .user(userEntity)
                .video(videoEntity)
                .timestamp(LocalDateTime.now())
                .build();
        activityLogRepository.save(log);
    }
}
