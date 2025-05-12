import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import trainingService from '../../services/trainingService';
import employeeService from '../../services/employeeService';
import trackingService from '../../services/trackingService';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPrograms: 0,
    totalEmployees: 0,
    totalEnrollments: 0,
    totalCompletions: 0
  });

  const [recentPrograms, setRecentPrograms] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch programs
        const programsResponse = await trainingService.getAllPrograms();
        setRecentPrograms(programsResponse.data.slice(0, 5));
        setStats(prevStats => ({ ...prevStats, totalPrograms: programsResponse.data.length }));

        // Fetch sessions
        const sessionsResponse = await trainingService.getAllSessions();
        // Filter for upcoming sessions (sessions with start time in the future)
        const upcoming = sessionsResponse.data
          .filter(session => new Date(session.startTime) > new Date())
          .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
          .slice(0, 5);
        setUpcomingSessions(upcoming);

        // Fetch employees
        const employeesResponse = await employeeService.getAllEmployees();
        setStats(prevStats => ({ ...prevStats, totalEmployees: employeesResponse.data.length }));

        // Fetch completions
        const completionsResponse = await trackingService.getAllCompletions();
        setStats(prevStats => ({ ...prevStats, totalCompletions: completionsResponse.data.length }));

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="page-title">Dashboard</h1>
      
      {/* Statistics Cards */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-book"></i>
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.totalPrograms}</div>
            <div className="stat-label">Total Programs</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.totalEmployees}</div>
            <div className="stat-label">Total Employees</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-user-plus"></i>
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.totalEnrollments}</div>
            <div className="stat-label">Active Enrollments</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-award"></i>
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.totalCompletions}</div>
            <div className="stat-label">Program Completions</div>
          </div>
        </div>
      </div>
      
      {/* Recent Programs */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Training Programs</h2>
          <Link to="/programs" className="view-all">View All</Link>
        </div>
        <div className="card">
          {recentPrograms.length > 0 ? (
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Created By</th>
                </tr>
              </thead>
              <tbody>
                {recentPrograms.map(program => (
                  <tr key={program.id}>
                    <td>
                      <Link to={`/programs/${program.id}`}>{program.name}</Link>
                    </td>
                    <td>{program.category}</td>
                    <td>{program.description.substring(0, 60)}...</td>
                    <td>{program.createdBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data">No programs available</p>
          )}
        </div>
      </div>
      
      {/* Upcoming Sessions */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Upcoming Sessions</h2>
          <Link to="/sessions" className="view-all">View All</Link>
        </div>
        <div className="card">
          {upcomingSessions.length > 0 ? (
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Program</th>
                  <th>Date & Time</th>
                  <th>Location</th>
                  <th>Trainer</th>
                </tr>
              </thead>
              <tbody>
                {upcomingSessions.map(session => (
                  <tr key={session.id}>
                    <td>
                      <Link to={`/sessions/${session.id}`}>{session.title}</Link>
                    </td>
                    <td>{session.programName}</td>
                    <td>
                      {new Date(session.startTime).toLocaleDateString()} {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td>{session.location}</td>
                    <td>{session.trainer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data">No upcoming sessions</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
