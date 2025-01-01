import '@/css/Delete.css'; 
import Navbar from '../Global/Navbar';
import Footer from '../Global/Footer';

import { configUrl } from '@/config.js';
import { useRouter } from 'next/navigation';
import { museum as Museum } from '@/Types/types';
import React, { useState, useEffect } from 'react';

const Delete = ({ museum_id }: { museum_id: number }) => {
  const router = useRouter();
  const [museums, setMuseums] = useState<Museum | null>(null);
  const [inputName, setInputName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (museum_id) {
      fetchMuseums(); 
    }
  }, []);

  async function fetchMuseums() {
    try {
      const response = await fetch(`${configUrl}/museums/getSpec`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: museum_id }), 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const museum = await response.json();  
      setMuseums(museum);
    } catch (error) {
      console.error("Error fetching museum details:", error);
    }
  }

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!museums || !museum_id) {
      setError('Museum data is not loaded!');
      return;
    }

    if (inputName.trim() !== museums.nama) {
      setError('Museum name does not match!');
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
        setError('Failed to delete museum');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred.');
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
          {museums && <p>Type <strong>{museums.nama}</strong> below to confirm deletion.</p>}
          {error && <p className="error-message">{error}</p>}
        </div>

        <form onSubmit={handleDelete}>
          <input
            type="text"
            placeholder="Enter museum name"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="input-field"
          />

          <div className="button-group">
            <button type="submit" className="cancel-button">Delete</button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => router.push('/ViewAdmin')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Delete;
