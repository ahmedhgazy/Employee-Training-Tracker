package com.training.program_service.services;

import com.training.program_service.models.TrainingProgram;
import com.training.program_service.models.TrainingSession;
import com.training.program_service.repositories.TrainingProgramRepository;
import com.training.program_service.repositories.TrainingSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TrainingSessionService {
    
    private final TrainingSessionRepository sessionRepository;
    private final TrainingProgramRepository programRepository;
    
    public List<TrainingSession> getAllSessions() {
        return sessionRepository.findAll();
    }
    
    public Optional<TrainingSession> getSessionById(Long id) {
        return sessionRepository.findById(id);
    }
    
    @Transactional
    public TrainingSession createSession(Long programId, TrainingSession session) {
        TrainingProgram program = programRepository.findById(programId)
                .orElseThrow(() -> new RuntimeException("Training Program not found with id: " + programId));
        
        session.setTrainingProgram(program);
        return sessionRepository.save(session);
    }
    
    @Transactional
    public TrainingSession updateSession(Long id, TrainingSession updatedSession) {
        TrainingSession existingSession = sessionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Training Session not found with id: " + id));
        
        updatedSession.setId(id);
        updatedSession.setTrainingProgram(existingSession.getTrainingProgram());
        return sessionRepository.save(updatedSession);
    }
    
    public void deleteSession(Long id) {
        sessionRepository.deleteById(id);
    }
    
    public List<TrainingSession> getSessionsByProgramId(Long programId) {
        return sessionRepository.findByTrainingProgramId(programId);
    }
    
    public List<TrainingSession> getSessionsByTrainer(String trainer) {
        return sessionRepository.findByTrainer(trainer);
    }
    
    public List<TrainingSession> getSessionsByDateRange(LocalDateTime start, LocalDateTime end) {
        return sessionRepository.findByStartTimeBetween(start, end);
    }
    
    public List<TrainingSession> getSessionsByLocation(String location) {
        return sessionRepository.findByLocationIgnoreCase(location);
    }
}
