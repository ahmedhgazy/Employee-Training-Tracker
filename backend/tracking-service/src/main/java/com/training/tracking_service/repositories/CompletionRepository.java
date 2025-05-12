package com.training.tracking_service.repositories;

import com.training.tracking_service.models.Completion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CompletionRepository extends JpaRepository<Completion, Long> {
    List<Completion> findByEmployeeId(Long employeeId);
    List<Completion> findByProgramId(Long programId);
    Optional<Completion> findByEmployeeIdAndProgramId(Long employeeId, Long programId);
    List<Completion> findByStatus(String status);
    List<Completion> findByCompletionDateBetween(LocalDateTime start, LocalDateTime end);
    List<Completion> findByCompletedBy(String completedBy);
}
