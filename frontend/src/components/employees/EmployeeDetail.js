import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import employeeService from '../../services/employeeService';
import trackingService from '../../services/trackingService';
import './Employees.css';

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [completions, setCompletions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployeeDetails();
  }, [id]);

  const fetchEmployeeDetails = async () => {
    try {
      setLoading(true);
      
      // Fetch employee details
      const employeeResponse = await employeeService.getEmployeeById(id);
      setEmployee(employeeResponse.data);
      
      // Fetch employee enrollments
      const enrollmentsResponse = await employeeService.getEnrollmentsByEmployee(id);
      setEnrollments(enrollmentsResponse.data);
      
      // Fetch employee completions
      const completionsResponse = await trackingService.getAllCompletions();
      const employeeCompletions = completionsResponse.data.filter(
        completion => completion.employeeId === parseInt(id)
      );
      setCompletions(employeeCompletions);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employee details:', error);
      setError('Failed to load employee details. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading employee details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!employee) {
    return <div className="error-message">Employee not found.</div>;
  }

  return (
    <div className="employee-detail-container">
      <div className="page-header">
        <h1>Employee Details</h1>
        <div className="header-actions">
          <Link to="/employees" className="btn btn-secondary">
            <i className="fas fa-arrow-left"></i> Back to Employees
          </Link>
          <Link to={`/employees/edit/${id}`} className="btn btn-primary">
            <i className="fas fa-edit"></i> Edit Employee
          </Link>
        </div>
      </div>

      <div className="employee-detail">
        <div className="employee-detail-header">
          <div className="employee-detail-title">
            <h2>{employee.firstName} {employee.lastName}</h2>
            <span className="employee-id">{employee.employeeId}</span>
          </div>
        </div>

        <div className="employee-detail-info">
          <div className="employee-detail-block">
            <h3>Personal Information</h3>
            <div className="employee-detail-field">
              <div className="employee-detail-label">Email</div>
              <div className="employee-detail-value">{employee.email}</div>
            </div>
          </div>

          <div className="employee-detail-block">
            <h3>Work Information</h3>
            <div className="employee-detail-field">
              <div className="employee-detail-label">Department</div>
              <div className="employee-detail-value">{employee.department}</div>
            </div>
            <div className="employee-detail-field">
              <div className="employee-detail-label">Position</div>
              <div className="employee-detail-value">{employee.position}</div>
            </div>
          </div>
        </div>

        <div className="enrollments-section">
          <div className="enrollments-header">
            <h3>Program Enrollments</h3>
            <Link to={`/enrollments/new?employeeId=${id}`} className="btn btn-primary btn-sm">
              <i className="fas fa-plus"></i> Enroll in Program
            </Link>
          </div>

          {enrollments.length > 0 ? (
            <div className="enrollment-list">
              {enrollments.map(enrollment => (
                <div key={enrollment.id} className="enrollment-card">
                  <div className="enrollment-program">{enrollment.programName}</div>
                  <div className="enrollment-date">
                    Enrolled on: {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                  </div>
                  <div className="enrollment-status">
                    Status: <span className={`status-${enrollment.status.toLowerCase()}`}>{enrollment.status}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-data">No active enrollments for this employee.</div>
          )}
        </div>

        <div className="completions-section">
          <div className="completions-header">
            <h3>Completed Programs</h3>
          </div>

          {completions.length > 0 ? (
            <div className="table-container">
              <table className="tracking-table">
                <thead>
                  <tr>
                    <th>Program</th>
                    <th>Completion Date</th>
                    <th>Score</th>
                    <th>Status</th>
                    <th>Certificate</th>
                  </tr>
                </thead>
                <tbody>
                  {completions.map(completion => (
                    <tr key={completion.id}>
                      <td>{completion.programName}</td>
                      <td>{new Date(completion.completionDate).toLocaleDateString()}</td>
                      <td>{completion.score}%</td>
                      <td>
                        <span className="status-badge completed">{completion.status}</span>
                      </td>
                      <td>
                        {completion.certificateUrl ? (
                          <a href={completion.certificateUrl} target="_blank" rel="noopener noreferrer">
                            View Certificate
                          </a>
                        ) : (
                          'N/A'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-data">No completed programs.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
