import React from 'react'

import '../../css/HomePage.css';
import '../../css/Navbar.css';

import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';

const HomePage = () => {
  return (
    <div className='homepage-body'>
        <Navbar/>
        <div className='homepage-section1'></div>
        <div className='homepage-section2'></div>
        <Footer/>
    </div>
  )
}

export default HomePage