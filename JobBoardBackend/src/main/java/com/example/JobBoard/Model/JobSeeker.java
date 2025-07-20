package com.example.JobBoard.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.ToString;
import org.hibernate.validator.constraints.UniqueElements;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
public class JobSeeker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int jsid;

    private String name;

    @NotBlank
    @Column(unique = true)
    private String username;

    @NotBlank
    @Email
    private String email;

    @Size(min=4,message = "Password should have minimum 4 length")
    private String password;

    private String skills ;

    private String ResumeURL;

    @JsonIgnore
    @OneToMany(mappedBy = "jobSeeker")
    private List<Application> applications;


    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public int getJsid() {
        return jsid;
    }

    public void setJsid(int jsid) {
        this.jsid = jsid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getResumeURL() {
        return ResumeURL;
    }

    public void setResumeURL(String resumeURL) {
        ResumeURL = resumeURL;
    }





    public List<Application> getApplications() {
        return applications;
    }

    public void setApplications(List<Application> applications) {
        this.applications = applications;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "JobSeeker{" +
                "jsid=" + jsid +
                ", name='" + name + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", Skills=" +skills +
                ", ResumeURL='" + ResumeURL + '\'' +
                ", applications=" + applications +
                '}';
    }
}
