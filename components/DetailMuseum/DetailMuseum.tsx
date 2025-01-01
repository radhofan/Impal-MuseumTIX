import React, { useEffect, useState } from 'react';
import { museum as Museum, review as Review } from '@/Types/types';

import '@/app/globals.css'; 
import '@/css/Detailmuseum.css';
import Link from 'next/link';

import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';
import Image from 'next/image';

import { configUrl } from '@/config.js';
import { useRouter } from 'next/navigation';

function DetailMuseum({ museum_id }: { museum_id: number }) {

  const [museum, setMuseum] = useState<Museum | null>(null);  
  const [reviews, setReviews] = useState<Review[]>([]); 
  const router = useRouter();

  const getStuff = async () => {
    try {
      const museumData = await fetchMuseums();  
      setMuseum(museumData);
      const reviewsData = await fetchReviews();  
      setReviews(reviewsData);
    } catch (error) {
      console.error('Failed to fetch museum data:', error);
    }
  };

  useEffect(() => {
    if (museum_id) {
      getStuff(); 
    }
  }, [museum_id]);

  async function fetchMuseums() {
    try {
      const response = await fetch(`${configUrl}/museums/getSpec`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: museum_id }), 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const museum = await response.json();  
      return museum;
    } catch (error) {
      console.error("Error fetching museum details:", error);
    }
  }

  async function fetchReviews() {
    try {
      const response = await fetch(`${configUrl}/reviews/getAllMuseumReviews/${museum_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reviews = await response.json();  
      console.log(reviews);
      return reviews;
    } catch (error) {
      console.error("Error fetching reviewdetails:", error);
    }
  }

  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  const handleAddComment = async () => {
    if (newComment.trim() === '') {
      alert('Comment cannot be empty');
      return;
    }
    const userPrev = localStorage.getItem('user');
    const user = userPrev ? JSON.parse(userPrev) : null;

    if(user === null){
      alert("You must log in first!.")
      router.push('/HomePage')
      return
    }else{
      try {
        const response = await fetch(`${configUrl}/reviews/addReview/${museum_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: user,
            rating: newRating,
            comment: newComment,
          }),
        });

        if (response.ok) {
          const addedReview = await response.json();
          setReviews([...reviews, addedReview]);
          setNewComment('');
          setNewRating(5);
          alert('Comment added successfully!');
        } else {
          alert('Failed to add comment.');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred. Please try again later.');
      }
    }
  };

  const mapApi= () => {
    const latitude = museum?.latitude;
    const longitude = museum?.longitude; 

    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, "_blank"); 
  };


  return (
    
    <div className="detailmuseum-body">
      <Navbar />
      <div className="detailmuseum-section1">
        <div className="museum-info">
          <div className="img">
            <Image
              src="/images/Museum_Geologi.jpg" 
              width={500}
              height={500}
              alt="Museum Geologi"
              className="museum-image"
            />
          </div>
          <div className="museum-details">
            <h1 className="museum-title">{museum?.nama}</h1>
            <p className="museum-description">
              {museum?.keterangan}
            </p>
            <ul className="museum-info-list">
              <li>📍 Jl. Diponegoro No.57, Kota Bandung Jawa Barat</li>
              <li>⏰ 9:00 am - 3:00 pm</li>
              <li>⭐ 4.5</li>
              <li>❤️ 1543 likes</li>
            </ul>
            <div className="button-group">
              <button onClick={mapApi} className="btn">Directions</button>
              <button className="btn" onClick={() => window.open(`tel:${museum?.no_telpon}`, "_self")}>Call</button>
              <Link href={`/OrderPage/${museum_id}`} passHref>
                <button className="btn primary">
                  Buy Tickets
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="reviews">
          <h3 className="reviews-title">Reviews for {museum?.nama}</h3>
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <p className="review-card-title">
                <strong>{review.user.nama}</strong> {Array(review.rating).fill('⭐').join('')}
              </p>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

        <div className="add-comment">
          <h3>Add a Comment</h3>
          <textarea
            className="comment-input"
            placeholder="Write your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <select
            className="rating-input"
            value={newRating}
            onChange={(e) => setNewRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating} ⭐
              </option>
            ))}
          </select>
          <div className='button-container'>
            <button className="btn primary" onClick={handleAddComment}>
              Submit
            </button>
          </div>
        </div>

      <Footer />
    </div>
  );

}

export default DetailMuseum;
