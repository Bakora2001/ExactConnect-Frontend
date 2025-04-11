// SimpleCarousel.jsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// This carousel provides a simple horizontal scrolling container
// with navigation buttons for the items
const SimpleCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Calculate the maximum index based on number of items and visible items
  const maxIndex = Math.max(0, items.length - (window.innerWidth >= 768 ? 3 : 1));
  
  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };
  
  return (
    <div className="relative">
      <div className="flex overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / items.length)}%)` }}
        >
          {items.map((item, index) => (
            <div 
              key={index} 
              className="w-full md:w-1/3 flex-shrink-0 p-2"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation buttons */}
      {currentIndex > 0 && (
        <button 
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full"
          aria-label="Previous item"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
      )}
      
      {currentIndex < maxIndex && (
        <button 
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full"
          aria-label="Next item"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      )}
    </div>
  );
};

export default SimpleCarousel;