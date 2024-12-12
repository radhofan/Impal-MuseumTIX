import React from 'react';
import '../../css/OrderPage.css';
import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';

function OrderPage() {
  return (
    <div className="orderpage-body">
      <Navbar />
      <div className="orderpage-content">
        <h1 className="orderpage-title">Your Order</h1>
        <p className="orderpage-subtitle">Make sure your goods are paid for in full</p>

        <div className="orderpage-section">
          {/* Bagian Ticket Section */}
          <div className="ticket-section">
            <h3>Your Tickets</h3>

            <div className="ticket-item">
            <div className="image">
            </div>
              <div className="ticket-details">
                <h4>Tiket Anak</h4>
                <p>IDR 15.000</p>
              </div>
              <div className="ticket-actions">
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
            </div>

            <div className="ticket-item">
              <div className="image"> 
              </div>
              <div className="ticket-details">
                <h4>Tiket Keluarga</h4>
                <p>IDR 50.000</p>
              </div>
              <div className="ticket-actions">
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
            </div>

            <div className="ticket-item">
            <div className="image"> 
            </div>
              <div className="ticket-details">
                <h4>Tiket Reguler</h4>
                <p>IDR 30.000</p>
              </div>
              <div className="ticket-actions">
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
            </div>
          </div>

          {/* Bagian Cost Section */}
          <div className="cost-section">
            <h3>Cost Information</h3>

            <div className="cost-item">
              <div className="tiketitem"> 
                <span>Tiket Anak</span> 
                <span>1 Items</span>
              </div>
              <span className="idr">IDR 15.000</span>
            </div>
            <div className="cost-item">
            <div className="tiketitem"> 
                <span>Tiket Keluarga</span> 
                <span>1 Items</span>
              </div>
              <span className="idr">IDR 50.000</span>
            </div>
            <div className="cost-item">
            <div className="tiketitem"> 
                <span>Tiket Reguler</span> 
                <span>1 Items</span>
              </div>
              <span className="idr">IDR 30.000</span>
            </div>
 
            <div className="cost-total">
              <span>Total</span>
              <span className="idrtotal">IDR 95.000</span>
            </div>

            <div className="cost-buttons">
              <button className="cancel-btn">Cancel</button>
              <button className="checkout-btn">Checkout</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OrderPage;
