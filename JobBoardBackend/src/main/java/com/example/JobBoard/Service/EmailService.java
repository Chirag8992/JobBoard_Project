package com.example.JobBoard.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    public void sendShortlistNotification(String jobSeekerEmail, String jobSeekerName,
                                          String jobTitle, String companyName, String employeeName) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(jobSeekerEmail);
            message.setSubject("Great News! Your Application Has Been Shortlisted");
            message.setText(buildEmailContent(jobSeekerName, jobTitle, companyName, employeeName));
            message.setFrom("noreply@yourcompany.com");

            mailSender.send(message);
            logger.info("Shortlist notification sent to: " + jobSeekerEmail);

        } catch (Exception e) {
            logger.error("Failed to send shortlist notification to: " + jobSeekerEmail, e);
            throw new RuntimeException("Email sending failed", e);
        }
    }

    private String buildEmailContent(String jobSeekerName, String jobTitle,
                                     String companyName, String employeeName) {
        return String.format(
                "Dear %s,\n\n" +
                        "Congratulations! We are pleased to inform you that your application for the position of '%s' at %s has been shortlisted.\n\n" +
                        "Your profile has been reviewed by %s from our hiring team, and we are impressed with your qualifications.\n\n" +
                        "Next Steps:\n" +
                        "- Our HR team will contact you within 2-3 business days\n" +
                        "- Please keep your phone accessible for further communication\n" +
                        "- Prepare for the next round of the selection process\n\n" +
                        "We look forward to moving forward with your application.\n\n" +
                        "Best regards,\n" +
                        "%s Hiring Team\n\n" +
                        "Note: This is an automated message. Please do not reply to this email.",
                jobSeekerName, jobTitle, companyName, employeeName, companyName
        );
    }
}
