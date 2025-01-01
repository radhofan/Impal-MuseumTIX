import React, { useState, useEffect } from 'react'
import Swiper from 'swiper';
import Link from 'next/link';

import '@/css/Homepage.css';
import '@/css/Navbar.css';

import 'swiper/css'; 
import 'swiper/css/pagination'; 
import 'swiper/css/navigation';
import Image from 'next/image';

import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';

import { configUrl } from '@/config.js';

const HomePage = () => {


  const [museums, setMuseums] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);

  // Filter museums 
  const filteredMuseums = museums.filter((museum) =>
    museum.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    museum.lokasi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const museumsToDisplay = showAll ? filteredMuseums : filteredMuseums.slice(0, 6);

  // useEffect List Musum
  useEffect(() => {
      async function getMuseums() {
          const data = await fetchMuseums();
          setMuseums(data);
      }

      getMuseums(); 
  }, []);

  async function fetchMuseums() {
    try {
        const response = await fetch(`${configUrl}/museums/getAll`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const museums = await response.json();
        return museums;
    } catch (error) {
        console.error("Error fetching museums:", error);
    }
  }
  
  // useEffect Swiper
  useEffect(() => {
    const swiper = new Swiper('.swiper-container', {
      direction: 'vertical',
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
        bulletClass: 'circle',
        bulletActiveClass: 'swiper-pagination-bullet-active',
      },
      autoplay: {
        delay: 5000,
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
    });

    const updateProgressCircles = () => {
      const circles = document.querySelectorAll('.swiper-progress .circle');
      if (circles.length === 0) return; // Safeguard: Ensure circles exist

      circles.forEach((circle) => {
        circle.classList.remove('active');
      });

      const activeIndex = swiper.realIndex;
      if (circles[activeIndex]) {
        circles[activeIndex].classList.add('active');
      }
    };

    const progressCircles = document.querySelectorAll('.swiper-progress .circle');
    progressCircles.forEach((circle, index) => {
      circle.addEventListener('click', () => {
        swiper.slideTo(index);
      });
    });

    swiper.on('slideChange', updateProgressCircles);

    updateProgressCircles(); // Initial update

    // Cleanup on unmount
    return () => {
      progressCircles.forEach((circle, index) => {
        circle.removeEventListener('click', () => {
          swiper.slideTo(index);
        });
      });
      if (swiper) swiper.destroy(true, true);
    };
  }, []);
  
  return (
    <div className='homepage-body'>
        <Navbar/>
        <div className='homepage-section1'>
            <div className="swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="content">
                    <h1>About</h1>
                    <p>Museum Tix is an app created by a bunch of Javanese people and 1 Sundanese.</p>
                    <button>More</button>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="content">
                    <h1>Features</h1>
                    <p>Explore and book museum tickets with ease through our user-friendly app.</p>
                    <button>Explore</button>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="content">
                    <h1>Contact</h1>
                    <p>Reach out to us for inquiries, partnerships, or feedback.</p>
                    <button>Contact Us</button>
                  </div>
                </div>
              </div>
              <div className="swiper-progress">
                <div className="circle" data-slide="0">
                  <div className="inner-circle"></div>
                </div>
                <div className="circle" data-slide="1">
                  <div className="inner-circle"></div>
                </div>
                <div className="circle" data-slide="2">
                  <div className="inner-circle"></div>
                </div>
              </div>
            </div>
        </div>

      <div className='homepage-section2'>


        {/* Search Bar and Input */}
        <div className='homepage-section2-top'>
          <div className='homepage-section2-top-left'>
            <div className='homepage-section2-top-left-title'>Museum List</div>
            <div className='homepage-section2-top-left-desc'>Find your favourite museum</div>
          </div>
          <div className='homepage-section2-top-right'>
            <div className='homepage-section2-top-right-bar'>
              <input
                type='text'
                placeholder='Search...'
                className='search-input'
                value={searchTerm} // Controlled input
                onChange={(e) => setSearchTerm(e.target.value)} // Update state on change
              />
            </div>
            <div className='homepage-section2-top-right-button'>Search</div>
          </div>
        </div>

        {/* Museums List */}
        <div className='homepage-section2-list'>
          {museumsToDisplay.length > 0 ? (
            museumsToDisplay.map((museum, index) => (
              <Link key={index} href={`/DetailMuseum/${museum.museum_id}`} passHref>
                <div className='card'>
                  {/* <div className='card-image'></div> */}
                  <Image
                    src="/images/Museum_Geologi.jpg" // Ensure the image path matches your project structure
                    width={500}
                    height={500}
                    alt="Museum Geologi"
                    className="card-image"
                  />
                  <div className='card-info'>
                    <span className='card-title'>{museum.nama}</span>
                    <span className='card-address'>{museum.lokasi}</span>
                    <span className='notelp'>{museum.no_telpon}</span>
                    <div className='card-rating'>
                      <span className='star'>⭐</span>
                      <span className='rating'>{museum.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div>No museums found</div>
          )}
        </div>
        {/* Button container */}
        {filteredMuseums.length > 6 && (
          <div className='button-container'>
            <button
              className='show-more-button'
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
        
      </div>

        <Footer/>
    </div>
  )
}

export default HomePage