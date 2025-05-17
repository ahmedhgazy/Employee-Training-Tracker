import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import employeeService from '../../services/employeeService';
import './Employees.css';

const EnrollmentList = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchAllEnrollments();
  }, []);

  const fetchAllEnrollments = async () => {
    try {
      setLoading(true);
      
      // Mock implementation of getAllEmployees
      const employeesResponse = await employeeService.getAllEmployees();
      
      let allEnrollments = [];
      for (const employee of employeesResponse.data) {
        try {
          const enrollmentsResponse = await employeeService.getEnrollmentsByEmployee(employee.id);
          
          // Add employee information to each enrollment
          const employeeEnrollments = enrollmentsResponse.data.map(enrollment => ({
            ...enrollment,
            employeeName: `${employee.firstName} ${employee.lastName}`,
            employeeEmail: employee.email,
            employeeId: employee.id
          }));
          
          allEnrollments = [...allEnrollments, ...employeeEnrollments];
        } catch (error) {
          console.error(`Error fetching enrollments for employee ${employee.id}:`, error);
        }
      }
      
      setEnrollments(allEnrollments);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      setError('Failed to load enrollments. Please try again later.');
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (enrollmentId, newStatus) => {
    try {
      await employeeService.updateEnrollmentStatus(enrollmentId, { status: newStatus });
      
      // Update state with new status
      setEnrollments(enrollments.map(enrollment => 
        enrollment.id === enrollmentId 
          ? { ...enrollment, status: newStatus } 
          : enrollment
      ));
      
    } catch (error) {
      console.error('Error updating enrollment status:', error);
      alert('Failed to update enrollment status. Please try again.');
    }
  };

  const filteredEnrollments = enrollments.filter(enrollment => {
    const matchesSearch = 
      enrollment.programName.toLowerCase().includes(filter.toLowerCase()) || 
      enrollment.employeeName.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = statusFilter === '' || enrollment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Sort enrollments by enrollment date (most recent first)
  const sortedEnrollments = [...filteredEnrollments].sort(
    (a, b) => new Date(b.enrollmentDate) - new Date(a.enrollmentDate)
  );

  return (
    <div className="enrollment-list-container">
      <div className="page-header">
        <h1>Program Enrollments</h1>
        <Link to="/enrollments/new" className="btn btn-primary">
          <i className="fas fa-plus"></i> New Enrollment
        </Link>
      </div>

      <div className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by program or employee..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="status-filter">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="ENROLLED">Enrolled</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="DROPPED">Dropped</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading enrollments...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="table-container">
          {sortedEnrollments.length > 0 ? (
            <table className="tracking-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Program</th>
                  <th>Enrollment Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedEnrollments.map(enrollment => (
                  <tr key={enrollment.id}>
                    <td>
                      <Link to={`/employees/${enrollment.employeeId}`}>
                        {enrollment.employeeName}
                      </Link>
                    </td>
                    <td>{enrollment.programName}</td>
                    <td>{new Date(enrollment.enrollmentDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge status-${enrollment.status.toLowerCase().replace('_', '-')}`}>
                        {enrollment.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="actions-cell">
                      {enrollment.status !== 'COMPLETED' && (
                        <div className="dropdown">
                          <button className="btn btn-secondary btn-sm dropdown-toggle">
                            Update Status
                          </button>
                          <div className="dropdown-menu">
                            {enrollment.status !== 'ENROLLED' && (
                              <button 
                                className="dropdown-item" 
                                onClick={() => handleStatusUpdate(enrollment.id, 'ENROLLED')}
                              >
                                Enrolled
                              </button>
                            )}
                            {enrollment.status !== 'IN_PROGRESS' && (
                              <button 
                                className="dropdown-item" 
                                onClick={() => handleStatusUpdate(enrollment.id, 'IN_PROGRESS')}
                              >
                                In Progress
                              </button>
                            )}
                            {enrollment.status !== 'COMPLETED' && (
                              <button 
                                className="dropdown-item" 
                                onClick={() => handleStatusUpdate(enrollment.id, 'COMPLETED')}
                              >
                                Completed
                              </button>
                            )}
                            {enrollment.status !== 'DROPPED' && (
                              <button 
                                className="dropdown-item" 
                                onClick={() => handleStatusUpdate(enrollment.id, 'DROPPED')}
                              >
                                Dropped
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                      {enrollment.status === 'COMPLETED' && (
                        <Link to={`/completions/new?enrollmentId=${enrollment.id}`} className="btn btn-success btn-sm">
                          <i className="fas fa-award"></i> Add Certificate
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-data">No enrollments found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnrollmentList;
