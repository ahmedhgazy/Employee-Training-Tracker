package com.training.tracking_service.repositories;

import com.training.tracking_service.models.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByEmployeeId(Long employeeId);
    List<Feedback> findByProgramId(Long programId);
    List<Feedback> findByEmployeeIdAndProgramId(Long employeeId, Long programId);
    List<Feedback> findByType(Feedback.FeedbackType type);
    List<Feedback> findByProvidedBy(String providedBy);
    List<Feedback> findByRatingGreaterThanEqual(Integer minRating);
    List<Feedback> findByFeedbackDateBetween(LocalDateTime start, LocalDateTime end);
}
