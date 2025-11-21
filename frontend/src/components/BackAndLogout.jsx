import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BackAndLogout = ({ showBack = true, showLogout = true, backTarget = null }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleBack = () => {
    if (backTarget) {
      navigate(backTarget);
    } else {
      navigate(-1); // Go back to previous page
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="back-logout-buttons">
      {showBack && (
        <button className="btn btn-secondary mr-2" onClick={handleBack}>
          Back
        </button>
      )}
      {showLogout && (
        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default BackAndLogout;