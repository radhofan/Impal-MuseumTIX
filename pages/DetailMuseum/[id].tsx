// pages/detailmuseum/[id].tsx
import { useRouter } from 'next/router';
import DetailMuseum from '@/components/DetailMuseum/DetailMuseum';

function DetailMuseumPage() {
  const router = useRouter();
  const { id } = router.query;

  console.log(id);

  return (
    <div>
      {/* You can use the dynamic `id` here for fetching data or as a prop */}
      <DetailMuseum museum_id={id} />
    </div>
  );
}

export default DetailMuseumPage;
