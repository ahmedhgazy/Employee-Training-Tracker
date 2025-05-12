package com.training.program_service.controllers;

import com.training.program_service.models.TrainingSession;
import com.training.program_service.services.TrainingSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/training/sessions")
@RequiredArgsConstructor
public class TrainingSessionController {
    
    private final TrainingSessionService sessionService;
    
    @GetMapping
    public ResponseEntity<List<TrainingSession>> getAllSessions() {
        return ResponseEntity.ok(sessionService.getAllSessions());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TrainingSession> getSessionById(@PathVariable Long id) {
        return sessionService.getSessionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/program/{programId}")
    public ResponseEntity<TrainingSession> createSession(
            @PathVariable Long programId,
            @RequestBody TrainingSession session) {
        return new ResponseEntity<>(sessionService.createSession(programId, session), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TrainingSession> updateSession(
            @PathVariable Long id,
            @RequestBody TrainingSession session) {
        return ResponseEntity.ok(sessionService.updateSession(id, session));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSession(@PathVariable Long id) {
        sessionService.deleteSession(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/program/{programId}")
    public ResponseEntity<List<TrainingSession>> getSessionsByProgramId(@PathVariable Long programId) {
        return ResponseEntity.ok(sessionService.getSessionsByProgramId(programId));
    }
    
    @GetMapping("/trainer/{trainer}")
    public ResponseEntity<List<TrainingSession>> getSessionsByTrainer(@PathVariable String trainer) {
        return ResponseEntity.ok(sessionService.getSessionsByTrainer(trainer));
    }
    
    @GetMapping("/date-range")
    public ResponseEntity<List<TrainingSession>> getSessionsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(sessionService.getSessionsByDateRange(start, end));
    }
    
    @GetMapping("/location")
    public ResponseEntity<List<TrainingSession>> getSessionsByLocation(@RequestParam String location) {
        return ResponseEntity.ok(sessionService.getSessionsByLocation(location));
    }
}
