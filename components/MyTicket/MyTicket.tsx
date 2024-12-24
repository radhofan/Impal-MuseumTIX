// MyTicket.tsx
import React from 'react';
import '../../css/MyTicket.css';

import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';

const TicketCard = () => {
  return (
    <div className="ticket-card">
      <div className="ticket-date">31 November 2003</div>
      <div className="ticket-info-container">
        <img
          src="/museum-image-placeholder.png"
          alt="Museum"
          className="ticket-image"
        />
        <div className="ticket-details">
          <div className="ticket-museum-name">Museum Geologi</div>
          <div className="ticket-type">Reguler</div>
        </div>
        <div className="ticket-summary">
          <div className="ticket-quantity">Jumlah: 1</div>
          <div className="ticket-price">Harga: Rp. 20.000</div>
        </div>
      </div>
      <div className="ticket-status">Status: <span className="ticket-status-text">Lunas</span></div>
      <button className="ticket-detail-button">Detail</button>
    </div>
  );
};

function MyTicket() {
  return (
    <div className='myticket-body'>
        <Navbar/>
        <div className='myticket-section1'>
          <h2 className="ticket-header">Tickets Overview</h2>
          <div className="ticket-container">
            <div className="ticket-side-menu">
              <button className="menu-button">Upcoming</button>
              <button className="menu-button">Completed</button>
              <button className="menu-button">Cancelled</button>
            </div>
            <div className="ticket-main-content">
              <TicketCard />
            </div>
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default MyTicket;