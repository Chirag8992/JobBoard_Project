package com.example.JobBoard.Service;


import com.example.JobBoard.Model.Users;
import com.example.JobBoard.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private  JWTService jwtService;

    @Autowired
    private UserRepo repo;

    @Autowired
    private AuthenticationManager authManager;

    public Users addUser(Users user){
        repo.save(user);
        return user;
    }

    public List<Users> getUsers(){
        return repo.findAll();
    }


    public ResponseEntity<?> verify(Users users) {
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(users.getEmail(), users.getPassword())
            );

            if (authentication.isAuthenticated()) {
                String token = jwtService.generateToken(users.getEmail());
                Users userrole = (repo.findByEmail(users.getEmail()));
                String role = userrole.getRole();

                Map<String, String> response = new HashMap<>();
                response.put("token", token);
                response.put("role", role);

                return ResponseEntity.ok(
                        response
                ); // Return token in body
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }

        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }


    public String deleteUser(int id) {
        repo.deleteById(id);
        return "deleted";
    }


}
