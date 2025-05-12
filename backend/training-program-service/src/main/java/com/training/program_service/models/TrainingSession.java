package com.training.program_service.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainingSession {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String location;
    private String trainer;
    private Integer maxAttendees;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "training_program_id")
    @JsonIgnore
    private TrainingProgram trainingProgram;
}
