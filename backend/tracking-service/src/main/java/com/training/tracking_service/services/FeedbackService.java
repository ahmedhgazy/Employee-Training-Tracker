package com.training.tracking_service.services;

import com.training.tracking_service.models.Feedback;
import com.training.tracking_service.repositories.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FeedbackService {
    
    private final FeedbackRepository feedbackRepository;
    
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }
    
    public Optional<Feedback> getFeedbackById(Long id) {
        return feedbackRepository.findById(id);
    }
    
    @Transactional
    public Feedback recordFeedback(Feedback feedback) {
        feedback.setFeedbackDate(LocalDateTime.now());
        return feedbackRepository.save(feedback);
    }
    
    @Transactional
    public Feedback updateFeedback(Long id, Feedback updatedFeedback) {
        updatedFeedback.setId(id);
        return feedbackRepository.save(updatedFeedback);
    }
    
    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }
    
    public List<Feedback> getFeedbackByEmployeeId(Long employeeId) {
        return feedbackRepository.findByEmployeeId(employeeId);
    }
    
    public List<Feedback> getFeedbackByProgramId(Long programId) {
        return feedbackRepository.findByProgramId(programId);
    }
    
    public List<Feedback> getFeedbackByEmployeeAndProgram(Long employeeId, Long programId) {
        return feedbackRepository.findByEmployeeIdAndProgramId(employeeId, programId);
    }
    
    public List<Feedback> getFeedbackByType(Feedback.FeedbackType type) {
        return feedbackRepository.findByType(type);
    }
    
    public List<Feedback> getFeedbackByProvidedBy(String providedBy) {
        return feedbackRepository.findByProvidedBy(providedBy);
    }
    
    public List<Feedback> getFeedbackByMinimumRating(Integer minRating) {
        return feedbackRepository.findByRatingGreaterThanEqual(minRating);
    }
    
    public List<Feedback> getFeedbackInDateRange(LocalDateTime start, LocalDateTime end) {
        return feedbackRepository.findByFeedbackDateBetween(start, end);
    }
}
