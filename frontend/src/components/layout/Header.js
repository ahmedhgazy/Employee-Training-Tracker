import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="logo">
        <Link to="/">
          <h1>Employee Training Tracker</h1>
        </Link>
      </div>
      <div className="header-controls">
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <button type="submit">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="user-profile">
          <span className="user-name">Admin</span>
          {/* <img src="/profile-placeholder.png" alt="User" className="profile-image" /> */}
          <div className="dropdown-menu">
            <ul>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/settings">Settings</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
