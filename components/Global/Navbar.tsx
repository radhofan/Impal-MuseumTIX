import React, { useState, useEffect } from 'react';
import '../../css/Navbar.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);  
    router.push('/Login');  
  };

  return (
    <div className='navbar-body'>
        <div className='navbar-kiri'>
            <div className='navbar-tulisan-hitam-bold'>Museum</div>
            <div className='navbar-tulisan-merah'>Tix</div>
        </div>

        <div className='navbar-tengah'>
            <Link href="/HomePage" passHref>
              <div className='navbar-tulisan'>Home</div>
            </Link>
            <Link href="/MyTicket" passHref>
              <div className='navbar-tulisan'>My Ticket</div>
            </Link>
            <Link href={`/OrderPage/${user?.keranjang.museum.museum_id}`} passHref>
              <div className='navbar-tulisan'>Order</div>
            </Link>
        </div>

        <div className='navbar-kanan'>
          {user ? (
            <div className='navbar-user'>
              <div className='navbar-tulisan' id='username'>
                {user.nama} 
              </div>
              <button className="navbar-tulisan" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <>
              <Link href="/Regist" passHref>
                <div className='navbar-tulisan' id='daftar'>Daftar</div>
              </Link>
              <Link href="/Login" passHref>
                <div className='navbar-tulisan' id='masuk'>Masuk</div>
              </Link>
            </>
          )}
        </div>
    </div>
  );
};

export default Navbar;
