import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    const result = await logout();
    if (result.success) {
      navigate('/');
    }
  };

  const initial = user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="user-menu" ref={dropdownRef}>
      <div 
        className="user-avatar" 
        id="user-avatar"
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer' }}
      >
        {initial}
      </div>
      <div className={`user-dropdown ${!isOpen ? 'hidden' : ''}`} id="user-dropdown">
        <a href="#" onClick={(e) => { e.preventDefault(); setIsOpen(false); }}>
          Switch Account
        </a>
        <a href="#" onClick={handleLogout}>
          Sign Out
        </a>
      </div>
    </div>
  );
};

export default UserProfile;
