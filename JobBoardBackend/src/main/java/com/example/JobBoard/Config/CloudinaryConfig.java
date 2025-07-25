package com.example.JobBoard.Config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "dcicook7w");
        config.put("api_key","521957215823854");
        config.put("api_secret", "yPNsSfzOploQpUiAyhulQNZ_Pdg");
        config.put("secure", "true");
        return new Cloudinary(config);
    }
}

