import React from 'react';
import '@/css/Login.css';

import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';
import Link from 'next/link';


function Login() {
  return (
        <div className='login-body'>
      <Navbar />
      <div className='login-section1'>
        {/* Left Section */}
        <div className='image-overlay'>
          <h2>Art & History<br />At Your Fingertips</h2>
        </div>

        {/* Right Section */}
        <div className="form-card">
          {/* Logo and Heading */}
          <div className="logo-section">
            <h1 className="logo">Museum<span className="logo-highlight">Tix</span></h1>
            <h2>Welcome Back</h2>
            <p>Enter your email and password to access your account</p>
          </div>

          {/* Form */}
          <form method='post'>
            <label htmlFor='email'>Email</label>
            <input type='text' id='email' name='Email' required />
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' name='password' required />
            <button type='submit'>Login</button>
          </form>
          <div className='divider'>OR</div>
          <button className='google-login'>
            <span className='google-icon'>G</span> Sign in with Google
          </button>
          <p className='signup-text'>
            Don’t have an account? <Link href="/signup">Sign Up</Link>
          </p>
          <div className='btn-container'>
            <Link href="/HomePage">Back to Home</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
