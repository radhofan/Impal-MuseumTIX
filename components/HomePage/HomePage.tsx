import React, { useEffect } from 'react'
import Swiper from 'swiper';

import '../../css/HomePage.css';
import '../../css/Navbar.css';

import 'swiper/css'; 
import 'swiper/css/pagination'; 
import 'swiper/css/navigation';

import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';

const HomePage = () => {

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
      circles.forEach(circle => {
        circle.classList.remove('active');
      });
      const activeIndex = swiper.realIndex;
      circles[activeIndex].classList.add('active');
    };
  
    const progressCircles = document.querySelectorAll('.swiper-progress .circle');
    progressCircles.forEach((circle, index) => {
      circle.addEventListener('click', () => {
        swiper.slideTo(index);
      });
    });
  
    swiper.on('slideChange', updateProgressCircles);
  
    updateProgressCircles();
  
    return () => {
      progressCircles.forEach(circle => {
        circle.removeEventListener('click', () => {});
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
          <div className='homepage-section2-top'>
            <div className='homepage-section2-top-left'>
               <div className='homepage-section2-top-left-title'>Museum List</div>
               <div className='homepage-section2-top-left-desc'>Find your favourite museum</div>
            </div>
            <div className='homepage-section2-top-right'>
              <div className='homepage-section2-top-right-bar'>
                <input type='text' placeholder='Search...' className='search-input' />
              </div>
              <div className='homepage-section2-top-right-button'>Search</div>
            </div>
          </div>
          <div className='homepage-section2-list'>
            <div className='card'>
              <div className='card-image'></div>
              <div className='card-info'>
                <span className='card-title'>Museum Geologi</span>
                <span className='card-address'>Jl. Diponegoro No.57</span>
                <div className='card-rating'>
                  <span className='star'>⭐</span>
                  <span className='rating'>4.5</span>
                </div>
              </div>
            </div>
            
            <div className='card'>
              <div className='card-image'></div>
              <div className='card-info'>
                <span className='card-title'>Museum Geologi</span>
                <span className='card-address'>Jl. Diponegoro No.57</span>
                <div className='card-rating'>
                  <span className='star'>⭐</span>
                  <span className='rating'>4.5</span>
                </div>
              </div>
            </div>

            <div className='card'>
              <div className='card-image'></div>
              <div className='card-info'>
                <span className='card-title'>Museum Geologi</span>
                <span className='card-address'>Jl. Diponegoro No.57</span>
                <div className='card-rating'>
                  <span className='star'>⭐</span>
                  <span className='rating'>4.5</span>
                </div>
              </div>
            </div>

            <div className='card'>
              <div className='card-image'></div>
              <div className='card-info'>
                <span className='card-title'>Museum Geologi</span>
                <span className='card-address'>Jl. Diponegoro No.57</span>
                <div className='card-rating'>
                  <span className='star'>⭐</span>
                  <span className='rating'>4.5</span>
                </div>
              </div>
            </div>

            <div className='card'>
              <div className='card-image'></div>
              <div className='card-info'>
                <span className='card-title'>Museum Geologi</span>
                <span className='card-address'>Jl. Diponegoro No.57</span>
                <div className='card-rating'>
                  <span className='star'>⭐</span>
                  <span className='rating'>4.5</span>
                </div>
              </div>
            </div>

            <div className='card'>
              <div className='card-image'></div>
              <div className='card-info'>
                <span className='card-title'>Museum Geologi</span>
                <span className='card-address'>Jl. Diponegoro No.57</span>
                <div className='card-rating'>
                  <span className='star'>⭐</span>
                  <span className='rating'>4.5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default HomePage