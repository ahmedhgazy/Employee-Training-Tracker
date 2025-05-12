package com.training.tracking_service.controllers;

import com.training.tracking_service.models.Attendance;
import com.training.tracking_service.services.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/tracking/attendance")
@RequiredArgsConstructor
public class AttendanceController {
    
    private final AttendanceService attendanceService;
    
    @GetMapping
    public ResponseEntity<List<Attendance>> getAllAttendances() {
        return ResponseEntity.ok(attendanceService.getAllAttendances());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Attendance> getAttendanceById(@PathVariable Long id) {
        return attendanceService.getAttendanceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Attendance> recordAttendance(@RequestBody Attendance attendance) {
        return new ResponseEntity<>(attendanceService.recordAttendance(attendance), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Attendance> updateAttendance(@PathVariable Long id, @RequestBody Attendance attendance) {
        return ResponseEntity.ok(attendanceService.updateAttendance(id, attendance));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttendance(@PathVariable Long id) {
        attendanceService.deleteAttendance(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Attendance>> getAttendancesByEmployeeId(@PathVariable Long employeeId) {
        return ResponseEntity.ok(attendanceService.getAttendancesByEmployeeId(employeeId));
    }
    
    @GetMapping("/session/{sessionId}")
    public ResponseEntity<List<Attendance>> getAttendancesBySessionId(@PathVariable Long sessionId) {
        return ResponseEntity.ok(attendanceService.getAttendancesBySessionId(sessionId));
    }
    
    @GetMapping("/employee/{employeeId}/session/{sessionId}")
    public ResponseEntity<List<Attendance>> getAttendanceByEmployeeAndSession(
            @PathVariable Long employeeId,
            @PathVariable Long sessionId) {
        return ResponseEntity.ok(attendanceService.getAttendanceByEmployeeAndSession(employeeId, sessionId));
    }
    
    @GetMapping("/employee/{employeeId}/date-range")
    public ResponseEntity<List<Attendance>> getAttendancesByEmployeeInDateRange(
            @PathVariable Long employeeId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(attendanceService.getAttendancesByEmployeeInDateRange(employeeId, start, end));
    }
    
    @GetMapping("/session/{sessionId}/present")
    public ResponseEntity<List<Attendance>> getPresentAttendeesBySessionId(@PathVariable Long sessionId) {
        return ResponseEntity.ok(attendanceService.getPresentAttendeesBySessionId(sessionId));
    }
    
    @GetMapping("/session/{sessionId}/absent")
    public ResponseEntity<List<Attendance>> getAbsentAttendeesBySessionId(@PathVariable Long sessionId) {
        return ResponseEntity.ok(attendanceService.getAbsentAttendeesBySessionId(sessionId));
    }
}
