import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import trackingService from '../../services/trackingService';
import trainingService from '../../services/trainingService';
import employeeService from '../../services/employeeService';
import './Tracking.css';

const AttendanceForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('sessionId');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [employees, setEmployees] = useState([]);
  
  const initialValues = {
    employeeId: '',
    sessionId: sessionId || '',
    employeeName: '',
    sessionName: '',
    attendanceTime: new Date().toISOString().slice(0, 16),
    present: true,
    notes: ''
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    employeeId: Yup.number().required('Employee is required'),
    sessionId: Yup.number().required('Training session is required'),
    attendanceTime: Yup.date().required('Attendance time is required'),
    present: Yup.boolean().required('Presence status is required'),
    notes: Yup.string()
  });

  useEffect(() => {
    fetchEmployeesAndSessions();
  }, []);

  const fetchEmployeesAndSessions = async () => {
    setLoading(true);
    try {
      // Fetch employees
      const employeesResponse = await employeeService.getAllEmployees();
      setEmployees(employeesResponse.data);
      
      // Fetch sessions
      const sessionsResponse = await trainingService.getAllSessions();
      setSessions(sessionsResponse.data);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load employees or sessions. Please try again.');
      setLoading(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setLoading(true);
      setError(null);
      
      // Get employee and session names for the record
      if (employees.length && sessions.length) {
        const employee = employees.find(emp => emp.id === parseInt(values.employeeId));
        const session = sessions.find(sess => sess.id === parseInt(values.sessionId));
        
        if (employee && session) {
          values.employeeName = `${employee.firstName} ${employee.lastName}`;
          values.sessionName = session.title;
        }
      }
      
      // Record attendance
      await trackingService.recordAttendance(values);
      
      setLoading(false);
      resetForm();
      
      // Show success message and navigate back to attendance list
      alert('Attendance recorded successfully!');
      navigate('/attendance');
    } catch (error) {
      console.error('Error recording attendance:', error);
      setError('Failed to record attendance. Please try again.');
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (loading && !employees.length && !sessions.length) {
    return <div className="loading">Loading form data...</div>;
  }

  return (
    <div className="attendance-form-container">
      <div className="page-header">
        <h1>Record Attendance</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="card">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="sessionId">Training Session</label>
                <Field 
                  as="select"
                  id="sessionId" 
                  name="sessionId" 
                  className="form-control"
                >
                  <option value="">Select a training session</option>
                  {sessions.map(session => (
                    <option key={session.id} value={session.id}>
                      {session.title} ({new Date(session.startTime).toLocaleDateString()})
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="sessionId" component="div" className="form-error" />
              </div>

              <div className="form-group">
                <label htmlFor="employeeId">Employee</label>
                <Field 
                  as="select"
                  id="employeeId" 
                  name="employeeId" 
                  className="form-control"
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
                <label htmlFor="attendanceTime">Attendance Time</label>
                <Field 
                  type="datetime-local" 
                  id="attendanceTime" 
                  name="attendanceTime" 
                  className="form-control" 
                />
                <ErrorMessage name="attendanceTime" component="div" className="form-error" />
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <Field 
                    type="checkbox" 
                    name="present" 
                    className="checkbox-input" 
                  />
                  Present
                </label>
                <ErrorMessage name="present" component="div" className="form-error" />
              </div>

              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <Field 
                  as="textarea" 
                  id="notes" 
                  name="notes" 
                  className="form-control" 
                  placeholder="Add any notes about the attendance" 
                />
                <ErrorMessage name="notes" component="div" className="form-error" />
              </div>

              <div className="form-actions">
                <Link to="/attendance" className="btn btn-secondary">
                  Cancel
                </Link>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Recording...' : 'Record Attendance'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AttendanceForm;
