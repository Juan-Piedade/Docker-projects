import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const LoggedIn = ({ onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://backend:3001/api/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
        onLogout();
      }
    };

    fetchUserData();
  }, [onLogout]);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <h2>Bem-vindo ao seu Dashboard</h2>
      {error && <div className="error-message">{error}</div>}
      
      {userData && (
        <div className="user-info">
          <p>Email: {userData.email}</p>
          <p>ID: {userData.userId}</p>
        </div>
      )}
      
      <button onClick={handleLogout} className="logout-button">
        Sair
      </button>
    </div>
  );
};

export default LoggedIn;