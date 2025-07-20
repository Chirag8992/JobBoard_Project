package com.example.JobBoard.repo;

//import com.example.SecurityApp.Model.Employee;
import com.example.JobBoard.Model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee,Integer> {
    Employee findByEmail(String email);
    Employee findByUsername(String username);
}
