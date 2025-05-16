import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import LoggedIn from './components/loggedIn';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          !isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />
        } />
        <Route path="/register" element={
          !isAuthenticated ? <Register /> : <Navigate to="/" />
        } />
        <Route path="/" element={
          isAuthenticated ? <LoggedIn onLogout={handleLogout} /> : <Navigate to="/login" />
        } />
      </Routes>
    </Router>
  );
}

export default App;