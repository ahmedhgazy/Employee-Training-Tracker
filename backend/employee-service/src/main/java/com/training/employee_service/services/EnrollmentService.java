package com.training.employee_service.services;

import com.training.employee_service.clients.TrainingProgramClient;
import com.training.employee_service.models.Employee;
import com.training.employee_service.models.ProgramEnrollment;
import com.training.employee_service.repositories.EmployeeRepository;
import com.training.employee_service.repositories.ProgramEnrollmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EnrollmentService {
    
    private final ProgramEnrollmentRepository enrollmentRepository;
    private final EmployeeRepository employeeRepository;
    private final TrainingProgramClient trainingProgramClient;
    
    public List<ProgramEnrollment> getEnrollmentsByEmployeeId(Long employeeId) {
        return enrollmentRepository.findByEmployeeId(employeeId);
    }
    
    public List<ProgramEnrollment> getEnrollmentsByProgramId(Long programId) {
        return enrollmentRepository.findByProgramId(programId);
    }
    
    @Transactional
    public ProgramEnrollment enrollEmployeeToProgram(Long employeeId, Long programId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + employeeId));
        
        ResponseEntity<Map<String, Object>> programResponse = trainingProgramClient.getProgramById(programId);
        if (!programResponse.getStatusCode().is2xxSuccessful() || programResponse.getBody() == null) {
            throw new RuntimeException("Training program not found with id: " + programId);
        }
        
        Map<String, Object> programData = programResponse.getBody();
        
        ProgramEnrollment enrollment = new ProgramEnrollment();
        enrollment.setEmployee(employee);
        enrollment.setProgramId(programId);
        enrollment.setProgramName((String) programData.get("name"));
        enrollment.setEnrollmentDate(LocalDateTime.now());
        enrollment.setStatus("ENROLLED");
        
        return enrollmentRepository.save(enrollment);
    }
    
    @Transactional
    public ProgramEnrollment updateEnrollmentStatus(Long enrollmentId, String status) {
        ProgramEnrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found with id: " + enrollmentId));
        
        enrollment.setStatus(status);
        return enrollmentRepository.save(enrollment);
    }
    
    public void deleteEnrollment(Long enrollmentId) {
        enrollmentRepository.deleteById(enrollmentId);
    }
    
    public List<ProgramEnrollment> getCompletedEnrollmentsByEmployee(Long employeeId) {
        return enrollmentRepository.findByEmployeeIdAndStatus(employeeId, "COMPLETED");
    }
    
    public List<ProgramEnrollment> getEnrollmentsByStatus(String status) {
        return enrollmentRepository.findByStatus(status);
    }
}
