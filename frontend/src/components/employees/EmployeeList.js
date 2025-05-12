import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import employeeService from '../../services/employeeService';
import './Employees.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await employeeService.getAllEmployees();
      setEmployees(response.data);
      
      // Extract unique departments for filtering
      const uniqueDepartments = [...new Set(response.data.map(emp => emp.department))];
      setDepartments(uniqueDepartments.filter(Boolean));
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setError('Failed to load employees. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeService.deleteEmployee(id);
        // Remove from state
        setEmployees(employees.filter(employee => employee.id !== id));
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Failed to delete the employee. Please try again.');
      }
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const searchFields = `${employee.firstName} ${employee.lastName} ${employee.email} ${employee.employeeId}`.toLowerCase();
    const matchesSearch = searchFields.includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === '' || employee.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="employee-list-container">
      <div className="page-header">
        <h1>Employees</h1>
        <Link to="/employees/new" className="btn btn-primary">
          <i className="fas fa-plus"></i> Add New Employee
        </Link>
      </div>

      <div className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="department-filter">
          <select 
            value={departmentFilter} 
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map(department => (
              <option key={department} value={department}>{department}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading employees...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="table-container">
          {filteredEmployees.length > 0 ? (
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map(employee => (
                  <tr key={employee.id}>
                    <td>{employee.employeeId}</td>
                    <td>
                      <Link to={`/employees/${employee.id}`}>
                        {employee.firstName} {employee.lastName}
                      </Link>
                    </td>
                    <td>{employee.email}</td>
                    <td>{employee.department}</td>
                    <td>{employee.position}</td>
                    <td className="actions-cell">
                      <Link to={`/employees/${employee.id}`} className="btn btn-secondary btn-sm">
                        <i className="fas fa-eye"></i>
                      </Link>
                      <Link to={`/employees/edit/${employee.id}`} className="btn btn-primary btn-sm">
                        <i className="fas fa-edit"></i>
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(employee.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                      <Link to={`/enrollments/new?employeeId=${employee.id}`} className="btn btn-success btn-sm">
                        <i className="fas fa-user-plus"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-data">No employees found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
