import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      {/* Left Banner Image */}
      <div className="login-banner">
        <img height={500} width={500} src="../../login-banner.png" alt="Login Illustration" />
      </div>

      {/* Right Form */}
      <div className="login-form-box">
        <h2>Login Doccure</h2>
        <form className="login-form">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />

          <div className="password-wrapper">
            <label>Password</label>
            <a href="/forgotpassword" className="forgot-link">Forgot password?</a>
          </div>
          <input type="password" placeholder="Enter your password" required />

          <div className="options">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            {/* <label>
              <input type="checkbox" /> Login with OTP
            </label> */}
          </div>

          <button type="submit" className="signin-btn">Sign in</button>

          <div className="divider">or</div>

          <button className="social-btn google">
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
            Sign in With Google
          </button>
          <button className="social-btn facebook">
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
