package com.training.tracking_service.services;

import com.training.tracking_service.models.Attendance;
import com.training.tracking_service.repositories.AttendanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AttendanceService {
    
    private final AttendanceRepository attendanceRepository;
    
    public List<Attendance> getAllAttendances() {
        return attendanceRepository.findAll();
    }
    
    public Optional<Attendance> getAttendanceById(Long id) {
        return attendanceRepository.findById(id);
    }
    
    @Transactional
    public Attendance recordAttendance(Attendance attendance) {
        attendance.setAttendanceTime(LocalDateTime.now());
        return attendanceRepository.save(attendance);
    }
    
    @Transactional
    public Attendance updateAttendance(Long id, Attendance updatedAttendance) {
        updatedAttendance.setId(id);
        return attendanceRepository.save(updatedAttendance);
    }
    
    public void deleteAttendance(Long id) {
        attendanceRepository.deleteById(id);
    }
    
    public List<Attendance> getAttendancesByEmployeeId(Long employeeId) {
        return attendanceRepository.findByEmployeeId(employeeId);
    }
    
    public List<Attendance> getAttendancesBySessionId(Long sessionId) {
        return attendanceRepository.findBySessionId(sessionId);
    }
    
    public List<Attendance> getAttendanceByEmployeeAndSession(Long employeeId, Long sessionId) {
        return attendanceRepository.findByEmployeeIdAndSessionId(employeeId, sessionId);
    }
    
    public List<Attendance> getAttendancesByEmployeeInDateRange(Long employeeId, LocalDateTime start, LocalDateTime end) {
        return attendanceRepository.findByEmployeeIdAndAttendanceTimeBetween(employeeId, start, end);
    }
    
    public List<Attendance> getPresentAttendeesBySessionId(Long sessionId) {
        return attendanceRepository.findBySessionIdAndPresent(sessionId, true);
    }
    
    public List<Attendance> getAbsentAttendeesBySessionId(Long sessionId) {
        return attendanceRepository.findBySessionIdAndPresent(sessionId, false);
    }
}
