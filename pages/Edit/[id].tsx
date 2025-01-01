import { useRouter } from 'next/router';
import Edit from '@/components/Edit/Edit';

function EditMuseumPage() {
  const router = useRouter();
  const { id } = router.query;

  const numId = id ? parseInt(Array.isArray(id) ? id[0] : id, 10) : null;

  if (!numId || isNaN(numId)) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Edit museum_id={numId} />
    </div>
  );
}

export default EditMuseumPage;
