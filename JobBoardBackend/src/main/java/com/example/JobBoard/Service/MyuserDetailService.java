package com.example.JobBoard.Service;

import com.example.JobBoard.Model.UserPrincipal;
import com.example.JobBoard.Model.Users;
import com.example.JobBoard.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyuserDetailService implements UserDetailsService {
    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
         Users user = userRepo.findByEmail(email);

         if(user == null){
             System.out.println("user Not Found");
             throw  new UsernameNotFoundException("user Not Found");
         }

         return new UserPrincipal(user);
    }
}
