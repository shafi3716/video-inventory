package com.example.video.inventory.management.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "video")
public class VideoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    private String description;

    @Column(name = "video_url", nullable = false, length = 255)
    private String videoUrl;

    @ManyToOne
    @JoinColumn(name = "assigned_to_user_id", referencedColumnName = "id", nullable = false)
    private UserEntity assignedToUser;
}
