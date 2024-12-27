// pages/detailmuseum/[id].tsx
import { useRouter } from 'next/router';
import DetailMuseum from '@/components/DetailMuseum/DetailMuseum';

function DetailMuseumPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <DetailMuseum museum_id={id} />
    </div>
  );
}

export default DetailMuseumPage;
