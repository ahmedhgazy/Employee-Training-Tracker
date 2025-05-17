import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import trackingService from '../../services/trackingService';
import employeeService from '../../services/employeeService';
import trainingService from '../../services/trainingService';
import './Tracking.css';

const FeedbackForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const employeeId = queryParams.get('employeeId');
  const programId = queryParams.get('programId');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [rating, setRating] = useState(0);
  
  const initialValues = {
    employeeId: employeeId || '',
    programId: programId || '',
    employeeName: '',
    programName: '',
    rating: 0,
    comments: '',
    providedBy: 'Admin', // Default value, could be replaced with logged in user
    feedbackDate: new Date().toISOString().split('T')[0], // Just the date portion for the input field
    type: 'EMPLOYEE_TO_PROGRAM' // Default type
  };

  // Validation schema
  const validationSchema = Yup.object({
    employeeId: Yup.string().required('Employee is required'),
    programId: Yup.string().required('Program is required'),
    comments: Yup.string().required('Comments are required'),
    providedBy: Yup.string().required('Provider name is required'),
    feedbackDate: Yup.date().required('Feedback date is required'),
    type: Yup.string().required('Feedback type is required')
  });

  useEffect(() => {
    fetchEmployeesAndPrograms();
  }, []);

  const fetchEmployeesAndPrograms = async () => {
    try {
      setLoading(true);
      
      // Fetch employees
      const employeesResponse = await employeeService.getAllEmployees();
      setEmployees(employeesResponse.data);
      
      // Fetch programs
      const programsResponse = await trainingService.getAllPrograms();
      setPrograms(programsResponse.data);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load employees or programs. Please try again.');
      setLoading(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      setError(null);
      
      // If not set already, get employee and program names
      if (!values.employeeName || !values.programName) {
        const employee = employees.find(e => e.id === parseInt(values.employeeId));
        const program = programs.find(p => p.id === parseInt(values.programId));
        
        if (employee) {
          values.employeeName = `${employee.firstName} ${employee.lastName}`;
        }
        
        if (program) {
          values.programName = program.name;
        }
      }
      
      // Include the rating from state
      values.rating = rating;
      
      // Format the date as a LocalDateTime (add time component to the date)
      const formattedValues = {
        ...values,
        feedbackDate: values.feedbackDate ? `${values.feedbackDate}T00:00:00` : null
      };
      
      // Record feedback
      await trackingService.recordFeedback(formattedValues);
      
      setLoading(false);
      
      // Show success message and navigate back
      alert('Feedback recorded successfully!');
      navigate('/feedback');
    } catch (error) {
      console.error('Error recording feedback:', error);
      setError('Failed to record feedback. Please try again.');
      setLoading(false);
      setSubmitting(false);
    }
  };

  // Star rating component
  const StarRating = ({ value, onChange }) => {
    const [hover, setHover] = useState(null);
    
    return (
      <div className="rating-group">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => onChange(ratingValue)}
                style={{ display: 'none' }}
              />
              <span
                className={`rating-star ${ratingValue <= (hover || value) ? 'active' : ''}`}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              >
                ★
              </span>
            </label>
          );
        })}
        <span className="rating-value">{value > 0 ? `${value}/5` : 'No rating'}</span>
      </div>
    );
  };

  if (loading && (!employees.length || !programs.length)) {
    return <div className="loading">Loading form data...</div>;
  }

  return (
    <div className="feedback-form-container">
      <div className="page-header">
        <h1>Provide Feedback</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="card">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ isSubmitting, dirty, isValid, values, setFieldValue }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="type">Feedback Type</label>
                <Field 
                  as="select"
                  id="type" 
                  name="type" 
                  className="form-control"
                >
                  <option value="EMPLOYEE_TO_PROGRAM">Employee feedback on Program</option>
                  <option value="TRAINER_TO_EMPLOYEE">Trainer feedback for Employee</option>
                </Field>
                <ErrorMessage name="type" component="div" className="form-error" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="employeeId">Employee</label>
                  <Field 
                    as="select"
                    id="employeeId" 
                    name="employeeId" 
                    className="form-control"
                    disabled={employeeId !== null}
                    onChange={(e) => {
                      setFieldValue('employeeId', e.target.value);
                      const employee = employees.find(emp => emp.id === parseInt(e.target.value));
                      if (employee) {
                        setFieldValue('employeeName', `${employee.firstName} ${employee.lastName}`);
                      }
                    }}
                  >
                    <option value="">Select an employee</option>
                    {employees.map(employee => (
                      <option key={employee.id} value={employee.id}>
                        {employee.firstName} {employee.lastName} ({employee.employeeId})
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="employeeId" component="div" className="form-error" />
                </div>

                <div className="form-group">
                  <label htmlFor="programId">Training Program</label>
                  <Field 
                    as="select"
                    id="programId" 
                    name="programId" 
                    className="form-control"
                    disabled={programId !== null}
                    onChange={(e) => {
                      setFieldValue('programId', e.target.value);
                      const program = programs.find(prog => prog.id === parseInt(e.target.value));
                      if (program) {
                        setFieldValue('programName', program.name);
                      }
                    }}
                  >
                    <option value="">Select a training program</option>
                    {programs.map(program => (
                      <option key={program.id} value={program.id}>
                        {program.name} ({program.category})
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="programId" component="div" className="form-error" />
                </div>
              </div>

              <div className="form-group">
                <label>Rating</label>
                <StarRating value={rating} onChange={setRating} />
              </div>

              <div className="form-group">
                <label htmlFor="comments">Comments</label>
                <Field 
                  as="textarea" 
                  id="comments" 
                  name="comments" 
                  className="form-control" 
                  placeholder="Enter your feedback comments" 
                />
                <ErrorMessage name="comments" component="div" className="form-error" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="providedBy">Provided By</label>
                  <Field 
                    type="text" 
                    id="providedBy" 
                    name="providedBy" 
                    className="form-control" 
                    placeholder="Enter your name" 
                  />
                  <ErrorMessage name="providedBy" component="div" className="form-error" />
                </div>

                <div className="form-group">
                  <label htmlFor="feedbackDate">Feedback Date</label>
                  <Field 
                    type="date" 
                    id="feedbackDate" 
                    name="feedbackDate" 
                    className="form-control" 
                  />
                  <ErrorMessage name="feedbackDate" component="div" className="form-error" />
                </div>
              </div>

              <div className="form-actions">
                <Link to="/feedback" className="btn btn-secondary">
                  Cancel
                </Link>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={isSubmitting || !(isValid)}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FeedbackForm;
