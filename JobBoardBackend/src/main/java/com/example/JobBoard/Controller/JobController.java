package com.example.JobBoard.Controller;

//import com.example.SecurityApp.Model.JobSeeker;
//import com.example.SecurityApp.Service.JobService;
import com.example.JobBoard.Model.Employee;
import com.example.JobBoard.Model.Job;
import com.example.JobBoard.Service.JobService;
import com.example.JobBoard.repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class JobController {
    @Autowired
    private JobService jobService;

    @Autowired
    private EmployeeRepo employeeRepo;

    @GetMapping("/job")
    public List<Job> getJobs(){
        System.out.println(jobService.getJobs());
        return jobService.getJobs();

    }

    @PostMapping("/job")
    public Job addJob(@RequestBody Job job,@AuthenticationPrincipal UserDetails userDetails){
        String username = userDetails.getUsername();
        Employee e = employeeRepo.findByEmail(username);
        job.setEmployee(e);
        return jobService.addJob(job);
    }
}
