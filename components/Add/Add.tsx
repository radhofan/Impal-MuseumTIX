import React, { useState } from 'react';
import '@/css/Add.css'; 
import Navbar from '../Global/Navbar';
import Footer from '../Global/Footer';

import { configUrl } from '@/config.js';
import { useRouter } from 'next/navigation';

const Add = () => {
  const router = useRouter();
  const [nama, setNama] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [noTelpon, setNoTelpon] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [rating, setRating] = useState(0);
  const [jumlahTiket, setJumlahTiket] = useState(0);
  const [tiketRegulerPrice, setTiketRegulerPrice] = useState(0);
  const [tiketPelajarPrice, setTiketPelajarPrice] = useState(0);
  const [tiketKeluargaPrice, setTiketKeluargaPrice] = useState(0);
  const [likes, setLikes] = useState(0);
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [jamOperasional, setJamOperasional] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !nama || !lokasi || !noTelpon || !keterangan || !rating || !jumlahTiket ||
      !tiketRegulerPrice || !tiketPelajarPrice || !tiketKeluargaPrice || !likes ||
      !longitude || !latitude || !jamOperasional
    ) {
      alert('All fields are required!');
      return;
    }

    const museumData = {
      nama,
      lokasi,
      no_telpon: noTelpon,
      keterangan,
      rating,
      jumlah_tiket: jumlahTiket,
      tiket_reguler_price: tiketRegulerPrice,
      tiket_pelajar_price: tiketPelajarPrice,
      tiket_keluarga_price: tiketKeluargaPrice,
      likes,
      longitude,
      latitude,
      jam_operasional: jamOperasional,
    };

    try {
      const response = await fetch(`${configUrl}/admins/AddMuseum`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(museumData),
      });

      if (response.ok) {
        console.log('Museum added successfully');
        router.push('/ViewAdmin');
      } else {
        console.error('Failed to add museum');
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
          <h1>Add Museum</h1>
          <p>Masukkan informasi museum yang ingin ditambahkan</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group center">
            <label>Nama Museum:</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>
          <div className="form-group left">
            <label>Lokasi Museum:</label>
            <input
              type="text"
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
              required
            />
          </div>
          <div className="form-group left">
            <label>No. Telpon Museum:</label>
            <input
              type="text"
              value={noTelpon}
              onChange={(e) => setNoTelpon(e.target.value)}
              required
            />
          </div>
          <div className="form-group left">
            <label>Keterangan Museum:</label>
            <textarea
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-row">
            <div className="form-group left">
              <label>Rating:</label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                required
                min="0"
                max="5"
                step="0.1"
                placeholder="e.g., 4.5"
              />
            </div>
            <div className="form-group left">
              <label>Jumlah Tiket:</label>
              <input
                type="number"
                value={jumlahTiket}
                onChange={(e) => setJumlahTiket(Number(e.target.value))}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group left">
              <label>Harga Tiket Reguler:</label>
              <input
                type="number"
                value={tiketRegulerPrice}
                onChange={(e) => setTiketRegulerPrice(Number(e.target.value))}
                required
              />
            </div>
            <div className="form-group left">
              <label>Harga Tiket Pelajar:</label>
              <input
                type="number"
                value={tiketPelajarPrice}
                onChange={(e) => setTiketPelajarPrice(Number(e.target.value))}
                required
              />
            </div>
            <div className="form-group left">
              <label>Harga Tiket Keluarga:</label>
              <input
                type="number"
                value={tiketKeluargaPrice}
                onChange={(e) => setTiketKeluargaPrice(Number(e.target.value))}
                required
              />
            </div>
          </div>
          <div className="form-group left">
            <label>Likes:</label>
            <input
              type="number"
              value={likes}
              onChange={(e) => setLikes(Number(e.target.value))}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group left">
              <label>Longitude:</label>
              <input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                required
              />
            </div>
            <div className="form-group left">
              <label>Latitude:</label>
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group left">
            <label>Jam Operasional:</label>
            <input
              type="text"
              value={jamOperasional}
              onChange={(e) => setJamOperasional(e.target.value)}
              required
              placeholder="e.g., 09:00 - 17:00"
            />
          </div>
          <div className="button-group">
            <button type="submit" className="add-button">Add</button>
            <button type="button" className="cancel-button" onClick={() => router.push('/ViewAdmin')}>Cancel</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Add;
