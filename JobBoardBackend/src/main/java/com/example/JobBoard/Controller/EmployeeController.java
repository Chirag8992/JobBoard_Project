package com.example.JobBoard.Controller;

//import com.example.SecurityApp.Model.Employee;
//import com.example.SecurityApp.Model.Users;
//import com.example.SecurityApp.Service.EmployeeService;
//import com.example.SecurityApp.Service.UserService;
import com.example.JobBoard.Model.Employee;
import com.example.JobBoard.Model.Users;
import com.example.JobBoard.Service.EmployeeService;
import com.example.JobBoard.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class EmployeeController {

    BCryptPasswordEncoder bcyript = new BCryptPasswordEncoder();

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private UserService users;

    @GetMapping("/employee")
    public List<Employee> getEmployee(){
        return employeeService.getEmployee();
    }

    @GetMapping("/employee/name")
    public ResponseEntity<?> getEmployeeName(@AuthenticationPrincipal UserDetails userDetails){
        Employee e = employeeService.findByEmail(userDetails.getUsername());
        return ResponseEntity.ok(e.getUsername());
    }
    @GetMapping("/employee/object")
    public ResponseEntity<?> getEmployeeByName(@AuthenticationPrincipal UserDetails userDetails){
        Employee e = employeeService.findByEmail(userDetails.getUsername());
        return ResponseEntity.ok(e);
    }

    @PostMapping("register/employee")
    public Employee addEmployee(@RequestBody Employee e){
        e.setPassword(bcyript.encode(e.getPassword()));
        employeeService.addUser(e);

        Users user = new Users();
        user.setEmail(e.getEmail());
        user.setPassword(e.getPassword());
        user.setRole("Employee");

        users.addUser(user);
        return e;
    }

    @PutMapping("/employee")
    public void updateEmployee(@RequestBody Employee employee){
        employeeService.updateEmployee(employee);
    }

    @DeleteMapping("/employee/{id}")
    public  void deleteUser(@PathVariable int id){
        employeeService.deleteUser(id);
    }
}
