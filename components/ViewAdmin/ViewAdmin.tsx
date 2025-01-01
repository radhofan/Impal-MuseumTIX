// components/ViewAdmin/ViewAdmin.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import '/css/ViewAdmin.css';
import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';
import Image from 'next/image';
import { configUrl } from '@/config.js';

const ViewAdmin = () => {
  const [museums, setMuseums] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch museums from the API when the component is mounted
  useEffect(() => {
    async function getMuseums() {
      const data = await fetchMuseums();
      setMuseums(data);
      setLoading(false); 
    }

    getMuseums(); 
  }, []);

  // Fetch museums function
  async function fetchMuseums() {
    try {
      const response = await fetch(`${configUrl}/museums/getAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const museums = await response.json();
      console.log(museums);
      return museums;
    } catch (error) {
      console.error('Error fetching museums:', error);
      return []; // Return an empty array in case of an error
    }
  }

  // Filter museums based on the search term
  const filteredMuseums = museums.filter((museum: any) =>
    museum.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="viewadmin-body">
      <Navbar />

      <h1><span className="title-black">Museum</span> <span className="title-red">List</span></h1>

      <div className="search-add-container">
        <input
          type="text"
          placeholder="Masukan Pencarian"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="search-button">Search</button>
        <Link href="/Add" passHref>
          <button className="add-button" >Add Museum</button>
        </Link>
      </div>

      <div className="museum-list">
        {loading ? (
          <p>Loading museums...</p>
        ) : filteredMuseums.length > 0 ? (
          filteredMuseums.map((museum: any) => (
            <div key={museum.museum_id} className="museum-item">
              {/* Remove image if not available */}
              <Image
                src="/images/Museum_Geologi.jpg" // Ensure the image path matches your project structure
                width={500}
                height={500}
                alt="Museum Geologi"
                className="card-image"
              />
              {museum.popular && <span className="popular-badge">Popular</span>}
              <h2>{museum.nama}</h2>
              <p>Rating: ⭐ {museum.rating}</p>
              <p>📍 {museum.lokasi}</p>
              <Link href={`/Edit/${museum.museum_id}`}>
                <button className="edit-button">Edit</button>
              </Link>
              <Link href={`/Delete/${museum.museum_id}`}>
                <button className="edit-button">Delete</button>
              </Link>
            </div>
          ))
        ) : (
          <p className="error-message">No museums found.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ViewAdmin;
