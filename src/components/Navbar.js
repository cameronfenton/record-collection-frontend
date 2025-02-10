import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`navbar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      <div className="navbar-header">
        <button onClick={toggleNavbar} className="navbar-toggle">
          <span className="material-icons">
            {isCollapsed ? 'menu' : 'menu'}
          </span>
        </button>
      </div>
      <ul>
        <li>
          <Link to="/albums">
            <span className="material-icons">album</span>
            <span className="text">Albums</span>
          </Link>
        </li>
        {/* Add more links for different formats */}
      </ul>
    </div>
  );
};

export default Navbar;