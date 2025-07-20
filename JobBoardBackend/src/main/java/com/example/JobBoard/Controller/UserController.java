package com.example.JobBoard.Controller;

import com.example.JobBoard.Model.Users;
import com.example.JobBoard.Service.EmployeeService;
import com.example.JobBoard.Service.JobseekerService;
import com.example.JobBoard.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private JobseekerService jobseekerService;

    @GetMapping("/users")
    public List<Users> getUsers(){
        return service.getUsers();
    }

    @PostMapping("/users")
    public Users adduser(@RequestBody Users user ){
        return service.addUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users user){

        return service.verify(user);
    }
    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable int id){
        return service.deleteUser(id);
    }
}
