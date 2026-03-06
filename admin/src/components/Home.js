import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ user, onLogout }) => {
  return (
    <div>
      <header className="header">
        <h1>Welcome to CREWERA Reality</h1>
      </header>
      
      <main className="main-content">
        {user ? (
          <div>
            <h2>Hello {user.first_name} {user.last_name}, welcome to CREWERA Reality!</h2>
            <p>You are logged in as a {user.role}.</p>
            <button className="btn" onClick={onLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <h2>Welcome to CREWERA Reality</h2>
            <p>Please login or signup to continue.</p>
            <div>
              <Link to="/login">
                <button className="btn">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-secondary">Signup</button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;