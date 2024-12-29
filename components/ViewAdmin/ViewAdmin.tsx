// components/ViewAdmin/ViewAdmin.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import '../../css/ViewAdmin.css';
import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';

// Define the Museum interface
interface Museum {
  museum_id: number;
  nama: string;
  lokasi: string;
  no_telpon: string;
  rating: number;
  popular: boolean;
  image: string;
}

// Static data for museums
const staticMuseums: Museum[] = [
  {
    museum_id: 1,
    nama: "Museum Geologi",
    lokasi: "Jl. Diponegoro No.57, Kota Bandung, Jawa Barat",
    no_telpon: "021-12345678",
    rating: 4.5,
    popular: true,
    image: "/images/Museum_Geologi.jpg",
  },
  {
    museum_id: 2,
    nama: "Taman Patung NuArt",
    lokasi: "Jalan Setra Duta Raya No. 6 L Bandung",
    no_telpon: "021-98765432",
    rating: 4.3,
    popular: false,
    image: "/images/NuArt.jpg",
  },
  {
    museum_id: 3,
    nama: "Museum Konperensi Asia Afrika",
    lokasi: "Jl. Asia Afrika No.65, Braga, Kec. Sumur Bandung, Kota Bandung, Jawa Barat 40111",
    no_telpon: "0274-123456",
    rating: 4.2,
    popular: true,
    image: "/images/AsiaAfrika.jpg",
  },
];

const ViewAdmin = () => {
  const [museums, setMuseums] = useState(staticMuseums);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter museums based on search term
  const filteredMuseums = museums.filter((museum) =>
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
        <button className="add-button">Add Museum</button>
      </div>

      <div className="museum-list">
        {filteredMuseums.length > 0 ? (
          filteredMuseums.map((museum) => (
            <div key={museum.museum_id} className="museum-item">
              <img src={museum.image} alt={museum.nama} className="museum-image" />
              {museum.popular && <span className="popular-badge">Popular</span>}
              <h2>{museum.nama}</h2>
              <p>Rating: ⭐ {museum.rating} </p>
              <p>📍 {museum.lokasi}</p>
              <Link href={`/EditMuseum/${museum.museum_id}`}>
                <button className="edit-button">Edit</button>
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