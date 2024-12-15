import React, { useState, useEffect } from 'react';
import '../../css/Navbar.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Check for user in localStorage only on the client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);  // Clear user state
    router.push('/Login');  // Redirect to the login page
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
            <div className='navbar-tulisan'>My Ticket</div>
            <div className='navbar-tulisan'>Order</div>
        </div>

        <div className='navbar-kanan'>
          {/* Check if the user is logged in */}
          {user ? (
            // If user is logged in, display their username and logout button
            <div className='navbar-user'>
              <div className='navbar-tulisan' id='username'>
                {user.nama} {/* Display user's name */}
              </div>
              <button className="navbar-tulisan" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            // If user is not logged in, show Daftar and Masuk buttons
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
