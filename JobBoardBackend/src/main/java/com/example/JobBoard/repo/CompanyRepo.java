package com.example.JobBoard.repo;

//import com.example.SecurityApp.Model.Company;
import com.example.JobBoard.Model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepo extends JpaRepository<Company,Integer> {
        Company findByCompanyName(String name);
}
