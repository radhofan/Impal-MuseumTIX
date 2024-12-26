import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making API calls
import '../../css/OrderPage.css';
// import '@/css/DetailTiketMuseum.css';
import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';
import Image from 'next/image';
import museumGeologiImage from '../../image/museumGeologi.jpg';

function OrderPage() {
  const [userId, setUserId] = useState<number | null>(null);
  const [keranjang, setKeranjang] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [totalHarga, setTotalHarga] = useState<number | null>(null);
  const [groupName, setGroupName] = useState(''); // Manage the group name based on ticket type

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const parsedUserId = parseInt(parsedUser.user_id, 10); 
      setUserId(parsedUserId); 
    } else {
      console.log('No user found in localStorage'); 
    }
  
  }, []);

  useEffect(() => {
    if (userId !== null) {
      fetchKeranjang(userId);
    }
  }, [userId]); 

  useEffect(() => {
    if (userId !== null) {
      setTotalHarga(keranjang?.total_harga)
    }
  }, [keranjang]); 
  
  const fetchKeranjang = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:9090/keranjangs/getKeranjang/${id}`);
      setKeranjang(response.data);
      setTicketQuantity(response.data.jumlahTiket || 1);
    } catch (error) {
      console.error('Error fetching keranjang:', error);
    }
  };

  const updateKeranjang = async (updatedKeranjang) => {
    try {
      const response = await axios.put(
        `http://localhost:9090/keranjangs/updateKeranjang/${userId}`,
        updatedKeranjang
      );
      setKeranjang(response.data); // Update keranjang state
    } catch (error) {
      console.error('Error updating keranjang:', error);
    }
  };
  

  const handleTicketSelection = (jenis_tiket) => {
    const updatedKeranjang = { ...keranjang, jenis_tiket, jumlah_tiket: 1 };
    setKeranjang(updatedKeranjang); 
    setTicketQuantity(1);
    updateKeranjang(updatedKeranjang);
  };

  const handleQuantityChange = (action) => {
    let newQuantity = ticketQuantity;
    if (action === 'increase') {
      newQuantity++;
    } else if (action === 'decrease' && ticketQuantity > 1) {
      newQuantity--;
    }
    const updatedKeranjang = { ...keranjang, jumlah_tiket: newQuantity};
    setKeranjang(updatedKeranjang); 
    setTicketQuantity(newQuantity);
    updateKeranjang(updatedKeranjang);
  };


  const displayTicketName = () => {
    if (keranjang?.jenis_tiket === 'Tiket Pelajar') return 'Tiket Pelajar';
    if (keranjang?.jenis_tiket === 'Tiket Keluarga') return 'Tiket Keluarga';
    if (keranjang?.jenis_tiket === 'Tiket Reguler') return 'Tiket Reguler';
    return 'Ticket Not Selected';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGroupName(value); // Update the groupName state
  };
  

  const [showPopOut, setShowPopOut] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const bankOptions = ["Bank A", "Bank B", "Bank C"];

  const handleCheckout = () => {
    setShowPopOut(true);
  };

  const handleClose = () => {
    setShowPopOut(false);
    setSelectedBank("");
    setSelectedPayment(null);
  };

  const handlePaymentChange = (payment: string) => {
    setSelectedPayment(payment);
    setSelectedBank("");
  };

  const handlePayment = async () => { 
    const paymentData = {
      metode_pembayaran: selectedPayment,
      bank: selectedPayment === "Transfer Bank" || selectedPayment === "Virtual Account" ? selectedBank : null,
      status_pembayaran: true,
      tanggal_pembayaran: new Date(),
      jenis_tiket: keranjang?.jenis_tiket,
      jumlah_tiket: keranjang?.jumlah_tiket,
      total_harga: keranjang?.total_harga,
      keranjang: keranjang
    };
  
    console.log(paymentData);
  
    try {
      const response = await fetch("http://localhost:9090/payments/createPayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert("Payment successful!");
  
        // After payment is successful, create the ticket
        await createTicketAfterPayment(result);
  
        handleClose(); 
      } else {
        const error = await response.text();
        alert(`Payment failed: ${error}`);
      }
    } catch (error) {
      alert(`Payment error: ${error.message}`);
    }
  };

  const createTicketAfterPayment = async (payment) => {
    let call = "";
    if (keranjang?.jenis_tiket === 'Tiket Pelajar') call = "tiketpelajars";
    if (keranjang?.jenis_tiket === 'Tiket Keluarga') call = "tiketkeluargas";
    if (keranjang?.jenis_tiket === 'Tiket Reguler') call = "tiketregulers";
  
    const ticketData = {
      keranjang: keranjang,
      payment: payment,
      kode_tiket: "some_ticket_code", 
    };
  
    // Determine URL based on the call type
    let url = `http://localhost:9090/${call}/createTicket`;
    if (call !== "tiketregulers") {
      url += `/${groupName}/${keranjang?.jumlah_tiket}`;
    }
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketData),
      });
  
      if (response.ok) {
        const result = await response.json();
      } else {
        const error = await response.text();
        alert(`Ticket creation failed: ${error}`);
      }
    } catch (error) {
      alert(`Ticket creation error: ${error.message}`);
    }
  };
  
  

  return (
    <div className="orderpage-body">
      <Navbar />
      <div className="detailmuseum-section1">
        {/* Museum Information Section */}
        <div className="museum-info">
          <div className="img">
            <Image
              src={museumGeologiImage} // Ensure the image path matches your project structure
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

          {/* Summary Section */}
          <div className="ticket-summary">
            <h4>Summary:</h4>
            <p>
              Location: Museum Geologi | Date: Thu, 21 Nov 2024 | Reguler: 10000 | Anak: 100000
            </p>
            <button className="btn primary checkout-btn">Check Out</button>
          </div>
      </div>


      <div className="orderpage-content">
        <h1 className="orderpage-title">Your Order</h1>
        <p className="orderpage-subtitle">Make sure your goods are paid for in full</p>
        
        <div className="orderpage-section">

          <div className="ticket-selection">
            <h3>Select Your Ticket</h3>

            <div className="museumTiket">
              <Image
                src={museumGeologiImage} // Ensure the image path matches your project structure
                width={100}
                height={100}
                alt="Museum Geologi"
                className="museum-image"
              />
              <div className="ticket-item">
                <input
                  type="radio"
                  id="ticketPelajar"
                  name="ticket"
                  value="Tiket Pelajar"
                  checked={keranjang?.jenis_tiket === 'Tiket Pelajar'}
                  onChange={() => handleTicketSelection('Tiket Pelajar')}
                />
                <label htmlFor="ticketAnak">Tiket Pelajar - {keranjang?.museum.tiket_pelajar_price}</label>
              </div>
            </div>

            <div className="museumTiket">
              <Image
                src={museumGeologiImage} // Ensure the image path matches your project structure
                width={100}
                height={100}
                alt="Museum Geologi"
                className="museum-image"
              />
              <div className="ticket-item">
                <input
                  type="radio"
                  id="ticketKeluarga"
                  name="ticket"
                  value="Tiket Keluarga"
                  checked={keranjang?.jenis_tiket === 'Tiket Keluarga'}
                  onChange={() => handleTicketSelection('Tiket Keluarga')}
                />
                <label htmlFor="ticketKeluarga">Tiket Keluarga - {keranjang?.museum.tiket_keluarga_price}</label>
              </div>
            </div>

            <div className="museumTiket">
              <Image
                src={museumGeologiImage} // Ensure the image path matches your project structure
                width={100}
                height={100}
                alt="Museum Geologi"
                className="museum-image"
              />
              <div className="ticket-item">
                <input
                  type="radio"
                  id="ticketReguler"
                  name="ticket"
                  value="Tiket Reguler"
                  checked={keranjang?.jenis_tiket === 'Tiket Reguler'}
                  onChange={() => handleTicketSelection('Tiket Reguler')}
                />
                <label htmlFor="ticketReguler">Tiket Reguler - {keranjang?.museum.tiket_reguler_price}</label>
              </div>
            </div>

            
      


          </div>

          <div className="cost-section">
            <h3>Cost Information</h3>
            <div className="cost-item">
              <div className="tiketitem">
                <span>{displayTicketName()}</span>
                <span>{ticketQuantity} Item(s)</span>
              </div>
              <span className="idr">
                {keranjang?.jenis_tiket === 'Tiket Pelajar'
                  ? `IDR ${keranjang?.museum.tiket_pelajar_price}`
                  : keranjang?.jenis_tiket === 'Tiket Keluarga'
                  ? `IDR ${keranjang?.museum.tiket_keluarga_price}`
                  : keranjang?.jenis_tiket === 'Tiket Reguler'
                  ? `IDR ${keranjang?.museum.tiket_reguler_price}`
                  : 'IDR 0'}
              </span>
            </div>

            <div className="input-field">
              <label htmlFor={keranjang?.jenis_tiket === 'Tiket Pelajar' ? 'nama_sekolah' : 'nama_keluarga'}>
                {keranjang?.jenis_tiket === 'Tiket Pelajar' ? 'Nama Sekolah' : 'Nama Keluarga'}
              </label>
              <input
                type="text"
                id={keranjang?.jenis_tiket === 'Tiket Pelajar' ? 'nama_sekolah' : 'nama_keluarga'}
                name={keranjang?.jenis_tiket === 'Tiket Pelajar' ? 'nama_sekolah' : 'nama_keluarga'}
                value={groupName} // Use the state value
                onChange={handleInputChange}
              />
            </div>

            <div className="cost-quantity">
              <button className="quantity-btn" onClick={() => handleQuantityChange('decrease')}>-</button>
              <span className="quantity-display">{keranjang?.jumlah_tiket}</span>
              <button className="quantity-btn" onClick={() => handleQuantityChange('increase')}>+</button>
            </div>

            <div className="cost-total">
              <span>Total</span>
              <span className="idrtotal">IDR {totalHarga}</span>
            </div>

            <div className="cost-buttons">
              <button className="cancel-btn">Cancel</button>
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
                  
            {showPopOut && (
                <div className="pop-out-overlay">
                  <div className="pop-out-content">
                    <h2>Choose Payment Method</h2>

                    <div className="payment-option">
                      <h3>Transfer Bank</h3>
                      <input
                        type="radio"
                        name="payment"
                        value="Transfer Bank"
                        checked={selectedPayment === "Transfer Bank"}
                        onChange={() => handlePaymentChange("Transfer Bank")}
                      />
                    </div>

                    <div className="payment-option">
                      <h3>Virtual Account</h3>
                      <input
                        type="radio"
                        name="payment"
                        value="Virtual Account"
                        checked={selectedPayment === "Virtual Account"}
                        onChange={() => handlePaymentChange("Virtual Account")}
                      />
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        disabled={
                          selectedPayment !== "Transfer Bank" && selectedPayment !== "Virtual Account"
                        }
                      >
                        <option value="">Select a Bank</option>
                        {bankOptions.map((bank, index) => (
                          <option key={index} value={bank}>
                            {bank}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="payment-option">
                      <h3>OVO</h3>
                      <input
                        type="radio"
                        name="payment"
                        value="OVO"
                        checked={selectedPayment === "OVO"}
                        onChange={() => handlePaymentChange("OVO")}
                      />
                    </div>

                    <div className="payment-option">
                      <h3>Gopay</h3>
                      <input
                        type="radio"
                        name="payment"
                        value="Gopay"
                        checked={selectedPayment === "Gopay"}
                        onChange={() => handlePaymentChange("Gopay")}
                      />
                    </div>

                    <button className="close-btn" onClick={handlePayment}>
                      Bayar
                    </button>

                    <button className="close-btn" onClick={handleClose}>
                      Close
                    </button>
                  </div>
                </div>
              )}


          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OrderPage;
