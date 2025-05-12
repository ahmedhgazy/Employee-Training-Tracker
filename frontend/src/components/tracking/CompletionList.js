import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import trackingService from '../../services/trackingService';
import './Tracking.css';

const CompletionList = () => {
  const [completions, setCompletions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchCompletions();
  }, []);

  const fetchCompletions = async () => {
    try {
      setLoading(true);
      const response = await trackingService.getAllCompletions();
      setCompletions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching completion records:', error);
      setError('Failed to load completion records. Please try again later.');
      setLoading(false);
    }
  };

  const filteredCompletions = completions.filter(completion => {
    // Filter by search term (employee name or program)
    const matchesSearch = 
      completion.employeeName.toLowerCase().includes(filter.toLowerCase()) || 
      completion.programName.toLowerCase().includes(filter.toLowerCase());
    
    // Filter by date
    let matchesDate = true;
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      const completionDate = new Date(completion.completionDate);
      matchesDate = 
        completionDate.getFullYear() === filterDate.getFullYear() &&
        completionDate.getMonth() === filterDate.getMonth() &&
        completionDate.getDate() === filterDate.getDate();
    }
    
    // Filter by status
    let matchesStatus = true;
    if (statusFilter) {
      matchesStatus = completion.status === statusFilter;
    }
    
    return matchesSearch && matchesDate && matchesStatus;
  });

  // Sort completions by date (most recent first)
  const sortedCompletions = [...filteredCompletions].sort(
    (a, b) => new Date(b.completionDate) - new Date(a.completionDate)
  );

  return (
    <div className="completion-list-container">
      <div className="page-header">
        <h1>Program Completions</h1>
        <Link to="/completions/new" className="btn btn-primary">
          <i className="fas fa-plus"></i> Record Completion
        </Link>
      </div>

      <div className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by employee or program..."
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
            placeholder="Filter by date"
          />
        </div>
        
        <div className="status-filter">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Status</option>
            <option value="COMPLETE">Complete</option>
            <option value="PARTIAL">Partial</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading completion records...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="table-container">
          {sortedCompletions.length > 0 ? (
            <table className="tracking-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Program</th>
                  <th>Completion Date</th>
                  <th>Score</th>
                  <th>Status</th>
                  <th>Certificate</th>
                  <th>Completed By</th>
                </tr>
              </thead>
              <tbody>
                {sortedCompletions.map(completion => (
                  <tr key={completion.id}>
                    <td>{completion.employeeName}</td>
                    <td>{completion.programName}</td>
                    <td>{new Date(completion.completionDate).toLocaleDateString()}</td>
                    <td>{completion.score !== null ? `${completion.score}%` : '-'}</td>
                    <td>
                      <span className={`status-badge ${completion.status.toLowerCase()}`}>
                        {completion.status}
                      </span>
                    </td>
                    <td>
                      {completion.certificateUrl ? (
                        <a href={completion.certificateUrl} target="_blank" rel="noopener noreferrer">
                          View Certificate
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td>{completion.completedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-data">No completion records found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompletionList;
