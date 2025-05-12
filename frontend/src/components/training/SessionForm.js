import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import trainingService from '../../services/trainingService';
import './Training.css';

const SessionForm = () => {
  const { id, programId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    location: '',
    trainer: '',
    maxAttendees: 20,
    trainingProgramId: programId || ''
  });
  const [isEdit, setIsEdit] = useState(false);

  // Validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    startTime: Yup.date().required('Start time is required'),
    endTime: Yup.date()
      .required('End time is required')
      .min(Yup.ref('startTime'), 'End time must be after start time'),
    location: Yup.string().required('Location is required'),
    trainer: Yup.string().required('Trainer name is required'),
    maxAttendees: Yup.number()
      .positive('Must be a positive number')
      .integer('Must be an integer')
      .required('Maximum attendees is required'),
    trainingProgramId: Yup.string().required('Program is required')
  });

  useEffect(() => {
    fetchPrograms();
    
    if (id) {
      setIsEdit(true);
      fetchSession(id);
    }
  }, [id, programId]);

  const fetchPrograms = async () => {
    try {
      const response = await trainingService.getAllPrograms();
      setPrograms(response.data);
    } catch (error) {
      console.error('Error fetching programs:', error);
      setError('Failed to load programs. Please try again.');
    }
  };

  const fetchSession = async (sessionId) => {
    try {
      setLoading(true);
      const response = await trainingService.getSessionById(sessionId);
      
      // Format dates for datetime-local input
      const session = response.data;
      const formattedSession = {
        ...session,
        startTime: formatDateForInput(new Date(session.startTime)),
        endTime: formatDateForInput(new Date(session.endTime))
      };
      
      setInitialValues(formattedSession);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching session:', error);
      setError('Failed to load session details. Please try again.');
      setLoading(false);
    }
  };

  // Helper function to format Date for datetime-local input
  const formatDateForInput = (date) => {
    return date.toISOString().slice(0, 16);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      setError(null);
      
      if (isEdit) {
        // Update existing session
        await trainingService.updateSession(id, values);
      } else {
        // Create new session
        await trainingService.createSession(values.trainingProgramId, values);
      }
      
      setLoading(false);
      // Redirect after successful operation
      navigate('/sessions');
    } catch (error) {
      console.error('Error saving session:', error);
      setError('Failed to save the session. Please try again.');
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (loading && isEdit) {
    return <div className="loading">Loading session details...</div>;
  }

  return (
    <div className="session-form-container">
      <div className="page-header">
        <h1>{isEdit ? 'Edit Training Session' : 'Create New Training Session'}</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="card">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, dirty, isValid, values, setFieldValue }) => (
            <Form>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Session Title</label>
                  <Field 
                    type="text" 
                    id="title" 
                    name="title" 
                    className="form-control" 
                    placeholder="Enter session title" 
                  />
                  <ErrorMessage name="title" component="div" className="form-error" />
                </div>

                <div className="form-group">
                  <label htmlFor="trainingProgramId">Training Program</label>
                  <Field 
                    as="select"
                    id="trainingProgramId" 
                    name="trainingProgramId" 
                    className="form-control"
                    disabled={programId !== undefined}
                  >
                    <option value="">Select a program</option>
                    {programs.map(program => (
                      <option key={program.id} value={program.id}>{program.name}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="trainingProgramId" component="div" className="form-error" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <Field 
                  as="textarea" 
                  id="description" 
                  name="description" 
                  className="form-control" 
                  placeholder="Enter session description" 
                />
                <ErrorMessage name="description" component="div" className="form-error" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="startTime">Start Time</label>
                  <Field 
                    type="datetime-local" 
                    id="startTime" 
                    name="startTime" 
                    className="form-control" 
                  />
                  <ErrorMessage name="startTime" component="div" className="form-error" />
                </div>

                <div className="form-group">
                  <label htmlFor="endTime">End Time</label>
                  <Field 
                    type="datetime-local" 
                    id="endTime" 
                    name="endTime" 
                    className="form-control" 
                  />
                  <ErrorMessage name="endTime" component="div" className="form-error" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <Field 
                    type="text" 
                    id="location" 
                    name="location" 
                    className="form-control" 
                    placeholder="Enter session location" 
                  />
                  <ErrorMessage name="location" component="div" className="form-error" />
                </div>

                <div className="form-group">
                  <label htmlFor="trainer">Trainer</label>
                  <Field 
                    type="text" 
                    id="trainer" 
                    name="trainer" 
                    className="form-control" 
                    placeholder="Enter trainer name" 
                  />
                  <ErrorMessage name="trainer" component="div" className="form-error" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="maxAttendees">Maximum Attendees</label>
                <Field 
                  type="number" 
                  id="maxAttendees" 
                  name="maxAttendees" 
                  className="form-control" 
                  min="1"
                />
                <ErrorMessage name="maxAttendees" component="div" className="form-error" />
              </div>

              <div className="form-actions">
                <Link to="/sessions" className="btn btn-secondary">
                  Cancel
                </Link>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={isSubmitting || !(dirty && isValid)}
                >
                  {isSubmitting ? 'Saving...' : isEdit ? 'Update Session' : 'Create Session'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SessionForm;
