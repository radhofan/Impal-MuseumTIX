import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '@/app/globals.css';
import DetailMuseum from '@/components/DetailMuseum/DetailMuseum';

const DetailMuseumWrapper = () => {
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

  return <DetailMuseum museum_id={museumId} />;
};

export default DetailMuseumWrapper;