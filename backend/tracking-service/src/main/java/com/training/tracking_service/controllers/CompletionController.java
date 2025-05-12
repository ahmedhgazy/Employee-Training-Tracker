package com.training.tracking_service.controllers;

import com.training.tracking_service.models.Completion;
import com.training.tracking_service.services.CompletionService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/tracking/completions")
@RequiredArgsConstructor
public class CompletionController {
    
    private final CompletionService completionService;
    
    @GetMapping
    public ResponseEntity<List<Completion>> getAllCompletions() {
        return ResponseEntity.ok(completionService.getAllCompletions());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Completion> getCompletionById(@PathVariable Long id) {
        return completionService.getCompletionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Completion> recordCompletion(@RequestBody Completion completion) {
        return new ResponseEntity<>(completionService.recordCompletion(completion), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Completion> updateCompletion(@PathVariable Long id, @RequestBody Completion completion) {
        return ResponseEntity.ok(completionService.updateCompletion(id, completion));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompletion(@PathVariable Long id) {
        completionService.deleteCompletion(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Completion>> getCompletionsByEmployeeId(@PathVariable Long employeeId) {
        return ResponseEntity.ok(completionService.getCompletionsByEmployeeId(employeeId));
    }
    
    @GetMapping("/program/{programId}")
    public ResponseEntity<List<Completion>> getCompletionsByProgramId(@PathVariable Long programId) {
        return ResponseEntity.ok(completionService.getCompletionsByProgramId(programId));
    }
    
    @GetMapping("/employee/{employeeId}/program/{programId}")
    public ResponseEntity<Completion> getCompletionByEmployeeAndProgram(
            @PathVariable Long employeeId,
            @PathVariable Long programId) {
        return completionService.getCompletionByEmployeeAndProgram(employeeId, programId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Completion>> getCompletionsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(completionService.getCompletionsByStatus(status));
    }
    
    @GetMapping("/date-range")
    public ResponseEntity<List<Completion>> getCompletionsInDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(completionService.getCompletionsInDateRange(start, end));
    }
    
    @GetMapping("/completed-by/{completedBy}")
    public ResponseEntity<List<Completion>> getCompletionsByCompletedBy(@PathVariable String completedBy) {
        return ResponseEntity.ok(completionService.getCompletionsByCompletedBy(completedBy));
    }
}
