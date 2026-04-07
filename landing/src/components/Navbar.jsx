import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-secondary py-4">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-primary font-bold text-2xl">
            <i className="bi bi-coin me-2"></i>Money Mentor
          </Link>
          <div className="flex gap-4">
            <Link to="/login" className="text-white hover:text-primary font-medium">
              Login
            </Link>
            <Link to="/register" className="text-white hover:text-primary font-medium">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;