package com.example.JobBoard.Service;

//import com.example.SecurityApp.Model.JobSeeker;
//import com.example.SecurityApp.repo.JobSeekerRepo;
import com.example.JobBoard.Model.Application;
import com.example.JobBoard.Model.JobSeeker;
import com.example.JobBoard.repo.JobSeekerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobseekerService {
    @Autowired
    private JobSeekerRepo jobSeekerRepo;

    public void addUser(JobSeeker j) {
        jobSeekerRepo.save(j);
    }

    public List<JobSeeker> getJobSeekers() {
        return jobSeekerRepo.findAll();
    }

    public void deleteJobSeeker(int id) {
        jobSeekerRepo.deleteById(id);
    }

    public ResponseEntity<?> getJobSeekersByName(String username) {
        List<Application> ans = jobSeekerRepo.findByUsername(username).getApplications();
        return  ResponseEntity.of(Optional.ofNullable(ans));
    }

    public JobSeeker getJobSeekerName(String username) {
        return jobSeekerRepo.findByEmail(username);
    }

    public void updateJobSeeker(JobSeeker jobSeeker) {
        JobSeeker j = jobSeekerRepo.findByEmail(jobSeeker.getEmail());

        if(j!=null){
            j.setUsername(jobSeeker.getUsername());
            j.setName(jobSeeker.getName());
            j.setResumeURL(jobSeeker.getResumeURL());
            j.setSkills(jobSeeker.getSkills());
        }
        else{
            System.out.println("user not found");
        }
    }

    public void addResume(String resumeUrl,String email) {
        JobSeeker j = jobSeekerRepo.findByEmail(email);
        j.setResumeURL(resumeUrl);
        jobSeekerRepo.save(j);
    }
}
