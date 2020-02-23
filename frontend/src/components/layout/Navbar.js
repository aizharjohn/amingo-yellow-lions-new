import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-user-md"></i> Health Share
        </Link>
      </h1>
      <ul>
      <li>
          <Link to="/topic">Topics</Link>
        </li>
                <li>
          <Link to="/register">Sign Up</Link>
        </li>
        <li>
          <Link to="/login">Sign In</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
