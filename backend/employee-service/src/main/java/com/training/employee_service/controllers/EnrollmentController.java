package com.training.employee_service.controllers;

import com.training.employee_service.models.ProgramEnrollment;
import com.training.employee_service.services.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {
    
    private final EnrollmentService enrollmentService;
    
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<ProgramEnrollment>> getEnrollmentsByEmployeeId(@PathVariable Long employeeId) {
        return ResponseEntity.ok(enrollmentService.getEnrollmentsByEmployeeId(employeeId));
    }
    
    @GetMapping("/program/{programId}")
    public ResponseEntity<List<ProgramEnrollment>> getEnrollmentsByProgramId(@PathVariable Long programId) {
        return ResponseEntity.ok(enrollmentService.getEnrollmentsByProgramId(programId));
    }
    
    @PostMapping("/{employeeId}/program/{programId}")
    public ResponseEntity<ProgramEnrollment> enrollEmployeeToProgram(
            @PathVariable Long employeeId,
            @PathVariable Long programId) {
        return new ResponseEntity<>(
                enrollmentService.enrollEmployeeToProgram(employeeId, programId),
                HttpStatus.CREATED);
    }
    
    @PatchMapping("/{enrollmentId}/status")
    public ResponseEntity<ProgramEnrollment> updateEnrollmentStatus(
            @PathVariable Long enrollmentId,
            @RequestParam String status) {
        return ResponseEntity.ok(enrollmentService.updateEnrollmentStatus(enrollmentId, status));
    }
    
    @DeleteMapping("/{enrollmentId}")
    public ResponseEntity<Void> deleteEnrollment(@PathVariable Long enrollmentId) {
        enrollmentService.deleteEnrollment(enrollmentId);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/completed/employee/{employeeId}")
    public ResponseEntity<List<ProgramEnrollment>> getCompletedEnrollmentsByEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(enrollmentService.getCompletedEnrollmentsByEmployee(employeeId));
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<ProgramEnrollment>> getEnrollmentsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(enrollmentService.getEnrollmentsByStatus(status));
    }
}
