package com.example.JobBoard.Controller;

//import com.example.SecurityApp.Service.CompanyService;
import com.example.JobBoard.Model.Company;
import com.example.JobBoard.Service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.method.AuthorizeReturnObject;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class CompanyController {
    @Autowired
    private CompanyService companyService;

    @GetMapping("/company")
    public List<Company> getCompanies (){
        return companyService.getCompanies();
    }

    @GetMapping("/company/name")
    public ResponseEntity<?> getConampanyByName(@AuthenticationPrincipal UserDetails userDetails){

        return ResponseEntity.ok(companyService.getCompany(userDetails.getUsername()));
    }
    @PostMapping("/company")
    public Company addCompany(@RequestBody Company company){
       return companyService.addCompany(company);
    }

    @PutMapping("/company")

    public ResponseEntity<?> updateCompany(@RequestBody Company company){
        return companyService.updateCompany(company);
    }
}

