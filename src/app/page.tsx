"use client";

import Image from "next/image";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// Sample images - in a real app, these would come from props or API
const images = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    title: "Mountain Serenity",
    description: "Breathtaking mountain landscapes at golden hour",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&h=800&fit=crop",
    title: "Autumn Forest",
    description: "Vibrant fall colors in a peaceful forest setting",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop",
    title: "Ocean Waves",
    description: "Pristine beaches with crystal clear waters",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&h=800&fit=crop",
    title: "Desert Sunset",
    description: "Dramatic desert landscape under painted skies",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200&h=800&fit=crop",
    title: "Misty Valley",
    description: "Ethereal morning mist over rolling hills",
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  // Navigation functions
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const goToSlide = (index: SetStateAction<number>) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlay(!isAutoPlay);
  }, [isAutoPlay]);

  // Touch/swipe functionality
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === " ") {
        e.preventDefault();
        toggleAutoPlay();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [goToPrevious, goToNext, toggleAutoPlay]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-pink-500 rounded-full animate-spin animation-delay-150"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* Main Carousel Container */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-black/20 backdrop-blur-sm border border-white/10">
          {/* Image Container */}
          <div
            className="relative h-96 md:h-[600px] overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Background Images */}
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                  index === currentIndex
                    ? "opacity-100 scale-100"
                    : index === currentIndex - 1 ||
                      (currentIndex === 0 && index === images.length - 1)
                    ? "opacity-0 scale-105 -translate-x-full"
                    : "opacity-0 scale-105 translate-x-full"
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.title}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  unoptimized
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Image Info */}
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h2 className="text-3xl md:text-5xl font-bold mb-2 transform transition-all duration-700 delay-300">
                    {image.title}
                  </h2>
                  <p className="text-lg md:text-xl opacity-90 transform transition-all duration-700 delay-500">
                    {image.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 group"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:text-purple-200" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 group"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:text-purple-200" />
            </button>

            {/* Auto-play Toggle */}
            <button
              onClick={toggleAutoPlay}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 group"
            >
              {isAutoPlay ? (
                <Pause className="w-5 h-5 text-white group-hover:text-purple-200" />
              ) : (
                <Play className="w-5 h-5 text-white group-hover:text-purple-200" />
              )}
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white scale-125 shadow-lg"
                    : "bg-white/50 hover:bg-white/75 hover:scale-110"
                }`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          {isAutoPlay && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-100 ease-linear"
                style={{
                  width: `${((currentIndex + 1) / images.length) * 100}%`,
                }}
              />
            </div>
          )}
        </div>

        {/* Thumbnail Navigation */}
        <div className="pt-6 flex justify-center space-x-4 overflow-x-auto pb-4">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden transition-all duration-300 ${
                index === currentIndex
                  ? "ring-4 ring-purple-400 scale-110 shadow-lg"
                  : "ring-2 ring-white/20 hover:ring-white/40 hover:scale-105"
              }`}
            >
              <Image
                src={image.url}
                alt={image.title}
                width={96}
                height={96}
                className="w-full h-full object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      </div>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        .animation-delay-150 {
          animation-delay: 150ms;
        }

        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }
      `}</style>
    </div>
  );
}
