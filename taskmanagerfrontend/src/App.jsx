import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import User from './components/User';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Progress from './components/Progress';

import AdminLogin from './components/AdminLogin';
import AdminSignup from './components/AdminSignup';
import AdminHome from './components/AdminHome';

import './App.css';


// ------------------------
// WRAPPER
// ------------------------
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}


// ------------------------
// MAIN APP
// ------------------------
function App() {
  const location = useLocation();

  // Hide navbar & footer on ALL login/signup routes (including nested)
  const hideNavbar =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/signup") ||
    location.pathname.startsWith("/admin/login") ||
    location.pathname.startsWith("/admin/signup");

  return (
    <div className="app-layout">

      {/* Navbar hidden on ALL login/signup pages */}
      {!hideNavbar && <Navbar />}

      <main className="main-content">
        <Routes>

          {/* USER ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<User />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/progress" element={<Progress />} />

          {/* ADMIN ROUTES */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/home" element={<AdminHome />} />

          {/* NOT FOUND */}
          <Route
            path="*"
            element={
              <div style={{ textAlign: 'center', width: '100%' }}>
                <h2 style={{ color: '#232526', marginTop: '3rem' }}>
                  404 - Page Not Found
                </h2>
              </div>
            }
          />
        </Routes>
      </main>

      {/* Footer hidden on ALL login/signup pages */}
      {!hideNavbar && <Footer />}
    </div>
  );
}

export default AppWrapper;
