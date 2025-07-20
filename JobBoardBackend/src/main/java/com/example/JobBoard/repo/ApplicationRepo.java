package com.example.JobBoard.repo;

//import com.example.SecurityApp.Model.Application;
import com.example.JobBoard.Model.Application;
import com.example.JobBoard.Model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepo extends JpaRepository<Application,Integer> {

    List<Application> findByJob(Job j);

}
