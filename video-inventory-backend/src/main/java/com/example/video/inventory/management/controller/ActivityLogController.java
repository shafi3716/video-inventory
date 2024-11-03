package com.example.video.inventory.management.controller;

import com.example.video.inventory.management.dto.request.ActivityRequest;
import com.example.video.inventory.management.entity.ActivityLogEntity;
import com.example.video.inventory.management.service.ActivityLogService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activity-logs")
public class ActivityLogController {

    @Autowired
    private ActivityLogService activityLogService;

    @PostMapping
    public ResponseEntity<?> saveActivity(@Valid @RequestBody ActivityRequest request) {
        activityLogService.saveActivity(request);
        return ResponseEntity.ok("Activity logged successfully.");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<ActivityLogEntity>> getAllActivities() {
        List<ActivityLogEntity> activities = activityLogService.getAllActivities();
        return ResponseEntity.ok(activities);
    }
}
