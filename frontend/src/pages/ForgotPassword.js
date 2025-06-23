import React from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
  return (
    <div className="forgot-container">
      {/* Left Banner */}
      <div className="forgot-banner">
        <img  src="../../login-banner.png" alt="Banner" height={500} width={500} />
      </div>

      {/* Right Form */}
      <div className="forgot-box">
        <h2>Forgot Password</h2>
        <p>Enter your email and we will send you a link to reset your password.</p>
        <form className="forgot-form">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />

          <button type="submit" className="forgot-submit">Submit</button>
        </form>
        <p className="forgot-footer">
          Remember Password? <a href="/login">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
