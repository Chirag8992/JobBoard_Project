package com.example.JobBoard.Controller;


import com.example.JobBoard.Model.Application;
import com.example.JobBoard.Model.JobSeeker;
import com.example.JobBoard.Model.Users;
import com.example.JobBoard.Service.JobseekerService;
import com.example.JobBoard.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
public class JobSeekerController {

    BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();


    @Autowired
    private JobseekerService jobseekerService;

    @Autowired
    private UserService userService;

    @GetMapping("/JobSeeker")
    public List<JobSeeker> getJobseekers(){
        return jobseekerService.getJobSeekers();
    }

    @GetMapping("/Jobseeker/{username}")
    public ResponseEntity<?> getJobseekerByName(@PathVariable String username){
        return jobseekerService.getJobSeekersByName(username);
    }

    @GetMapping("/Jobseeker/name")
    public ResponseEntity<?> getJobSeekerName(@AuthenticationPrincipal UserDetails userDetails){
        return ResponseEntity.ok(jobseekerService.getJobSeekerName(userDetails.getUsername()).getUsername());
    }

    @GetMapping("/Jobseeker/object")
    public ResponseEntity<?> getJobSeekerByName(@AuthenticationPrincipal UserDetails userDetails){
        return ResponseEntity.ok(jobseekerService.getJobSeekerName(userDetails.getUsername()));
    }

    @PostMapping("register/Jobseeker")
    public JobSeeker addJobSeeker(@RequestBody JobSeeker j){

        j.setPassword(bcrypt.encode(j.getPassword()));
        jobseekerService.addUser(j);

        Users user = new Users();
        user.setPassword(j.getPassword());
        user.setEmail(j.getEmail());
        user.setRole("JobSeeker");
        userService.addUser(user);

        return j;
    }

    @PostMapping("/resume/upload")
    public ResponseEntity<String> uploadResume(@RequestParam("file") MultipartFile file,@AuthenticationPrincipal UserDetails userDetails) {
        try {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path path = Paths.get("uploads/" + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            String resumeUrl = "/uploads/" + fileName; // This will be stored in DB
            jobseekerService.addResume(resumeUrl, userDetails.getUsername());
            return ResponseEntity.ok(resumeUrl);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed");
        }
    }

    @PutMapping("/jobSeeker")
    public void updateJobseeker(@RequestBody JobSeeker jobSeeker){
        jobseekerService.updateJobSeeker(jobSeeker);
    }

    @DeleteMapping("/JobSeeker/{id}")
    public void DeleteJobSeeker(@PathVariable int id){
        jobseekerService.deleteJobSeeker(id);
    }
}
