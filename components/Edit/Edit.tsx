import React, { useState, useEffect } from 'react';
import '@/css/Edit.css'; 
import Navbar from '../Global/Navbar';
import Footer from '../Global/Footer';
import { configUrl } from '@/config.js';
import { useRouter } from 'next/navigation';

const Edit = ({ museum_id }: { museum_id: number }) => {
  const router = useRouter();
  const [museumId, setMuseumId] = useState(0);  
  const [nama, setNama] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [noTelpon, setNoTelpon] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [rating, setRating] = useState(0);
  const [jumlahTiket, setJumlahTiket] = useState(0);
  const [tiketRegulerPrice, setTiketRegulerPrice] = useState(0);
  const [tiketPelajarPrice, setTiketPelajarPrice] = useState(0);
  const [tiketKeluargaPrice, setTiketKeluargaPrice] = useState(0);
  
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [jamOperasional, setJamOperasional] = useState('');
  const [likes, setLikes] = useState(0);


  useEffect(() => {
      if (museum_id) {
        setMuseumId(museum_id);  
      }
  }, [museum_id]);

  const getMuseums = async () => {
    const data = await fetchMuseums();
    if (data) {
      setNama(data.nama || '');
      setLokasi(data.lokasi || '');
      setNoTelpon(data.no_telpon || '');
      setKeterangan(data.keterangan || '');
      setRating(data.rating || 0);
      setJumlahTiket(data.jumlah_tiket || 0);
      setTiketRegulerPrice(data.tiket_reguler_price || 0);
      setTiketPelajarPrice(data.tiket_pelajar_price || 0);
      setTiketKeluargaPrice(data.tiket_keluarga_price || 0);
      setLongitude(data.longitude || '');
      setLatitude(data.latitude || '');
      setJamOperasional(data.jam_operasional || '');
      setLikes(data.likes || 0);
    }
  };

  useEffect(() => {
    if (museumId) {
      getMuseums(); 
    }
  }, [museumId]);

  async function fetchMuseums() {
    try {
      const response = await fetch(`${configUrl}/museums/getSpec`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: museumId }), 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const museum = await response.json();  
      console.log(museum);
      return museum;
    } catch (error) {
      console.error("Error fetching museum details:", error);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const museumData = {
      museum_id: museumId,
      nama,
      lokasi,
      no_telpon: noTelpon,
      keterangan,
      rating,
      jumlah_tiket: jumlahTiket,
      tiket_reguler_price: tiketRegulerPrice,
      tiket_pelajar_price: tiketPelajarPrice,
      tiket_keluarga_price: tiketKeluargaPrice,
      longitude,
      latitude,
      jam_operasional: jamOperasional
    };

    try {
      const response = await fetch(`${configUrl}/admins/EditMuseum`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(museumData),
      });

      if (response.ok) {
        console.log('Museum edited successfully');
        router.push('/ViewAdmin');
      } else {
        console.error('Failed to edit museum');
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
          <h1>Edit Museum</h1>
          <p>Masukkan informasi museum yang ingin diubah</p>
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
            <button type="submit" className="add-button">Edit</button>
            <button type="button" className="cancel-button" onClick={() => router.push('/ViewAdmin')}>Cancel</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Edit;
