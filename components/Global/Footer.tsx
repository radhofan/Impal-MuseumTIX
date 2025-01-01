import React from 'react'
import '@/css/Footer.css';
import { configUrl } from '@/config.js';

const Footer = () => {
  return (
    <div className='footer'>

      <div className='footer-1'>
        <div className='footer-main'>Museum Tix</div>
        <div className='footer-second'>Copyright 2050 Museum Tix</div>
        <div className='footer-second'>Design by Museum</div>
      </div>

      <div className='footer-1'>
        <div className='footer-main'>Get in Touch</div>
        <div className='footer-second'>MuseumTix@gmail.com</div>
      </div>

      <div className='footer-1'>
        <div className='footer-main'>Explore</div>
        <div className='footer-second'>Beranda</div>
        <div className='footer-second'>Keranjang</div>
      </div>

      <div className='footer-1'>
        <div className='footer-main'>Social</div>
      </div>

    </div>
  )
}

export default Footer