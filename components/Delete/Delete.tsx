import React from 'react';

function Delete({ museum_id }) {
  const deleteMuseum = async () => {
    try {
      const response = await fetch(`http://localhost:9090/admins/DeleteMuseum/${museum_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete museum with id ${museum_id}`);
      }

      alert('Museum deleted successfully');
    } catch (error) {
      console.error('Error deleting museum:', error);
      alert('Error deleting museum');
    }
  };

  return (
    <div>
      <button onClick={deleteMuseum}>Delete</button>
    </div>
  );
}

export default Delete;
