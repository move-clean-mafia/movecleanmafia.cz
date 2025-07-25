'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSliderProps {
  images: Array<{
    src: string;
    alt: string;
    title?: string;
    description?: string;
  }>;
  interval?: number;
  className?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  interval = 5000,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isDragging || isTransitioning) return;

    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(timer);
  }, [
    currentIndex,
    interval,
    images.length,
    isAutoPlaying,
    isDragging,
    isTransitioning,
  ]);

  // Pause auto-play on hover/touch
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Manual navigation with transition handling
  const handlePrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [images.length, isTransitioning]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [images.length, isTransitioning]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  // Toggle auto-play
  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev);
  }, []);

  // Touch/Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const diff = startX - currentX;
    const threshold = 50; // Minimum swipe distance

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swiped left - next image
        handleNext();
      } else {
        // Swiped right - previous image
        handlePrevious();
      }
    }

    setIsDragging(false);
    setIsAutoPlaying(true);
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
    setIsAutoPlaying(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const diff = startX - currentX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }

    setIsDragging(false);
    setIsAutoPlaying(true);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === ' ') {
        e.preventDefault();
        toggleAutoPlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevious, handleNext, toggleAutoPlay]);

  return (
    <div
      ref={sliderRef}
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => {
        handleMouseLeave();
        if (isDragging) {
          setIsDragging(false);
          setIsAutoPlaying(true);
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Images with enhanced transitions */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentIndex
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
              draggable={false}
            />
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Floating animation elements */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse z-20"></div>
            <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-brand-light/20 rounded-full blur-lg animate-pulse delay-1000 z-20"></div>
          </div>
        ))}
      </div>

      {/* Image Counter Overlay */}
      <div className="absolute bottom-20 left-4 z-20 text-white">
        <div className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
          <div className="text-xs text-white/70">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Hidden on mobile */}
      <button
        onClick={handlePrevious}
        className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110"
        aria-label="Previous image"
        disabled={isTransitioning}
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={handleNext}
        className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110"
        aria-label="Next image"
        disabled={isTransitioning}
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Enhanced Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 ${
              index === currentIndex
                ? 'bg-white scale-125 shadow-lg'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            disabled={isTransitioning}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{
            width: isAutoPlaying ? '100%' : '0%',
            animation: isAutoPlaying
              ? `progress ${interval}ms linear infinite`
              : 'none',
          }}
        />
      </div>

      {/* Loading indicator */}
      {isTransitioning && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
