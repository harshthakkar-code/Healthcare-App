import React, { useState } from 'react';
import './Login.css';
import api from '../../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) newErrors.email = 'Enter a valid email.';
    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      setLoading(false);
      if (res.data.token) {
        console.log('Login successful:', res.data);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('role', res.data.user.role);
        // Redirect to home or dashboard

        toast.success('Login successful!');
        // setTimeout(() => { window.location.href = '/'; }, 1200);
      } else {
        toast.error(res.data.message || 'Login failed.');
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  // Remove error as soon as the user enters a valid value
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (submitted) {
      setErrors((prev) => {
        const { email, ...rest } = prev;
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e.target.value)) {
          return { ...rest, email: 'Enter a valid email.' };
        }
        return rest;
      });
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (submitted) {
      setErrors((prev) => {
        const { password, ...rest } = prev;
        if (e.target.value.length < 6) {
          return { ...rest, password: 'Password must be at least 6 characters.' };
        }
        return rest;
      });
    }
  };

  return (
    <div className="login-container">
      <ToastContainer position="top-center" autoClose={2000} />
      {/* Left Banner Image */}
      <div className="login-banner">
        <img height={500} width={500} src="../../login-banner.png" alt="Login Illustration" />
      </div>

      {/* Right Form */}
      <div className="login-form-box">
        <h2>Login Doccure</h2>
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} />
          {submitted && errors.email && <div className="input-error">{errors.email}</div>}

          <div className="password-wrapper">
            <label>Password</label>
            <a href="/forgotpassword" className="forgot-link">Forgot password?</a>
          </div>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
            <span className="eye-icon" onClick={() => setShowPassword((show) => !show)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {submitted && errors.password && <div className="input-error">{errors.password}</div>}

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
