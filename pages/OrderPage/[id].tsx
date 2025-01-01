// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import '@/app/globals.css'; 
// import OrderPage from '@/components/OrderPage/OrderPage';

// const OrderPageWrapper = () => {
//   const router = useRouter();
//   const { id } = router.query;
  
//   const [museumId, setMuseumId] = useState(null);

//   useEffect(() => {
//     if (id) {
//       setMuseumId(id); // Update state when 'id' is available
//     }
//   }, [id]); // Only update when 'id' changes

//   if (!museumId) {
//     return <div>Loading...</div>; // Show loading until the id is available
//   }

//   return <OrderPage museum_id={museumId} />;
// };

// export default OrderPageWrapper;

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '@/app/globals.css'; 
import OrderPage from '@/components/OrderPage/OrderPage';

const OrderPageWrapper = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [museumId, setMuseumId] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      const numId = parseInt(Array.isArray(id) ? id[0] : id, 10);
      if (!isNaN(numId)) {
        setMuseumId(numId);
      }
    }
  }, [id]);

  if (!museumId) {
    return <div>Loading...</div>;
  }

  return <OrderPage museum_id={museumId} />;
};

export default OrderPageWrapper;
