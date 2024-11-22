import React from 'react'

import '../../css/MyTicket.css';

import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';

function MyTicket() {
  return (
    <div className='myticket-body'>
        <Navbar/>
        <div className='myticket-section1'></div>
        <Footer/>
    </div>
  )
}

export default MyTicket