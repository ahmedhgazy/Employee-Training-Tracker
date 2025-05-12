import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import trainingService from '../../services/trainingService';
import './Training.css';

const ProgramList = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const response = await trainingService.getAllPrograms();
      setPrograms(response.data);
      
      // Extract unique categories for filtering
      const uniqueCategories = [...new Set(response.data.map(program => program.category))];
      setCategories(uniqueCategories.filter(Boolean));
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching programs:', error);
      setError('Failed to load training programs. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      try {
        await trainingService.deleteProgram(id);
        // Remove from state
        setPrograms(programs.filter(program => program.id !== id));
      } catch (error) {
        console.error('Error deleting program:', error);
        alert('Failed to delete the program. Please try again.');
      }
    }
  };

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(filter.toLowerCase()) || 
                        program.description.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = categoryFilter === '' || program.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="program-list-container">
      <div className="page-header">
        <h1>Training Programs</h1>
        <Link to="/programs/new" className="btn btn-primary">
          <i className="fas fa-plus"></i> Add New Program
        </Link>
      </div>

      <div className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search programs..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="category-filter">
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading programs...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="program-grid">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map(program => (
              <div className="program-card" key={program.id}>
                <div className="program-category">{program.category || 'Uncategorized'}</div>
                <h3 className="program-name">
                  <Link to={`/programs/${program.id}`}>{program.name}</Link>
                </h3>
                <p className="program-description">
                  {program.description.length > 150 
                    ? `${program.description.substring(0, 150)}...` 
                    : program.description}
                </p>
                <div className="program-meta">
                  <span className="created-by">Created by: {program.createdBy}</span>
                </div>
                <div className="program-actions">
                  <Link to={`/programs/${program.id}`} className="btn btn-secondary btn-sm">
                    <i className="fas fa-eye"></i> View
                  </Link>
                  <Link to={`/programs/edit/${program.id}`} className="btn btn-primary btn-sm">
                    <i className="fas fa-edit"></i> Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(program.id)}
                  >
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-data">No training programs found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgramList;
