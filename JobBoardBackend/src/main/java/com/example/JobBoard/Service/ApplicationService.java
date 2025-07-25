package com.example.JobBoard.Service;

//import com.example.SecurityApp.repo.ApplicationRepo;
import com.example.JobBoard.Model.Application;
import com.example.JobBoard.Model.Employee;
import com.example.JobBoard.Model.Job;
import com.example.JobBoard.Model.JobSeeker;
import com.example.JobBoard.repo.ApplicationRepo;
import com.example.JobBoard.repo.EmployeeRepo;
import com.example.JobBoard.repo.JobRepo;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class ApplicationService {
    @Autowired
    private ApplicationRepo applicationRepo;

    @Autowired
    private JobRepo jobRepo;

    @Autowired
    private EmployeeRepo employeeRepo;


    public Application addApplication(Application application) {
        applicationRepo.save(application);
        return application;
    }

    public List<Application> getApplications(String username) {
        Employee employee = employeeRepo.findByEmail(username);
        System.out.println(employee);
        if (employee == null) {
            throw new RuntimeException("No employee found with username: " + username);
        }

        List<Job> j = jobRepo.findByemployee(employee);
        System.out.println(j);
        List<Application> app = new ArrayList<>();


        for (Job job : j) {
            app.addAll(applicationRepo.findByJob(job));
        }
        System.out.println(app);
        return app;
    }

    @Autowired
    private EmailService emailService;

    private static final Logger logger = LoggerFactory.getLogger(ApplicationService.class);

    public void shortlistApplication(int applicationId, String email) {
        try {
            // Get application details
            Application application = applicationRepo.findById(applicationId)
                    .orElseThrow(() -> new RuntimeException("Application not found with id: " + applicationId));

            // Check if already shortlisted
            if (Objects.equals(application.getStatus(), "Shortlisted")) {
                throw new RuntimeException("Application is already shortlisted");
            }

            // Get employee details
            Employee employee = employeeRepo.findByEmail(email);

            // Update application status
            application.setStatus("Accepted");
            application.setShortlistedBy(employee);
            application.setShortlistedDate(LocalDateTime.now());

            applicationRepo.save(application);

            // Send email notification

            JobSeeker jobSeeker = application.getJobSeeker();
            Job job = application.getJob();

            emailService.sendShortlistNotification(
                    jobSeeker.getEmail(),
                    jobSeeker.getName(),
                    job.getTitle(),
                    job.getCompany().getCompanyName(),
                    employee.getName()+" "+job.getCompany().getCompanyName()
            );

            logger.info("Application {} shortlisted successfully by employee {}",
                    applicationId, employee.getName());

        } catch (Exception e) {
            logger.error("Error shortlisting application: " + applicationId, e);
            throw new RuntimeException("Failed to shortlist application", e);
        }
    }

    public List<Application> getAllApplications() {
        return applicationRepo.findAll();
    }

    public ResponseEntity<?> rejectApplication(int applicationId) {
        Application a = applicationRepo.findById(applicationId).orElse(null);

        if(a == null){
            return ResponseEntity.notFound().build();
        }

        a.setStatus("Reject");
        return ResponseEntity.ok("rejected successfully ");
    }
}
