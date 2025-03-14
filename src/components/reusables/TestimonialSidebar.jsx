import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    quote: "ExactConnect has transformed how I manage my business relationships. The platform is intuitive and powerful.",
    author: "Sarah Johnson",
    role: "Marketing Director",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    quote: "I've tried many platforms, but nothing compares to the efficiency and reliability of ExactConnect.",
    author: "David Chen",
    role: "Entrepreneur",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    id: 3,
    quote: "The customer support team is exceptional. They helped me set up my account and were always available when I needed assistance.",
    author: "Michael Rodriguez",
    role: "Sales Manager",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/22.jpg"
  }
];

const TestimonialSidebar = ({ darkMode }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const intervalRef = useRef(null);

  // Navigation functions
  const goToNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSpecific = (index) => {
    setCurrentTestimonial(index);
  };

  // Auto-advance timer (3 seconds)
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 5000);
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentTestimonial]);

  // Render star ratings
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg 
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ));
  };

  return (
    <div className="hidden md:flex w-1/2 h-screen bg-gradient-to-br from-purple-700 to-indigo-800 text-white">
      <div className="flex flex-col justify-center items-center w-full p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoLTZWMGg2djMwem0tNiAwaC02djMwaDZ2LTMweiIvPjxwYXRoIGQ9Ik0zMCAzMGgtNlYwaDZ2MzB6TS0xOCAxMWg2MHY2aC02MHoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl w-full px-0">
          <div className="mb-12 text-center">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider uppercase bg-white/10 rounded-full backdrop-blur-sm text-white/90">
              Testimonials
            </span>
            <h2 className="text-3xl font-bold">Join thousands of satisfied users</h2>
          </div>
          
          <div className="relative h-48 w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 flex flex-col justify-between"
                style={{ aspectRatio: "3/1" }}
              >
                {/* Quote icon */}
                <div className="absolute -top-4 -left-4 text-white/10">
                  <svg 
                    width="80" 
                    height="80" 
                    viewBox="0 0 24 24" 
                    fill="rgba(255,255,255,0.05)" 
                    className="fill-white/5"
                  >
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"></path>
                  </svg>
                </div>
                
                {/* Star rating */}
                <div className="flex justify-between items-start">
                  <div className="flex mb-4">
                    {renderStars(testimonials[currentTestimonial].rating)}
                  </div>
                </div>
                
                {/* Quote text */}
                <p className="text-lg font-light leading-relaxed mb-4">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                
                {/* Author info with image */}
                <div className="flex items-center mb-8 mt-auto">
                  <div className="h-12 w-12 mr-4 rounded-full overflow-hidden border-2 border-white/30">
                    <img 
                      src={testimonials[currentTestimonial].image} 
                      alt={testimonials[currentTestimonial].author} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23CBD5E0'/%3E%3Ctext x='50' y='50' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='45' fill='%234A5568'%3E" + 
                          testimonials[currentTestimonial].author.split(' ').map(name => name[0]).join('') + "%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-lg">{testimonials[currentTestimonial].author}</p>
                    <p className="text-white/80 text-sm">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSpecific(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentTestimonial === index 
                      ? "bg-white scale-125" 
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={goToPrevious}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110"
                aria-label="Previous testimonial"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button 
                onClick={goToNext}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110"
                aria-label="Next testimonial"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 text-center w-full px-8">
          <div className="py-2 px-4 rounded-full bg-white/10 backdrop-blur-sm inline-flex items-center">
            <span className="text-white/80 text-sm font-light">
              Where accuracy sparks opportunity
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSidebar;