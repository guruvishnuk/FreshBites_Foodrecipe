import React, { useState, useEffect } from 'react';

const slideImages = [
  { url: "/images food/snacksfp.webp", title: "Delicious Snacks & Starters" },
  { url: "/images food/vegdishesfp11.jpg", title: "Authentic Indian Curries" },
  { url: "/images food/college.jpeg", title: "Fresh Ingredients Delivered" }
];

export const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % slideImages.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="slideshow">
      <div className="slideshow-container">
        {slideImages.map((slide, index) => (
          <div 
            key={index} 
            className={`slide ${index === currentIndex ? 'active' : ''}`}
            style={{ display: index === currentIndex ? 'block' : 'none' }}
          >
            <img src={slide.url} alt={slide.title} />
            <div className="slide-caption">{slide.title}</div>
          </div>
        ))}
      </div>
      <div className="slideshow-dots">
        {slideImages.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};
