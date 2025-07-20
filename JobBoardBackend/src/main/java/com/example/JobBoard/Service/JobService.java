package com.example.JobBoard.Service;

//import com.example.SecurityApp.repo.JobRepo;
import com.example.JobBoard.Model.Job;
import com.example.JobBoard.repo.CompanyRepo;
import com.example.JobBoard.repo.EmployeeRepo;
import com.example.JobBoard.repo.JobRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobRepo jobRepo;

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private CompanyRepo companyRepo;

    public Job addJob(Job job) {
//        job.setCompany(companyRepo.findById(job.getCompany().getCompanyId()).orElseThrow(() -> new RuntimeException("Company not found")));
//        job.setEmployee(employeeRepo.findById(job.getEmployee().getEmpid()).orElseThrow(() -> new RuntimeException("Company not found")));
        jobRepo.save(job);
        return job;
    }

    public List<Job> getJobs() {
        return jobRepo.findAll();
    }
}
