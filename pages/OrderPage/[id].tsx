import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '@/app/globals.css'; 
import OrderPage from '@/components/OrderPage/OrderPage';

const OrderPageWrapper = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [museumId, setMuseumId] = useState(null);

  useEffect(() => {
    if (id) {
      setMuseumId(id); // Update state when 'id' is available
    }
  }, [id]); // Only update when 'id' changes

  if (!museumId) {
    return <div>Loading...</div>; // Show loading until the id is available
  }

  return <OrderPage museum_id={museumId} />;
};

export default OrderPageWrapper;
