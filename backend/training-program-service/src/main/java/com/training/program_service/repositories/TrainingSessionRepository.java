package com.training.program_service.repositories;

import com.training.program_service.models.TrainingSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TrainingSessionRepository extends JpaRepository<TrainingSession, Long> {
    List<TrainingSession> findByTrainingProgramId(Long programId);
    List<TrainingSession> findByTrainer(String trainer);
    List<TrainingSession> findByStartTimeBetween(LocalDateTime start, LocalDateTime end);
    List<TrainingSession> findByLocationIgnoreCase(String location);
}
