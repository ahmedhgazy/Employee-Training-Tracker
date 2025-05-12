package com.training.program_service.repositories;

import com.training.program_service.models.TrainingProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainingProgramRepository extends JpaRepository<TrainingProgram, Long> {
    List<TrainingProgram> findByCategory(String category);
    List<TrainingProgram> findByCreatedBy(String createdBy);
    List<TrainingProgram> findByNameContainingIgnoreCase(String name);
}
