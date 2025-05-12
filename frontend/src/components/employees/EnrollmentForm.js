import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import employeeService from '../../services/employeeService';
import trainingService from '../../services/trainingService';
import './Employees.css';

const EnrollmentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const preselectedEmployeeId = queryParams.get('employeeId');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [programs, setPrograms] = useState([]);
  
  const initialValues = {
    employeeId: preselectedEmployeeId || '',
    programId: '',
    status: 'ENROLLED'
  };

  // Validation schema
  const validationSchema = Yup.object({
    employeeId: Yup.string().required('Employee is required'),
    programId: Yup.string().required('Training program is required'),
    status: Yup.string().required('Status is required')
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
      
      // Enroll employee to program
      await employeeService.enrollEmployeeToProgram(values.employeeId, values.programId);
      
      setLoading(false);
      
      // Show success message and navigate back to enrollments list
      alert('Employee enrolled successfully!');
      navigate('/enrollments');
    } catch (error) {
      console.error('Error enrolling employee:', error);
      setError('Failed to enroll employee. Please try again.');
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (loading && (!employees.length || !programs.length)) {
    return <div className="loading">Loading form data...</div>;
  }

  return (
    <div className="enrollment-form-container">
      <div className="page-header">
        <h1>Enroll Employee to Program</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="card">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ isSubmitting, dirty, isValid }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="employeeId">Employee</label>
                <Field 
                  as="select"
                  id="employeeId" 
                  name="employeeId" 
                  className="form-control"
                  disabled={preselectedEmployeeId !== null}
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

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <Field 
                  as="select"
                  id="status" 
                  name="status" 
                  className="form-control"
                >
                  <option value="ENROLLED">Enrolled</option>
                  <option value="IN_PROGRESS">In Progress</option>
                </Field>
                <ErrorMessage name="status" component="div" className="form-error" />
              </div>

              <div className="form-actions">
                <Link to="/enrollments" className="btn btn-secondary">
                  Cancel
                </Link>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={isSubmitting || !(dirty && isValid)}
                >
                  {isSubmitting ? 'Enrolling...' : 'Enroll Employee'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EnrollmentForm;
