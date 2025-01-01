import React, { useState } from 'react';
import '@/css/Delete.css'; // Ensure the path to CSS is correct
import Navbar from '../Global/Navbar';
import Footer from '../Global/Footer';

import { configUrl } from '@/config.js';
import { useRouter } from 'next/navigation';

const Delete = ({museum_id}) => {
  const router = useRouter();

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!museum_id) {
      alert('Museum ID is required!');
      return;
    }

    try {
      const response = await fetch(`${configUrl}/admins/DeleteMuseum/${museum_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Museum deleted successfully');
        router.push('/ViewAdmin');
      } else {
        console.error('Failed to delete museum');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="add-page">
      <Navbar />
      <div className="add-container">

        <div className="header">
          <div className="logo">
            Museum<span className="tix">Tix</span>
          </div>
          <h1>Delete Museum</h1>
          <p>Apakah anda yakin ingin menghapus Museum ini?</p>
        </div>


          <div className="button-group">
            <button type="submit" className="cancel-button" onClick={handleDelete}>Delete</button>
            <button type="button" className="cancel-button" onClick={() => router.push('/ViewAdmin')}>Cancel</button>
          </div>

      </div>
      <Footer />
    </div>
  );
};

export default Delete;
