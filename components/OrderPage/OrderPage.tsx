import React from 'react'

import '../../css/OrderPage.css';

import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';

function OrderPage() {
  return (
    <div className='orderpage-body'>
        <Navbar/>
        <div className='orderpage-section1'></div>
        <Footer/>
    </div>
  )
}

export default OrderPage