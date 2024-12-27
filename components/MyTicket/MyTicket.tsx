// // MyTicket.tsx
// import React from 'react';
// import '../../css/MyTicket.css';

// import Navbar from '@/components/Global/Navbar';
// import Footer from '@/components/Global/Footer';

// const TicketCard = () => {
//   return (
//     <div className="ticket-card">
//       <div className="ticket-date">31 November 2003</div>
//       <div className="ticket-info-container">
//         <img
//           src="/museum-image-placeholder.png"
//           alt="Museum"
//           className="ticket-image"
//         />
//         <div className="ticket-details">
//           <div className="ticket-museum-name">Museum Geologi</div>
//           <div className="ticket-type">Reguler</div>
//         </div>
//         <div className="ticket-summary">
//           <div className="ticket-quantity">Jumlah: 1</div>
//           <div className="ticket-price">Harga: Rp. 20.000</div>
//         </div>
//       </div>
//       <div className="ticket-status">Status: <span className="ticket-status-text">Lunas</span></div>
//       <button className="ticket-detail-button">Detail</button>
//     </div>
//   );
// };

// function MyTicket() {
//   return (
//     <div className='myticket-body'>
//         <Navbar/>
//         <div className='myticket-section1'>
//           <h2 className="ticket-header">Tickets Overview</h2>
//           <div className="ticket-container">
//             <div className="ticket-side-menu">
//               <button className="menu-button">Upcoming</button>
//               <button className="menu-button">Completed</button>
//               <button className="menu-button">Cancelled</button>
//             </div>
//             <div className="ticket-main-content">
//               <TicketCard />
//             </div>
//           </div>
//         </div>
//         <Footer/>
//     </div>
//   )
// }

// export default MyTicket;

// MyTicket.tsx
import React, { useState, useEffect } from 'react';
import '../../css/MyTicket.css';

import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';

const TicketCard = ({ ticket }: { ticket: any }) => {
  return (
    <div className="ticket-card">
      <div className="ticket-date">{ticket.date}</div>
      <div className="ticket-info-container">
        <img
          src="/museum-image-placeholder.png"
          alt="Museum"
          className="ticket-image"
        />
        <div className="ticket-details">
          <div className="ticket-museum-name">{ticket.museum}</div>
          <div className="ticket-type">{ticket.type}</div>
        </div>
        <div className="ticket-summary">
          <div className="ticket-quantity">Jumlah: {ticket.quantity}</div>
          <div className="ticket-price">Harga: Rp. {ticket.price}</div>
        </div>
      </div>
      <div className="ticket-status">
        Status: <span className="ticket-status-text">{ticket.status}</span>
      </div>
      <button className="ticket-detail-button">Detail</button>
    </div>
  );
};

function MyTicket() {
  const [tickets, setTickets] = useState([]);
  const [status, setStatus] = useState('upcoming'); // Default status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch tickets from the backend
  const fetchTickets = async (selectedStatus: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/tickets?status=${selectedStatus}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching tickets: ${response.statusText}`);
      }
      const data = await response.json();
      setTickets(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tickets on status change
  useEffect(() => {
    fetchTickets(status);
  }, [status]);

  return (
    <div className="myticket-body">
      <Navbar />
      <div className="myticket-section1">
        <h2 className="ticket-header">Tickets Overview</h2>
        <div className="ticket-container">
          <div className="ticket-side-menu">
            <button
              className={`menu-button ${status === 'upcoming' ? 'active' : ''}`}
              onClick={() => setStatus('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={`menu-button ${status === 'completed' ? 'active' : ''}`}
              onClick={() => setStatus('completed')}
            >
              Completed
            </button>
            <button
              className={`menu-button ${status === 'cancelled' ? 'active' : ''}`}
              onClick={() => setStatus('cancelled')}
            >
              Cancelled
            </button>
          </div>
          <div className="ticket-main-content">
            {loading && <p>Loading tickets...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && tickets.length === 0 && <p>No tickets found.</p>}
            {!loading &&
              tickets.map((ticket) => <TicketCard key={ticket} ticket={ticket} />)}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyTicket;
