import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '@/app/globals.css'; 
import DetailMuseum from '@/components/DetailMuseum/DetailMuseum';

const DetailMuseumWrapper = () => {
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

  return <DetailMuseum museum_id={museumId} />;
};

export default DetailMuseumWrapper;