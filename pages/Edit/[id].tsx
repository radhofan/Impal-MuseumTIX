import { useRouter } from 'next/router';
import Edit from '@/components/Edit/Edit';

function EditMuseumPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Edit museum_id={id} />
    </div>
  );
}

export default EditMuseumPage;
