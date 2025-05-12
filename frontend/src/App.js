import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Layout components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

// Dashboard
import Dashboard from './components/dashboard/Dashboard';

// Training Program routes
import ProgramList from './components/training/ProgramList';
import ProgramDetail from './components/training/ProgramDetail';
import ProgramForm from './components/training/ProgramForm';
import SessionList from './components/training/SessionList';
import SessionForm from './components/training/SessionForm';

// Employee routes
import EmployeeList from './components/employees/EmployeeList';
import EmployeeDetail from './components/employees/EmployeeDetail';
import EmployeeForm from './components/employees/EmployeeForm';
import EnrollmentList from './components/employees/EnrollmentList';
import EnrollmentForm from './components/employees/EnrollmentForm';

// Tracking routes
import AttendanceList from './components/tracking/AttendanceList';
import AttendanceForm from './components/tracking/AttendanceForm';
import CompletionList from './components/tracking/CompletionList';
import CompletionForm from './components/tracking/CompletionForm';
import FeedbackList from './components/tracking/FeedbackList';
import FeedbackForm from './components/tracking/FeedbackForm';

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <Routes>
            {/* Dashboard */}
            <Route path="/" element={<Dashboard />} />
            
            {/* Training Program routes */}
            <Route path="/programs" element={<ProgramList />} />
            <Route path="/programs/:id" element={<ProgramDetail />} />
            <Route path="/programs/new" element={<ProgramForm />} />
            <Route path="/programs/edit/:id" element={<ProgramForm />} />
            <Route path="/sessions" element={<SessionList />} />
            <Route path="/sessions/new/:programId" element={<SessionForm />} />
            <Route path="/sessions/edit/:id" element={<SessionForm />} />
            
            {/* Employee routes */}
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/employees/:id" element={<EmployeeDetail />} />
            <Route path="/employees/new" element={<EmployeeForm />} />
            <Route path="/employees/edit/:id" element={<EmployeeForm />} />
            <Route path="/enrollments" element={<EnrollmentList />} />
            <Route path="/enrollments/new" element={<EnrollmentForm />} />
            
            {/* Tracking routes */}
            <Route path="/attendance" element={<AttendanceList />} />
            <Route path="/attendance/new" element={<AttendanceForm />} />
            <Route path="/completions" element={<CompletionList />} />
            <Route path="/completions/new" element={<CompletionForm />} />
            <Route path="/feedback" element={<FeedbackList />} />
            <Route path="/feedback/new" element={<FeedbackForm />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
