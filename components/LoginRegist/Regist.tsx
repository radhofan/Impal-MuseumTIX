import React from 'react';

import '@/css/Regist.css';

import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';

function Regist() {
  return (
    <div className="regist-body">
      <Navbar />
      <div className="regist-section1">
      <div className='login-overlay'>
              <h1>Art & History<br />At Your Fingertips</h1>
            </div>
        <div className="form-card">
          <div className="form-header">
            <h1 className="form-title">Museum<span className="highlight">Tix</span></h1>
            <h2 className="form-subtitle">Sign Up Account</h2>
            <p className="form-description">Enter your personal data to create your account.</p>
          </div>
          <form className="form">
            <div className="form-group">
              <input type="text" placeholder="First Name" className="form-input" />
              <input type="text" placeholder="Last Name" className="form-input" />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email" className="form-input" />
            </div>
            <div className="form-group">
              <input type="password" placeholder="Password" className="form-input" />

            </div>
            <p className="password-hint">Must be at least 8 characters.</p>
            <button type="submit" className="form-button">Sign Up</button>
          </form>
          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Regist;