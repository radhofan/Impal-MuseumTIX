import React, { useState } from 'react';
import { useRouter } from 'next/router';  // Import useRouter hook for navigation
import '@/css/Login.css';

import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';
import Link from 'next/link';
import { configUrl } from '@/config.js';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const isAdmin = formData.email.endsWith('@mtix.com'); 
    const apiUrl = isAdmin 
      ? `${configUrl}/admins/login` 
      : `${configUrl}/users/login`; 
  
    try {
      const response = await fetch(apiUrl, {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        const userData = await response.json();
  
        localStorage.setItem('user', JSON.stringify(userData));
  
        const redirectPage = isAdmin ? '/ViewAdmin' : '/HomePage'; 
        router.push(redirectPage);
      } else {
        setErrorMessage('Invalid email or password');
      }
    } catch {
      setErrorMessage('An error occurred during login');
    }
  };

  return (
    <div className='login-body'>
      <Navbar />
      <div className='login-section1'>
        <div className='image-overlay'>
          <h2>Art & History<br />At Your Fingertips</h2>
        </div>

        <div className="form-card">
          <div className="logo-section">
            <h1 className="logo">Museum<span className="logo-highlight">Tix</span></h1>
            <h2>Welcome Back</h2>
            <p>Enter your email and password to access your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              id='email'
              name='email'
              required
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              required
              value={formData.password}
              onChange={handleChange}
            />
            <button type='submit'>Login</button>
          </form>
          
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          
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
