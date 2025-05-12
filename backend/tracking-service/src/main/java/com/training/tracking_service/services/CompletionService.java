package com.training.tracking_service.services;

import com.training.tracking_service.models.Completion;
import com.training.tracking_service.repositories.CompletionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CompletionService {
    
    private final CompletionRepository completionRepository;
    
    public List<Completion> getAllCompletions() {
        return completionRepository.findAll();
    }
    
    public Optional<Completion> getCompletionById(Long id) {
        return completionRepository.findById(id);
    }
    
    @Transactional
    public Completion recordCompletion(Completion completion) {
        completion.setCompletionDate(LocalDateTime.now());
        return completionRepository.save(completion);
    }
    
    @Transactional
    public Completion updateCompletion(Long id, Completion updatedCompletion) {
        updatedCompletion.setId(id);
        return completionRepository.save(updatedCompletion);
    }
    
    public void deleteCompletion(Long id) {
        completionRepository.deleteById(id);
    }
    
    public List<Completion> getCompletionsByEmployeeId(Long employeeId) {
        return completionRepository.findByEmployeeId(employeeId);
    }
    
    public List<Completion> getCompletionsByProgramId(Long programId) {
        return completionRepository.findByProgramId(programId);
    }
    
    public Optional<Completion> getCompletionByEmployeeAndProgram(Long employeeId, Long programId) {
        return completionRepository.findByEmployeeIdAndProgramId(employeeId, programId);
    }
    
    public List<Completion> getCompletionsByStatus(String status) {
        return completionRepository.findByStatus(status);
    }
    
    public List<Completion> getCompletionsInDateRange(LocalDateTime start, LocalDateTime end) {
        return completionRepository.findByCompletionDateBetween(start, end);
    }
    
    public List<Completion> getCompletionsByCompletedBy(String completedBy) {
        return completionRepository.findByCompletedBy(completedBy);
    }
}
