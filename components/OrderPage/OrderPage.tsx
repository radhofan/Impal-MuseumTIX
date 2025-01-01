import React, { useState, useEffect,} from 'react';
import { useRouter } from 'next/router'; 
import axios from 'axios'; // For making API calls
import '@/css/Orderpage.css';
// import '@/css/DetailTiketMuseum.css';
import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';
import Image from 'next/image';
import museumGeologiImage from '../../image/museumGeologi.jpg';
import { keranjang as Keranjang, museum as Museum, payment as Payment } from '@/Types/types';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { configUrl } from '@/config.js';

function OrderPage({ museum_id }: { museum_id: number }) {
  const [userId, setUserId] = useState<number | null>(null);
  const [keranjang, setKeranjang] = useState<Keranjang>();
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [totalHarga, setTotalHarga] = useState<number | null>(null);
  const [groupName, setGroupName] = useState(''); // Manage the group name based on ticket type
  const [museum, setMuseum] = useState<Museum | null>(null);
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);



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
      fetchKeranjang(userId);
    }
  }, [userId]); 

  useEffect(() => {
    if (userId !== null) {
      setTotalHarga(keranjang?.total_harga ?? 0);
    }
  }, [keranjang]); 
  
  const fetchKeranjang = async (id: number) => {
    try {
      const response = await axios.get(`${configUrl}/keranjangs/getKeranjang/${id}`);
      const fetchedKeranjang = response.data;

      const fetchedMuseum = await fetchMuseums(museum_id);

      const updatedKeranjang = { ...fetchedKeranjang, museum: fetchedMuseum, total_harga: fetchedMuseum?.tiket_reguler_price, jumlah_tiket: 1 };
      updateKeranjang(updatedKeranjang);
      setKeranjang(updatedKeranjang);
    } catch (error) {
      console.error('Error fetching keranjang:', error);
    }
  };

  const updateKeranjang = async (updatedKeranjang: Keranjang) => {
    try {
      const response = await axios.put(
        `${configUrl}/keranjangs/updateKeranjang/${userId}`,
        updatedKeranjang
      );
      setKeranjang(response.data); 
    } catch (error) {
      console.error('Error updating keranjang:', error);
    }
  };

  const fetchMuseums = async (museumId: number) => {
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
      setMuseum(museum);
      return museum;
    } catch (error) {
      console.error("Error fetching museum details:", error);
    }
  };
  

  const handleTicketSelection = (jenis_tiket: string) => {
    if (keranjang) {
      const updatedKeranjang = { 
        ...keranjang,
        keranjang_id: keranjang.keranjang_id, 
        jenis_tiket: jenis_tiket, 
        jumlah_tiket: 1, 
        total_harga: keranjang.total_harga, 
        museum: keranjang.museum,
      };
      setKeranjang(updatedKeranjang); 
      setTicketQuantity(1);
      updateKeranjang(updatedKeranjang);
    }
  };

  const handleQuantityChange = (action: 'increase' | 'decrease') => {
    let newQuantity = ticketQuantity;
    if (action === 'increase') {
      newQuantity++;
    } else if (action === 'decrease' && ticketQuantity > 1) {
      newQuantity--;
    }
    if (keranjang) {
      const updatedKeranjang = { 
        ...keranjang,
        keranjang_id: keranjang.keranjang_id, 
        jenis_tiket: keranjang.jenis_tiket, 
        jumlah_tiket: newQuantity, 
        total_harga: keranjang.total_harga, 
        museum: keranjang.museum,
      };
      setKeranjang(updatedKeranjang);
      setTicketQuantity(newQuantity);
      updateKeranjang(updatedKeranjang);
    }
  };


  const displayTicketName = () => {
    if (keranjang?.jenis_tiket === 'Tiket Pelajar') return 'Tiket Pelajar';
    if (keranjang?.jenis_tiket === 'Tiket Keluarga') return 'Tiket Keluarga';
    if (keranjang?.jenis_tiket === 'Tiket Reguler') return 'Tiket Reguler';
    return 'Ticket Not Selected';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setGroupName(value); 
  };
  

  const [showPopOut, setShowPopOut] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const bankOptions = ["Bank A", "Bank B", "Bank C"];

  const handleCheckout = () => {
    if (ticketQuantity > 0 && 
        (keranjang?.jenis_tiket === "Tiket Keluarga" || keranjang?.jenis_tiket === "Tiket Pelajar") && 
        groupName !== null && groupName.trim() !== '' && selectedDate !== null) {
      setShowPopOut(true);
    }else if(keranjang?.jenis_tiket === "Tiket Reguler" && selectedDate !== null){
      setShowPopOut(true);
    }else {
      alert('Tolong isi data secara lengkap!')
    }
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
    const storedUser = localStorage.getItem('user') || null;
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const paymentData = {
      metode_pembayaran: selectedPayment,
      bank: selectedPayment === "Transfer Bank" || selectedPayment === "Virtual Account" ? selectedBank : null,
      status_pembayaran: true,
      tanggal_pembayaran: selectedDate,
      jenis_tiket: keranjang?.jenis_tiket,
      jumlah_tiket: keranjang?.jumlah_tiket,
      total_harga: keranjang?.total_harga,
      keranjang: keranjang,
      user: parsedUser,
      museum: museum
    };
  
  
    try {
      const response = await fetch(`${configUrl}/payments/createPayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert("Payment successful!");
  
        await createTicketAfterPayment(result);
  
        handleClose(); 
      } else {
        const error = await response.text();
        alert(`Payment failed: ${error}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`Payment error: ${error.message}`);
      } else {
        alert('An unknown error occurred');
      }
    }
  };

  const createTicketAfterPayment = async (payment: Payment) => {
    let call = "";
    if (keranjang?.jenis_tiket === 'Tiket Pelajar') call = "tiketpelajars";
    if (keranjang?.jenis_tiket === 'Tiket Keluarga') call = "tiketkeluargas";
    if (keranjang?.jenis_tiket === 'Tiket Reguler') call = "tiketregulers";
  
    const ticketData = {
      keranjang: keranjang,
      payment: payment,
      kode_tiket: "some_ticket_code", 
      tanggal_kunjungan: new Date().toISOString().split('T')[0]
    };
  
    let url = `${configUrl}/${call}/createTicket`;
    if (call !== "tiketregulers") {
      url += `/${groupName}/${keranjang?.jumlah_tiket}`;
    }
  
    const ticketCount = keranjang?.jumlah_tiket || 1;  
  
    try {
      for (let i = 0; i < ticketCount; i++) {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ticketData),
        });
  
        if (response.ok) {
          if (keranjang) {
            const updatedKeranjang = { 
              ...keranjang,
              keranjang_id: keranjang.keranjang_id, 
              jenis_tiket: "Tiket Reguler", 
              jumlah_tiket: 1, 
              total_harga: 0, 
              museum: keranjang.museum,
            };
            updateKeranjang(updatedKeranjang);
            router.push('/MyTicket');
          }
        
        } else {
          const error = await response.text();
          alert(`Ticket creation failed: ${error}`);
          break;  
        }
      }
      alert(`${ticketCount} tickets created successfully!`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`Ticket Creation!: ${error.message}`);
      } else {
        alert('An unknown error occurred');
      }
    }
  };
  
  const mapApi= () => {
    const latitude = museum?.latitude;
    const longitude = museum?.longitude; 

    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, "_blank"); 
  };

  return (
    <div className="orderpage-body">
      <Navbar />
      <div className="detailmuseum-section1">
        <div className="museum-info">
          <div className="img">
            <Image
              src={museumGeologiImage} 
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
              <button className="btn"  onClick={mapApi}>Directions</button>
              <button className="btn" onClick={() => window.open(`tel:${museum?.no_telpon}`, "_self")}>Call</button>
            </div>
          </div>
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
                src="/images/Museum_Geologi.jpg" 
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
                src="/images/Museum_Geologi.jpg" 
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
                src="/images/Museum_Geologi.jpg"  
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

            {(keranjang?.jenis_tiket === 'Tiket Pelajar' || keranjang?.jenis_tiket === 'Tiket Keluarga') && (
              <div className="input-field">
                <label
                  className="group-name"
                  htmlFor={keranjang?.jenis_tiket === 'Tiket Pelajar' ? 'nama_sekolah' : 'nama_keluarga'}
                >
                  {keranjang?.jenis_tiket === 'Tiket Pelajar' ? 'Nama Sekolah' : 'Nama Keluarga'}
                </label>
                <input
                  type="text"
                  id={keranjang?.jenis_tiket === 'Tiket Pelajar' ? 'nama_sekolah' : 'nama_keluarga'}
                  name={keranjang?.jenis_tiket === 'Tiket Pelajar' ? 'nama_sekolah' : 'nama_keluarga'}
                  value={groupName} // Use the state value
                  onChange={handleInputChange}
                  className='input-field'
                />
              </div>
            )}


            <div className="cost-quantity">
              <button
                className="quantity-btn decrease"
                onClick={() => handleQuantityChange('decrease')}
              >
                -
              </button>
                <span className="quantity-display">{keranjang?.jumlah_tiket}</span>
              <button
                className="quantity-btn increase"
                onClick={() => handleQuantityChange('increase')}
              >
                +
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "left", marginTop: "20px", marginBottom:"10px" }}>
              <label
                style={{
                  marginBottom: "10px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Choose your visit date:
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy/MM/dd"
                placeholderText="Select a date"
                minDate={new Date()}
                className="custom-date-picker" 
              />
              <style>
                {`
                  .custom-date-picker {
                    width: 200px;
                    padding: 10px;
                    font-size: 16px;
                    border: 2px solid black;
                    border-radius: 5px;
                    color: black;
                  }
                  .custom-date-picker::placeholder {
                    color: gray;
                  }
                `}
              </style>
            </div>

            <div className="cost-total">
              <span>Total</span>
              <span className="idrtotal">IDR {totalHarga}</span>
            </div>

            <div className="cost-buttons">
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
