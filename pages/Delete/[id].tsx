import { useRouter } from 'next/router';
import Delete from '@/components/Delete/Delete';

function EditMuseumPage() {
  const router = useRouter();
  const { id } = router.query;

  const numId = id ? parseInt(Array.isArray(id) ? id[0] : id, 10) : null;

  if (!numId || isNaN(numId)) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Delete museum_id={numId} />
    </div>
  );
}

export default EditMuseumPage;
