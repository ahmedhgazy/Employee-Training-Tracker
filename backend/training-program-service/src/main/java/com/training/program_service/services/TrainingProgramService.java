package com.training.program_service.services;

import com.training.program_service.models.TrainingProgram;
import com.training.program_service.repositories.TrainingProgramRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TrainingProgramService {
    
    private final TrainingProgramRepository trainingProgramRepository;
    
    public List<TrainingProgram> getAllPrograms() {
        return trainingProgramRepository.findAll();
    }
    
    public Optional<TrainingProgram> getProgramById(Long id) {
        return trainingProgramRepository.findById(id);
    }
    
    public TrainingProgram createProgram(TrainingProgram program) {
        return trainingProgramRepository.save(program);
    }
    
    public TrainingProgram updateProgram(Long id, TrainingProgram updatedProgram) {
        updatedProgram.setId(id);
        return trainingProgramRepository.save(updatedProgram);
    }
    
    public void deleteProgram(Long id) {
        trainingProgramRepository.deleteById(id);
    }
    
    public List<TrainingProgram> getProgramsByCategory(String category) {
        return trainingProgramRepository.findByCategory(category);
    }
    
    public List<TrainingProgram> getProgramsByCreator(String createdBy) {
        return trainingProgramRepository.findByCreatedBy(createdBy);
    }
    
    public List<TrainingProgram> searchProgramsByName(String name) {
        return trainingProgramRepository.findByNameContainingIgnoreCase(name);
    }
}
