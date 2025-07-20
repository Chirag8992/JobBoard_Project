package com.example.JobBoard.Model;

import jakarta.persistence.*;
import lombok.ToString;

import java.util.Arrays;

@Entity
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  int  jobId;

    private  String title;

    private  String description;

    private String location;

    private String salary;

    private  String type ;

    private String requirements;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "companyId",referencedColumnName = "companyId")
    private Company company;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "postedByEmployeeId",referencedColumnName = "empid")
    private Employee employee;

    @Override
    public String toString() {
        return "Job{" +
                "jobId=" + jobId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", location='" + location + '\'' +
                ", location='" + location + '\'' +
                ", type ='" + type + '\'' +
                ", requirement='" + requirements + '\'' +
                ", salary='" + salary + '\'' +
                ", companyId=" + (company != null ? company.getCompanyId() : null) +
                ", employeeId=" + (employee != null ? employee.getEmpid() : null) +
                '}';
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getRequirements() {
        return requirements;
    }

    public void setRequirements(String requirements) {
        this.requirements = requirements;
    }

    public int getJobId() {
        return jobId;
    }

    public void setJobId(int jobId) {
        this.jobId = jobId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
