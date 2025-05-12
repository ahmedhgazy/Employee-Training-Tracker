import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import trainingService from '../../services/trainingService';
import './Training.css';

const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [programFilter, setProgramFilter] = useState('');

  useEffect(() => {
    fetchSessionsAndPrograms();
  }, []);

  const fetchSessionsAndPrograms = async () => {
    try {
      setLoading(true);
      
      // Fetch all sessions
      const sessionsResponse = await trainingService.getAllSessions();
      setSessions(sessionsResponse.data);
      
      // Fetch all programs for filtering
      const programsResponse = await trainingService.getAllPrograms();
      setPrograms(programsResponse.data);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      setError('Failed to load training sessions. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      try {
        await trainingService.deleteSession(id);
        // Remove from state
        setSessions(sessions.filter(session => session.id !== id));
      } catch (error) {
        console.error('Error deleting session:', error);
        alert('Failed to delete the session. Please try again.');
      }
    }
  };

  // Get program name by ID
  const getProgramName = (programId) => {
    const program = programs.find(p => p.id === programId);
    return program ? program.name : 'Unknown Program';
  };

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(filter.toLowerCase()) || 
                        (session.description && session.description.toLowerCase().includes(filter.toLowerCase()));
    const matchesProgram = programFilter === '' || session.trainingProgramId === parseInt(programFilter);
    
    return matchesSearch && matchesProgram;
  });

  // Sort sessions by start time (most recent first)
  const sortedSessions = [...filteredSessions].sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

  return (
    <div className="session-list-container">
      <div className="page-header">
        <h1>Training Sessions</h1>
        <div className="header-actions">
          <Link to="/programs" className="btn btn-secondary">
            <i className="fas fa-list"></i> Programs
          </Link>
          {programs.length > 0 && (
            <Link to={`/sessions/new/${programs[0].id}`} className="btn btn-primary">
              <i className="fas fa-plus"></i> Add New Session
            </Link>
          )}
        </div>
      </div>

      <div className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search sessions..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="program-filter">
          <select 
            value={programFilter} 
            onChange={(e) => setProgramFilter(e.target.value)}
          >
            <option value="">All Programs</option>
            {programs.map(program => (
              <option key={program.id} value={program.id}>{program.name}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading sessions...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="table-container">
          {sortedSessions.length > 0 ? (
            <table className="tracking-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Program</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Trainer</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedSessions.map(session => (
                  <tr key={session.id}>
                    <td>{session.title}</td>
                    <td>{getProgramName(session.trainingProgramId)}</td>
                    <td>{new Date(session.startTime).toLocaleDateString()}</td>
                    <td>
                      {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                      {new Date(session.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td>{session.location}</td>
                    <td>{session.trainer}</td>
                    <td className="actions-cell">
                      <Link to={`/sessions/edit/${session.id}`} className="btn btn-primary btn-sm">
                        <i className="fas fa-edit text-light">Edit</i>
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(session.id)}
                      >
                        <i className="fas fa-trash text-light">Delete</i>
                      </button>
                      <Link to={`/attendance/new?sessionId=${session.id}`} className="btn btn-success btn-sm">
                        <i className="fas fa-clipboard-check text-light">New</i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-data">No training sessions found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SessionList;
