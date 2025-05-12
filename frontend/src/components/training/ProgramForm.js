import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import trainingService from '../../services/trainingService';
import './Training.css';

const ProgramForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
    category: '',
    createdBy: 'Admin' // Default value, could be replaced with logged in user
  });
  const [isEdit, setIsEdit] = useState(false);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Program name is required'),
    description: Yup.string().required('Description is required'),
    category: Yup.string().required('Category is required'),
    createdBy: Yup.string().required('Creator name is required')
  });

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      fetchProgram(id);
    }
  }, [id]);

  const fetchProgram = async (programId) => {
    try {
      setLoading(true);
      const response = await trainingService.getProgramById(programId);
      setInitialValues(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching program:', error);
      setError('Failed to load program details. Please try again.');
      setLoading(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      setError(null);
      
      if (isEdit) {
        // Update existing program
        await trainingService.updateProgram(id, values);
      } else {
        // Create new program
        await trainingService.createProgram(values);
      }
      
      setLoading(false);
      // Redirect to programs list after successful operation
      navigate('/programs');
    } catch (error) {
      console.error('Error saving program:', error);
      setError('Failed to save the program. Please try again.');
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (loading && isEdit) {
    return <div className="loading">Loading program details...</div>;
  }

  return (
    <div className="program-form-container">
      <div className="page-header">
        <h1>{isEdit ? 'Edit Training Program' : 'Create New Training Program'}</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="program-form">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, dirty, isValid }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="name">Program Name</label>
                <Field 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="form-control" 
                  placeholder="Enter program name" 
                />
                <ErrorMessage name="name" component="div" className="form-error" />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <Field 
                  as="select"
                  id="category" 
                  name="category" 
                  className="form-control"
                >
                  <option value="">Select a category</option>
                  <option value="Programming">Programming</option>
                  <option value="Soft Skills">Soft Skills</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Cloud">Cloud</option>
                  <option value="Security">Security</option>
                  <option value="Data Science">Data Science</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Other">Other</option>
                </Field>
                <ErrorMessage name="category" component="div" className="form-error" />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <Field 
                  as="textarea" 
                  id="description" 
                  name="description" 
                  className="form-control" 
                  placeholder="Enter program description" 
                />
                <ErrorMessage name="description" component="div" className="form-error" />
              </div>

              <div className="form-group">
                <label htmlFor="createdBy">Created By</label>
                <Field 
                  type="text" 
                  id="createdBy" 
                  name="createdBy" 
                  className="form-control" 
                  placeholder="Enter your name" 
                />
                <ErrorMessage name="createdBy" component="div" className="form-error" />
              </div>

              <div className="form-actions">
                <Link to="/programs" className="btn btn-secondary">
                  Cancel
                </Link>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={isSubmitting || !(dirty && isValid)}
                >
                  {isSubmitting ? 'Saving...' : isEdit ? 'Update Program' : 'Create Program'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProgramForm;
