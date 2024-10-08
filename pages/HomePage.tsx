'use client';
import React, { useEffect, useState } from 'react';
import '../styles/HomePage.css';
import Link from 'next/link';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [newNames, setNewNames] = useState({}); // Object to hold new names for each item

  // GET
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/get'); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  // POST
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const newName = newNames['new']; 

    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nama: newName }), 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData((prevData) => [...prevData, { id: result.id, nama: newName }]); 
      setNewNames({ ...newNames, new: '' }); 
    } catch (error) {
      setError(error.message);
    }
  };

  // PUT
  const updateName = async (id) => {
    const newName = newNames[id]; 

    if (!newName) {
      alert('Please enter a new name.');
      return;
    }

    try {
      const response = await fetch('/api/put', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, nama: newName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, nama: newName } : item
        )
      );

      
      setNewNames((prevNewNames) => ({
        ...prevNewNames,
        [id]: '', 
      }));

      alert('Name updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to update name: ' + error.message);
    }
  };

  
  const handleNameChange = (id, value) => {
    setNewNames((prevNewNames) => ({
      ...prevNewNames,
      [id]: value, 
    }));
  };

  //DELETE
  const deleteItem = async (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch('/api/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }), 
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setData((prevData) => prevData.filter((item) => item.id !== id));
  
        alert('Item deleted successfully!');
      } catch (error) {
        console.error(error);
        alert('Failed to delete item: ' + error.message);
      }
    }
  };
  

  return (
    <div>
      <div className='homepage-title'>Homepage</div>
      <Link href="/TestPage">Go to Test Page</Link>
      <Link href="/TestPage2">Go to Test Page 2</Link>
      <Link href="/TestPage3">Go to Test Page 3</Link>

      {error && <div className="error-message">{error}</div>} 
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={newNames['new'] || ''} 
          onChange={(e) => handleNameChange('new', e.target.value)} 
          placeholder="Enter new name" 
        />
        <button type="submit">Add Name</button>
      </form>

      <div className='data-list'>
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item.id}>
              <p>ID: {item.id}</p>
              <p>Name: {item.nama}</p>
              <input
                type="text"
                value={newNames[item.id] || ''} 
                onChange={(e) => handleNameChange(item.id, e.target.value)} 
                placeholder="Enter new name"
              />
              <button onClick={() => updateName(item.id)}>Update Name</button>
              <button onClick={() => deleteItem(item.id)}>Delete</button> {/* Add delete button */}
            </div>
          ))
        ) : (
          <p>No data found.</p>
        )}
      </div>

    </div>
  );
};

export default HomePage;
