import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import trackingService from '../../services/trackingService';
import './Tracking.css';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await trackingService.getAllFeedback();
      setFeedbacks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setError('Failed to load feedback records. Please try again later.');
      setLoading(false);
    }
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    // Filter by search term (employee name, program, or comments)
    const matchesSearch = 
      feedback.employeeName.toLowerCase().includes(filter.toLowerCase()) || 
      feedback.programName.toLowerCase().includes(filter.toLowerCase()) ||
      (feedback.comments && feedback.comments.toLowerCase().includes(filter.toLowerCase()));
    
    // Filter by feedback type
    const matchesType = typeFilter === '' || feedback.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  // Sort feedback by date (most recent first)
  const sortedFeedbacks = [...filteredFeedbacks].sort(
    (a, b) => new Date(b.feedbackDate) - new Date(a.feedbackDate)
  );

  // Helper function to render stars based on rating
  const renderStarRating = (rating) => {
    if (!rating && rating !== 0) return 'No rating';
    
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`rating-star ${i <= rating ? 'active' : ''}`}>
          ★
        </span>
      );
    }
    return <div className="star-rating">{stars}</div>;
  };

  return (
    <div className="feedback-list-container">
      <div className="page-header">
        <h1>Feedback</h1>
        <Link to="/feedback/new" className="btn btn-primary">
          <i className="fas fa-plus"></i> Add Feedback
        </Link>
      </div>

      <div className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by employee, program, or content..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        
        <div className="type-filter">
          <select 
            value={typeFilter} 
            onChange={(e) => setTypeFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Types</option>
            <option value="EMPLOYEE_TO_PROGRAM">Employee to Program</option>
            <option value="TRAINER_TO_EMPLOYEE">Trainer to Employee</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading feedback records...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="feedback-grid">
          {sortedFeedbacks.length > 0 ? (
            sortedFeedbacks.map(feedback => (
              <div key={feedback.id} className="feedback-card">
                <div className="feedback-header">
                  <h3 className="feedback-title">
                    {feedback.type === 'EMPLOYEE_TO_PROGRAM' 
                      ? `${feedback.employeeName}'s feedback on ${feedback.programName}`
                      : `Feedback for ${feedback.employeeName} on ${feedback.programName}`}
                  </h3>
                  <div className="feedback-meta">
                    <span><i className="fas fa-user"></i> {feedback.providedBy}</span>
                    <span><i className="fas fa-calendar"></i> {new Date(feedback.feedbackDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="feedback-rating">
                  {renderStarRating(feedback.rating)}
                </div>
                
                {feedback.comments && (
                  <div className="feedback-comments">
                    <p>{feedback.comments}</p>
                  </div>
                )}
                
                <div className="feedback-type">
                  <span className={`feedback-type-badge ${feedback.type.toLowerCase().replace('_', '-')}`}>
                    {feedback.type === 'EMPLOYEE_TO_PROGRAM' ? 'Course Review' : 'Performance Feedback'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-data">No feedback records found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
