import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import trackingService from '../../services/trackingService';
import './Tracking.css';

const AttendanceList = () => {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [presentFilter, setPresentFilter] = useState('');

  useEffect(() => {
    fetchAttendances();
  }, []);

  const fetchAttendances = async () => {
    try {
      setLoading(true);
      const response = await trackingService.getAllAttendance();
      setAttendances(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      setError('Failed to load attendance records. Please try again later.');
      setLoading(false);
    }
  };

  const filteredAttendances = attendances.filter(attendance => {
    // Filter by search term (employee name or session)
    const matchesSearch = 
      attendance.employeeName.toLowerCase().includes(filter.toLowerCase()) || 
      attendance.sessionName.toLowerCase().includes(filter.toLowerCase());
    
    // Filter by date
    let matchesDate = true;
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      const attendanceDate = new Date(attendance.attendanceTime);
      matchesDate = 
        attendanceDate.getFullYear() === filterDate.getFullYear() &&
        attendanceDate.getMonth() === filterDate.getMonth() &&
        attendanceDate.getDate() === filterDate.getDate();
    }
    
    // Filter by attendance status (present/absent)
    let matchesPresent = true;
    if (presentFilter !== '') {
      matchesPresent = attendance.present === (presentFilter === 'present');
    }
    
    return matchesSearch && matchesDate && matchesPresent;
  });

  // Sort attendances by time (most recent first)
  const sortedAttendances = [...filteredAttendances].sort(
    (a, b) => new Date(b.attendanceTime) - new Date(a.attendanceTime)
  );

  return (
    <div className="attendance-list-container">
      <div className="page-header">
        <h1>Attendance Records</h1>
        <Link to="/attendance/new" className="btn btn-primary">
          <i className="fas fa-plus"></i> Record Attendance
        </Link>
      </div>

      <div className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by employee or session..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        
        <div className="date-filter">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="filter-select"
          />
        </div>
        
        <div className="presence-filter">
          <select 
            value={presentFilter} 
            onChange={(e) => setPresentFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading attendance records...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="table-container">
          {sortedAttendances.length > 0 ? (
            <table className="tracking-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Session</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {sortedAttendances.map(attendance => (
                  <tr key={attendance.id}>
                    <td>{attendance.employeeName}</td>
                    <td>{attendance.sessionName}</td>
                    <td>{new Date(attendance.attendanceTime).toLocaleString()}</td>
                    <td>
                      <span className={`status-badge ${attendance.present ? 'present' : 'absent'}`}>
                        {attendance.present ? 'Present' : 'Absent'}
                      </span>
                    </td>
                    <td>{attendance.notes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-data">No attendance records found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendanceList;
