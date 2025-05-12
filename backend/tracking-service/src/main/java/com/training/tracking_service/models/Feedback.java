package com.training.tracking_service.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Feedback {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long employeeId;
    private Long programId;
    private String employeeName;
    private String programName;
    private Integer rating; // 1-5 rating scale
    private String comments;
    private String providedBy; // Trainer or system
    private LocalDateTime feedbackDate;
    
    @Enumerated(EnumType.STRING)
    private FeedbackType type;
    
    public enum FeedbackType {
        TRAINER_TO_EMPLOYEE,  // Trainer gives feedback to employee
        EMPLOYEE_TO_PROGRAM,  // Employee rates the program
        SYSTEM_GENERATED      // System generated feedback based on metrics
    }
}
