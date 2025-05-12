package com.training.program_service.controllers;

import com.training.program_service.models.TrainingProgram;
import com.training.program_service.services.TrainingProgramService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/training/programs")
@RequiredArgsConstructor
public class TrainingProgramController {
    
    private final TrainingProgramService programService;
    
    @GetMapping
    public ResponseEntity<List<TrainingProgram>> getAllPrograms() {
        return ResponseEntity.ok(programService.getAllPrograms());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TrainingProgram> getProgramById(@PathVariable Long id) {
        return programService.getProgramById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<TrainingProgram> createProgram(@RequestBody TrainingProgram program) {
        return new ResponseEntity<>(programService.createProgram(program), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TrainingProgram> updateProgram(@PathVariable Long id, @RequestBody TrainingProgram program) {
        return ResponseEntity.ok(programService.updateProgram(id, program));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProgram(@PathVariable Long id) {
        programService.deleteProgram(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<TrainingProgram>> getProgramsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(programService.getProgramsByCategory(category));
    }
    
    @GetMapping("/creator/{createdBy}")
    public ResponseEntity<List<TrainingProgram>> getProgramsByCreator(@PathVariable String createdBy) {
        return ResponseEntity.ok(programService.getProgramsByCreator(createdBy));
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<TrainingProgram>> searchProgramsByName(@RequestParam String name) {
        return ResponseEntity.ok(programService.searchProgramsByName(name));
    }
}
