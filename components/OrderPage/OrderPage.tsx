import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making API calls
import '../../css/OrderPage.css';
import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';

function OrderPage() {
  const [userId, setUserId] = useState<number | null>(null);
  const [keranjang, setKeranjang] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [totalHarga, setTotalHarga] = useState<number | null>(null);
  

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const parsedUserId = parseInt(parsedUser.user_id, 10); 
      console.log('Stored User ID:', parsedUserId); 
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
      const response = await axios.get(`http://localhost:9090/users/${id}/getKeranjang`);
      setKeranjang(response.data);
      setTicketQuantity(response.data.jumlahTiket || 1);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching keranjang:', error);
    }
  };

  const updateKeranjang = async (updatedKeranjang) => {
    try {
      const response = await axios.put(
        `http://localhost:9090/users/${userId}/updateKeranjang`,
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

    let price = 0;
    if (keranjang?.jenis_tiket === 'Tiket Pelajar') {
      price = keranjang.museum.tiketPelajar_price;
    } else if (keranjang?.jenis_tiket === 'Tiket Keluarga') {
      price = keranjang.museum.tiketKeluarga_price;
    } else if (keranjang?.jenis_tiket === 'Tiket Reguler') {
      price = keranjang.museum.tiketReguler_price;
    }
    const total = price * newQuantity;
    const updatedKeranjang = { ...keranjang, jumlah_tiket: newQuantity, total_harga: total };
    setKeranjang(updatedKeranjang); 
    setTicketQuantity(newQuantity);
    updateKeranjang(updatedKeranjang);
  };

  const displayTicketName = () => {
    if (keranjang?.jenis_tiket === 'Tiket Anak') return 'Tiket Anak';
    if (keranjang?.jenis_tiket === 'Tiket Keluarga') return 'Tiket Keluarga';
    if (keranjang?.jenis_tiket === 'Tiket Reguler') return 'Tiket Reguler';
    return 'Ticket Not Selected';
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
    console.log("Selected Payment:", selectedPayment);
    console.log("Selected Bank:", selectedBank);
    console.log("Keranjang:", keranjang);

    const paymentData = {
      metode_pembayaran: selectedPayment,
      bank: selectedPayment === "Transfer Bank" || selectedPayment === "Virtual Account" ? selectedBank : null,
      status_pembayaran: true,
      tanggal_pembayaran: new Date(), // Set the current date and time in ISO format
      jenis_tiket: keranjang?.jenis_tiket,
      jumlah_tiket: keranjang?.jumlah_tiket,
      total_harga: keranjang?.total_harga,
      keranjang_id: keranjang?.keranjang_id,
      //keranjang: keranjang
    };
  
    try {
      const response = await fetch("http://localhost:9090/payments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert("Payment successful!");
        handleClose(); // Close the popup after payment
      } else {
        const error = await response.text();
        alert(`Payment failed: ${error}`);
      }
    } catch (error) {
      alert(`Payment error: ${error.message}`);
    }
  };
  


  return (
    <div className="orderpage-body">
      <Navbar />
      <div className="orderpage-content">
        <h1 className="orderpage-title">Your Order</h1>
        <p className="orderpage-subtitle">Make sure your goods are paid for in full</p>

        <div className="image-container">
          <img
            src="https://via.placeholder.com/600x300.png?text=Temporary+Image"
            alt="Temporary Image"
            className="big-image"
          />
        </div>

        <div className="orderpage-section">
          <div className="ticket-selection">
            <h3>Select Your Ticket</h3>

            <div className="ticket-item">
              <input
                type="radio"
                id="ticketAnak"
                name="ticket"
                value="Tiket Anak"
                checked={keranjang?.jenis_tiket === 'Tiket Anak'}
                onChange={() => handleTicketSelection('Tiket Anak')}
              />
              <label htmlFor="ticketAnak">Tiket Pelajar - {keranjang?.museum.tiketPelajar_price}</label>
            </div>

            <div className="ticket-item">
              <input
                type="radio"
                id="ticketKeluarga"
                name="ticket"
                value="Tiket Keluarga"
                checked={keranjang?.jenis_tiket === 'Tiket Keluarga'}
                onChange={() => handleTicketSelection('Tiket Keluarga')}
              />
              <label htmlFor="ticketKeluarga">Tiket Keluarga - {keranjang?.museum.tiketKeluarga_price}</label>
            </div>

            <div className="ticket-item">
              <input
                type="radio"
                id="ticketReguler"
                name="ticket"
                value="Tiket Reguler"
                checked={keranjang?.jenis_tiket === 'Tiket Reguler'}
                onChange={() => handleTicketSelection('Tiket Reguler')}
              />
              <label htmlFor="ticketReguler">Tiket Reguler - {keranjang?.museum.tiketReguler_price}</label>
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
                  ? `IDR ${keranjang?.museum.tiketPelajar_price}`
                  : keranjang?.jenis_tiket === 'Tiket Keluarga'
                  ? `IDR ${keranjang?.museum.tiketKeluarga_price}`
                  : keranjang?.jenis_tiket === 'Tiket Reguler'
                  ? `IDR ${keranjang?.museum.tiketReguler_price}`
                  : 'IDR 0'}
              </span>
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
                      {/* <select
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
                      </select> */}
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
