import React, { useState } from 'react';
import './Login.css';
import api from '../../api/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      setLoading(false);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        alert('Login successful!');
        window.location.href = '/';
      } else {
        alert(res.data.message || 'Login failed.');
      }
    } catch (err) {
      setLoading(false);
      alert(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      {/* Left Banner Image */}
      <div className="login-banner">
        <img height={500} width={500} src="../../login-banner.png" alt="Login Illustration" />
      </div>

      {/* Right Form */}
      <div className="login-form-box">
        <h2>Login Doccure</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required value={email} onChange={e => setEmail(e.target.value)} />

          <div className="password-wrapper">
            <label>Password</label>
            <a href="/forgotpassword" className="forgot-link">Forgot password?</a>
          </div>
          <input type="password" placeholder="Enter your password" required value={password} onChange={e => setPassword(e.target.value)} />

          <div className="options-login">
              <input type="checkbox" style={{width: '20px', height: '15px', marginBottom: '5px'}}/> 
            <label>Remember Me
            </label>
            {/* <label>
              <input type="checkbox" /> Login with OTP
            </label> */}
          </div>

          <button type="submit" className="signin-btn-login" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>

          <div className="divider-login">or</div>

          <button type="button" className="social-btn google">
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
            Sign in With Google
          </button>
          <button type="button" className="social-btn facebook">
            <img src="https://img.icons8.com/ios-filled/16/ffffff/facebook.png" alt="Facebook" />
            Sign in With Facebook
          </button>

          <p className="signup-link">Don't have an account? <a href="/doctor-register">Sign up</a></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
