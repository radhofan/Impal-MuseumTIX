import React, { useState } from 'react';
import '@/css/Add.css'; // Ensure the path to CSS is correct

const Add = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [openHour, setOpenHour] = useState('');
  const [closeHour, setCloseHour] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to submit museum data
    console.log({ name, address, description, openHour, closeHour, contact });
  };

  return (
    <div className="add-page">
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group left">
            <label>Alamat Museum:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group left">
            <label>Deskripsi Museum:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-row">
            <div className="form-group left">
              <label>Jam Buka:</label>
              <input
                type="text"
                value={openHour}
                onChange={(e) => setOpenHour(e.target.value)}
                required
                placeholder="e.g., 9:00 AM"
              />
            </div>
            <div className="form-group left">
              <label>Jam Tutup:</label>
              <input
                type="text"
                value={closeHour}
                onChange={(e) => setCloseHour(e.target.value)}
                required
                placeholder="e.g., 5:00 PM"
              />
            </div>
          </div>
          <div className="form-group left">
            <label>Kontak Museum:</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="add-button">Add</button>
            <button type="button" className="cancel-button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;