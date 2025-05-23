// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.link}>Home</Link>
      {isAuthenticated && (
        <>
          <Link to="/new" style={styles.link}>New Post</Link>
          <Link to="/myposts" style={styles.link}>My Posts</Link>
        </>
      )}
      {!isAuthenticated ? (
        <>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/signup" style={styles.link}>Signup</Link>
        </>
      ) : (
        <button onClick={handleLogout} style={styles.button}>Logout</button>
      )}
    </nav>
  );
};

const styles = {
  navbar: {
    background: '#222',
    padding: '10px',
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
  button: {
    marginLeft: 'auto',
    padding: '5px 10px',
    background: '#f44336',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
  }
};

export default Navbar;
