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
public class Completion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long employeeId;
    private Long programId;
    private String employeeName;
    private String programName;
    private LocalDateTime completionDate;
    private Double score;
    private String status; // COMPLETE, INCOMPLETE, FAILED
    private String certificateUrl;
    private String completedBy; // Trainer who marked the completion
}
