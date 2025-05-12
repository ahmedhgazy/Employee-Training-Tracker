import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import trackingService from '../../services/trackingService';
import employeeService from '../../services/employeeService';
import trainingService from '../../services/trainingService';
import './Tracking.css';

const CompletionForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const enrollmentId = queryParams.get('enrollmentId');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [enrollment, setEnrollment] = useState(null);
  
  const initialValues = {
    employeeId: '',
    programId: '',
    employeeName: '',
    programName: '',
    completionDate: new Date().toISOString().slice(0, 10),
    score: 0,
    status: 'COMPLETE',
    certificateUrl: '',
    completedBy: 'Admin' // Default value, could be replaced with logged in user
  };

  // Validation schema
  const validationSchema = Yup.object({
    employeeId: Yup.string().required('Employee is required'),
    programId: Yup.string().required('Program is required'),
    completionDate: Yup.date().required('Completion date is required'),
    score: Yup.number()
      .min(0, 'Score must be at least 0')
      .max(100, 'Score cannot exceed 100')
      .required('Score is required'),
    status: Yup.string().required('Status is required'),
    completedBy: Yup.string().required('Completed by is required')
  });

  useEffect(() => {
    fetchEmployeesAndPrograms();
    
    if (enrollmentId) {
      fetchEnrollmentDetails(enrollmentId);
    }
  }, [enrollmentId]);

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

  const fetchEnrollmentDetails = async (id) => {
    try {
      // This is a mock implementation since we don't have a direct API to get enrollment by ID
      // In a real implementation, you would have an endpoint to get enrollment by ID
      const employeesResponse = await employeeService.getAllEmployees();
      
      for (const employee of employeesResponse.data) {
        try {
          const enrollmentsResponse = await employeeService.getEnrollmentsByEmployee(employee.id);
          const foundEnrollment = enrollmentsResponse.data.find(e => e.id === parseInt(id));
          
          if (foundEnrollment) {
            setEnrollment({
              ...foundEnrollment,
              employeeName: `${employee.firstName} ${employee.lastName}`,
              employeeId: employee.id
            });
            
            // Set initial values based on enrollment
            initialValues.employeeId = employee.id.toString();
            initialValues.programId = foundEnrollment.programId.toString();
            initialValues.employeeName = `${employee.firstName} ${employee.lastName}`;
            initialValues.programName = foundEnrollment.programName;
            
            break;
          }
        } catch (error) {
          console.error(`Error fetching enrollments for employee ${employee.id}:`, error);
        }
      }
    } catch (error) {
      console.error('Error fetching enrollment details:', error);
      setError('Failed to load enrollment details. Please try again.');
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
      
      // Record completion
      await trackingService.recordCompletion(values);
      
      // If this completion came from an enrollment, update the enrollment status
      if (enrollmentId) {
        await employeeService.updateEnrollmentStatus(enrollmentId, { status: 'COMPLETED' });
      }
      
      setLoading(false);
      
      // Show success message and navigate back
      alert('Program completion recorded successfully!');
      navigate('/completions');
    } catch (error) {
      console.error('Error recording completion:', error);
      setError('Failed to record completion. Please try again.');
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (loading && (!employees.length || !programs.length)) {
    return <div className="loading">Loading form data...</div>;
  }

  return (
    <div className="completion-form-container">
      <div className="page-header">
        <h1>Record Program Completion</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="card">
        <Formik
          initialValues={enrollment ? {
            employeeId: enrollment.employeeId.toString(),
            programId: enrollment.programId.toString(),
            employeeName: enrollment.employeeName,
            programName: enrollment.programName,
            completionDate: new Date().toISOString().slice(0, 10),
            score: 0,
            status: 'COMPLETE',
            certificateUrl: '',
            completedBy: 'Admin'
          } : initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ isSubmitting, dirty, isValid, values, setFieldValue }) => (
            <Form>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="employeeId">Employee</label>
                  <Field 
                    as="select"
                    id="employeeId" 
                    name="employeeId" 
                    className="form-control"
                    disabled={enrollmentId !== null}
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
                    disabled={enrollmentId !== null}
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

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="completionDate">Completion Date</label>
                  <Field 
                    type="date" 
                    id="completionDate" 
                    name="completionDate" 
                    className="form-control" 
                  />
                  <ErrorMessage name="completionDate" component="div" className="form-error" />
                </div>

                <div className="form-group">
                  <label htmlFor="score">Score (%)</label>
                  <Field 
                    type="number" 
                    id="score" 
                    name="score" 
                    className="form-control" 
                    min="0"
                    max="100"
                  />
                  <ErrorMessage name="score" component="div" className="form-error" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <Field 
                    as="select"
                    id="status" 
                    name="status" 
                    className="form-control"
                  >
                    <option value="COMPLETE">Complete</option>
                    <option value="PARTIAL">Partial</option>
                    <option value="FAILED">Failed</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="form-error" />
                </div>

                <div className="form-group">
                  <label htmlFor="completedBy">Completed By</label>
                  <Field 
                    type="text" 
                    id="completedBy" 
                    name="completedBy" 
                    className="form-control" 
                    placeholder="Enter your name" 
                  />
                  <ErrorMessage name="completedBy" component="div" className="form-error" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="certificateUrl">Certificate URL (Optional)</label>
                <Field 
                  type="text" 
                  id="certificateUrl" 
                  name="certificateUrl" 
                  className="form-control" 
                  placeholder="Enter URL to certificate" 
                />
                <ErrorMessage name="certificateUrl" component="div" className="form-error" />
              </div>

              <div className="form-actions">
                <Link to="/completions" className="btn btn-secondary">
                  Cancel
                </Link>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={isSubmitting || !(isValid)}
                >
                  {isSubmitting ? 'Recording...' : 'Record Completion'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CompletionForm;
