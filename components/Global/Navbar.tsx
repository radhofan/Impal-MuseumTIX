import React, { useState, useEffect } from 'react';
import '@/css/Navbar.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { configUrl } from '@/config.js';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  // Load user data and check for admin or user ID
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');  // Get user data

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        // Check if the user is an admin or a regular user based on their ID
        if (parsedUser.admin_id) {
          setIsAdmin(true); // User is an admin
        } else if (parsedUser.user_id) {
          setIsAdmin(false); // User is a regular user
        }
      }
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('user');  // Remove user data
    localStorage.removeItem('admin'); // Remove admin flag
    setUser(null);  // Reset user state
    setIsAdmin(false);  // Reset admin state
    router.push('/Login');  // Redirect to login page
  };

  return (
    <div className='navbar-body'>
      <div className='navbar-kiri'>
        <div className='navbar-tulisan-hitam-bold'>Museum</div>
        <div className='navbar-tulisan-merah'>Tix</div>
      </div>

    <div className='navbar-tengah'>
      {/* Conditional rendering based on isAdmin */}
      {isAdmin ? (
        <Link href="/ViewAdmin" passHref>
          <div className='navbar-tulisan'>Admin Dashboard</div>
        </Link>
      ) : (
        <>
          <Link href="/HomePage" passHref>
            <div className='navbar-tulisan'>Home</div>
          </Link>
          {/* Render MyTicket only if user is not null */}
          {user && (
            <Link href="/MyTicket" passHref>
              <div className='navbar-tulisan'>My Ticket</div>
            </Link>
          )}
          {/* Render Order only if user and keranjang.museum.museum_id exist */}
          {user && (
            <Link href={`/OrderPage/${user.keranjang.museum.museum_id}`} passHref>
              <div className='navbar-tulisan'>Order</div>
            </Link>
          )}
        </>
      )}
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
