import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import trainingService from '../../services/trainingService';
import './Training.css';

const ProgramDetail = () => {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProgramDetails();
  }, [id]);

  const fetchProgramDetails = async () => {
    try {
      setLoading(true);
      const programResponse = await trainingService.getProgramById(id);
      setProgram(programResponse.data);
      
      // Fetch all sessions and filter for this program
      const sessionsResponse = await trainingService.getAllSessions();
      const programSessions = sessionsResponse.data.filter(
        session => session.trainingProgramId === parseInt(id)
      );
      setSessions(programSessions);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching program details:', error);
      setError('Failed to load program details. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading program details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!program) {
    return <div className="error-message">Program not found.</div>;
  }

  return (
    <div className="program-detail-container">
      <div className="page-header">
        <h1>Training Program Details</h1>
        <div className="header-actions">
          <Link to="/programs" className="btn btn-secondary">
            <i className="fas fa-arrow-left"></i> Back to Programs
          </Link>
          <Link to={`/programs/edit/${id}`} className="btn btn-primary">
            <i className="fas fa-edit"></i> Edit Program
          </Link>
        </div>
      </div>

      <div className="program-detail">
        <div className="program-detail-header">
          <div className="program-detail-title">
            <h2>{program.name}</h2>
            <span className="program-detail-category">{program.category || 'Uncategorized'}</span>
          </div>
          <div className="program-detail-meta">
            <p>Created by: {program.createdBy}</p>
          </div>
        </div>

        <div className="program-detail-info">
          <h3>Description</h3>
          <p>{program.description}</p>
        </div>

        <div className="program-sessions">
          <div className="program-sessions-header">
            <h3>Training Sessions</h3>
            <Link to={`/sessions/new/${id}`} className="btn btn-primary btn-sm">
              <i className="fas fa-plus"></i> Add Session
            </Link>
          </div>

          {sessions.length > 0 ? (
            <div className="session-list">
              {sessions.map(session => (
                <div key={session.id} className="session-card">
                  <h4>{session.title}</h4>
                  <div className="session-details">
                    <p>
                      <i className="fas fa-calendar-alt"></i>
                      {new Date(session.startTime).toLocaleDateString()}
                    </p>
                    <p>
                      <i className="fas fa-clock"></i>
                      {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                      {new Date(session.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p>
                      <i className="fas fa-map-marker-alt"></i>
                      {session.location}
                    </p>
                    <p>
                      <i className="fas fa-user-tie"></i>
                      {session.trainer}
                    </p>
                    <p>
                      <i className="fas fa-users"></i>
                      Max Attendees: {session.maxAttendees}
                    </p>
                  </div>
                  <div className="session-actions">
                    <Link to={`/sessions/edit/${session.id}`} className="btn btn-secondary btn-sm">
                      <i className="fas fa-edit"></i> Edit
                    </Link>
                    <Link to={`/attendance/new?sessionId=${session.id}`} className="btn btn-success btn-sm">
                      <i className="fas fa-clipboard-check"></i> Record Attendance
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-data">No sessions available for this program.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;
