import React, { useState, useEffect } from 'react';

const slideImages = [
  { url: "/images food/snacksfp.webp", title: "Delicious Snacks & Starters" },
  { url: "/images food/vegdishesfp11.jpg", title: "Authentic Indian Curries" },
  { url: "/images food/college.jpeg", title: "Fresh Ingredients Delivered" }
];

export const Slideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % slideImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl h-[300px] sm:h-[400px] md:h-[500px] bg-gray-200 dark:bg-gray-800 group">
      {slideImages.map((slide, index) => (
        <div 
          key={index} 
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <img src={slide.url} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 sm:p-8">
            <h3 className="text-white text-xl sm:text-3xl font-bold drop-shadow-md">{slide.title}</h3>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-4 right-0 left-0 flex justify-center gap-2 z-20">
        {slideImages.map((_, index) => (
          <button 
            key={index} 
            className={`w-3 h-3 rounded-full transition-all duration-300 shadow-md ${index === currentIndex ? 'bg-green-500 scale-125' : 'bg-gray-300 hover:bg-white'}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
