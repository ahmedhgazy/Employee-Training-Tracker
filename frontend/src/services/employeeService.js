import api from './api';

const EMPLOYEE_API_URL = '/api/employees';

class EmployeeService {
  // Employees
  getAllEmployees() {
    return api.get(`${EMPLOYEE_API_URL}`);
  }

  getEmployeeById(id) {
    return api.get(`${EMPLOYEE_API_URL}/${id}`);
  }

  createEmployee(employeeData) {
    return api.post(`${EMPLOYEE_API_URL}`, employeeData);
  }

  updateEmployee(id, employeeData) {
    return api.put(`${EMPLOYEE_API_URL}/${id}`, employeeData);
  }

  deleteEmployee(id) {
    return api.delete(`${EMPLOYEE_API_URL}/${id}`);
  }

  // Enrollments
  getEnrollmentsByEmployee(employeeId) {
    return api.get(`${EMPLOYEE_API_URL}/enrollments/employee/${employeeId}`);
  }

  enrollEmployeeToProgram(employeeId, programId) {
    return api.post(`${EMPLOYEE_API_URL}/enrollments/${employeeId}/program/${programId}`);
  }

  updateEnrollmentStatus(enrollmentId, statusData) {
    return api.patch(`${EMPLOYEE_API_URL}/enrollments/${enrollmentId}/status`, statusData);
  }
}

export default new EmployeeService();
