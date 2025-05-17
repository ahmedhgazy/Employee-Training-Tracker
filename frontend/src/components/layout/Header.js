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
     
    </header>
  );
};

export default Header;
