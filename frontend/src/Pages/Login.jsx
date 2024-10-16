import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

function Login() {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${config.BASE_URL}/userLogin`, { userName, userPassword });
        const { token, user } = response.data;

        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));  

        navigate('/');  
    } catch (error) {
        setError('Invalid username or password');
    }
};


  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card p-4 rounded shadow-lg w-100" style={{ maxWidth: '400px' }}>
        <div className="text-center mb-4">
          {/* <img src="/logo.png" alt="logo" className="mb-3" style={{ height: '40px' }} /> */}
          <h1>Pos System</h1>
        </div>
        <h2 className="text-center mb-4">Welcome!</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <a href="#signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;