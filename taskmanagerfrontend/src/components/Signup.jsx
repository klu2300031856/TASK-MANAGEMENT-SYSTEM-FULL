import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [popup, setPopup] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPopup('');

    const payload = { username, password };

    try {
      const response = await fetch(`${BASE_URL}/task/user/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      let data;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = { raw: text };
      }

      if (response.ok) {
        setPopup('Successfully registered!');
        setTimeout(() => {
          setPopup('');
          navigate('/login');
        }, 1500);
      } else {
        setPopup((data && (data.message || data.error)) || `Signup failed (status ${response.status})`);
      }
    } catch (error) {
      setPopup('Network error!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <form className="form-box" onSubmit={handleSignup}>
        {popup && <div className="form-popup">{popup}</div>}
        <h2 className="form-title">Signup</h2>
        <input
          className="form-input"
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="form-input"
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="form-btn" disabled={loading}>
          {loading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
    </div>
  );
}

export default Signup;
