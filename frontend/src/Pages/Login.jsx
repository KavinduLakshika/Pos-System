import React from 'react';

function Login() {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card p-4 rounded shadow-lg w-100" style={{ maxWidth: '400px' }}>
        <div className="text-center mb-4">
          <img src="🌟" alt="logo" className="mb-3" style={{ height: '40px' }} />
        </div>
        <h2 className="text-center mb-4">Welcome!</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Username"
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
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <a href="#" className="text-primary">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
