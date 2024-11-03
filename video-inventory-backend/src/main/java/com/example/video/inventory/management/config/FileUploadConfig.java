package com.example.video.inventory.management.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class FileUploadConfig {

    @Value("${file.upload-dir}")
    private String uploadDir;

    public Path getUploadDir() {
        return Paths.get(uploadDir).toAbsolutePath();
    }
}

