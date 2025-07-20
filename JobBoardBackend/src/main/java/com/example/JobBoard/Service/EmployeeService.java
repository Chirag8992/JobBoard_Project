package com.example.JobBoard.Service;

//import com.example.SecurityApp.Model.Employee;
//import com.example.SecurityApp.repo.EmployeeRepo;
import com.example.JobBoard.Model.Employee;
import com.example.JobBoard.repo.EmployeeRepo;
import com.example.JobBoard.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private UserRepo userRepo;

    public List<Employee> getEmployee(){
        return employeeRepo.findAll();
    }

    public void addUser(Employee e) {
        employeeRepo.save(e);
    }

    public void deleteUser(int id) {
        employeeRepo.deleteById(id);
    }

    public Employee findByEmail(String username) {
        return employeeRepo.findByEmail(username);
    }

    public void updateEmployee(Employee employee) {
        Employee e = employeeRepo.findByEmail(employee.getEmail());

        if(e!=null){
            e.setName(employee.getName());
            e.setUsername(employee.getUsername());
        }
    }
}
