package com.example.JobBoard.repo;

//import com.example.SecurityApp.Model.Job;
import com.example.JobBoard.Model.Employee;
import com.example.JobBoard.Model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepo extends JpaRepository<Job,Integer> {
    List<Job> findByemployee(Employee e);
}
