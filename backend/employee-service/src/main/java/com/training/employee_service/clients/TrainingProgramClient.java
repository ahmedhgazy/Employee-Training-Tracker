package com.training.employee_service.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

@FeignClient(name = "training-program-service")
public interface TrainingProgramClient {
    
    @GetMapping("/api/training/programs/{id}")
    ResponseEntity<Map<String, Object>> getProgramById(@PathVariable Long id);
    
    @GetMapping("/api/training/sessions/program/{programId}")
    ResponseEntity<Object> getSessionsByProgramId(@PathVariable Long programId);
}
