import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import employeeService from '../../services/employeeService';
import './Employees.css';

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    position: '',
    employeeId: ''
  });
  const [isEdit, setIsEdit] = useState(false);

  // Validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    department: Yup.string().required('Department is required'),
    position: Yup.string().required('Position is required'),
    employeeId: Yup.string().required('Employee ID is required')
  });

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      fetchEmployee(id);
    }
  }, [id]);

  const fetchEmployee = async (employeeId) => {
    try {
      setLoading(true);
      const response = await employeeService.getEmployeeById(employeeId);
      setInitialValues(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employee:', error);
      setError('Failed to load employee details. Please try again.');
      setLoading(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      setError(null);
      
      if (isEdit) {
        // Update existing employee
        await employeeService.updateEmployee(id, values);
      } else {
        // Create new employee
        await employeeService.createEmployee(values);
      }
      
      setLoading(false);
      // Redirect after successful operation
      navigate('/employees');
    } catch (error) {
      console.error('Error saving employee:', error);
      setError('Failed to save the employee. Please try again.');
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (loading && isEdit) {
    return <div className="loading">Loading employee details...</div>;
  }

  return (
    <div className="employee-form-container">
      <div className="page-header">
        <h1>{isEdit ? 'Edit Employee' : 'Add New Employee'}</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="employee-form">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, dirty, isValid }) => (
            <Form>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <Field 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    className="form-control" 
                    placeholder="Enter first name" 
                  />
                  <ErrorMessage name="firstName" component="div" className="form-error" />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <Field 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    className="form-control" 
                    placeholder="Enter last name" 
                  />
                  <ErrorMessage name="lastName" component="div" className="form-error" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="form-control" 
                  placeholder="Enter email address" 
                />
                <ErrorMessage name="email" component="div" className="form-error" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <Field 
                    as="select"
                    id="department" 
                    name="department" 
                    className="form-control"
                  >
                    <option value="">Select department</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Operations">Operations</option>
                    <option value="Research">Research</option>
                    <option value="Customer Support">Customer Support</option>
                  </Field>
                  <ErrorMessage name="department" component="div" className="form-error" />
                </div>

                <div className="form-group">
                  <label htmlFor="position">Position</label>
                  <Field 
                    type="text" 
                    id="position" 
                    name="position" 
                    className="form-control" 
                    placeholder="Enter position" 
                  />
                  <ErrorMessage name="position" component="div" className="form-error" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="employeeId">Employee ID</label>
                <Field 
                  type="text" 
                  id="employeeId" 
                  name="employeeId" 
                  className="form-control" 
                  placeholder="Enter employee ID (e.g., EMP-001)" 
                  disabled={isEdit} // Employee ID should not be editable
                />
                <ErrorMessage name="employeeId" component="div" className="form-error" />
              </div>

              <div className="form-actions">
                <Link to="/employees" className="btn btn-secondary">
                  Cancel
                </Link>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={isSubmitting || !(dirty && isValid)}
                >
                  {isSubmitting ? 'Saving...' : isEdit ? 'Update Employee' : 'Add Employee'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EmployeeForm;
