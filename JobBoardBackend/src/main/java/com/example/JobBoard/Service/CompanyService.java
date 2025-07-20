package com.example.JobBoard.Service;

//import com.example.SecurityApp.repo.CompanyRepo;
import com.example.JobBoard.Model.Company;
import com.example.JobBoard.repo.CompanyRepo;
import com.example.JobBoard.repo.EmployeeRepo;
import org.apache.logging.log4j.message.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {
    @Autowired
    private CompanyRepo companyRepo;

    @Autowired
    private EmployeeRepo employeeRepo;

    public Company addCompany(Company company) {
        companyRepo.save(company);
        return company;
    }

    public List<Company> getCompanies() {
        return companyRepo.findAll();
    }

    public ResponseEntity<?> updateCompany(Company company) {
        System.out.println("company updated .." );
        Company c = companyRepo.findByCompanyName(company.getCompanyName());
        if(c!=null) {
            c.setDescription(company.getDescription());
            c.setLocation(company.getLocation());
            companyRepo.save(c);
            return ResponseEntity.ok("updated");
        }
        return ResponseEntity.notFound().build();
    }

    public Company getCompany(String username) {
        System.out.println(employeeRepo.findByEmail(username).getCompany());
        return employeeRepo.findByEmail(username).getCompany();
    }
}
