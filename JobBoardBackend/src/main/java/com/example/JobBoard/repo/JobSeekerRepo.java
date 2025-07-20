package com.example.JobBoard.repo;

//import com.example.SecurityApp.Model.JobSeeker;
import com.example.JobBoard.Model.JobSeeker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobSeekerRepo extends JpaRepository<JobSeeker,Integer> {
    JobSeeker findByUsername(String username);
    JobSeeker findByEmail(String email);
}
