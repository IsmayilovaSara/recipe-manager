import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Recipe Manager</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/recipes">Recipes</Link>
        <Link to="/contact">Contact Me</Link> {/* Added Contact Me link */}
      </div>
    </nav>
  );
};

export default Navbar;
