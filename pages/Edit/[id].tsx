// import { useRouter } from 'next/router';
// import Edit from '@/components/Edit/Edit';

// function EditMuseumPage() {
//   const router = useRouter();
//   const { id } = router.query;

//   return (
//     <div>
//       <Edit museum_id={id} />
//     </div>
//   );
// }

// export default EditMuseumPage;

import { useRouter } from 'next/router';
import Edit from '@/components/Edit/Edit';

function EditMuseumPage() {
  const router = useRouter();
  const { id } = router.query;

  // Convert id to number, handling both string and array cases
  const numId = id ? parseInt(Array.isArray(id) ? id[0] : id, 10) : null;

  // Show loading state if id is not yet available or invalid
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
