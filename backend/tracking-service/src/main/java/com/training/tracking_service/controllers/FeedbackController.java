package com.training.tracking_service.controllers;

import com.training.tracking_service.models.Feedback;
import com.training.tracking_service.services.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/tracking/feedback")
@RequiredArgsConstructor
public class FeedbackController {
    
    private final FeedbackService feedbackService;
    
    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedback() {
        return ResponseEntity.ok(feedbackService.getAllFeedback());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long id) {
        return feedbackService.getFeedbackById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Feedback> recordFeedback(@RequestBody Feedback feedback) {
        return new ResponseEntity<>(feedbackService.recordFeedback(feedback), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Feedback> updateFeedback(@PathVariable Long id, @RequestBody Feedback feedback) {
        return ResponseEntity.ok(feedbackService.updateFeedback(id, feedback));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
        feedbackService.deleteFeedback(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Feedback>> getFeedbackByEmployeeId(@PathVariable Long employeeId) {
        return ResponseEntity.ok(feedbackService.getFeedbackByEmployeeId(employeeId));
    }
    
    @GetMapping("/program/{programId}")
    public ResponseEntity<List<Feedback>> getFeedbackByProgramId(@PathVariable Long programId) {
        return ResponseEntity.ok(feedbackService.getFeedbackByProgramId(programId));
    }
    
    @GetMapping("/employee/{employeeId}/program/{programId}")
    public ResponseEntity<List<Feedback>> getFeedbackByEmployeeAndProgram(
            @PathVariable Long employeeId,
            @PathVariable Long programId) {
        return ResponseEntity.ok(feedbackService.getFeedbackByEmployeeAndProgram(employeeId, programId));
    }
    
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Feedback>> getFeedbackByType(
            @PathVariable Feedback.FeedbackType type) {
        return ResponseEntity.ok(feedbackService.getFeedbackByType(type));
    }
    
    @GetMapping("/provided-by/{providedBy}")
    public ResponseEntity<List<Feedback>> getFeedbackByProvidedBy(@PathVariable String providedBy) {
        return ResponseEntity.ok(feedbackService.getFeedbackByProvidedBy(providedBy));
    }
    
    @GetMapping("/minimum-rating/{minRating}")
    public ResponseEntity<List<Feedback>> getFeedbackByMinimumRating(@PathVariable Integer minRating) {
        return ResponseEntity.ok(feedbackService.getFeedbackByMinimumRating(minRating));
    }
    
    @GetMapping("/date-range")
    public ResponseEntity<List<Feedback>> getFeedbackInDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(feedbackService.getFeedbackInDateRange(start, end));
    }
}
