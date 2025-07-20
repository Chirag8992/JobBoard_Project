package com.example.JobBoard.Controller;

//import com.example.SecurityApp.Service.ApplicationService;
import com.example.JobBoard.Model.Application;
import com.example.JobBoard.Model.Employee;
import com.example.JobBoard.Service.ApplicationService;
import org.apache.tomcat.util.descriptor.web.ApplicationParameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@RestController
public class ApplicationController {
    @Autowired
    private ApplicationService applicationService;

    @GetMapping("/applications")
    public  List<Application> getAllApplications(){
        return applicationService.getAllApplications();
    }

    @GetMapping("/application")
    public List<Application> getApplications(@AuthenticationPrincipal UserDetails userDetails){
        String e = userDetails.getUsername() ;
//
                System.out.println("username"+e);
        return applicationService.getApplications(e);
    }

    @PostMapping("/application")
    public Application addApplication(@RequestBody Application application){
        application.setAppliedDate(LocalDateTime.now());
        application.setStatus("Pending");

        return applicationService.addApplication(application);
    }

    @PostMapping("/{applicationId}/shortlist")
    public ResponseEntity<String> shortlistApplication(
            @PathVariable int applicationId,
            @AuthenticationPrincipal UserDetails userDetails
            ) {

        try {

            applicationService.shortlistApplication(applicationId, userDetails.getUsername());
            return ResponseEntity.ok("Application shortlisted successfully and notification sent");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }


}
