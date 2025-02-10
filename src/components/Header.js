import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="header-home">
        <span className="material-icons">home</span> Home
      </Link>
      <div className="header-search">
        <input type="text" placeholder="Search..." />
      </div>
    </div>
  );
};

export default Header;