package com.example.video.inventory.management.repository;


import com.example.video.inventory.management.entity.UserEntity;
import com.example.video.inventory.management.entity.VideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VideoRepository extends JpaRepository<VideoEntity, Long> {
    List<VideoEntity> findAllByAssignedToUser(UserEntity assignedToUser);
}
