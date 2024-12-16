import React, { useState } from 'react';

import '@/app/globals.css'; 
import '@/css/DetailTiketMuseum.css';

import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';
import Image from 'next/image';

function DetailMuseum() {
  return (
    <div className="detailmuseum-body">
      <Navbar />
      <div className="detailmuseum-section1">
        {/* Museum Information Section */}
        <div className="museum-info">
          <div className="img">
            <Image
              src="/images/museum-geologi.jpg" // Ensure the image path matches your project structure
              width={500}
              height={500}
              alt="Museum Geologi"
              className="museum-image"
            />
          </div>
          <div className="museum-details">
            <h1 className="museum-title">Museum Geologi</h1>
            <p className="museum-description">
              Museum Geologi didirikan pada tanggal 16 Mei 1929. Museum ini direnovasi dengan
              mendapat dana bantuan dari JICA, setelah renovasi selesai, Museum Geologi dibuka
              kembali dan diresmikan oleh Wakil Presiden RI, Megawati Soekarnoputri pada 23
              Agustus 2000.
            </p>
            <ul className="museum-info-list">
              <li>📍 Jl. Diponegoro No.57, Kota Bandung Jawa Barat</li>
              <li>⏰ 9:00 am - 3:00 pm</li>
              <li>⭐ 4.5</li>
              <li>❤️ 1543 likes</li>
            </ul>
            <div className="button-group">
              <button className="btn">Directions</button>
              <button className="btn">Call</button>
              <button className="btn primary">Buy Tickets</button>
            </div>
          </div>
        </div>

        {/* Ticket Options */}
        <div className="ticket-options">
            <div className="ticket-type">
              <div className="ticket-header">▶ Reguler</div>
              <div className="ticket-input">
                Jumlah: <input type="number" value={regularTickets} onChange={(e) => setRegularTickets(Number(e.target.value))} />
              </div>
            </div>
            <div className="ticket-type">
              <div className="ticket-header">▶ Keluarga</div>
              <div className="ticket-input">
                {/* Jumlah: <input type="number" value={familyTickets} onChange={(e) => setFamilyTickets(Number(e.target.value))} /> */}
              </div>
            </div>
            <div className="ticket-type">
              <div className="ticket-header">▶ Anak</div>
              <div className="ticket-input">
                Jumlah: <input type="number" value={childTickets} onChange={(e) => setChildTickets(Number(e.target.value))} />
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="ticket-summary">
            <h4>Summary:</h4>
            <p>
              Location: Museum Geologi | Date: Thu, 21 Nov 2024 | Reguler: {regularTickets} | Anak: {childTickets}
            </p>
            <button className="btn primary checkout-btn">Check Out</button>
          </div>


      </div>
      <Footer />
    </div>
  );
}

export default DetailMuseum;
