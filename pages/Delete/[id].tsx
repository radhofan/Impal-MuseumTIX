import { useRouter } from 'next/router';
import Delete from '@/components/Delete/Delete';

function EditMuseumPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Delete museum_id={id} />
    </div>
  );
}

export default EditMuseumPage;
