import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DarkModeContext } from '../../context/DarkModeContext';
import Footer from '../reusables/Footer';

const testimonials = [
  {
    id: 1,
    quote: "I run multiple accounts online and needed high-quality non-VoIP numbers. Exactconnect provided exactly what I needed, with excellent support every step of the way. Definitely my go-to provider now!",
    author: "Sarah Johnson",
    role: "Marketing Director",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    quote: "The quality of the proxies and RDPs from Exactconnect is exceptional. Fast, secure, and never had any major downtime. Whenever I have a question, the support team is super responsive. A++ service!",
    author: "David Chen",
    role: "Entrepreneur",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    id: 3,
    quote: "What sets Exactconnect apart is their support team. They are available 24/7, super friendly, and always ready to help. Their non-VoIP numbers work flawlessly, and I've never had issues with my VPS. Definitely sticking with them!",
    author: "Michael Rodriguez",
    role: "Sales Manager",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    id: 4,
    quote: "From ordering to setup, everything was smooth. Their proxies are super fast, and the VPS runs without any hiccups. Plus, their support team is one of the best I've interacted with!",
    author: "David Chen",
    role: "Entrepreneur",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/46.jpg"
  },
];

const TestimonialSidebar = ({ darkMode }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right-to-left, -1 for left-to-right
  const intervalRef = useRef(null);

  // Navigation functions
  const goToNext = () => {
    setDirection(1);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSpecific = (index) => {
    setDirection(index > currentTestimonial ? 1 : -1);
    setCurrentTestimonial(index);
  };

  // Auto-advance timer (4.5 seconds)
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 4500);
    
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

  // Variants for smooth slide animation
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
    })
  };

  return (
    <div className={`hidden md:flex w-1/2 h-screen ${darkMode ? 'bg-[#131312] text-white' : 'bg-gradient-to-br from-purple-700 to-indigo-800 text-white'}`}>      
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
          
          {/* Testimonial card container with enhanced animation */}
          <div className="relative h-56 w-full flex items-center justify-center px-2 overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentTestimonial}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 }
                }}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col justify-between shadow-lg absolute"
                style={{ 
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
                  backdropFilter: "blur(8px)"
                }}
              >
                {/* Subtle glow effect on the card */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                
                {/* Quote icon */}
                <div className="absolute -top-4 -left-4 text-white/10">
                  <svg 
                    width="70" 
                    height="70" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="text-white/10"
                  >
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"></path>
                  </svg>
                </div>
                
                {/* Star rating */}
                <div className="flex justify-between items-start z-10 relative">
                  <div className="flex mb-3">
                    {renderStars(testimonials[currentTestimonial].rating)}
                  </div>
                </div>
                
                {/* Quote text */}
                <p className="text-base font-light leading-relaxed mb-4 line-clamp-2 z-10 relative">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                
                {/* Author info with image */}
                <div className="flex items-center mt-auto z-10 relative">
                  <div className="h-10 w-10 mr-3 rounded-full overflow-hidden border-2 border-white/30">
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
                    <p className="font-medium text-base">{testimonials[currentTestimonial].author}</p>
                    <p className="text-white/80 text-xs">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation controls with active feedback on hover */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSpecific(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    currentTestimonial === index 
                      ? "bg-white scale-125" 
                      : "bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={goToPrevious}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95"
                aria-label="Previous testimonial"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button 
                onClick={goToNext}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95"
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