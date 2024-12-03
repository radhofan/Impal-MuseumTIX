import React from 'react'
import '../../css/Navbar.css';
const Navbar = () => {
  return (
    <div className='navbar-body'>
        
        <div className='navbar-kiri'>
            <div className='navbar-tulisan-hitam-bold'>Museum</div>
            <div className='navbar-tulisan-merah'>Tix</div>
        </div>

        <div className='navbar-tengah'>
            <div className='navbar-tulisan'>Home</div>
            <div className='navbar-tulisan'>My Ticket</div>
            <div className='navbar-tulisan'>Order</div>
        </div>

        <div className='navbar-kanan'>
            <div className='navbar-tulisan' id='daftar'>Daftar</div>
            <div className='navbar-tulisan' id='masuk'>Masuk</div>
        </div>

    </div>
  )
}

export default Navbar