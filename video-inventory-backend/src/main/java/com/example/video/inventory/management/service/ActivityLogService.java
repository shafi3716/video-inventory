package com.example.video.inventory.management.service;

import com.example.video.inventory.management.dto.request.ActivityRequest;
import com.example.video.inventory.management.entity.ActivityLogEntity;

import java.util.List;

public interface ActivityLogService {
    List<ActivityLogEntity> getAllActivities();

    void saveActivity(ActivityRequest action);
}

