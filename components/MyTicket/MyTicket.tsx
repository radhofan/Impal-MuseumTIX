import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '@/css/Myticket.css';

import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';
import axios from 'axios';
import Image from 'next/image';
import { configUrl } from '@/config.js';

const TicketCard = ({ ticket }) => {

  const cancelTicket = async () => {
    try {
      let jenis =""
      if(ticket.jenis_tiket === "Tiket Keluarga"){
        jenis = "tiketkeluargas"
      }else if(ticket.jenis_tiket === "Tiket Pelajar"){
        jenis = "tiketpelajars"
      }else{
        jenis = "tiketregulers"
      }
      const response = await axios.post(
        `${configUrl}/${jenis}/status/cancel/${ticket.tiket_id}`
      );
      console.log('Cancel response:', response.data);
  
      // Update UI after successful cancellation
      alert('Ticket canceled successfully!');
    } catch (error) {
      console.error('Error canceling ticket:', error);
      alert('Failed to cancel the ticket. Please try again.');
    }
  };

   return (
    <div className="ticket-card">
      <div className="ticket-date">
        {ticket.payment?.tanggal_pembayaran || "Date not available"}
      </div>
      <div className="ticket-info-container">
        <Image
          src="/images/Museum_Geologi.jpg" // Ensure the image path matches your project structure
          alt={ticket.museum?.nama || "Museum"}
          width={500}
          height={500}
          className="ticket-image"
        />
        <div className="ticket-details">
          <div className="ticket-museum-name">{ticket.museum?.nama}</div>
          <div className="ticket-type">{ticket.jenis_tiket}</div>
          <div className="ticket-location">{ticket.museum?.lokasi}</div>
          <div className="ticket-location">{ticket.tanggal_kunjungan}</div>
        </div>
        <div className="ticket-summary">
          <div className="ticket-quantity">
            Jumlah Tiket: {ticket.payment.jumlah_tiket}
          </div>
          <div className="ticket-price">
            Harga Total: Rp. {ticket.payment?.total_harga}
          </div>
        </div>
      </div>
      <div className="ticket-status">
        Status: <span className="ticket-status-text">{ticket.status}</span>
      </div>
      <button className="ticket-detail-button" onClick={cancelTicket}>
        Cancel Ticket
      </button>
    </div>
  );

};


function MyTicket() {
  // const [tickets, setTickets] = useState([]);
  // const [status, setStatus] = useState('Upcoming'); // Default status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [keranjang, setKeranjang] = useState(null);
  const [userId, setUserId] = useState<number | null>(null);

  const [tiketRegulers, setTiketRegulers] = useState([]);
  const [tiketKeluargas, setTiketKeluargas] = useState([]);
  const [tiketPelajars, setTiketPelajars] = useState([]);

  // const [activeTickets, setActiveTickets] = useState([]);
  const [payments, setPayments] = useState([]);  // For storing payment history
  const [showPayments, setShowPayments] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const parsedUserId = parseInt(parsedUser.user_id, 10); 
      setUserId(parsedUserId); 
    } else {
      alert('You need to log in first');
      router.push('/Login');
    }
  
  }, []);

  useEffect(() => {
    if (userId !== null) {
      fetchKeranjang();
    }
  }, [userId]); 

  const fetchKeranjang = async () => {
    try {
      const response = await axios.get(`${configUrl}/keranjangs/getKeranjang/${userId}`);
      setKeranjang(response.data);
    } catch (error) {
      console.error('Error fetching keranjang:', error);
    }
  };

  const fetchTickets = async () => {
    setLoading(true);
    setError('');
  
    if (!userId) {
      setError('User not found');
      setLoading(false);
      return;
    }
  
    try {
      // API call for tiket_pelajars
      const tiketPelajarResponse = await fetch(`${configUrl}/tiketpelajars/status/${keranjang?.keranjang_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (!tiketPelajarResponse.ok) {
        throw new Error(`Error fetching tiket_pelajars: ${tiketPelajarResponse.statusText}`);
      }
      const tiketPelajars = await tiketPelajarResponse.json();
      setTiketPelajars(tiketPelajars);

      // API call for tiket_keluargas
      const tiketKeluargaResponse = await fetch(`${configUrl}/tiketkeluargas/status/${keranjang?.keranjang_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (!tiketKeluargaResponse.ok) {
        throw new Error(`Error fetching tiket_keluargas: ${tiketKeluargaResponse.statusText}`);
      }
      const tiketKeluargas = await tiketKeluargaResponse.json();
      setTiketKeluargas(tiketKeluargas);
    
      // API call for tiket_regulers
      const tiketRegulerResponse = await fetch(`${configUrl}/tiketregulers/status/${keranjang?.keranjang_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (!tiketRegulerResponse.ok) {
        throw new Error(`Error fetching tiket_regulers: ${tiketRegulerResponse.statusText}`);
      }
      const tiketRegulers = await tiketRegulerResponse.json();
      setTiketRegulers(tiketRegulers);
    
    } catch {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    


  };

  const [activeStatus, setActiveStatus] = useState("Upcoming");

  const combinedTickets = [...tiketRegulers, ...tiketPelajars, ...tiketKeluargas];
  const filteredTickets = combinedTickets.filter(ticket => ticket.status === activeStatus);
  
  const handleStatusClick = (status: string) => {
    setActiveStatus(status);
    setShowPayments(false);
  };


  useEffect(() => {
    fetchTickets();
  }, [keranjang]);

  // Function to fetch payments (payment history)
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        // Replace with your actual API call for payment history
        const response = await fetch(`${configUrl}/payments/viewUserHistory/${keranjang?.keranjang_id}`);
        const data = await response.json();
        console.log(data)
        setPayments(data);
      } catch  {
        setError('Failed to load payment history');
      }
    };

    if (showPayments) {
      fetchPayments();
    }
  }, [showPayments]);


  return (
    <div className="myticket-body">
      <Navbar />
      <div className="myticket-section1">
        <h2 className="ticket-header">Tickets Overview</h2>
        <div className="ticket-container">
          <div className="ticket-side-menu">
            <button
              className={`menu-button ${activeStatus === 'Upcoming' ? 'active' : ''}`}
              onClick={() => handleStatusClick('Upcoming')}
            >
              Upcoming
            </button>
            <button
              className={`menu-button ${activeStatus === 'Cancelled' ? 'active' : ''}`}
              onClick={() => handleStatusClick('Cancelled')}
            >
              Cancelled
            </button>
            <button
              className={`menu-button ${activeStatus === 'Finished' ? 'active' : ''}`}
              onClick={() => handleStatusClick('Finished')}
            >
              Finished
            </button>

            {/* Add button for payment history */}
            <button
              className={`menu-button ${showPayments ? 'active' : ''}`}
              onClick={() => setShowPayments(!showPayments)}
            >
              Payment History
            </button>
          </div>

          <div className="ticket-main-content">
            {loading && <p>Loading tickets...</p>}
            {error && <p className="error-message">{error}</p>}

            {/* Show either ticket list or payment history */}
            {!loading && !showPayments && filteredTickets.length === 0 && (
              <p>No tickets found for {activeStatus} status.</p>
            )}

            {/* Display tickets */}
            {!loading && !showPayments && filteredTickets.length > 0 && (
              <div className="ticket-grid">
                {filteredTickets.map(ticket => (
                  <TicketCard key={ticket.tiket_id} ticket={ticket} />
                ))}
              </div>
            )}

            {/* Display payment history */}
            {!loading && showPayments && payments.length === 0 && <p>No payment history found.</p>}
            {!loading && showPayments && payments.length > 0 && (
              <div className="payment-history">
                <h3>Payment History</h3>
                {payments.map(payment => (
                  <div key={payment.payment_id} className="payment-item">
                    <p>Payment ID: {payment.payment_id}</p>
                    <p>Amount: ${payment.total_harga}</p>
                    <p>Date: {new Date(payment.tanggal_pembayaran).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

}

export default MyTicket;