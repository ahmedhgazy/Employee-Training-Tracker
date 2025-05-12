package com.training.employee_service.repositories;

import com.training.employee_service.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmployeeId(String employeeId);
    Optional<Employee> findByEmail(String email);
    List<Employee> findByDepartment(String department);
    List<Employee> findByLastNameContainingIgnoreCase(String lastName);
}
