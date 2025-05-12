package com.training.employee_service.repositories;

import com.training.employee_service.models.ProgramEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgramEnrollmentRepository extends JpaRepository<ProgramEnrollment, Long> {
    List<ProgramEnrollment> findByEmployeeId(Long employeeId);
    List<ProgramEnrollment> findByProgramId(Long programId);
    List<ProgramEnrollment> findByEmployeeIdAndStatus(Long employeeId, String status);
    List<ProgramEnrollment> findByStatus(String status);
}
