import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check login states
  const userLoggedIn = !!localStorage.getItem('token');
  const adminLoggedIn = !!localStorage.getItem('admin');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('admin');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Logo"
          className="logo-img"
        />
        <span className="navbar-title">TaskManager</span>
      </div>

      {/* If any user/admin is logged in -> show Logout */}
      {(userLoggedIn || adminLoggedIn) ? (
        <button className="navbar-login" onClick={handleLogout}>Logout</button>
      ) : (
        <div>
          {/* User Login */}
          <button className="navbar-login" onClick={() => navigate('/login')}>
            User Login
          </button>

          {/* Admin Login */}
          <button className="navbar-login" onClick={() => navigate('/admin/login')}>
            Admin Login
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
