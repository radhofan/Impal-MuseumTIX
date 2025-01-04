import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import '@/css/Regist.css';
import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';
import { configUrl } from '@/config.js';

function Regist() {
  const [formData, setFormData] = useState({
    nama: '',
    no_telpon: '',
    alamat: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();


    if (!formData.nama || !formData.no_telpon || !formData.alamat || !formData.email || !formData.password) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(`${configUrl}/users/registrasi`, formData);
      if (response.status === 200) {
        console.log("ada")
        setSuccessMessage('Registration successful! You can now log in.');
        setErrorMessage('');
  
        const loginResponse = await fetch(`${configUrl}/users/login`, {  
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData) 
        });
  
        if (loginResponse.ok) {
          const userData = await loginResponse.json();
          console.log(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          alert("Registration Successfull");
          router.push('/HomePage');
        } else {
          setErrorMessage('Invalid email or password');
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error && 'response' in error) {
          const axiosError = error as { response?: { status: number; data?: { message: string } } };
          if (axiosError.response?.status === 409) {
              alert('The email is already in use. Please use a different email.');
          } else {
              alert(axiosError.response?.data?.message || 'An error occurred. Please try again.');
          }
      } else {
          alert('An unknown error occurred.');
      }
    }
  
  };

  return (
    <div className="regist-body">
      <Navbar />
      <div className="regist-section1">
        <div className='login-overlay'>
          <h1>Art & History<br />At Your Fingertips</h1>
        </div>
        <div className="form-card">
          <div className="form-header">
            <h1 className="form-title">Museum <span className="highlight">Tix</span></h1>
            <h2 className="form-subtitle">Sign Up Account</h2>
            <p className="form-description">Enter your personal data to create your account.</p>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="nama"
                placeholder="Full Name"
                className="form-input"
                value={formData.nama}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="no_telpon"
                placeholder="Phone Number"
                className="form-input"
                value={formData.no_telpon}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="alamat"
                placeholder="Address"
                className="form-input"
                value={formData.alamat}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <p className="password-hint">Must be at least 8 characters.</p>
            <button type="submit" className="form-button">Sign Up</button>
          </form>
          <div className="login-link">
            <div>Already have an account? </div>
              <Link href="/Login" passHref>
                <div className='navbar-tulisan' id='masuk'>Masuk</div>
              </Link>
          </div>

          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Regist;




