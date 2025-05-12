import React from 'react';
import { NavLink } from 'react-router-dom';
import './Layout.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li className="nav-header">Main</li>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
              <i className="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </NavLink>
          </li>
          
          <li className="nav-header">Training</li>
          <li>
            <NavLink to="/programs" className={({ isActive }) => isActive ? 'active' : ''}>
              <i className="fas fa-book"></i>
              <span>Programs</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/sessions" className={({ isActive }) => isActive ? 'active' : ''}>
              <i className="fas fa-calendar-alt"></i>
              <span>Sessions</span>
            </NavLink>
          </li>
          
          <li className="nav-header">People</li>
          <li>
            <NavLink to="/employees" className={({ isActive }) => isActive ? 'active' : ''}>
              <i className="fas fa-users"></i>
              <span>Employees</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/enrollments" className={({ isActive }) => isActive ? 'active' : ''}>
              <i className="fas fa-user-plus"></i>
              <span>Enrollments</span>
            </NavLink>
          </li>
          
          <li className="nav-header">Tracking</li>
          <li>
            <NavLink to="/attendance" className={({ isActive }) => isActive ? 'active' : ''}>
              <i className="fas fa-clipboard-check"></i>
              <span>Attendance</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/completions" className={({ isActive }) => isActive ? 'active' : ''}>
              <i className="fas fa-award"></i>
              <span>Completions</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/feedback" className={({ isActive }) => isActive ? 'active' : ''}>
              <i className="fas fa-comment-alt"></i>
              <span>Feedback</span>
            </NavLink>
          </li>
          
          <li className="nav-header">Reports</li>
          <li>
            <NavLink to="/reports" className={({ isActive }) => isActive ? 'active' : ''}>
              <i className="fas fa-chart-line"></i>
              <span>Analytics</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
