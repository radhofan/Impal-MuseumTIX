import React, { useState, useEffect } from 'react';
import '@/css/Navbar.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { user as User } from '@/Types/types';

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');  

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        if (parsedUser.admin_id) {
          setIsAdmin(true); 
        } else if (parsedUser.user_id) {
          setIsAdmin(false); 
        }
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');  
    localStorage.removeItem('admin'); 
    setUser(null);  
    setIsAdmin(false);  
    router.push('/Login');  
  };

  return (
    <div className='navbar-body'>
      <div className='navbar-kiri'>
        <div className='navbar-tulisan-hitam-bold'>Museum</div>
        <div className='navbar-tulisan-merah'>Tix</div>
      </div>

    <div className='navbar-tengah'>
      {isAdmin ? (
        <Link href="/ViewAdmin" passHref>
          <div className='navbar-tulisan'>Admin Dashboard</div>
        </Link>
      ) : (
        <>
          <Link href="/HomePage" passHref>
            <div className='navbar-tulisan'>Home</div>
          </Link>
          {user && (
            <Link href="/MyTicket" passHref>
              <div className='navbar-tulisan'>My Ticket</div>
            </Link>
          )}
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
