package com.example.JobBoard.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class AsyncEmailService {

    @Autowired
    private EmailService emailService;

    @Async
    public CompletableFuture<Void> sendShortlistNotificationAsync(String jobSeekerEmail,
                                                                  String jobSeekerName,
                                                                  String jobTitle,
                                                                  String companyName,
                                                                  String employeeName) {
        emailService.sendShortlistNotification(jobSeekerEmail, jobSeekerName, jobTitle, companyName, employeeName);
        return CompletableFuture.completedFuture(null);
    }
}
