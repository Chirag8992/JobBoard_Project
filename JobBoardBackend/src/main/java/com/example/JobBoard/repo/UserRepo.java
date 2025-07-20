package com.example.JobBoard.repo;

//import com.example.SecurityApp.Model.Users;
import com.example.JobBoard.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<Users,Integer> {
    //Users findByUsername(String name);
    Users findByEmail(String email);
}
