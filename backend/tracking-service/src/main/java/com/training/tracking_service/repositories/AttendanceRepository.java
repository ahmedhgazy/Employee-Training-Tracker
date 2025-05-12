package com.training.tracking_service.repositories;

import com.training.tracking_service.models.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByEmployeeId(Long employeeId);
    List<Attendance> findBySessionId(Long sessionId);
    List<Attendance> findByEmployeeIdAndSessionId(Long employeeId, Long sessionId);
    List<Attendance> findByEmployeeIdAndAttendanceTimeBetween(Long employeeId, LocalDateTime start, LocalDateTime end);
    List<Attendance> findBySessionIdAndPresent(Long sessionId, boolean present);
}
