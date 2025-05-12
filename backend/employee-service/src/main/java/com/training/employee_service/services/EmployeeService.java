package com.training.employee_service.services;

import com.training.employee_service.models.Employee;
import com.training.employee_service.repositories.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    
    private final EmployeeRepository employeeRepository;
    
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
    
    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }
    
    public Optional<Employee> getEmployeeByEmployeeId(String employeeId) {
        return employeeRepository.findByEmployeeId(employeeId);
    }
    
    public Optional<Employee> getEmployeeByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }
    
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }
    
    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        updatedEmployee.setId(id);
        return employeeRepository.save(updatedEmployee);
    }
    
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
    
    public List<Employee> getEmployeesByDepartment(String department) {
        return employeeRepository.findByDepartment(department);
    }
    
    public List<Employee> searchEmployeesByLastName(String lastName) {
        return employeeRepository.findByLastNameContainingIgnoreCase(lastName);
    }
}
