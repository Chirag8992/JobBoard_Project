package com.example.JobBoard.Model;

import jakarta.persistence.*;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  int id;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name="jobid",referencedColumnName = "jobId")
    private Job job;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name ="jobseekerId",referencedColumnName = "jsid")
    private  JobSeeker jobSeeker;

    private String resumeUrl;

    private String status;

    @ManyToOne
    @JoinColumn(name = "shortlisted_by")
    private Employee shortlistedBy;

    private LocalDateTime shortlistedDate;

    private LocalDateTime appliedDate;

    public Employee getShortlistedBy() {
        return shortlistedBy;
    }

    public void setShortlistedBy(Employee shortlistedBy) {
        this.shortlistedBy = shortlistedBy;
    }

    public LocalDateTime getShortlistedDate() {
        return shortlistedDate;
    }

    public void setShortlistedDate(LocalDateTime shortlistedDate) {
        this.shortlistedDate = shortlistedDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public JobSeeker getJobSeeker() {
        return jobSeeker;
    }

    public void setJobSeeker(JobSeeker jobSeeker) {
        this.jobSeeker = jobSeeker;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getAppliedDate() {
        return appliedDate;
    }

    public void setAppliedDate(LocalDateTime appliedDate) {
        this.appliedDate = appliedDate;
    }

    @Override
    public String toString() {
        return "Application{" +
                "id=" + id +
                ", jobId=" + (job != null ? job.getJobId() : null) +
                ", jobSeekerId=" + (jobSeeker != null ? jobSeeker.getJsid() : null) +
                ", resumeUrl='" + resumeUrl + '\'' +
                ", status='" + status + '\'' +
                ", appliedDate=" + appliedDate +
                '}';
    }

}
